import React, { PureComponent } from 'react';
import { Meteor } from 'meteor/meteor';
import styled, { css } from 'styled-components';
import sortBy from 'lodash/sortBy';
import { getResumeWithPlaceholders, parseDraftText, isDescriptionEmpty } from '/imports/pdf/core/api/helpers';

import {
  Page as PageAtom,
  View,
  Document,
  Image,
  Text as TextAtom,
} from '/imports/pdf/core/ui/atoms';
import {
  Text,
  Heading,
  BlockItem,
  BlockContainer,
  Link,
  TemplateIcon,
  DottedHeading
} from '/imports/pdf/newYork/ui/atoms';
import TitleLine from '/imports/pdf/newYork/ui/components/TitleLine';
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

class NewYorkTemplate extends PureComponent {
  renderDetails = resume => {
    const {
      details,
      details: { email, phone, nationality, driversLicence },
      settings: {
        color
      }
    } = resume;
    const fields = ORDERED_DETAILS_FIELDS.filter(f => details[f] && f !== 'email');
    if(fields.length === 0 && !phone && !email && !nationality && !driversLicence) return null;
    return (
      <DetailsSection>
        <DottedHeading>Details</DottedHeading>
        <SidebarBlock>
          {fields.length > 0 && (
            <WrapedText isPlaceholder={!(fields.length > 0)}>
              {fields.length > 0 ? fields.map((f, i) => details[f]).join(', ') : DEFAULT_DETAILS.address}
            </WrapedText>
          )}
          {phone && (
            <WrapedText isPlaceholder={!phone}>{phone || DEFAULT_DETAILS.phone}</WrapedText>
          )}
          {email && (
            <EmailLink
              color={color}
              src={`mailto:${email || DEFAULT_DETAILS.email}`}
              isPlaceholder={!email}
            >
              {email || DEFAULT_DETAILS.email}
            </EmailLink>
          )}
        </SidebarBlock>
        {this.renderDateAndPlace(resume)}
        {nationality && (
          <SidebarBlock>
            <GreyHeader>Nationality</GreyHeader>
            <Text>{nationality}</Text>
          </SidebarBlock>
        )}
        {driversLicence && (
          <SidebarBlock>
            <GreyHeader>Driving license</GreyHeader>
            <Text>{driversLicence}</Text>
          </SidebarBlock>
        )}
      </DetailsSection>
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
      <SidebarBlock>
        <GreyHeader>{title}</GreyHeader>
        {dateOfBirth && <Birth>{dateOfBirth}</Birth>}
        {placeOfBirth && <Birth>{placeOfBirth}</Birth>}
      </SidebarBlock>
    )
  };

  renderReferences = (block, resume) => {
    const blockData = BLOCKS_MAP[block.type];
    const { hideReferences } = block;
    if (!blockData) return null;
    return (
      <BlockItem key={block._id}>
          <View minPresenceAhead={100}>
            <TemplateIcon code={blockData.icon} />
            <SectionHeading>{BLOCK_NAMES[block.type]}</SectionHeading>
          </View>
        <BlockItemsContainer>
          {
            hideReferences ?
              <BlockContainer>
                <ReferenceMessage>
                  References available upon request
                </ReferenceMessage>
              </BlockContainer>
              : (block.items || []).map((item, i) => {
              if (!blockData.renderItem) return <Text>yep</Text>;
              return (
                <View key={i}>
                  <BlockContainer>
                    {blockData.renderItem(item, resume)}
                  </BlockContainer>
                  {(i < block.items.length - 1) && <View style={{ height: 10 }} />}
                </View>
              );
            })
          }
        </BlockItemsContainer>
      </BlockItem>
    );
  };

