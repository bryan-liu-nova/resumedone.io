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
  AddressIcon
} from '/imports/pdf/sydney/ui/atoms';
import BLOCKS_MAP from '../../api/blocksMap';
import { BLOCK_NAMES } from '/imports/generator/api/constants';
import WebSiteLink from '/imports/pdf/sydney/ui/components/WebSiteLink';

const LEFT_COLUMN_BLOCKS = ['EDUCATION', 'SKILLS', 'LANGUAGES', 'HOBBIES'];
const DATE_VIEW_BLOCKS = [
  'EMPLOYMENT',
  'CUSTOM',
  'COURSES',
  'EXTRA_CURRICULAR',
  'INTERNSHIPS'
];
const FLEX_VIEW_BLOCKS = ['SKILLS', 'LANGUAGES'];
const ORDERED_DETAILS_FIELDS = [
  'address',
  'city'
];
const BLOCK_ALT_NAMES = {
  EMPLOYMENT: 'Work experience',
  HOBBIES: 'Interests'
};

class SydneyTemplate extends PureComponent {
  renderAddress = () => {
    const { details } = this.props.resume;
    const fields = ORDERED_DETAILS_FIELDS.filter(f => details[f]);
    if(fields.length === 0) return null;
    return (
    <View>
      <AddressIcon code="e90a" />
      <Address>
        {fields.map(f => details[f]).join(', ')}
      </Address>
    </View>
    );
  };

  renderReferences = (block, resume) => {
    const blockData = BLOCKS_MAP[block.type];
    const { hideReferences } = block;
    if (!blockData) return null;
    return (
      <BlockItem key={block._id} left>
        <Heading light>{BLOCK_ALT_NAMES[block.type] || BLOCK_NAMES[block.type]}</Heading>
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
          <Heading light={left}>{blockName}</Heading>
          <View flexView={flexView} dateView={dateView}>
            {blockContent}
          </View>
        </BlockItem>
      );
    });
  };

  render() {
    const {
      blocks,
      details: {
        title,
        professionalSummary,
        firstName,
        lastName,
        phone,
        email
      }
    } = this.props.resume;
    const isPlaceholderSummary = !professionalSummary || isDescriptionEmpty(professionalSummary);
    return (
      <Document {...this.props}>
        <Page>
          <Header>
            <HeaderLeft>
              {(firstName || lastName) && (
                <Name>
                  {firstName}{lastName && ` ${lastName}`}
                </Name>
              )}
              <Title>{title}</Title>
              <WebSiteLink links={blocks && blocks.find(b => b.type === 'SOCIAL_LINKS')} />
            </HeaderLeft>
            <HeaderRight>
              {phone &&  <DetailsItem><span>P: </span>{phone}</DetailsItem>}
              {email && <DetailsItem><span>E: </span>{email}</DetailsItem>}
            </HeaderRight>

            {(phone || email) && <DetailsLine />}
          </Header>
          <Main>
            <LeftSide>
              {this.renderAddress()}
              <NoFirstLine>
                {this.renderBlocks(this.props.resume, LEFT_COLUMN_BLOCKS, true)}
              </NoFirstLine>
            </LeftSide>
            <RightSide>
              {!isPlaceholderSummary && (
                <BlockItem summary>
                  <Heading>Profile</Heading>
                  <SummaryContainer>
                    <Summary>{parseDraftText(professionalSummary, Summary, 'sydney')}</Summary>
                  </SummaryContainer>
                </BlockItem>
              )}
              {this.renderBlocks(
                this.props.resume,
                Object.keys(BLOCKS_MAP).filter(b => !LEFT_COLUMN_BLOCKS.includes(b) && b !== 'SOCIAL_LINKS')
              )}
            </RightSide>
          </Main>
        </Page>
      </Document>
    );
  }
}

const Page = styled(PageAtom)`
  padding: 64px;
`;

const Header = styled(View)`
  position: relative;
  flex-direction: row;
  padding-top: 30px;
  margin-bottom: 12px;
`;

const HeaderLeft = styled(View)`
  width: 80%;
`;

const HeaderRight= styled(View)`
  width: 20%;
  padding-top: 18px;
`;

const Name = styled(Heading)`
  font-family: 'Raleway';
  font-weight: 400;
  font-size: 47px;
  line-height: 1em;
  margin-bottom: 8px;
`;

const Title = styled(Heading)`
  font-size: 13px;
  line-height: 1em;
  letter-spacing: 2px;
  color: #474748;
`;

const DetailsLine = styled(View)`
  position: absolute;
  width: 1px;
  background: #2d2d2d;
  height: 100px;
  top: -64px;
  left: 80.5%;
`;

const DetailsItem = styled(View)`
  font-family: 'Raleway';
  font-size: 12px;
  line-height: 18px;
  display: block;
  color: #474748;
  span {
    font-weight: 700;
    color: #252525;
  }
`;

const Main = styled(View)`
  position: relative;
  flex-direction: row;
`;

const LeftSide = styled(View)`
  width: 33%;
  padding-right: 24px;
`;

const RightSide = styled(View)`
  width: 67%;
  padding-left: 24px;
`;

const NoFirstLine = styled(View)`
  div:first-child {
    border-top-color: transparent;
  }
`;

const Address = styled(View)`
  font-family: 'Raleway SemiBold';
  line-height: 20px;
  font-size: 12px;
  margin-bottom: 50px;
`;

const SummaryContainer = styled(View)`
  padding-left: 18px;
  border-left: 4px solid #2d2d2d;
`;

const Summary = styled(Text)`
`;

const BlockInner = styled(View)`
  &:last-child > div {
    margin-bottom: 0;
  }
`;

export default SydneyTemplate;