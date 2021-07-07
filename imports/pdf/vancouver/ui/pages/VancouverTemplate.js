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
  Link,
  LeftSide,
  RightSide,
  FlexContainer
} from '/imports/pdf/vancouver/ui/atoms';
import BLOCKS_MAP from '../../api/blocksMap';
import { BLOCK_NAMES } from '/imports/generator/api/constants';
import { DEFAULT_DETAILS } from '/imports/pdf/core/api/placeholders';

const TOP_COLUMN_BLOCKS = [
  'SOCIAL_LINKS'
];

const ORDERED_ADDRESS_FIELDS = [
  'address',
  'city',
  'postalCode',
  'country'
];

const DETAILS_FIELDS = [
  'phone',
  'email',
  'nationality',
  'driversLicence',
];

const DATE_VIEW_BLOCKS = [
  'EMPLOYMENT',
  'EDUCATION',
  'CUSTOM',
  'COURSES',
  'EXTRA_CURRICULAR',
  'INTERNSHIPS'
];

const FLEX_VIEW_BLOCKS = [
  'SKILLS',
  'LANGUAGES'
];

class VancouverTemplate extends PureComponent {
  getAddressLine = resume => {
    const { details } = resume;
      if (ORDERED_ADDRESS_FIELDS.every(d => !details[d])) {
        return null;
      }
      const fields = ORDERED_ADDRESS_FIELDS.filter(f => details[f]);
      return fields.length > 0 && fields.map(f => details[f]).join(', ');
    };

  getLinks = resume => {
    const { blocks } = resume;
    const socialLinks = blocks.find(b => b.items && b.items.length && b.type === 'SOCIAL_LINKS');
    if (socialLinks) {
      return (
        <Text style={{ textDecoration: 'underline' }}>
          {
            socialLinks.items.map(({ fields }, index) => (
              <Link key={index} src={(fields || {}).src}>
                {(fields || {}).label}
                {(index < socialLinks.items.length - 1) ? ', ' : ''}
              </Link>
            ))
          }
        </Text>
      );
    }
    return null;
  };

  getBlockIndex = idx => {
    return idx > 7 ? idx + 2 : `0${idx + 2}`;
  };

  renderDetailsData = (data, isPlaceholder) => {
    return (
      <BlockItem details isPlaceholder={isPlaceholder}>
        <FlexDetails>
          {
            data.map(detail => detail.value ? (
              <FlexDetailsRow key={detail.title}>
                <FlexContainer>
                  <LeftSide details>
                    <DetailsHeader>{detail.title}</DetailsHeader>
                  </LeftSide>
                  <RightSide details>
                    <TextRight>{detail.value}</TextRight>
                  </RightSide>
                </FlexContainer>
              </FlexDetailsRow>
            ) : null)
          }
        </FlexDetails>
      </BlockItem>
    );
  };

  renderDetails = resume => {
    const { details } = resume;
    if (ORDERED_ADDRESS_FIELDS.every(d => !details[d]) && DETAILS_FIELDS.every(d => !details[d]) && (!details.placeOfBirth || !details.dateOfBirth)) {
      return null;
      const fakeDetailsData = [
        {
          title: 'Address',
          value: DEFAULT_DETAILS.address
        },
        {
          title: 'Phone',
          value: DEFAULT_DETAILS.phone
        },
        {
          title: 'Email',
          value: DEFAULT_DETAILS.email
        },
      ];
      return this.renderDetailsData(fakeDetailsData, true);
    }
    const detailsData = [
      {
        title: 'Address',
        value: this.getAddressLine(resume)
      },
      {
        title: 'Phone',
        value: details.phone
      },
      {
        title: 'Email',
        value: details.email
      },
      {
        title: 'Date/place of birth',
        value: (!details.dateOfBirth || !details.placeOfBirth) ?
          null : `${details.dateOfBirth} / ${details.placeOfBirth}`
      },
      {
        title: 'Nationality',
        value: details.nationality
      },
      {
        title: 'Driving license',
        value: details.driversLicence
      },
      {
        title: 'Links',
        value: this.getLinks(resume)
      }
    ];
    return this.renderDetailsData(detailsData);
  };

