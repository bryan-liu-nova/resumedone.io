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
} from '/imports/pdf/paris/ui/atoms';
import { theme } from '/imports/core/ui/theme';
import BLOCKS_MAP from '../../api/blocksMap';
import { BLOCK_NAMES } from '/imports/generator/api/constants';
import { DEFAULT_DETAILS } from '/imports/pdf/core/api/placeholders';

const RIGHT_COLUMN_BLOCKS = ['SKILLS', 'LANGUAGES', 'HOBBIES', 'SOCIAL_LINKS'];
const ORDERED_DETAILS_FIELDS = [
  'city',
  'postalCode',
  'country'
];

class ParisTemplate extends PureComponent {
  renderTitleLine = resume => {
    const { details } = resume;
    if (ORDERED_DETAILS_FIELDS.every(d => !details[d])) {
      return null;
      return <TitleLine isPlaceholder>{'CITY    |    123-456-7890'}</TitleLine>;
    }
    const fields = ORDERED_DETAILS_FIELDS.filter(f => details[f] && f !== 'postalCode');
    return (
      <TitleLineCont>
        <TitleLine up>{fields.map((f, i) => details[f]).join(', ')}</TitleLine>
        <TitleLine>{'   |   '}</TitleLine>
        <TitleLine>{details.phone}</TitleLine>
      </TitleLineCont>)
  };

  renderDetails = resume => {
    const { details, details: { phone, email, nationality, driversLicence } } = resume;
    const isAddressEmpty = ORDERED_DETAILS_FIELDS.every(d => !details[d]);
    const fields = ORDERED_DETAILS_FIELDS.filter(f => details[f] && f !== 'phone');
    if(isAddressEmpty && !phone && !email && !nationality && !driversLicence) return null;
    return (
      <>
      <Heading>Details</Heading>
      <DetailsSection>
        <BlockItemSidebar details>
          {!isAddressEmpty && (
            <DetailsItemSection>
              <WrapedText isPlaceholder={isAddressEmpty}>
                {isAddressEmpty ? 'Your address, city,\nZip code' : fields.map((f, i) => details[f]).join(', ')}
              </WrapedText>
            </DetailsItemSection>
          )}
          <DetailsItemSection last>
            {phone && (
              <WrapedText isPlaceholder={!phone}>
                {phone || DEFAULT_DETAILS.phone}
              </WrapedText>
            )}
            {email && (
              <WrapedText isPlaceholder={!email}>
                {email || DEFAULT_DETAILS.email}
              </WrapedText>
            )}
          </DetailsItemSection>
        </BlockItemSidebar>
        {this.renderDateAndPlace(resume)}
        {nationality && (
          <BlockItemSidebar>
            <BlockNestedItem sidebar>
              <GreyHeader>Nationality</GreyHeader>
              <Text>{nationality}</Text>
            </BlockNestedItem>
          </BlockItemSidebar>
        )}
        {driversLicence && (
          <BlockItemSidebar>
            <BlockNestedItem sidebar>
              <GreyHeader>Driving license</GreyHeader>
              <Text>{driversLicence}</Text>
            </BlockNestedItem>
          </BlockItemSidebar>
        )}
      </DetailsSection>
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
      <BlockItemSidebar>
        <GreyHeader>{title}</GreyHeader>
        {dateOfBirth && <Text>{dateOfBirth}</Text>}
        {placeOfBirth && <Text>{placeOfBirth}</Text>}
      </BlockItemSidebar>
    )
  };

