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
  Text as TextAtom
} from '/imports/pdf/core/ui/atoms';
import {
  Text,
  Heading,
  BlockItem,
  BlockHeader,
  Link,
  TemplateIcon
} from '/imports/pdf/stockholm/ui/atoms';
import { theme } from '/imports/core/ui/theme';
import BLOCKS_MAP from '../../api/blocksMap';
import { BLOCK_NAMES } from '/imports/generator/api/constants';
import { DEFAULT_DETAILS } from '/imports/pdf/core/api/placeholders';

const RIGHT_COLUMN_BLOCKS = ['SKILLS', 'LANGUAGES', 'HOBBIES', 'SOCIAL_LINKS'];
const ORDERED_DETAILS_FIELDS = [
  'address',
  'city',
  'postalCode',
  'country',
  'phone',
  'email',
];

class StockholmTemplate extends PureComponent {
  renderDetails = resume => {
    const {
      details,
      details: { phone, email, nationality, driversLicence },
      settings: {
        color
      }
    } = resume;
    const fields = ORDERED_DETAILS_FIELDS.filter(f => details[f] && f !== 'phone' && f !== 'email');
    if(fields.length === 0 && !phone && !email && !nationality && !driversLicence) return null;
    return (
      <DetailsSection>
        <Heading>Details</Heading>
        <BlockItemSidebar>
          {fields.length > 0 && (
            <WrapedText isPlaceholder={!(fields.length > 0)}>
              {fields.length > 0 ? fields.map((f, i) => details[f]).join(', ') : DEFAULT_DETAILS.address}
            </WrapedText>
          )}
          {phone && (
            <WrapedText isPlaceholder={!phone}>{phone || DEFAULT_DETAILS.phone}</WrapedText>
          )}
          {email && (
            <TextAtom style={{ textDecoration: 'none' }}>
              <EmailLink
                color={color}
                src={`mailto:${email  || DEFAULT_DETAILS.email}`}
                isPlaceholder={!email}
              >
                {email || DEFAULT_DETAILS.email}
              </EmailLink>
            </TextAtom>
          )}
        </BlockItemSidebar>
        {this.renderDateAndPlace(resume)}
        {nationality && (
          <BlockItemSidebar>
            <GreyHeader>Nationality</GreyHeader>
            <Text>{nationality}</Text>
          </BlockItemSidebar>
        )}
        {driversLicence && (
          <BlockItemSidebar>
            <GreyHeader>Driving license</GreyHeader>
            <Text>{driversLicence}</Text>
          </BlockItemSidebar>
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
      <BlockItemSidebar>
        <GreyHeader>{title}</GreyHeader>
        {dateOfBirth && <Birth>{dateOfBirth}</Birth>}
        {placeOfBirth && <Birth>{placeOfBirth}</Birth>}
      </BlockItemSidebar>
    )
  };

  renderReferences = (block, resume) => {
    const blockData = BLOCKS_MAP[block.type];
    const { hideReferences } = block;
    if (!blockData) return null;
    return (
      <BlockItem key={block._id} padded >
        <BlockHeader minPresenceAhead={100}>
          <TemplateIcon code={blockData.icon} />{'   '}{BLOCK_NAMES[block.type]}
        </BlockHeader>
        {
          hideReferences ?
            <View>
              <ReferenceMessage>References available upon request</ReferenceMessage>
            </View> :
            <View>
              {sortBy((block.items || []), 'order').map((item, index) => {
                if (!blockData.renderItem) return <Text>yep</Text>;
                return <View key={index}>{blockData.renderItem(item, resume)}</View>;
              })}
            </View>
        }
      </BlockItem>
    );
  };

  renderBlocks = (resume, blockNames, hasLogo) => {
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
          padded={hasLogo}
          links={block.type === 'SOCIAL_LINKS'}
          courses={block.type === 'COURSES'}
          wrap={!(block.type === 'SKILLS' || block.type === 'LANGUAGES')}
        >
          {hasLogo ? (
            <BlockHeader minPresenceAhead={100}>
              <TemplateIcon code={blockData.icon} isPlaceholder={block.isPlaceholder} />{'  '}{blockName}
            </BlockHeader>
          ) : (
            <Heading minPresenceAhead={100}>{BLOCK_NAMES[block.type]}</Heading>
          )}
          {sortBy((block.items || []), 'order').map((item, index) => {
            if (!blockData.renderItem) return null;
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
            <PersonalInfo>
              {(firstName || lastName) && (
                <Name isPlaceholder={isPlaceholderName}>
                  {firstName}{lastName && ` ${lastName}`}
                </Name>
              )}
              <Title isPlaceholder={!title}>{title || DEFAULT_DETAILS.title}</Title>
            </PersonalInfo>
          </Header>
          <Main>
            <LeftSide>
              {!isPlaceholderSummary && (
                <BlockItem padded profile>
                  <BlockHeader summary>
                    <TemplateIcon code="e904" isPlaceholder={isPlaceholderSummary} />{'  '}Profile
                  </BlockHeader>
                  <SummaryInner>
                    {isPlaceholderSummary ? (
                      <Summary isPlaceholder>{professionalSummary}</Summary>
                    ) : parseDraftText(professionalSummary, Summary, 'stockholm')}
                  </SummaryInner>
                </BlockItem>
              )}
              {this.renderBlocks(
                resumeWithPlaceholders,
                Object.keys(BLOCKS_MAP).filter(b => !RIGHT_COLUMN_BLOCKS.includes(b)),
                true
              )}
            </LeftSide>
            <RightSide>
              {this.renderDetails(resumeWithPlaceholders)}
              {this.renderBlocks(resumeWithPlaceholders, RIGHT_COLUMN_BLOCKS)}
            </RightSide>
          </Main>
        </Page>
      </Document>
    );
  }
}

const Page = styled(PageAtom)`
  padding: 40pt 40pt 40pt 36pt;
`;

const Header = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  margin-bottom: 20pt;
`;

const Main = styled(View)`
  flex-direction: row;
`;

const LeftSide = styled(View)`
  width: 77%;
  padding-right: 30pt;
`;

const RightSide = styled(View)`
  width: 23%;
  padding-top: 10pt;
`;

const DetailsSection = styled(View)`
  margin-bottom: 8pt;
`;

const WrapedText = styled(Text)`
  font-size: 10pt;
  margin-bottom: 2pt;
  line-height: 1.48;
  text-decoration: none;
  color: #2c2c2c;
`;

const EmailLink = styled(p => <Link {...p} />)`
  font-size: 10pt;
  line-height: 1.48;
  ${p => p.isPlaceholder && css`
    opacity: 0.15;
  `}
`;

export const GreyHeader = styled(Text)`
  margin-bottom: 3pt;
  margin-top: 7pt;
  color: ${theme.colors.gray.regular};
`;

const Name = styled(Heading)`
  font-size: 22.5pt;
  margin-bottom: 0;
  line-height: 1em;
`;

const Title = styled(Text)`
  font-size: 9pt;
  color: #323942;
`;

const AvatarContainer = styled(View)`
  width: 51pt;
  height: 51pt;
  margin-right: 11pt;
  margin-left: 6pt;
`;

const Avatar = styled(Image)`
  border-radius: 5px;
  height: 100%;
`;

const PersonalInfo = styled(View)`
  flex-grow: 1;
  padding-top: 3pt;
  padding-left: 4pt;
`;

const BlockItemSidebar = styled(BlockItem)`
  margin-bottom: 3pt;
`;

const ReferenceMessage = styled(Text)`
  font-family: 'Source Sans Semibold';
  font-size: 11.4pt;
`;

const SummaryInner = styled(View)`
`;

const Summary = styled(Text)`
  line-height: 1.5;
`;

const Birth = styled(Text)`
  
`;

export default StockholmTemplate;
