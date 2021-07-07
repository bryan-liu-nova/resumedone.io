import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import sortBy from 'lodash/sortBy';
import { getResumeWithPlaceholders, parseDraftText, isDescriptionEmpty } from '/imports/pdf/core/api/helpers';

import {
  Page as PageAtom,
  View,
  Document,
} from '/imports/pdf/core/ui/atoms';
import {
  Text as BaseText,
  Heading,
  BlockItem,
  BlockNestedItem,
  SectionHeading
} from '/imports/pdf/amsterdam/ui/atoms';
import BLOCKS_MAP from '../../api/blocksMap';
import { BLOCK_NAMES } from '/imports/generator/api/constants';
import { DEFAULT_DETAILS } from '/imports/pdf/core/api/placeholders';

const LEFT_COLUMN_BLOCKS = ['SKILLS', 'LANGUAGES', 'HOBBIES', 'SOCIAL_LINKS'];
const DATE_VIEW_BLOCKS = ['EMPLOYMENT', 'EDUCATION', 'EXTRA_CURRICULAR', 'INTERNSHIPS', 'CUSTOM'];
const ORDERED_DETAILS_FIELDS = [
  'address',
  'city',
  'postalCode',
  'country'
];

class AmsterdamTemplate extends PureComponent {
  renderDetails = resume => {
    const { details, details: { phone, email, driversLicence, nationality } } = resume;
    const fields = ORDERED_DETAILS_FIELDS.filter(f => details[f]);
    if(fields.length === 0 && !phone && !email && !driversLicence && !nationality) return null;
    return (
      <Details>
        <SectionHeading isPlaceholder={!(fields.length > 0) && !phone && !email}>Info</SectionHeading>
        {fields.length > 0 && (
          <BlockNestedItemDetails isPlaceholder={!(fields.length > 0)}>
            <GreyHeader>Address</GreyHeader>
            <TextCond>{fields.length > 0 ? fields.map((f, i) => details[f]).join(', ') : DEFAULT_DETAILS.address}</TextCond>
          </BlockNestedItemDetails>
        )}
        {phone && (
          <BlockNestedItemDetails isPlaceholder={!phone}>
            <GreyHeader>Phone</GreyHeader>
            <TextCond>{phone || DEFAULT_DETAILS.phone}</TextCond>
          </BlockNestedItemDetails>
        )}
        {email && (
          <BlockNestedItemDetails isPlaceholder={!email}>
            <GreyHeader>Email</GreyHeader>
            <TextCond>{email || DEFAULT_DETAILS.email}</TextCond>
          </BlockNestedItemDetails>
        )}
        {this.renderDateAndPlace(resume)}
        {driversLicence && (
          <BlockNestedItemDetails>
            <GreyHeader>Driving license</GreyHeader>
            <TextCond>{driversLicence}</TextCond>
          </BlockNestedItemDetails>
        )}
        {nationality && (
          <BlockNestedItemDetails last>
            <GreyHeader>Nationality</GreyHeader>
            <TextCond>{nationality}</TextCond>
          </BlockNestedItemDetails>
        )}
      </Details>
    )
  };

  renderDateAndPlace = resume => {
    const {
      details: {
        placeOfBirth,
        dateOfBirth
      }
    } = resume;
    if (!placeOfBirth && !dateOfBirth) return null;
    const title = (() => {
      if (placeOfBirth && !dateOfBirth) return 'Place of birth';
      else if (!placeOfBirth && dateOfBirth) return 'Date of birth';
      return 'Date / Place of birth'
    })();
    const content = (() => {
      if (placeOfBirth && !dateOfBirth) return placeOfBirth;
      else if (!placeOfBirth && dateOfBirth) return dateOfBirth;
      return `${placeOfBirth}, ${dateOfBirth}`
    })();
    return (
      <BlockNestedItemDetails>
        <GreyHeader>{title}</GreyHeader>
        <TextCond>{content}</TextCond>
      </BlockNestedItemDetails>
    )
  };

