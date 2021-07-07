import React from 'react';
import ReactDOM from 'react-dom';
import styled, { css } from 'styled-components';
import cloneDeep from 'lodash/cloneDeep';
import sortedUniq from 'lodash/sortedUniq';
import sortBy from 'lodash/sortBy';

import { View, Link } from '/imports/pdf/core/ui/atoms';
import { OrderedListItem, UnorderedListItem } from '/imports/pdf/core/ui/atoms';
import { DEFAULT_DETAILS, DEFAULT_BLOCKS } from './placeholders';
import { PARSE_PARAMETERS } from '/imports/generator/api/constants';

const blockEmpty = block => (
  !block ||
  !block.items ||
  !block.items.length
);

export const isDescriptionEmpty = description => {
  try {
    const { blocks } = JSON.parse(description);
    return blocks && blocks.length === 1 && blocks[0].text === '';
  } catch(error) {
    return false;
  }
};

export const getResumeWithPlaceholders = resume => {
  if (!resume) return null;
  //disactivate placeholders
  return resume;
  if (
    ['SKILLS', 'EDUCATION', 'EMPLOYMENT', 'LANGUAGES'].every(type => !blockEmpty(resume.blocks.find(b => b.type === type))) &&
    (resume.details.firstName || resume.details.lastName) &&
    !isDescriptionEmpty(resume.details.professionalSummary)
  ) {
    return resume;
  }
  const result = cloneDeep(resume);
  if (!result.details.firstName && !result.details.lastName) {
    result.details.firstName = DEFAULT_DETAILS.firstName;
    result.details.lastName = DEFAULT_DETAILS.lastName;
  }
  if (!result.details.professionalSummary || isDescriptionEmpty(result.details.professionalSummary)) {
    result.details.professionalSummary = DEFAULT_DETAILS.professionalSummary;
  }
  result.blocks = result.blocks || [];
  DEFAULT_BLOCKS.forEach(block => {
    const existingBlock = result.blocks.find(b => b.type === block.type);
    if (blockEmpty(existingBlock)) {
      if (!existingBlock) {
        result.blocks.push(block);
      } else {
        const blockIndex = result.blocks.findIndex(b => b.type === block.type);
        result.blocks[blockIndex] = block;
      }
    }
  });
  return result;
};

const inRange = ({ st, ed }, { offset, length }, text) => {
  const _ed = ed >= text.length ? text.length - 1 : ed;
  return (st >= offset && _ed <= offset + length - 1);
};

const applyStyle = (style, type) => {
  let addStyle = {};
  switch(type) {
    case 'BOLD': addStyle.bold = true; break;
    case 'ITALIC': addStyle.italic = true; break;
    case 'UNDERLINE': addStyle.underline = true; break;
    case 'LINETHROUGH': addStyle.linethrough = true; break;
  }
  return Object.assign(style, addStyle);
};

const renderBlock = ({ inlineStyleRanges, entityRanges, text, key, type }, entityMap, { num, template, BaseText, center }) => {
  let breakpoints = [];
  let intervals = [];

  inlineStyleRanges.forEach(isr => {
    breakpoints.push(isr.offset);
    const bpCandidate = isr.offset + isr.length;
    if(bpCandidate < text.length) breakpoints.push(bpCandidate);
  });
  entityRanges.forEach(er => {
    breakpoints.push(er.offset);
    const bpCandidate = er.offset + er.length;
    if(bpCandidate < text.length) breakpoints.push(bpCandidate);
  });
  breakpoints = sortedUniq(sortBy(breakpoints));

  let pointer = 0;
  breakpoints.forEach(bp => {
    if(bp !== 0) {
      intervals.push({
        st: pointer,
        ed: bp - 1
      });
    }
    pointer = bp;
  });
  if(pointer < text.length) {
    intervals.push({
      st: pointer,
      ed: text.length
    });
  }

  const data = intervals.map(interval => {
    const textPart = text.substring(interval.st, interval.ed + 1);
    let style = {};
    let data = {};
    let type = 'text';

    inlineStyleRanges.forEach(isr => {
      if(inRange(interval, isr, text)) {
        style = applyStyle(style, isr.style);
      }
    });
    entityRanges.forEach(er => {
      if(inRange(interval, er, text)) {
        const { key } = er;
        const entity = entityMap[key];
        if(entity && entity.type === 'LINK') {
          type = 'link';
          data = Object.assign(data, entity.data);
        }
      }
    });
    return { text: textPart, type, style, data };
  });

  const content = data.map((part, index) => renderPart(part, {template, BaseText}, index));
  let result = <BaseText>{content.length > 0 ? content : <BaseText style={{ color: '#fff' }}>123456789</BaseText>}</BaseText>;
  if(type === 'unordered-list-item') {
    result = <UnorderedListItem BaseText={BaseText} center={center}><BaseText>{content}</BaseText></UnorderedListItem>;
  }
  if(type === 'ordered-list-item') {
    result = <OrderedListItem num={num} BaseText={BaseText} center={center}><BaseText>{content}</BaseText></OrderedListItem>;
  }
  return (
    <View key={key}>
      {result}
    </View>
  );
};

const renderPart = ({ text, type, style: { bold, italic, underline, linethrough }, data: { url } }, { template, BaseText }, index) => {
  const BaseComponent = type === 'link' ? Link : BaseText;
  const CondText = styled(BaseComponent)`
      ${bold && `font-family: ${PARSE_PARAMETERS[template].bold}`};
      ${italic && `font-family: ${PARSE_PARAMETERS[template].italic}`};
      ${(bold && italic) && `font-family: ${PARSE_PARAMETERS[template].boldItalic}`};
    `;
  const style = {
    textDecoration: underline ? 'underline' : linethrough ? 'linethrough' : 'none'
  };
  return (
    <CondText
      style={style}
      src={url}
      key={index}
    >
      {text}
    </CondText>
  );
};

export const parseDraftText = (text, BaseText, template, params) => {
  if(!text) return null;
  const { blocks, entityMap } = JSON.parse(text);
  const center = params ? params.center : false;
  const isPlaceholder = params && params.isPlaceholder;
  let nextNum = 0;
  return (
    <ParsedTextContainer isPlaceholder={isPlaceholder}>
      {blocks && blocks.map(block => {
        nextNum = block.type === 'ordered-list-item' ? nextNum + 1 : 0;
        return renderBlock(block, entityMap, { num: nextNum, template, BaseText, center });
      })}
    </ParsedTextContainer>
  );
};

const ParsedTextContainer = styled(View)`
  ${p => p.isPlaceholder && css`
    opacity: 0.15;
  `}
`;

export const displayLanguageLevel = level => {
  if(!level) return null;
  return (level.charAt(0) + level.slice(1).toLowerCase()).replace('_', ' ');
};
