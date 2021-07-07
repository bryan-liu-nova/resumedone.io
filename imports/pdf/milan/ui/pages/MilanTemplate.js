import React, { PureComponent } from 'react';
import { Meteor } from 'meteor/meteor';
import styled, { css } from 'styled-components';
import sortBy from 'lodash/sortBy';
import { getResumeWithPlaceholders, parseDraftText, isDescriptionEmpty } from '/imports/pdf/core/api/helpers';

import {
  Page as PageAtom,
  View,
  Document,
  Image
} from '/imports/pdf/core/ui/atoms';
import {
  Text,
  Heading,
  BlockItem,
  BlockNestedItem,
} from '/imports/pdf/milan/ui/atoms';
import { theme } from '/imports/core/ui/theme';
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

class MilanTemplate extends PureComponent {
  renderDetails = resume => {
    const { details, details: { phone, email, driversLicence, nationality}, settings: { color } } = resume;
    const fields = ORDERED_DETAILS_FIELDS.filter(f => details[f]);
    if(fields.length === 0 && !phone && !email && !nationality && !driversLicence) return null;
    return (
      <>
      <Heading color={color} sidebar={true} >Info</Heading>
      <SidebarTopBlocks>
        <Details>
          {fields.length > 0 && (
            <SidebarDetailsSection isPlaceholder={!(fields.length > 0)}>
              <SmallHeader>Address</SmallHeader>
              <WrapedText>{fields.length > 0 ? fields.map(f => details[f]).join(', ') : DEFAULT_DETAILS.address}</WrapedText>
            </SidebarDetailsSection>
          )}
          {phone && (
            <SidebarDetailsSection isPlaceholder={!phone}>
              <SmallHeader>Phone</SmallHeader>
              <WrapedText>{phone || DEFAULT_DETAILS.phone}</WrapedText>
            </SidebarDetailsSection>
          )}
          {email && (
            <SidebarDetailsSection isPlaceholder={!email}>
              <SmallHeader>Email</SmallHeader>
              <WrapedText>{email || DEFAULT_DETAILS.email}</WrapedText>
            </SidebarDetailsSection>
          )}
        </Details>
        {this.renderDateAndPlace(resume)}
        {driversLicence && (
          <BlockNestedItem sidebar={true}>
            <SmallHeader>Driving license</SmallHeader>
            <GreyText>{driversLicence}</GreyText>
          </BlockNestedItem>
        )}
        {nationality && (
          <BlockNestedItem sidebar={true}>
            <SmallHeader>Nationality</SmallHeader>
            <GreyText>{nationality}</GreyText>
          </BlockNestedItem>
        )}
      </SidebarTopBlocks>
      </>
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
      <DateTimeBlock>
        <SmallHeader>{title}</SmallHeader>
        {dateOfBirth && <GreyText>{dateOfBirth}</GreyText>}
        {placeOfBirth && <GreyText>{placeOfBirth}</GreyText>}
      </DateTimeBlock>
    )
  };

  renderReferences = (block, color, resume) => {
    const blockData = BLOCKS_MAP[block.type];
    const { hideReferences } = block;
    if (!blockData) return null;
    return (
      <BlockItem key={block._id}>
        <Heading color={color} minPresenceAhead={100} >{BLOCK_NAMES[block.type]}</Heading>
        <ReferenceContainer>
          {hideReferences ?
            <View>
              <ReferenceMessage>References available upon request</ReferenceMessage>
            </View>
            : (block.items || []).map((item, index) => {
            if (!blockData.renderItem) return <Text>yep</Text>;
            return <ReferenceItem key={index}>{ blockData.renderItem(item, resume) }</ReferenceItem>;
          })}
        </ReferenceContainer>
      </BlockItem>
    );
  };

