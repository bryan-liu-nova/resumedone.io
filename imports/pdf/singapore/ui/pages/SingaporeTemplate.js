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
  LineHeading,
  BlockItem,
  Link,
  LeftSide,
  RightSide,
  FlexContainer
} from '/imports/pdf/singapore/ui/atoms';
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

export const CUSTOM_BLOCK_NAMES = {
  EMPLOYMENT: 'Experience',
};

class SingaporeTemplate extends PureComponent {
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
              <SocialLink key={index} src={(fields || {}).src} >
                {(fields || {}).label}
                {(index < socialLinks.items.length - 1) ? ', ' : ''}
              </SocialLink>
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
      <DetailsBlockItem isPlaceholder={isPlaceholder}>
        <FlexDetails>
          {
            data.map((detail, index) => {
              const padding = (index % 2 !== 0) ? { paddingRight: '20pt' } : {};
              return detail.value ? (
                <FlexDetailsRow key={detail.title}>
                  <FlexContainer style={padding}>
                    <LeftSide details>
                      <DetailsHeader>{detail.title}</DetailsHeader>
                    </LeftSide>
                    <RightSide details>
                      <TextRight>{detail.value}</TextRight>
                    </RightSide>
                  </FlexContainer>
                </FlexDetailsRow>
              ) : null
            })
          }
        </FlexDetails>
      </DetailsBlockItem>
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
      <BlockItem key={block._id}>
        <FlexContainer>
          <LeftSide>
            <LineHeading>{this.getBlockIndex(blockIndex)}{'   '}{BLOCK_NAMES[block.type]}</LineHeading>
          </LeftSide>
          <RightSide>
            <ReferenceContainer>
              {hideReferences ?
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
                })}
            </ReferenceContainer>
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
      const blockName = isCustom ? block.title : (CUSTOM_BLOCK_NAMES[block.type] ? CUSTOM_BLOCK_NAMES[block.type] : BLOCK_NAMES[block.type]);
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
          dateView={dateView}
          wrap={!(block.type === 'SKILLS' || block.type === 'LANGUAGES')}
        >
          {dateView ? (
            <>
              <LineHeading isPlaceholder={block.isPlaceholder}>
                {this.getBlockIndex(blockIndex)}{'  '}{blockName}
              </LineHeading>
              {blockContent}
            </>
          ) : (
            <FlexContainer>
              <LeftSide>
                <LineHeading isPlaceholder={block.isPlaceholder}>
                  {this.getBlockIndex(blockIndex)}{'  '}{blockName}
                </LineHeading>
              </LeftSide>
              <RightSide flex={FLEX_VIEW_BLOCKS.includes(block.type)}>
                {blockContent}
              </RightSide>
            </FlexContainer>
          )}
          {!DATE_VIEW_BLOCKS.includes(block.type) ? <FlexBlockSpacer /> : null}
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
          <Main>
            <Header>
              <Quad />

              {(firstName || lastName) && (
                <Name isPlaceholder={isPlaceholderName}>
                  {firstName}{lastName && ` ${lastName}`}
                </Name>
              )}
              {title && <Title>{title}</Title>}
            </Header>
            {this.renderDetails(resumeWithPlaceholders)}
            {!isPlaceholderSummary && (
              <SummaryBlockItem>
                <FlexContainer>
                  <LeftSide>
                    <LineHeading isPlaceholder={isPlaceholderSummary}>
                      01  Profile
                    </LineHeading>
                  </LeftSide>
                  <RightSide>
                    <SummaryInner>
                      {isPlaceholderSummary ? (
                        <Summary isPlaceholder>{professionalSummary}</Summary>
                      ) : parseDraftText(professionalSummary, Summary, 'singapore')}
                    </SummaryInner>
                  </RightSide>
                </FlexContainer>
                <FlexBlockSpacer />
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
  padding: 35pt 40pt;
`;

const Header = styled(View)`
  position: relative;
  margin-top: 14pt;
  margin-bottom: 26pt;
`;

const Quad = styled(View)`
  position: absolute;
  width: 15pt;
  height: 15pt;
  background: #000;
  right: 0;
  top: 8pt;
`;

const Main = styled(View)`
  flex-direction: column;
  position: relative;
  z-index: 100;
`;

export const DetailsHeader = styled(Text)`
  font-family: 'HelveticaNeue Bold';
  font-size: 7.5pt;
  line-height: 1.3;
  color: #000;
`;

const Name = styled(Heading)`
  font-size: 22.5pt;
  margin-bottom: 12pt;
  text-transform: none;
`;

const Title = styled(Text)`
  font-family: 'HelveticaNeue Bold';
  font-size: 12.5pt;
`;

const DetailsBlockItem = styled(BlockItem)`
  margin-bottom: 27pt;
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
  padding-right: 10pt;
`;

const FlexDetailsRow = styled(View)`
  width: 49%;
  margin-bottom: 2pt;
  padding-right: 20pt;
`;

const TextRight = styled(Text)`
  font-size: 8.25pt;
  line-height: 1.5;
  text-align: left;
`;

const SummaryBlockItem = styled(BlockItem)`
  margin-bottom: 14pt;
`;

const SummaryInner = styled(View)`
  padding-right: 15pt;
`;

const NestedBlockSpacer = styled(View)`
  height: 8pt;
`;

const FlexBlockSpacer = styled(View)`
  height: 15pt;
  ${p => p.summary && css`
    height: 20pt;
  `}
`;

const SocialLink = styled(p => <Link {...p} />)`
  font-size: 8.5pt;
  text-decoration: underline;
  color: ${p => theme.colors.gray.regular};
`;

const ReferenceMessage = styled(Text)`
  padding-top: 5pt;
`;

const ReferenceContainer = styled(View)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ReferenceItem = styled(View)`
  width: 50%;
`;

const BlockInnerItem = styled(View)`
  margin-bottom: 0;
  ${p => p.dateView && css`
    margin-bottom: 12pt;
  `}
  ${p => p.lastChild && css`
    margin-bottom: 0;
  `}
`;

const Summary = styled(Text)`
  color: #000;
`;

export default SingaporeTemplate;
