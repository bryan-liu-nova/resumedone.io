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
  LocationIcon
} from '/imports/pdf/barcelona/ui/atoms';
import { theme } from '/imports/core/ui/theme';
import BLOCKS_MAP from '../../api/blocksMap';
import { BLOCK_NAMES } from '/imports/generator/api/constants';
import { DEFAULT_DETAILS } from '/imports/pdf/core/api/placeholders';

const RIGHT_COLUMN_BLOCKS = ['SKILLS', 'LANGUAGES', 'HOBBIES', 'SOCIAL_LINKS'];
const DATE_VIEW_BLOCKS = ['EMPLOYMENT', 'EDUCATION', 'EXTRA_CURRICULAR', 'INTERNSHIPS', 'CUSTOM'];
const ORDERED_DETAILS_FIELDS = [
  'city',
  'postalCode',
  'country'
];

class BarcelonaTemplate extends PureComponent {
  componentDidMount() {
    this.props.setHeight();
  }

  renderTitleLine = resume => {
    const { details } = resume;
    const fields = ORDERED_DETAILS_FIELDS.filter(f => (details[f] && f !== 'postalCode'));
    if(fields.length === 0 && !details.phone) return null;
    return (
      <TitleLineContainer>
        <TitleLineLeft>
          <LocationIcon code="e913" isPlaceholder={!(fields.length > 0)} />
          <TitleLine isPlaceholder={!(fields.length > 0)}>
            {fields.length > 0 ? fields.map((f, i) => details[f]).join(', ') : DEFAULT_DETAILS.address}
          </TitleLine>
        </TitleLineLeft>
        <TitleLineRight>
          <TitleLine isPlaceholder={!details.phone}>{details.phone || DEFAULT_DETAILS.phone}</TitleLine>
        </TitleLineRight>
      </TitleLineContainer>
    );
  };

  renderDetails = resume => {
    const { details, details: { address, phone, email, nationality, driversLicence }, settings: { color } } = resume;
    const fields = ORDERED_DETAILS_FIELDS.filter(f => details[f] && f !== 'phone' && f !== 'address');
    if(fields.length === 0 && !address && !phone && !email && !nationality && !driversLicence ) return null;
    return (
      <Details>
        <Heading color={color} sidebar >Details</Heading>
        <BlockItemSidebar>
          {address && (
            <WrapedText isPlaceholder={!address}>
              {address || DEFAULT_DETAILS.address}
            </WrapedText>
          )}
          {fields.length > 0 && (
            <WrapedText>{fields.map((f, i) => details[f]).join(', ')}</WrapedText>
          )}
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
        </BlockItemSidebar>
        {this.renderDateAndPlace(resume)}
        {nationality && (
          <BlockItemSidebar>
            <View>
              <SmallHeader color={color} >Nationality</SmallHeader>
              <WrapedText>{nationality}</WrapedText>
            </View>
          </BlockItemSidebar>
        )}
        {driversLicence && (
          <BlockItemSidebar>
            <View>
              <SmallHeader color={color} >Driving license</SmallHeader>
              <WrapedText>{driversLicence}</WrapedText>
            </View>
          </BlockItemSidebar>
        )}
      </Details>)
  };

