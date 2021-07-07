import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import sortBy from 'lodash/sortBy';
import { parseDraftText, isDescriptionEmpty } from '/imports/pdf/core/api/helpers';

import {
  Page as PageAtom,
  View,
  Document,
} from '/imports/pdf/core/ui/atoms';
import {
  Text,
  Heading,
  BlockItem,
  TitleLine,
  DetailsIcon,
} from '/imports/pdf/prague/ui/atoms';
import BLOCKS_MAP from '../../api/blocksMap';
import { BLOCK_NAMES } from '/imports/generator/api/constants';

const LEFT_COLUMN_BLOCKS = ['EDUCATION', 'SOCIAL_LINKS', 'SKILLS', 'LANGUAGES', 'HOBBIES'];
const DATE_VIEW_BLOCKS = [
  'EMPLOYMENT',
  'CUSTOM',
  'COURSES',
  'EXTRA_CURRICULAR',
  'INTERNSHIPS'
];
const BLOCK_ALT_NAMES = {
  EMPLOYMENT: 'Professional experience',
  SOCIAL_LINKS: 'Follow me',
  EXTRA_CURRICULAR: 'Extra curricular activities',
  INTERNSHIPS: 'Internships activities',
  HOBBIES: 'Interests',
};
const ORDERED_DETAILS_FIELDS = [
  'address',
  'city'
];

class PragueTemplate extends PureComponent {
  getNameLength = () => {
    const {
      details: {
        firstName,
        lastName
      }
    } = this.props.resume;
    const l1 = firstName ? firstName.length : 0;
    const l2 = lastName ? lastName.length + 1 : 0;
    return l1 + l2;
  };

  renderUnderline = (isPlaceholderSummary) => {
    const {
      details,
      details: {
        phone,
        email,
        title,
        professionalSummary,
        firstName,
        lastName
      }
    } = this.props.resume;
    const fields = ORDERED_DETAILS_FIELDS.filter(f => details[f]);
    if(!phone && !email && !title && !firstName && !lastName && fields.length === 0 && isPlaceholderSummary) return null;
    return <HeaderUnderline />;
  };

  renderDetails = () => {
    const {
      details,
      details: {
        phone, email
      }
    } = this.props.resume;
    const fields = ORDERED_DETAILS_FIELDS.filter(f => details[f]);
    if(fields.length === 0 && !phone && !email) return null;
    return (
      <Details>
        {email && (
          <DetailsItem>
            <DetailsIcon code="e916" email />
            <DetailsText>{email}</DetailsText>
          </DetailsItem>
        )}
        {phone && (
          <DetailsItem>
            <DetailsIcon code="e919" />
            <DetailsText>{phone}</DetailsText>
          </DetailsItem>
        )}
        {fields.length > 0 && (
          <DetailsItem full>
            <DetailsIcon code="e91a" />
            <DetailsText>{fields.map(f => details[f]).join(', ')}</DetailsText>
          </DetailsItem>
        )}
      </Details>
    );
  };

  renderReferences = (block, resume) => {
    const blockData = BLOCKS_MAP[block.type];
    const { hideReferences } = block;
    if (!blockData) return null;
    return (
      <BlockItem key={block._id} left>
        <Heading>{BLOCK_ALT_NAMES[block.type] || BLOCK_NAMES[block.type]}</Heading>
        {hideReferences ?
          <View>
            <Text>References available upon request</Text>
          </View> :
          <ReferencesContainer>
            {sortBy((block.items || []), 'order').map((item, index) => {
            if (!blockData.renderItem) return <Text>yep</Text>;
            return (
              <ReferencesItem key={index}>
                {blockData.renderItem(item, resume)}
              </ReferencesItem>
              );
            })}
          </ReferencesContainer>
        }
      </BlockItem>
    );
  };

  renderBlocks = (resume, blockNames, left) => {
    const { blocks } = resume;
    const fixedBlocks = sortBy(
      blocks.filter(b => b.items && b.items.length && blockNames.includes(b.type) && b.fixedOrder != null),
      'fixedOrder'
    );
    const sortableBlocks = sortBy(
      blocks.filter(b => b.items && b.items.length && blockNames.includes(b.type) && b.order != null),
      'order'
    );
    return [...fixedBlocks,  ...sortableBlocks].map((block, blockIndex) => {
      const blockData = BLOCKS_MAP[block.type];
      if (!blockData) return null;
      if (blockData.canDisplay && !blockData.canDisplay(block)) {
        return null;
      }
      const isCustom = block.type === 'CUSTOM';
      const dateView = DATE_VIEW_BLOCKS.includes(block.type);
      const blockName = isCustom ? block.title : BLOCK_ALT_NAMES[block.type] || BLOCK_NAMES[block.type];
      const blockContent = sortBy((block.items || []), 'order').map((item, index) => {
        if (!blockData.renderItem) return <Text>yep</Text>;
        return (
          <BlockInner key={index}>
            {blockData.renderItem(item, resume, block.isPlaceholder)}
          </BlockInner>
        );
      });
      if(block.type === 'REFERENCES') {
        return this.renderReferences(block, resume);
      }

      return (
        <BlockItem dateView={dateView} left={left} key={block._id}>
          <Heading>{blockName}</Heading>
          <View dateView={dateView}>
            {blockContent}
          </View>
        </BlockItem>
      );
    });
  };

