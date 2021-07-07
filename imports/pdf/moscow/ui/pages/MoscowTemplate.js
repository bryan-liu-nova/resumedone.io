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
} from '/imports/pdf/moscow/ui/atoms';
import { theme } from '/imports/core/ui/theme';
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

class MoscowTemplate extends PureComponent {
  getAddressLine = resume => {
    const { details } = resume;
    if (ORDERED_ADDRESS_FIELDS.every(d => !details[d])) {
      return null;
    }
    const fields = ORDERED_ADDRESS_FIELDS.filter(f => details[f]);
    return fields.length > 0 && fields.map(f => details[f]).join(', ');
  };

  getLinks = resume => {
    const {
      blocks,
      settings: {
        color
      }
    } = resume;
    const socialLinks = blocks.find(b => b.items && b.items.length && b.type === 'SOCIAL_LINKS');
    if (socialLinks) {
      return (
        <Text style={{ textDecoration: 'underline' }}>
          {
            socialLinks.items.map(({ fields }, index) => (
              <Link key={index} src={(fields || {}).src} color={color} >
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

  renderDetailsData = (data, color,  isPlaceholder) => {
    return (
      <DetailsBlockItem isPlaceholder={isPlaceholder}>
        <FlexDetails>
          {
            data.map(detail => detail.value ? (
              <FlexDetailsRow key={detail.title}>
                <FlexContainer>
                  <LeftSide details>
                    <DetailsHeader color={color}>{detail.title}</DetailsHeader>
                  </LeftSide>
                  <RightSide details>
                    <TextRight>{detail.value}</TextRight>
                  </RightSide>
                </FlexContainer>
              </FlexDetailsRow>
            ) : null)
          }
        </FlexDetails>
      </DetailsBlockItem>
    );
  };

  renderDetails = resume => {
    const {
      details,
      settings: {
        color
      }
    } = resume;
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
      return this.renderDetailsData(fakeDetailsData, color, true);
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
    return this.renderDetailsData(detailsData, color);
  };

  renderReferences = (block, resume) => {
    const blockData = BLOCKS_MAP[block.type];
    const { hideReferences } = block;
    if (!blockData) return null;
    return (
      <BlockItem references key={block._id}>
        <FlexContainer>
          <LeftSide>
            <Heading>{BLOCK_NAMES[block.type]}</Heading>
          </LeftSide>
          <RightSide>
            {
              hideReferences ?
                <View>
                  <ReferenceMessage>References available upon request</ReferenceMessage>
                </View> :
                sortBy((block.items || []), 'order').map((item, index) => {
                  if (!blockData.renderItem) return <Text>yep</Text>;
                  return (
                    <ReferenceItem key={index}>
                      {blockData.renderItem(item, resume)}
                    </ReferenceItem>
                  );
                })
            }
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
            {dateView && index + 1 < block.items.length ? <NestedBlockSpacer /> : null}
          </BlockInnerItem>
        );
      });
      if(block.type === 'REFERENCES') {
        return this.renderReferences(block, resume);
      }

      return (
        <BlockItem
          key={block._id}
          wrap={!(block.type === 'SKILLS' || block.type === 'LANGUAGES')}
          dateView={dateView}
        >
          {dateView ? (
            <>
              <Heading minPresenceAhead={100}>{blockName}</Heading>
              {blockContent}
            </>
          ) : (
            <FlexContainer>
              <LeftSide>
                <Heading>{blockName}</Heading>
              </LeftSide>
              <RightSide>
                {blockContent}
              </RightSide>
            </FlexContainer>
          )}
          {FLEX_VIEW_BLOCKS.includes(block.type) ? <FlexBlockSpacer /> : null}
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
            <Header>
              <PersonalInfo>
                <NameContainer>
                  <Name isPlaceholder={isPlaceholderName}>
                    {firstName}{lastName && ` ${isPlaceholderName ? '\n' : ''}${lastName}`}
                  </Name>
                </NameContainer>
                <NameContainer title>
                  <Title color={color} isPlaceholder={!title}>
                    {title || DEFAULT_DETAILS.title}
                  </Title>
                </NameContainer>
                {userPic && (
                  <AvatarContainer>
                    <Avatar src={userPic || `${Meteor.absoluteUrl()}img/default_resume_avatar.png`} />
                  </AvatarContainer>
                )}
              </PersonalInfo>
            </Header>
            {this.renderDetails(resumeWithPlaceholders)}
            {!isPlaceholderSummary && (
              <SummaryBlockItem>
                <FlexContainer>
                  <LeftSide>
                    <Heading>
                      Profile
                    </Heading>
                  </LeftSide>
                  <RightSide>
                    <SummaryInner>
                      {isPlaceholderSummary ? (
                        <Text isPlaceholder>{professionalSummary}</Text>
                      ) : parseDraftText(professionalSummary, Text, 'moscow')}
                    </SummaryInner>
                  </RightSide>
                </FlexContainer>
                <FlexBlockSpacer summary/>
              </SummaryBlockItem>
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
  padding: 46pt 45pt;
`;

const Header = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  margin-bottom: 20pt;
`;

const Main = styled(View)`
  position: relative;
  z-index: 100;
`;

export const DetailsHeader = styled(Text)`
  font-family: 'Roboto Medium';
  font-size: 7.5pt;
  line-height: 1.2;
  text-transform: uppercase;
  padding-top: 2px;
  color: ${p => theme.colors[p.color]};
`;

const NameContainer = styled(View)`
  width: 50%;
  float: left;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  ${p => p.title && css`
    padding-top: 4pt;
  `}
`;

const Name = styled(Heading)`
  font-family: 'Roboto Bold';
  font-size: 24.5pt;
  padding-top: 0;
  margin-bottom: 0;
  line-height: 1em;
`;

const Title = styled(Text)`
  font-size: 14pt;
  color: ${p => theme.colors[p.color]};
`;

const PersonalInfo = styled(View)`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-top: 12pt;
  padding-right: 70pt;
`;

const DetailsBlockItem = styled(BlockItem)`
  border-top-width: 0;
  border-top-color: transparent;
  border-top-style: none;
  padding-right: 66pt;
  margin-bottom: 18pt;
  padding-top: 8pt;
  ${p => p.isPlaceholder && css`
    opacity: 0.15;
  `}
`;

const FlexDetails = styled(View)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 2pt;
  padding-right: 12pt;
`;

const FlexDetailsRow = styled(View)`
  width: 49%;
  margin-bottom: 4pt;
  padding-right: 15pt;
`;

const TextRight = styled(Text)`
  font-size: 9pt;
  line-height: 1.2;
  text-align: left;
  color: #2d2d2d;
`;

const AvatarContainer = styled(View)`
  position: absolute;
  top: 0;
  right: 0;
  height: 60pt;
  width: 60pt;
`;

const Avatar = styled(p => <Image {...p} />)`
  border-radius: 40pt;
  height: 100%;
`;

const SummaryBlockItem = styled(BlockItem)`
  padding-top: 17pt;
  margin-bottom: 16pt;
`;

const SummaryInner = styled(View)`
  padding-right: 15pt;
`;

const NestedBlockSpacer = styled(View)`
  height: 8pt;
`;

const FlexBlockSpacer = styled(View)`
  height: 12pt;
  ${p => p.summary && css`
    height: 20pt;
  `}
`;

const ReferenceMessage = styled(Text)`
  padding-top: 5pt;
`;

const ReferenceItem = styled(View)`
  width: 50%;
`;

const BlockInnerItem = styled(View)`
  ${p => p.dateView && css`
    margin-bottom: 6pt;
  `}
  ${p => p.lastChild && css`
    margin-bottom: 0;
  `}
`;

export default MoscowTemplate;