  renderReferences = (block, resume) => {
    const blockData = BLOCKS_MAP[block.type];
    const { hideReferences } = block;
    if (!blockData) return null;
    return (
      <BlockItem left key={block._id}>
        <SectionHeading minPresenceAhead={100}>{BLOCK_NAMES[block.type]}</SectionHeading>
        {hideReferences ?
            <View>
              <ReferenceMessage>References available upon request</ReferenceMessage>
            </View> :
            <View>
              {(block.items || []).map((item, index) => {
                if (!blockData.renderItem) return <Text>yep</Text>;
                return <View key={index}>{ blockData.renderItem(item, resume) }</View>;
              })}
            </View>}
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
    return [...fixedBlocks,  ...sortableBlocks].map(block => {
      const blockData = BLOCKS_MAP[block.type];
      if (!blockData) return null;
      if (blockData.canDisplay && !blockData.canDisplay(block)) {
        return null;
      }
      const isCustom = block.type === 'CUSTOM';
      const blockName = isCustom ? block.title : BLOCK_NAMES[block.type];
      const dateView = DATE_VIEW_BLOCKS.includes(block.type);
      if(block.type === 'REFERENCES') {
        return this.renderReferences(block, resume);
      }

      return (
        <BlockItem
          left={left}
          key={block._id}
          links={block.type === 'SOCIAL_LINKS'}
          courses={block.type === 'COURSES'}
          percentage={block.type === 'SKILLS' || block.type === 'LANGUAGES'}
          wrap={!(block.type === 'SKILLS' || block.type === 'LANGUAGES')}
        >
            <SectionHeading
              isPlaceholder={block.isPlaceholder}
              minPresenceAhead={100}
            >
              {BLOCK_NAMES[block.type]}
            </SectionHeading>
          {(block.items || []).map((item, index) => {
            if (!blockData.renderItem) return <Text>yep</Text>;
            return (
              <InnerSpaceBlock
                key={index}
                dateView={dateView}
                lastChild={block.items && !block.items[index + 1]}
              >
                { blockData.renderItem(item, resume, block.isPlaceholder) }
              </InnerSpaceBlock>
            );
          })}
        </BlockItem>
      );
    });
  };

  render() {
    const resumeWithPlaceholders = getResumeWithPlaceholders(this.props.resume);
    const { details: originalDetails } = this.props.resume;
    const {
      details: {
        title,
        professionalSummary,
        firstName,
        lastName
      }
    } = resumeWithPlaceholders;
    const isPlaceholderName = !originalDetails.firstName && !originalDetails.lastName;
    const isPlaceholderSummary = !originalDetails.professionalSummary || isDescriptionEmpty(originalDetails.professionalSummary);
    return (
      <Document {...this.props}>
        <Page>
          <Sidebar fixed />

            <Header>
              <HeaderContainer isPlaceholder={isPlaceholderName && !title}>
                {(firstName || lastName) && (
                  <Name isPlaceholder={isPlaceholderName}>
                    {firstName}{lastName && ` ${lastName}`}
                  </Name>
                )}
                <Title isPlaceholder={!title}>{title || DEFAULT_DETAILS.title}</Title>
              </HeaderContainer>
            </Header>
            <Main>
              <LeftSide>
                {this.renderDetails(resumeWithPlaceholders)}
                {this.renderBlocks(resumeWithPlaceholders, LEFT_COLUMN_BLOCKS, true)}
              </LeftSide>
              <RightSide>
                {!isPlaceholderSummary && (
                  <SummaryBlock>
                    <SectionHeading isPlaceholder={isPlaceholderSummary}>Profile</SectionHeading>
                    {isPlaceholderSummary ? (
                      <Summary isPlaceholder>{professionalSummary}</Summary>
                    ) : parseDraftText(professionalSummary, Summary, 'amsterdam')}
                  </SummaryBlock>
                )}
                {this.renderBlocks(
                  resumeWithPlaceholders,
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
  padding: 36pt;
`;

const Text = styled(BaseText)`
  font-size: 7.5pt;
`;

const TextCond = styled(Text)`
  font-size: 7.5pt;
  line-height: 1.5;
  width: 90pt;
  color: #2e2e2e;
`;

const Header = styled(View)`
  position: relative;
  margin-bottom: 34.5pt;
  z-index: 100;
`;

const HeaderContainer = styled(View)`
  margin-left: auto;
  margin-right: auto;
  width: 375pt;
  border: 2px solid #212121;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding-top: 35pt;
  padding-bottom: 28pt;
  ${p => p.isPlaceholder && css`
    border-color: #e0e0e0;
  `}
`;

const Main = styled(View)`
  position: relative;
  flex-direction: row;
  z-index: 100;
`;

const Sidebar = styled(View)`
  position: absolute;
  width: 210pt;
  height: 10000%;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: #f4f4f4;
`;

const LeftSide = styled(View)`
  width: 36%;
  padding-right: 40pt;
`;

const RightSide = styled(View)`
  width: 64%;
  padding-left: 12pt;
`;

const Details = styled(View)`
  margin-bottom: 8pt;
`;

const BlockNestedItemDetails = styled(BlockNestedItem)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 7px;
  ${p => p.isPlaceholder && css`
    opacity: 0.15;
  `}
`;

const WrapedText = styled(TextCond)`
  display: inline;
`;

export const GreyHeader = styled(Text)`
  font-family: 'Montserrat SemiBold';
  font-size: 6.75pt;
  color: #373737;
  width: 48pt;
`;

const Name = styled(Heading)`
  font-family: 'Montserrat Bold';
  font-size: 22.5pt;
  letter-spacing: 0.75pt;
  margin-bottom: 10pt;
  color: #2c2c2c;
  text-transform: uppercase;
`;

const Title = styled(Text)`
  font-size: 10.5pt;
`;

const SummaryBlock = styled(BlockItem)`
`;

const Summary = styled(Text)`
`;

const ReferenceMessage = styled(Text)`
  padding-top: 5pt;
  font-size: 8.5pt;
`;

const InnerSpaceBlock = styled(View)`
  margin-bottom: 0;
  ${p => p.dateView && css`
    margin-bottom: 15pt;
  `}
  ${p => p.lastChild && css`
    margin-bottom: 0;
  `}
`;

export default AmsterdamTemplate;