  renderBlocks = (resume, blockNames, sidebar) => {
    const {
      blocks,
      settings: {
        color
      }
    } = resume;
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
      const dateView = DATE_VIEW_BLOCKS.includes(block.type);
      if(block.type === 'REFERENCES') {
        return this.renderReferences(block, color, resume);
      }
      return (
        <BlockWrapper
          key={block._id}
          wrap={!(block.type === 'SKILLS' || block.type === 'LANGUAGES')}
        >
          <Heading
            color={color}
            sidebar={sidebar}
            links={block.type === 'SOCIAL_LINKS'}
            minPresenceAhead={100}
          >
            {blockName}
          </Heading>
          {(block.items || []).map((item, index) => {
            if (!blockData.renderItem) return <Text>yep</Text>;
            return (
              <BlockNestedItem
                key={index}
                lastChild={dateView && block.items && !block.items[index + 1]}
              >
                {blockData.renderItem(item, resume, block.isPlaceholder)}
              </BlockNestedItem>
            );
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
        lastName,
        driversLicence,
        nationality,
        userPic
      },
      settings: {
        color
      }
    } = resumeWithPlaceholders;
    const isPlaceholderName = !originalDetails.firstName && !originalDetails.lastName;
    const isPlaceholderSummary = !originalDetails.professionalSummary || isDescriptionEmpty(originalDetails.professionalSummary);
    return (
      <Document {...this.props}>
        <Page>
          <Header>
            {userPic && (
              <LeftHeader>
                <AvatarContainer>
                  <Avatar src={userPic || `${Meteor.absoluteUrl()}img/default_resume_avatar.png`}/>
                </AvatarContainer>
              </LeftHeader>
            )}
            <RightHeader noPadding={!userPic}>
              {(firstName || lastName) && (
                <Name color={color} isPlaceholder={isPlaceholderName}>
                  {firstName && `${firstName}`}{lastName && ` ${lastName}`}
                </Name>
              )}
              <Title isPlaceholder={!title}>{title || DEFAULT_DETAILS.title}</Title>
            </RightHeader>
          </Header>
          <Main>
            <LeftSide>
              {this.renderDetails(resumeWithPlaceholders)}
              {this.renderBlocks(resumeWithPlaceholders, LEFT_COLUMN_BLOCKS, true)}
            </LeftSide>
            <RightSide>
              {!isPlaceholderSummary && (
                <BlockItemSummary>
                  <Heading color={color} >Profile</Heading>
                  <SummaryInner>
                    {isPlaceholderSummary ? (
                      <SummaryText isPlaceholder>{professionalSummary}</SummaryText>
                    ) : parseDraftText(professionalSummary, SummaryText, 'milan')}
                  </SummaryInner>
                </BlockItemSummary>
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
  display: flex;
  flex-direction: column;
  padding: 48pt 45pt 40pt 45pt;
`;

const Header = styled(View)`
  flex-direction: row;
  align-items: stretch;
  margin-bottom: 37.5pt;
`;

const Main = styled(View)`
  flex-direction: row;
  align-items: stretch;
`;

const LeftHeader = styled(View)`
  width: 26%;
`;

const RightHeader = styled(View)`
  width: 74%;
  padding-left: 20pt;
  padding-top: 9pt;
  padding-bottom: 8pt;
  ${p => p.noPadding && css`
    padding-left: 0;
  `}
`;

const LeftSide = styled(View)`
  width: 26%;
  height: 100%;
`;

const RightSide = styled(View)`
  padding-left: 20pt;
  width: 74%;
  height: 100%;
`;

const SidebarBlockItem = styled(View)`
  margin-bottom: 22pt;
`;

const SidebarDetailsSection = styled(View)`
  margin-bottom: 7pt;
  ${p => p.isPlaceholder && css`
    opacity: 0.15;
  `}
`;

const BlockItemSummary = styled(BlockItem)`
  border-top: none;
  margin-bottom: 28pt;
`;

const SummaryInner = styled(View)`
  padding-right: 20pt;
`;

const SummaryText = styled(Text)`
  font-family: 'Lato Medium';
  font-size: 9pt;
  line-height: 1.6;
`;

const WrapedText = styled(Text)`
  font-family: 'Lato Medium';
  font-size: 9pt;
  line-height: 1.5;
  color: #585858;
`;

export const SmallHeader = styled(Text)`
  font-family: 'Lato Bold';
  font-size: 9pt;
  margin-bottom: 4pt;
  color: #0e0e0e;
`;

const Name = styled(Text)`
  font-family: 'Lato SemiBold';
  font-size: 21.75pt;
  margin-bottom: 8pt;
  color: #000;
`;

const Title = styled(Text)`
  font-family: 'Lato SemiBold';
  font-size: 9.75pt;
  color: #585858;
`;

const AvatarContainer = styled(View)`
  width: 60pt;
  height: 60pt;
`;

const Avatar = styled(Image)`
  border-radius: 50pt;
  height: 100%;
`;

const DateTimeBlock = styled(View)`
  margin-bottom: 4pt;
`;

const SidebarTopBlocks = styled(View)`
  margin-bottom: 22pt;
`;

const GreyText = styled(Text)`
  font-size: 9pt;
  line-height: 1.3;
  color: ${theme.colors.gray.regular};
`;

const Details = styled(View)`
  padding-top: 1.5pt;
`;

const ReferenceMessage = styled(Text)`
`;

const ReferenceContainer = styled(View)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ReferenceItem = styled(View)`
  width: 50%;
`;

export default MilanTemplate;
