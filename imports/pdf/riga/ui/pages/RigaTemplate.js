import React, { PureComponent } from 'react';
import { Meteor } from 'meteor/meteor';
import styled, { css } from 'styled-components';
import sortBy from 'lodash/sortBy';
import { parseDraftText, isDescriptionEmpty } from '/imports/pdf/core/api/helpers';
import { theme } from '/imports/core/ui/theme';

import {
  Page as PageAtom,
  View,
  Document,
  Image,
} from '/imports/pdf/core/ui/atoms';
import {
  Text,
  Heading,
  BlockItem,
  DetailsIcon,
} from '/imports/pdf/riga/ui/atoms';
import BLOCKS_MAP from '../../api/blocksMap';
import { BLOCK_NAMES } from '/imports/generator/api/constants';

const LEFT_COLUMN_BLOCKS = ['SKILLS', 'EDUCATION', 'SOCIAL_LINKS', 'LANGUAGES'];
const DATE_VIEW_BLOCKS = [
  'EMPLOYMENT',
  'CUSTOM',
  'COURSES',
  'EXTRA_CURRICULAR',
  'INTERNSHIPS'
];
const FLEX_VIEW_BLOCKS = ['REFERENCES'];
const BLOCK_ALT_NAMES = {
  EMPLOYMENT: 'Work experience',
  SOCIAL_LINKS: 'Social',
  HOBBIES: 'Interests',
};
const ORDERED_DETAILS_FIELDS = [
  'address',
  'city',
  'country'
];