  renderReferences = (block, blockIndex, resume) => {
    const blockData = BLOCKS_MAP[block.type];
    const { hideReferences } = block;
    if (!blockData) return null;
    return (
      <BlockItem references key={block._id}>
            <FlexContainer>
              <LeftSide>
                <Heading>{this.getBlockIndex(blockIndex)}{' '}{BLOCK_NAMES[block.type]}</Heading>
              </LeftSide>
              <RightSide flex>
                {hideReferences ?
                  <View>
                    <ReferenceMessage>References available upon request</ReferenceMessage>
                  </View>
                  : sortBy((block.items || []), 'order').map((item, index) => {
                    if (!blockData.renderItem) return <Text>yep</Text>;
                    return <ReferenceContainer key={index}>{blockData.renderItem(item, resume)}</ReferenceContainer>;
                  })}
              </RightSide>
            </FlexContainer>
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
    return [...fixedBlocks,  ...sortableBlocks].map((block, blockIndex) => {
      const blockData = BLOCKS_MAP[block.type];
      if (!blockData) return null;
      if (blockData.canDisplay && !blockData.canDisplay(block)) {
        return null;
      }
      const isCustom = block.type === 'CUSTOM';
      const blockName = isCustom ? block.title : BLOCK_NAMES[block.type];
      const dateView = DATE_VIEW_BLOCKS.includes(block.type);
      const style = FLEX_VIEW_BLOCKS.includes(block.type) ? { width: '48%' } : {};
      const blockContent = sortBy((block.items || []), 'order').map((item, index) => {
        if (!blockData.renderItem) return <Text>yep</Text>;
        return (
          <BlockInnerItem
            style={style}
            key={index}
            dateView={dateView}
            lastChild={block.items && !block.items[index + 1]}
          >
            {blockData.renderItem(item, resume, block.isPlaceholder)}
          </BlockInnerItem>
        );
      });
      if(block.type === 'REFERENCES') {
        return this.renderReferences(block, blockIndex, resume);
      }

      return (
        <BlockItem
          key={block._id}
          wrap={!(block.type === 'SKILLS' || block.type === 'LANGUAGES')}
        >
          {dateView ? (
            <>
              <Heading minPresenceAhead={100}>{this.getBlockIndex(blockIndex)}{' '}{blockName}</Heading>
              {blockContent}
            </>
          ) : (
            <FlexContainer>
              <LeftSide>
                <Heading>{this.getBlockIndex(blockIndex)}{' '}{blockName}</Heading>
              </LeftSide>
              <RightSide flex={FLEX_VIEW_BLOCKS.includes(block.type)}>
                {blockContent}
              </RightSide>
            </FlexContainer>
          )}
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
          <Main>
            <Header>
              {userPic && (
                <AvatarContainer>
                  <Avatar>
                    <AvatarImage src={userPic || `${Meteor.absoluteUrl()}img/default_resume_avatar.png`} />
                    <AvatarMask src={`${Meteor.absoluteUrl()}img/icon_mask.png`} />
                  </Avatar>
                </AvatarContainer>
              )}
              <PersonalInfo>
                {(firstName || lastName) && (
                  <Name isPlaceholder={isPlaceholderName}>
                    {firstName}{lastName && ` ${lastName}`}
                  </Name>
                )}
                <Title isPlaceholder={!title}>
                  {title || DEFAULT_DETAILS.title}
                </Title>
              </PersonalInfo>
            </Header>
            {this.renderDetails(resumeWithPlaceholders)}
            {!isPlaceholderSummary && (
              <BlockItem summary>
                <FlexContainer>
                  <LeftSide>
                    <Heading>
                      01 Profile
                    </Heading>
                  </LeftSide>
                  <RightSide>
                    <SummaryInner>
                      {isPlaceholderSummary ? (
                        <Summary isPlaceholder>{professionalSummary}</Summary>
                      ) : parseDraftText(professionalSummary, Summary, 'vancouver')}
                    </SummaryInner>
                  </RightSide>
                </FlexContainer>
              </BlockItem>
            )}
            {this.renderBlocks(
              resumeWithPlaceholders,
              Object.keys(BLOCKS_MAP).filter(b => !TOP_COLUMN_BLOCKS.includes(b))
            )}
          </Main>
        </Page>
      </Document>
    );
  }
}

const Page = styled(PageAtom)`
  position: relative;
  padding: 42pt 44pt 50pt 44pt;
`;

const Header = styled(View)`
  margin-bottom: 18pt;
`;

const Main = styled(View)`
  flex-direction: column;
  position: relative;
  z-index: 100;
`;

export const DetailsHeader = styled(Text)`
  font-family: 'SolomonSans Bold';
  font-size: 7.5pt;
  text-transform: uppercase;
  line-height: 1;
  color: #2e2e2e;
`;

const Name = styled(Heading)`
  font-size: 21pt;
  text-align: center;
  text-transform: none;
  letter-spacing: 0.075pt;
  margin-bottom: 2pt;
`;

const Title = styled(Text)`
  font-size: 12.75pt;
  text-align: center;
  color: #3d3d3d;
`;

const PersonalInfo = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
`;

const FlexDetails = styled(View)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 4pt;
  padding-right: 8pt;
`;

const FlexDetailsRow = styled(View)`
  width: 49%;
  margin-bottom: 6pt;
  padding-right: 20pt;
`;

const TextRight = styled(Text)`
  font-family: 'SolomonSans SemiBold';
  font-size: 9pt;
  text-align: left;
  line-height: 1.16;
  color: #3d3d3d;
`;

const AvatarContainer = styled(View)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16pt;
`;

const Avatar = styled(View)`
  height: 68pt;
  width: 68pt;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AvatarImage = styled(p => <Image {...p} />)`
  height: 65.25pt;
  width: 65.25pt;
  z-index: 5;
`;

const AvatarMask = styled(p => <Image {...p} />)`
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const SummaryInner = styled(View)`
  margin-bottom: 12pt;
`;

const Summary = styled(Text)`
`;

const ReferenceContainer = styled(View)`
  width: 50%;
`;

const ReferenceMessage = styled(Text)`
  padding-top: 4pt;
`;

const BlockInnerItem = styled(View)`
  ${p => p.dateView && css`
    margin-bottom: 12pt;
  `}
  ${p => p.lastChild && css`
    margin-bottom: 0;
  `}
`;

export default VancouverTemplate;