  renderBlocks = (resume, blockNames) => {
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
      return (
        <BlockItem
          key={block._id}
          links={block.type === 'SOCIAL_LINKS'}
          percentage={block.type === 'SKILLS' || block.type === 'LANGUAGES'}
          wrap={!(block.type === 'SKILLS' || block.type === 'LANGUAGES')}
          sidebar
        >
          <DottedHeading>{BLOCK_NAMES[block.type]}</DottedHeading>
          {(block.items || []).map((item, index) => {
            if (!blockData.renderItem) return <Text>yep</Text>;
            return <View key={index}>{ blockData.renderItem(item, resume, block.isPlaceholder) }</View>;
          })}
        </BlockItem>
      );
    });
  };

  renderRightBlocks = (resume, blockNames, hasLogo) => {
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
      const isCustom = block.type === 'CUSTOM';
      const blockName = isCustom ? block.title : BLOCK_NAMES[block.type];
      if(block.type === 'REFERENCES') {
        return this.renderReferences(block, resume);
      }
      return (
        <BlockItem key={block._id} right>
          {hasLogo ? (
            <View minPresenceAhead={100}>
              <TemplateIcon code={blockData.icon} isPlaceholder={block.isPlaceholder} />
              <SectionHeading>{blockName}</SectionHeading>
            </View>
          ) : (
            <SectionHeading minPresenceAhead={100}>{BLOCK_NAMES[block.type]}</SectionHeading>
          )}
          <BlockItemsContainer isPlaceholder={block.isPlaceholder}>
            {(block.items || []).map((item, i) => {
              if (!blockData.renderItem) return <Text>yep</Text>;
              return (
                <View key={i}>
                  <BlockContainer isPlaceholder={block.isPlaceholder}>
                    {blockData.renderItem(item, this.props.resume, block.isPlaceholder)}
                  </BlockContainer>
                  {(i < block.items.length - 1) && <View style={{ height: 18 }} />}
                </View>
              );
            })}
          </BlockItemsContainer>
        </BlockItem>
      );
    });
  };

  render() {
    const resumeWithPlaceholders = getResumeWithPlaceholders(this.props.resume);
    const { details: originalDetails } = this.props.resume;
    const {
      details: {
        professionalSummary,
        firstName,
        lastName,
        userPic
      }
    } = resumeWithPlaceholders;
    const isPlaceholderName = !originalDetails.firstName && !originalDetails.lastName;
    const isPlaceholderSummary = !originalDetails.professionalSummary || isDescriptionEmpty(originalDetails.professionalSummary);
    return (
      <Document {...this.props}>
        <Page>
          <Header>
            {userPic && (
              <AvatarContainer>
                <Avatar src={userPic || `${Meteor.absoluteUrl()}img/default_resume_avatar.png`} />
              </AvatarContainer>
            )}
            {(firstName || lastName) && (
              <Name isPlaceholder={isPlaceholderName}>
                {firstName}{lastName && ` ${lastName}`}
              </Name>
            )}
            <TitleLine details={resumeWithPlaceholders.details} {...resumeWithPlaceholders.details} />
          </Header>
          <Main>
            <LeftSide>
              {this.renderDetails(resumeWithPlaceholders)}
              {this.renderBlocks(resumeWithPlaceholders, LEFT_COLUMN_BLOCKS)}
            </LeftSide>
            <RightSide>
              {!isPlaceholderSummary && (
                <BlockItem profile>
                  <TemplateIcon code="e911" isPlaceholder={isPlaceholderSummary} />
                  <SectionHeading>Profile</SectionHeading>
                  <BlockItemSummary isPlaceholder={isPlaceholderSummary}>
                    {isPlaceholderSummary ? (
                      <GrayText isPlaceholder>{professionalSummary}</GrayText>
                    ) : parseDraftText(professionalSummary, GrayText, 'newyork')}
                  </BlockItemSummary>
                </BlockItem>
              )}
              {this.renderRightBlocks(
                resumeWithPlaceholders,
                Object.keys(BLOCKS_MAP).filter(b => !LEFT_COLUMN_BLOCKS.includes(b)),
                true
              )}
            </RightSide>
          </Main>
        </Page>
      </Document>
    );
  }
}

const Page = styled(PageAtom)`
  padding: 39.75pt 45pt;
`;

const Header = styled(View)`
  margin-bottom: 34pt;
`;

const Main = styled(View)`
  flex-direction: row;
`;

const LeftSide = styled(View)`
  width: 25%;
  text-align: center;
`;

const RightSide = styled(View)`
  width: 75%;
  padding-left: 35pt;
`;

const WrapedText = styled(Text)`
  font-size: 11.25pt;
  line-height: 1.2;
  margin-bottom: 8pt;
  color: #3a3a3a;
`;

export const GreyHeader = styled(Text)`
  font-size: 8pt;
  margin-bottom: 2pt;
  margin-top: 2pt;
  color: ${theme.colors.gray.light};
  text-transform: uppercase;
`;

const Name = styled(Heading)`
  font-size: 27pt;
  font-weight: 600;
  margin-bottom: 14pt;
  text-align: center;
  color: #000;
  text-transform: none;
`;

const Avatar = styled(p => <Image {...p} />)`
  border-radius: 5px;
  height: 61.5pt;
  width: 61.5pt;
`;

const AvatarContainer = styled(View)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  text-align: center;
  margin-bottom: 18pt;
`;

const SectionHeading = styled(Text)`
  font-family: 'Oswald';
  font-size: 10.5pt;
  padding-left: 19pt;
  margin-bottom: 10pt;
  text-transform: uppercase;
  color: #2c2c2c;
`;

const BlockItemsContainer = styled(View)`
  border-left: 2px solid #212121;
  padding: 4pt 0;
  ${p => p.isPlaceholder && css`
    border-left-color: #dadada;
  `}
`;

const BlockItemSummary = styled(View)`
  padding-left: 18pt;
  border-left: solid 2px #212121;
  ${p => p.isPlaceholder && css`
    border-left-color: #dadada;
  `}
`;

const SidebarBlock = styled(View)`
  margin-bottom: 6pt;
  padding: 0 8pt;
`;

const GrayText = styled(Text)`
`;

const DetailsSection = styled(View)`
  margin-bottom: 20pt;
`;

const ReferenceMessage = styled(Text)`
  font-size: 11.5pt;
`;

const EmailLink = styled(p => <Link {...p} />)`
  font-size: 10.5pt;
  padding-top: 2pt;
  color: #3a3a3a;
  text-decoration: underline;
  text-decoration-color: #3a3a3a;
  ${p => p.isPlaceholder && css`
    opacity: 0.15;
    text-decoration-color: #dadada;
  `}
`;

const Birth = styled(Text)`
  font-size: 10.5pt;
  color: #3a3a3a;
`;

export default NewYorkTemplate;