  render() {
    const {
      details: {
        title,
        professionalSummary,
        firstName,
        lastName
      }
    } = this.props.resume;
    const isPlaceholderSummary = !professionalSummary || isDescriptionEmpty(professionalSummary);
    return (
      <Document {...this.props}>
        <Page>
          <Header>
            <LeftHeader>
              {(firstName || lastName) && (
                <Name length={this.getNameLength()}>
                  {firstName}{lastName && ` ${lastName}`}
                </Name>
              )}
              {((firstName || lastName) && title) &&  <TitleLine />}
              {title && <Title length={title.length}>{title}</Title>}
              {this.renderDetails()}
            </LeftHeader>
            <RightHeader>
              {!isPlaceholderSummary && (
                <View>
                  <Heading>Profile</Heading>
                  <Summary>{parseDraftText(professionalSummary, Summary, 'prague')}</Summary>
                </View>
              )}
            </RightHeader>

            <MiddleLine header />
          </Header>
          {this.renderUnderline(isPlaceholderSummary)}
          <Main>
            <LeftSide>
              <NoFirstLine>
                {this.renderBlocks(this.props.resume, LEFT_COLUMN_BLOCKS, true)}
              </NoFirstLine>
            </LeftSide>
            <RightSide>
              <NoFirstLine>
                {this.renderBlocks(
                  this.props.resume,
                  Object.keys(BLOCKS_MAP).filter(b => !LEFT_COLUMN_BLOCKS.includes(b))
                )}
              </NoFirstLine>
            </RightSide>

            <MiddleLine />
          </Main>
        </Page>
      </Document>
    );
  }
}

const Page = styled(PageAtom)`
  padding: 70px 55px 55px 55px;
`;

const Header = styled(View)`
  position: relative;
  flex-direction: row;
  margin-bottom: 20px;
`;

const Details = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 18px;
`;

const DetailsItem = styled(View)`
  width: 50%;
  flex-direction: row;
  margin-bottom: 4px;
  ${p => p.full && css`
    width: 100%;
  `}
`;

const DetailsText = styled(Text)`
  font-size: 12px;
  word-break: break-word;
`;

const HeaderUnderline = styled(View)`
  width: 100%;
  height: 1px;
  background: #404040;
  margin-bottom: 20px;
`;

const LeftHeader = styled(View)`
  width: 45%;
  padding-right: 20px;
`;

const RightHeader = styled(View)`
  width: 55%;
  padding-left: 20px;
`;

const Name = styled(Heading)`
  margin-bottom: 0;
  color: #404040;
  font-size: 38px;
  text-align: center;
  line-height: 1;
  letter-spacing: 6px;
  ${p => {
    if(p.length > 7 && p.length <= 10) return css`font-size: 30px; letter-spacing: 4px;`;
    if(p.length > 10 && p.length <= 15) return css`font-size: 26px; letter-spacing: 2px;`;
    if(p.length > 15) return css`font-size: 20px; letter-spacing: 2px;`;
    }
  }
`;

const Title = styled(Heading)`
  text-align: center;
  letter-spacing: 14px;
  font-size: 13px;
  margin-bottom: 0;
  ${p => {
    if(p.length > 22 && p.length <= 29) return css`font-size: 10px; letter-spacing: 8px;`;
    if(p.length > 29) return css`font-size: 8px; letter-spacing: 4px;`;
    }
  }
`;

const Main = styled(View)`
  position: relative;
  flex-direction: row;
`;

const LeftSide = styled(View)`
  width: 25%;
  padding-right: 20px;
`;

const RightSide = styled(View)`
  width: 75%;
  padding-left: 25px;
`;

const MiddleLine = styled(View)`
  position: absolute;
  width: 1px;
  height: 100%;
  border-left: 1px solid #404040;
  left: 25%;
  ${p => p.header && css`
    left: 45%;
  `}
`;

const Summary = styled(Text)`
`;

const NoFirstLine = styled(View)`
  > div:first-child {
    border-top-color: transparent;
    padding-top: 0;
  }
`;

const BlockInner = styled(View)`
  &:last-child {
    > div {
      margin-bottom: 0;
    }
  }
`;

const ReferencesContainer = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
`;

const ReferencesItem = styled(View)`
  width: 50%;
  margin-bottom: 30px;
  &:last-child {
    margin-bottom: 0;
  }
  &:nth-last-child(2) {
    margin-bottom: 0;
  }
`;

export default PragueTemplate;