  renderDateAndPlace = resume => {
    const {
      details: {
        placeOfBirth,
        dateOfBirth
      },
      settings: {
        color
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
        <SmallHeader color={color} >{title}</SmallHeader>
        <DateTime>
          {dateOfBirth && <Birth>{dateOfBirth}</Birth>}
          {placeOfBirth && <Birth>{placeOfBirth}</Birth>}
        </DateTime>
      </BlockItemSidebar>
    )
  };

  renderReferences = (block, color, resume) => {
    const blockData = BLOCKS_MAP[block.type];
    const { hideReferences } = block;
    if (!blockData) return null;
    return (
      <BlockItem key={block._id} >
        <Heading
          color={color}
          minPresenceAhead={100}
          references
        >
          {BLOCK_NAMES[block.type]}
        </Heading>
        {
          hideReferences ?
            <View>
              <Text>References available upon request</Text>
            </View> :
            <ReferenceCont>
              {sortBy((block.items || []), 'order').map((item, index) => {
                if (!blockData.renderItem) return <Text>yep</Text>;
                return <Reference key={index}>{blockData.renderItem(item, resume)}</Reference>;
              })}
            </ReferenceCont>
        }
      </BlockItem>
    );
  };

  renderBlocks = (resume, blockNames) => {
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
      const dateView = DATE_VIEW_BLOCKS.includes(block.type);
      if(block.type === 'REFERENCES') {
        return this.renderReferences(block, color, resume);
      }
      return (
        <BlockItem
          key={block._id}
          sidebar={RIGHT_COLUMN_BLOCKS.includes(block.type)}
          percentage={block.type === 'SKILLS' || block.type === 'LANGUAGES'}
          wrap={!(block.type === 'SKILLS' || block.type === 'LANGUAGES')}
        >
          <Heading
            color={color}
            sidebar={RIGHT_COLUMN_BLOCKS.includes(block.type)}
            minPresenceAhead={100}
          >
            {BLOCK_NAMES[block.type]}
          </Heading>
          {sortBy((block.items || []), 'order').map((item, index) => {
            if (!blockData.renderItem) return <Text>yep</Text>;
            return (
              <BlockInnerItem
                key={index}
                dateView={dateView}
                lastChild={block.items && !block.items[index + 1]}
              >
                {blockData.renderItem(item, resume, block.isPlaceholder)}
              </BlockInnerItem>
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
        lastName,
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
                    <Name isPlaceholder={isPlaceholderName}>
                      {firstName}{lastName && ` ${lastName}`}
                    </Name>
                  )}
                  <Title color={color} isPlaceholder={!title}>{title || DEFAULT_DETAILS.title}</Title>
                  {this.renderTitleLine(resumeWithPlaceholders)}
                </PersonalInfo>
              </Header>
              {!isPlaceholderSummary && (
                <BlockItem summary>
                  <Heading color={color} summary >Profile</Heading>
                  {isPlaceholderSummary ? (
                    <Summary isPlaceholder>{professionalSummary}</Summary>
                  ) : parseDraftText(professionalSummary, Summary, 'barcelona')}
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
  padding: 43pt 36pt 40pt 42pt;
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
  width: 79%;
  padding-right: 30pt;
`;

const RightSide = styled(View)`
  width: 21%;
  padding-top: 8pt;
`;

const WrapedText = styled(Text)`
  font-family: 'PtSerif SemiBold';
  font-size: 9.75pt;
  margin-bottom: 6pt;
  line-height: 1.35;
  color: #000;
  &:last-child {
    margin-bottom: 0;
  }
`;

const Summary = styled(Text)`
  line-height: 1.5;
`;

const DateTime = styled(View)`
  margin-bottom: 0;
`;

const Birth = styled(Text)`
  font-size: 10pt;
  line-height: 1;
  margin-bottom: 1pt;
`;

export const SmallHeader = styled(Text)`
  font-size: 9pt;
  margin-bottom: 4pt;
  color: ${p => theme.colors[p.color]};
`;

const Name = styled(Heading)`
  font-family: 'PtSerif SemiBold';
  font-size: 21pt;
  letter-spacing: 0;
  color: #161616;
  margin-bottom: 6pt;
`;

const Title = styled(Text)`
  font-family: 'PtSerif Bold';
  font-size: 10.5pt;
  line-height: 1;
  color: ${p => theme.colors[p.color]};
  margin-bottom: 10pt;
`;

const TitleLineContainer = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const TitleLineLeft = styled(View)`
  width: 75pt;
  margin-right: 32pt;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const TitleLineRight = styled(View)`

`;

const Address = styled(Text)`
  font-size: 10.4pt;
  padding-top: 3pt;
  padding-left: 14pt;
`;

const TitleLine = styled(Text)`
  font-size: 7.5pt;
  line-height: 1.2;
  color: #777777;
  padding-top: 3pt;
`;

const AvatarContainer = styled(View)`
  width: 50pt;
  height: 50pt;
  margin-right: 20pt;
`;

const Avatar = styled(Image)`
  border-radius: 34pt;
  height: 100%;
`;

const PersonalInfo = styled(View)`
  flex-grow: 1;
`;

const Details = styled(View)`
  margin-bottom: 16pt;
`;

const BlockItemSidebar = styled(BlockItem)`
  margin-bottom: 6pt;
`;

const ReferenceCont = styled(View)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Reference = styled(View)`
  width: 50%;
  padding-right: 15pt;
  padding-bottom: 4pt;
`;

const BlockInnerItem = styled(View)`
  ${p => p.dateView && css`
    margin-bottom: 12pt;
  `}
  ${p => p.lastChild && css`
    margin-bottom: 0;
  `}
`;

export default BarcelonaTemplate;
