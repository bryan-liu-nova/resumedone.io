import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import { theme } from '/imports/core/ui/theme';
import sortBy from 'lodash/sortBy';
import { parseDraftText, isDescriptionEmpty } from '/imports/pdf/core/api/helpers';

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
  BlockInnerItem,
  BlockItems
} from '/imports/pdf/budapest/ui/atoms';
import Details from '/imports/pdf/budapest/ui/components/Details';
import BLOCKS_MAP from '../../api/blocksMap';
import { BLOCK_NAMES } from '/imports/generator/api/constants';

const LEFT_COLUMN_BLOCKS = ['SOCIAL_LINKS', 'REFERENCES', 'LANGUAGES'];
const DATE_VIEW_BLOCKS = [
  'EMPLOYMENT',
  'EDUCATION',
  'CUSTOM',
  'COURSES',
  'EXTRA_CURRICULAR',
  'INTERNSHIPS'
];
const FLEX_VIEW_BLOCKS = ['SKILLS', 'LANGUAGES'];
const BLOCK_ALT_NAMES = {
  EMPLOYMENT: 'Work experience',
  SOCIAL_LINKS: 'Follow me',
  REFERENCES: 'Reference',
  LANGUAGES: 'Language'
};

class BudapestTemplate extends PureComponent {
  renderReferences = (block, resume) => {
    const blockData = BLOCKS_MAP[block.type];
    const { hideReferences } = block;
    if (!blockData) return null;
    return (
      <BlockItem key={block._id} left>
        <Heading light>{BLOCK_ALT_NAMES[block.type] || BLOCK_NAMES[block.type]}</Heading>
        {hideReferences ?
          <View>
            <ReferenceMessage>References available upon request</ReferenceMessage>
          </View> :
          sortBy((block.items || []), 'order').map((item, index) => {
            if (!blockData.renderItem) return <Text>yep</Text>;
            return (
              <ReferenceBlock key={index}>
                {blockData.renderItem(item, resume)}
              </ReferenceBlock>
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
          <BlockInnerItem
            key={index}
            flexView={flexView}
            languages={block.type === 'LANGUAGES'}
          >
            {blockData.renderItem(item, resume, block.isPlaceholder)}
          </BlockInnerItem>
        );
      });
      if(block.type === 'REFERENCES') {
        return this.renderReferences(block, resume);
      }

      return (
        <BlockItem dateView={dateView} left={left} key={block._id}>
            <Heading light={left}>{blockName}</Heading>
            <BlockItems flexView={flexView} dateView={dateView}>
              {blockContent}
            </BlockItems>
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
          <Sidebar color={color} />

          <Header>
            <LeftHeader>
              {userPic && (
                <AvatarContainer>
                  <Avatar src={userPic} />
                </AvatarContainer>
              )}
            </LeftHeader>
            <RightHeader>
              <PersonalInfo>
                {firstName && <Name color={color}>{firstName}</Name>}
                {lastName && <Name color={color}>{lastName}</Name>}
                {title && <Title>{title}</Title>}
              </PersonalInfo>
              <Details resume={this.props.resume} />
            </RightHeader>
          </Header>
          <Main>
            <LeftSide>
              {!isPlaceholderSummary && (
                <BlockItem summary left>
                  <Heading light>About me</Heading>
                  <Summary>{parseDraftText(professionalSummary, Summary, 'budapest')}</Summary>
                </BlockItem>
              )}
              {this.renderBlocks(this.props.resume, LEFT_COLUMN_BLOCKS, true)}
            </LeftSide>
            <RightSide>
              {this.renderBlocks(
                this.props.resume,
                Object.keys(BLOCKS_MAP).filter(b => !LEFT_COLUMN_BLOCKS.includes(b))
              )}
            </RightSide>
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
  position: relative;
  z-index: 100;
  flex-direction: row;
  margin-bottom: 12px;
`;

const LeftHeader = styled(View)`
  width: 32%;
  padding-left: 4px;
`;

const RightHeader = styled(View)`
  display: flex;
  flex-direction: row;
  width: 68%;
  padding-top: 32px;
`;

const AvatarContainer = styled(View)`
  width: 142px;
  height: 142px;
  margin-right: 11pt;
  margin-left: 6pt;
`;

const Avatar = styled(Image)`
  border-radius: 80px;
  height: 100%;
`;

const PersonalInfo = styled(View)`
  padding-left: 20px;
  width: 58%;
`;

const Name = styled(Heading)`
  font-family: 'BebasNeue';
  font-size: 36px;
  line-height: 36px;
  letter-spacing: 1.8px;
  margin-bottom: 0;
  color: #636466;
  ${p => p.color && p.color !== 'black' && css`
    color: ${p => theme.colors[p.color]};
  `}
`;

const Title = styled(Heading)`
  font-size: 12px;
  letter-spacing: 0.6px;
  margin-bottom: 0;
`;

const Main = styled(View)`
  position: relative;
  z-index: 100;
  flex-direction: row;
`;

const LeftSide = styled(View)`
  width: 32%;
  padding-right: 40px;
`;

const RightSide = styled(View)`
  width: 68%;
  padding-left: 20px;
`;

const Sidebar = styled(View)`
  position: absolute;
  width: 275px;
  height: 10000%;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: #434244;
  ${p => p.color && p.color !== 'black' && css`
    background-color: ${p => theme.colors[p.color]};
  `}
`;

const ReferenceMessage = styled(Text)`
  font-size: 14px;
  color: #e6e6e7;
`;

const ReferenceBlock = styled(View)`
  &:last-child {
    > div {
      margin-bottom: 0;
    }
  }
`;

const Summary = styled(Text)`
  color: #e6e6e7;
`;

export default BudapestTemplate;