class RigaTemplate extends PureComponent {
  renderDetails = () => {
    const {
      details,
      details: {
        phone, email
      },
      settings: {
        color
      }
    } = this.props.resume;
    const fields = ORDERED_DETAILS_FIELDS.filter(f => details[f]);
    if(fields.length === 0 && !phone && !email) return null;
    return (
      <Details>
        {fields.length > 0 && (
          <DetailsItem>
            <DetailsIcon code="e91d" color={color} />
            <DetailsText>{fields.map(f => details[f]).join(', ')}</DetailsText>
          </DetailsItem>
        )}
        {phone && (
          <DetailsItem>
            <DetailsIcon code="e91c" color={color} />
            <DetailsText>{phone}</DetailsText>
          </DetailsItem>
        )}
        {email && (
          <DetailsItem>
            <DetailsIcon code="e91b" email color={color} />
            <DetailsText>{email}</DetailsText>
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
      <BlockItem key={block._id}>
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
      const flexView = FLEX_VIEW_BLOCKS.includes(block.type);
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
          <Heading left={left}>{blockName}</Heading>
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
        lastName,
        userPic
      },
      settings: {
        color
      }
    } = this.props.resume;
    const isPlaceholderSummary = !professionalSummary || isDescriptionEmpty(professionalSummary);
    return (
      <Document {...this.props}>
        <Page>
          <Header>
            <HeaderBackground color={color} />
            <HeaderContent color={color}>
              {(firstName && lastName) && (
                <Initials color={color}>
                  {`${firstName && firstName.charAt(0)} | ${lastName && lastName.charAt(0)}`}
                </Initials>
              )}
              {(firstName || lastName) && (
                <Name>
                  {firstName}{lastName && ` ${lastName}`}
                </Name>
              )}
              {title && (
                <TitleContainer>
                  <TitleLine color={color} />
                  <Title color={color}>{title}</Title>
                  <TitleLine color={color} />
                </TitleContainer>
              )}
              {this.renderDetails()}
            </HeaderContent>
          </Header>
          {(userPic || !isPlaceholderSummary) && (
              <PersonalInfo>
              {userPic && (
                <AvatarContainer>
                  <Avatar src={userPic || `${Meteor.absoluteUrl()}img/default_resume_avatar.png`} />
                </AvatarContainer>
              )}
              {!isPlaceholderSummary && (
                <SummaryContainer>
                  <Summary>{parseDraftText(professionalSummary, Summary, 'riga')}</Summary>
                </SummaryContainer>
              )}
            </PersonalInfo>
          )}
          <Main>
            <LeftSide>
              <NoFirstLine>
                {this.renderBlocks(this.props.resume, LEFT_COLUMN_BLOCKS, true)}
              </NoFirstLine>
            </LeftSide>
            <RightSide>
              {this.renderBlocks(
                this.props.resume,
                Object.keys(BLOCKS_MAP).filter(b => !LEFT_COLUMN_BLOCKS.includes(b))
              )}
            </RightSide>

            <MiddleLine />
          </Main>
        </Page>
      </Document>
    );
  }
}

const Page = styled(PageAtom)`
  padding: 55px;
`;

const Header = styled(View)`
  top: -20px;
`;

const HeaderBackground = styled(View)`
  position: absolute;
  bottom: 0;
  left: -20%;
  width: 140%;
  height: 160%;
  background: #1d1d1d;
  ${p => p.color && p.color !== 'black' && css`
    background: #252e3e;
  `}
`;

const HeaderContent = styled(View)`
  background: #1d1d1d;
  position: relative;
  padding-bottom: 20px;
  min-height: 80px;
  ${p => p.color && p.color !== 'black' && css`
    background: #252e3e;
  `}
`;

const Details = styled(View)`
  flex-direction: row;
  justify-content: space-around;
  margin-top: 35px;
  margin-bottom: 8px;
`;

const DetailsItem = styled(View)`
  border-right: 1px solid #929292;
  padding: 0 30px;
  flex-grow: 1;
  &:last-child {
    border-right-color: transparent;
  }
`;

const DetailsText = styled(Text)`
  text-align: center;
  color: #929292;
`;

const Name = styled(Heading)`
  color: #fff;
  font-size: 40px;
  text-align: center;
  line-height: 1;
  letter-spacing: 6px;
  border: none;
  padding: 0;
  margin-bottom: 20px;
`;

const Initials = styled(Heading)`
  text-align: center;
  margin-bottom: 20px;
  font-size: 13px;
  padding: 0;
  border: none;
  letter-spacing: 0;
  color: #929292;
  ${p => p.color && p.color !== 'black' && css`
    color: ${p => theme.colors[p.color]};
  `}
`;

const Title = styled(Heading)`
  text-align: center;
  letter-spacing: 2px;
  font-size: 13px;
  border: none;
  padding: 0;
  margin: 0 25px;
  color: #929292;
  ${p => p.color && p.color !== 'black' && css`
    color: ${p => theme.colors[p.color]};
  `}
`;

const TitleContainer = styled(View)`
  flex-direction: row;
`;

const TitleLine = styled(View)`
  flex-grow: 1;
  height: 1px;
  margin-top: 8px;
  background-color: #929292;
  ${p => p.color && p.color !== 'black' && css`
    background-color: ${p => theme.colors[p.color]};
  `}
`;

const PersonalInfo = styled(View)`
  flex-direction: row;
  margin-bottom: 30px;
`;

const AvatarContainer = styled(View)`
  width: 140px;
  height: 140px;
  margin-right: 30px;
`;

const Avatar = styled(Image)`
  border-radius: 50%;
  height: 100%;
`;

const SummaryContainer = styled(View)`
  flex-grow: 1;
  padding-top: 35px;
`;

const Summary = styled(Text)`
`;

const Main = styled(View)`
  position: relative;
  flex-direction: row;
  border-top: 1px solid #333e50;
`;

const LeftSide = styled(View)`
  width: 35%;
  padding-right: 34px;
`;

const RightSide = styled(View)`
  width: 65%;
  padding-left: 34px;
`;

const MiddleLine = styled(View)`
  position: absolute;
  width: 1px;
  height: 100%;
  border-left: 1px solid #333e50;
  left: 35%;
`;

const NoFirstLine = styled(View)`
  > div:first-child > div:first-child {
    border-top-color: transparent;
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
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
  &:nth-last-child(2) {
    margin-bottom: 0;
  }
  &:nth-child(even) {
    padding-left: 30px;
    border-left: 1px solid #333e50;
  }
  &:nth-child(odd) {
    padding-right: 30px;
  }
`;

export default RigaTemplate;