  renderReferences = (block, resume) => {
    const blockData = BLOCKS_MAP[block.type];
    const { hideReferences } = block;
    if (!blockData) return null;
    return (
      <BlockItem key={block._id} >
        <Heading minPresenceAhead={100}>{BLOCK_NAMES[block.type]}</Heading>
        {hideReferences ?
            <View>
              <ReferenceMessage>References available upon request</ReferenceMessage>
            </View> :
            <View>
              {sortBy((block.items || []), 'order').map((item, index) => {
                if (!blockData.renderItem) return <Text>yep</Text>;
                return <View key={index}>{blockData.renderItem(item, resume)}</View>;
              })}
            </View>}
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
      if(block.type === 'REFERENCES') {
        return this.renderReferences(block, resume);
      }
      return (
        <BlockItem
          key={block._id}
          courses={block.type === 'COURSES'}
          links={block.type === 'SOCIAL_LINKS'}
          percentage={block.type === 'SKILLS' || block.type === 'LANGUAGES'}
          wrap={!(block.type === 'SKILLS' || block.type === 'LANGUAGES')}
        >
          <Heading sidebar={sidebar} minPresenceAhead={100}>{BLOCK_NAMES[block.type]}</Heading>
          {sortBy((block.items || []), 'order').map((item, index) => {
            if (!blockData.renderItem) return <Text>yep</Text>;
            return <View key={index}>{blockData.renderItem(item, resume, block.isPlaceholder)}</View>;
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
          <Main>
            <LeftSide>
              <Header>
                {userPic && (
                  <AvatarContainer>
                    <Avatar src={userPic || `${Meteor.absoluteUrl()}img/default_resume_avatar.png`} />
                  </AvatarContainer>
                )}
                <PersonalInfo>
                  {(firstName || lastName) && (
                    <Name color={color} isPlaceholder={isPlaceholderName}>
                      {firstName}{lastName && ` ${lastName}`}{title && `, ${title}`}
                      </Name>
                  )}
                  <Title>{ this.renderTitleLine(resumeWithPlaceholders) }</Title>
                </PersonalInfo>
              </Header>
              {!isPlaceholderSummary && (
                <BlockItem summary>
                  <Heading summary>Profile</Heading>
                  {isPlaceholderSummary ? (
                    <Summary isPlaceholder>{professionalSummary}</Summary>
                  ) : parseDraftText(professionalSummary, Summary, 'paris')}
                </BlockItem>
              )}
              {this.renderBlocks(
                resumeWithPlaceholders,
                Object.keys(BLOCKS_MAP).filter(b => !RIGHT_COLUMN_BLOCKS.includes(b))
              )}
            </LeftSide>
            <RightSide>
              {this.renderDetails(resumeWithPlaceholders)}
              {this.renderBlocks(resumeWithPlaceholders, RIGHT_COLUMN_BLOCKS, true)}
            </RightSide>
          </Main>
        </Page>
      </Document>
    );
  }
}

const Page = styled(PageAtom)`
  padding: 40.5pt 41.25pt;
`;

const Header = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: flex-start;
  margin-bottom: 30pt;
`;

const Main = styled(View)`
  flex-direction: row;
`;

const LeftSide = styled(View)`
  width: 74%;
  padding-right: 50pt;
  padding-left: 15pt;
`;

const RightSide = styled(View)`
  width: 26%;
  padding-top: 28pt;
  padding-right: 18pt;
`;

const WrapedText = styled(Text)`
  font-size: 10.5pt;
  color: #2d2d2d;
  margin-bottom: 2pt;
  padding-right: 15pt;
`;

export const GreyHeader = styled(Text)`
  font-size: 9pt;
  margin-bottom: 5pt;
  margin-top: 7pt;
  color: ${theme.colors.gray.regular};
  text-transform: uppercase;
`;

const Name = styled(Heading)`
  font-family: 'CrimsonText';
  font-size: 22.5pt;
  margin-bottom: 9pt;
  padding-top: 2pt;
  color: ${p => theme.colors[p.color]};
  text-transform: none;
  letter-spacing: 0;
  line-height: 1.2;
  ${p => p.isPlaceholder && css`
    opacity: 0.5;
  `}
`;

const Title = styled(Text)`
  font-size: 9pt;
  color: #898989;
`;

const TitleLine = styled(Text)`
  font-size: 10pt;
  color: #898989;
  ${p => p.up && css`
    text-transform: uppercase;
  `}
`;

const AvatarContainer = styled(View)`
  width: 60pt;
  height: 60pt;
  margin-right: 14.25pt;
`;

const Avatar = styled(Image)`
  border-radius: 50pt;
  height: 100%;
`;

const PersonalInfo = styled(View)`
  flex-grow: 1;
`;

const BlockItemSidebar = styled(BlockItem)`
  margin-bottom: 0;
  margin-top: 10pt;
  ${p => p.details && css`
    margin-bottom: 0;
    margin-top: 0;
  `}
`;

const ReferenceMessage = styled(Text)`
  font-size: 10.5pt;
`;

const DetailsSection = styled(View)`
  padding-top: 4pt;
  margin-bottom: 18pt;
`;

const DetailsItemSection = styled(View)`
  margin-bottom: 12pt;
  ${p => p.last && css`
    margin-bottom: 0;
  `}
`;

const TitleLineCont = styled(Text)`
  display: flex;
`;

const Summary = styled(Text)`
  font-size: 9.75pt;
  line-height: 1.4;
`;

export default ParisTemplate;
