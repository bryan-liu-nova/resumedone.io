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
  DetailsIcon,
} from '/imports/pdf/chicago/ui/atoms';
import BLOCKS_MAP from '../../api/blocksMap';
import { BLOCK_NAMES } from '/imports/generator/api/constants';
import CircleText from '/imports/pdf/chicago/ui/components/CircleText';

const LEFT_COLUMN_BLOCKS = ['SKILLS', 'SOCIAL_LINKS', 'LANGUAGES', 'REFERENCES'];
const DATE_VIEW_BLOCKS = [
  'EMPLOYMENT',
  'EDUCATION',
  'CUSTOM',
  'COURSES',
  'EXTRA_CURRICULAR',
  'INTERNSHIPS'
];
const FLEX_VIEW_BLOCKS = ['SKILLS', 'LANGUAGES'];
const ORDERED_DETAILS_FIELDS = [
  'address',
  'city',
  'country'
];
const BLOCK_ALT_NAMES = {
  EMPLOYMENT: 'Experience',
  HOBBIES: 'Hobby/Interests',
  REFERENCES: 'Reference',
  SOCIAL_LINKS: 'Links',
};

class ChicagoTemplate extends PureComponent {
  renderMiddleLine = () => {
    const {
      blocks,
      details,
      details: {
        phone, email, professionalSummary
      }
    } = this.props.resume;
    const fields = ORDERED_DETAILS_FIELDS.filter(f => details[f]);
    const isBlocksEmpty = blocks.every(b => (!b.items || (b.items && b.items.length === 0)));
    if(fields.length === 0 && !phone && !email && !professionalSummary && isBlocksEmpty) return null;
    return <MiddleLine />;
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
      <BlockItem summary>
        <Heading>Contacts</Heading>
        <Details>
          {phone && (
            <DetailsItem>
              <DetailsText>{phone}</DetailsText>
              <DetailsIcon code="e914" />
            </DetailsItem>
          )}
          {email && (
            <DetailsItem>
              <DetailsText>{email}</DetailsText>
              <DetailsIcon email code="e90f" />
            </DetailsItem>
          )}
          {fields.length > 0 && (
            <DetailsItem>
              <DetailsText>{fields.map(f => details[f]).join(', ')}</DetailsText>
              <DetailsIcon code="e90e" />
            </DetailsItem>
          )}
        </Details>
      </BlockItem>
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
          sortBy((block.items || []), 'order').map((item, index) => {
            if (!blockData.renderItem) return <Text>yep</Text>;
            return (
              <View key={index}>
                {blockData.renderItem(item, resume)}
              </View>
            );
          })
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
          <BlockInner
            key={index}
            flexView={flexView}
            dateView={dateView}
          >
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
          <View flexView={flexView} dateView={dateView}>
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
      }
    } = this.props.resume;
    const isPlaceholderSummary = !professionalSummary || isDescriptionEmpty(professionalSummary);
    return (
      <Document {...this.props}>
        <Page>
          <Header>
            {(firstName || lastName) && <TopLine />}
            <PersonalInfo>
              {(firstName || lastName) && (
                <Name>
                  {firstName}{lastName && ` ${lastName}`}
                </Name>
              )}
              {title && (
                <TitleContainer>
                  <TitleLine />
                  <Title>{title}</Title>
                </TitleContainer>
              )}
            </PersonalInfo>
            {(firstName || lastName) && (
              <CircleText
                firstName={firstName}
                lastName={lastName}
              />
            )}
          </Header>
          <Main>
            <LeftSide>
              {this.renderDetails()}
              <NoFirstLine>
                {this.renderBlocks(this.props.resume, LEFT_COLUMN_BLOCKS, true)}
              </NoFirstLine>
            </LeftSide>
            <RightSide>
              {!isPlaceholderSummary && (
                <BlockItem summary>
                  <Heading>Profile</Heading>
                  <Summary>{parseDraftText(professionalSummary, Summary, 'chicago')}</Summary>
                </BlockItem>
              )}
              {this.renderBlocks(
                this.props.resume,
                Object.keys(BLOCKS_MAP).filter(b => !LEFT_COLUMN_BLOCKS.includes(b))
              )}
            </RightSide>
            {this.renderMiddleLine()}
          </Main>
        </Page>
      </Document>
    );
  }
}

const Page = styled(PageAtom)`
  padding: 66px 72px;
`;

const Header = styled(View)`
  position: relative;
  flex-direction: row;
  margin-bottom: 29px;
`;

const TopLine = styled(View)`
  position: absolute;
  left: 30%;
  width: 1px;
  height: 50px;
  background: #000;
  top: -75px;
`;

const PersonalInfo = styled(View)`
  width: 75%;
`;

const Name = styled(Heading)`
  font-family: 'Raleway';
  font-size: 43px;
  line-height: 40px;
  letter-spacing: 5.33px;
  margin-bottom: 11px;
  color: #2b2b2b;
`;

const TitleContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const TitleLine = styled(View)`
  width: 36px;
  height: 1px;
  background: #000;
  margin-right: 13px;
`;

const Title = styled(Heading)`
  font-family: 'Raleway';
  font-size: 15px;
  letter-spacing: 3.3px;
  margin-bottom: 0;
  color: #808389;
`;

const Main = styled(View)`
  position: relative;
  flex-direction: row;
`;

const LeftSide = styled(View)`
  width: 30%;
  padding-right: 34px;
  padding-top: 39px;
`;

const RightSide = styled(View)`
  width: 70%;
  padding-left: 34px;
  padding-top: 39px;
`;

const MiddleLine = styled(View)`
  position: absolute;
  width: 1px;
  height: 100%;
  border-left: 1px solid #000;
  left: 30%;
`;

const Details = styled(View)`
  > div:last-child {
    border-bottom-color: #fff;
  }
`;

const DetailsItem = styled(View)`
  position: relative;
  min-height: 29px;
  border-bottom: 1px solid #dcdbdb;
  width: 121%;
  padding-right: 29px;
`;

const DetailsText = styled(Text)`
  padding-top: 6px;
  padding-bottom: 6px;
`;

const BlockInner = styled(View)`
  ${p => p.dateView && css`
    margin-bottom: 25px;
    &:last-child {
      margin-bottom: 0;
    }
  `}
  ${p => p.flexView && css`
    margin-bottom: 8px;
    &:last-child {
      margin-bottom: 0;
    }
  `}
`;

const Summary = styled(Text)`

`;

const NoFirstLine = styled(View)`
  > div:first-child {
    padding-top: 0;
    border-top-color: transparent;
  }
`;

export default ChicagoTemplate;