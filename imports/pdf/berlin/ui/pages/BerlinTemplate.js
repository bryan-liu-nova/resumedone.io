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
  Text,
  Heading,
  BlockItem
} from '/imports/pdf/berlin/ui/atoms';
import { theme } from '/imports/core/ui/theme';
import BLOCKS_MAP from '../../api/blocksMap';
import { BLOCK_NAMES } from '/imports/generator/api/constants';
import { DEFAULT_DETAILS } from '/imports/pdf/core/api/placeholders';

const LEFT_COLUMN_BLOCKS = ['SKILLS', 'LANGUAGES', 'HOBBIES', 'SOCIAL_LINKS'];
const ORDERED_DETAILS_FIELDS = [
  'address',
  'city',
  'postalCode',
  'country'
];

class BerlinTemplate extends PureComponent {
  renderDetails = resume => {
    const { details, details: { phone, email, nationality, driversLicence} } = resume;
    const fields = ORDERED_DETAILS_FIELDS.filter(f => details[f]);
    if(fields.length === 0 && !phone && !email && !nationality && !driversLicence) return null;
    return (
      <SidebarBlockItem details>
        {fields.length > 0 && (
          <SidebarDetailsSection>
            <SmallHeader isPlaceholder={!(fields.length > 0)}>Address</SmallHeader>
            <WrapedText isPlaceholder={!(fields.length > 0)}>
              {fields.length > 0 ? fields.map(f => details[f]).join(', ') : DEFAULT_DETAILS.address}
            </WrapedText>
          </SidebarDetailsSection>
        )}
        {phone && (
          <SidebarDetailsSection>
            <SmallHeader isPlaceholder={!phone}>Phone</SmallHeader>
            <WrapedText isPlaceholder={!phone}>
              {phone || DEFAULT_DETAILS.phone}
            </WrapedText>
          </SidebarDetailsSection>
        )}
        {email && (
          <SidebarDetailsSection>
            <SmallHeader isPlaceholder={!email}>Email</SmallHeader>
            <WrapedText isPlaceholder={!email}>
              {email || DEFAULT_DETAILS.email}
            </WrapedText>
          </SidebarDetailsSection>
        )}
        {this.renderDateAndPlace(resume)}
        {nationality && <SidebarDetailsSection>
          <SmallHeader>Nationality</SmallHeader>
          {nationality && <WrapedText>{nationality}</WrapedText>}
        </SidebarDetailsSection>}
        {driversLicence && <SidebarDetailsSection>
          <SmallHeader>Driver's Licence</SmallHeader>
          {driversLicence && <WrapedText>{driversLicence}</WrapedText>}
        </SidebarDetailsSection>}
      </SidebarBlockItem>
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
    return (
      <SidebarDetailsSection>
        <SmallHeader>{title}</SmallHeader>
        {dateOfBirth && <WrapedText>{dateOfBirth}</WrapedText>}
        {placeOfBirth && <WrapedText>{placeOfBirth}</WrapedText>}
      </SidebarDetailsSection>
    )
  };

  renderReferences = (block, resume) => {
    const blockData = BLOCKS_MAP[block.type];
    const { hideReferences } = block;
    if (!blockData) return null;
    return (
      <BlockItem key={block._id}>
        <Heading right>{BLOCK_NAMES[block.type]}</Heading>
        <ReferenceContainer>
          {hideReferences ?
            <View>
              <ReferenceMessage>References available upon request</ReferenceMessage>
            </View> :
            (block.items || []).map((item, index) => {
            if (!blockData.renderItem) return <Text>yep</Text>;
            return <ReferenceItem key={index}>{ blockData.renderItem(item, resume) }</ReferenceItem>;
          })}
        </ReferenceContainer>
      </BlockItem>
    );
  };

  renderBlocks = (resume, blockNames, sidebar) => {
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
      const BlockWrapper = sidebar ? SidebarBlockItem : BlockItem;
      if(block.type === 'REFERENCES') {
        return this.renderReferences(block, resume);
      }

      return (
        <BlockWrapper
          key={block._id}
          links={block.type === 'SOCIAL_LINKS'}
          courses={block.type === 'COURSES'}
          isPlaceholder={block.isPlaceholder}
          wrap={!(block.type === 'SKILLS' || block.type === 'LANGUAGES')}
        >
          <Heading isPlaceholder={block.isPlaceholder} right={!sidebar}>
            {blockName}
          </Heading>
          {(block.items || []).map((item, index) => {
            if (!blockData.renderItem) return <Text>yep</Text>;
            return <View key={index}>{ blockData.renderItem(item, resume, block.isPlaceholder) }</View>;
          })}
        </BlockWrapper>
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
    const isPlaceholderInfo = ORDERED_DETAILS_FIELDS.every(f => !originalDetails[f]) && !originalDetails.phone && !originalDetails.email;
    return (
      <Document {...this.props}>
        <Page>
          <Header>
            {(firstName || lastName) && (
              <NameContainer>
                <Name isPlaceholder={isPlaceholderName}>
                  {firstName && `${firstName}`}
                  </Name>
                <Name isPlaceholder={isPlaceholderName}>{lastName && `${lastName}`}
                </Name>
              </NameContainer>
            )}
            <Title isPlaceholder={!title}>{title || DEFAULT_DETAILS.title}</Title>
          </Header>
          <TopLine />
          <Main>
            <LeftSide>
              {!isPlaceholderInfo && (
                <Heading isPlaceholder={isPlaceholderInfo}>Info</Heading>
              )}
              {this.renderDetails(resumeWithPlaceholders)}
              {this.renderBlocks(resumeWithPlaceholders, LEFT_COLUMN_BLOCKS, true)}
            </LeftSide>
            <RightSide>
              {!isPlaceholderSummary && (
                <BlockItemSummary>
                  <Heading isPlaceholder={isPlaceholderSummary}>Profile</Heading>
                  <SummaryInner>
                    {isPlaceholderSummary ? (
                      <SummaryText isPlaceholder>{professionalSummary}</SummaryText>
                    ) : parseDraftText(professionalSummary, SummaryText, 'berlin')}
                  </SummaryInner>
                </BlockItemSummary>
              )}
              {this.renderBlocks(
                resumeWithPlaceholders,
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
  display: flex;
  flex-direction: column;
  padding: 27pt 43pt 36pt 44pt;
`;

const Header = styled(View)`
  margin-bottom: 18pt;
`;

const Main = styled(View)`
  flex-direction: row;
  align-items: stretch;
`;

const TopLine = styled(View)`
  width: 100%;
  height: 1pt;
  border-bottom: 1.2px solid #d8d8d8;
`;

const LeftSide = styled(View)`
  position: relative;
  width: 33%;
  padding: 26pt 20pt 20pt 0;
  height: 100%;
`;

const line = () => (
  <View style={{ position: 'absolute', width: '1pt', height: '100%', left: '212pt', top: '0' }} fixed render={({ pageNumber }) => (
    <View
      style={{
        position: 'absolute',
        width: '1pt',
        left: '0',
        height: '150%',
        borderRightColor: '#d8d8d8',
        borderRightWidth: '1.3pt',
        top: pageNumber !== 1 ? '0' : '151pt'
      }}
    />
  )} />
);

const RightSide = styled(View)`
  padding: 26pt 0 20pt 24pt;
  width: 67%;
  height: 100%;
`;

const MiddleLine = styled(View)`
  position: absolute;
  width: 1px;
  height: 100%;
  border-left: 1.2px solid #d8d8d8;
  left: 33%;
`;

const SidebarBlockItem = styled(View)`
  margin-bottom: 30pt;
  ${p => p.links && css`
    margin-bottom: 26pt;
  `}
  ${p => p.details && css`
    margin-bottom: 26pt;
  `}
`;

const SidebarDetailsSection = styled(View)`
  margin-bottom: 12pt;
  &:last-child {
    margin-bottom: 8pt;
  }
`;

const BlockItemSummary = styled(BlockItem)`
  border-top: none;
  border-top-width: 0;
  padding-top: 0pt;
  padding-bottom: 13pt;
`;

const SummaryInner = styled(View)`
  padding-right: 20pt;
  padding-top: 4pt;
  padding-bottom: 3pt;
`;

const SummaryText = styled(Text)`
  font-family: 'Montserrat';
`;

const WrapedText = styled(Text)`
  font-size: 9pt;
  color: #000;
  line-height: 1.45;
`;

export const SmallHeader = styled(Text)`
  font-family: 'Montserrat Bold';
  font-size: 9.4pt;
  text-transform: uppercase;
  margin-bottom: 4pt;
`;

const NameContainer = styled(View)`
  margin-bottom: 17pt;
`;

const Name = styled(Text)`
  font-family: 'Montserrat SemiBold';
  font-size: 36pt;
  font-weight: 600;
  margin-bottom: 0;
  padding-bottom: 0;
  text-transform: uppercase;
  line-height: 1em;
`;

const Title = styled(Text)`
  font-family: 'Montserrat';
  font-size: 11.5pt;
  margin-top: 0;
  color: ${theme.colors.gray.regular};
`;

const ReferenceMessage = styled(Text)`
  font-size: 9.2pt;
  color: ${theme.colors.gray.regular};
`;

const ReferenceContainer = styled(View)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ReferenceItem = styled(View)`
  width: 50%;
`;

export default BerlinTemplate;
