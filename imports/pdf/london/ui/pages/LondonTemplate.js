import React, { PureComponent } from 'react';
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
} from '/imports/pdf/london/ui/atoms';
import { theme } from '/imports/core/ui/theme';
import BLOCKS_MAP from '../../api/blocksMap';
import { BLOCK_NAMES } from '/imports/generator/api/constants';
import { DEFAULT_DETAILS } from '/imports/pdf/core/api/placeholders';

const TOP_COLUMN_BLOCKS = [
  'SOCIAL_LINKS'
];

const ORDERED_DETAILS_FIELDS = [
  'address',
  'city',
  'postalCode',
  'country',
  'phone',
  'email',
];

const DETAILS_FIELDS = [
  'placeOfBirth',
  'dateOfBirth',
  'nationality',
  'driversLicence'
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

class LondonTemplate extends PureComponent {
  renderTitleLine = resume => {
    const { details } = resume;
    if (ORDERED_DETAILS_FIELDS.every(d => !details[d]) && !details.email && !details.phone) {
      return null;
      return <Title isPlaceholder>{'Your address, city, Zip code\n +123-456-7890  -  you@example.com'}</Title>;
    }
    const fields = ORDERED_DETAILS_FIELDS.filter(f => details[f]);
    return (
      fields.length > 0 && <Title>{fields.map(f => details[f]).join(', ')}</Title>
    )
  };

  renderLinks = resume => {
    const { blocks } = resume;
    const socialLinks = blocks.find(b => b.items && b.items.length && b.type === 'SOCIAL_LINKS');
    if (socialLinks) {
      return (
        <BlockItem links>
          <FlexContainer>
            <LeftSide>
              <Heading>Links</Heading>
            </LeftSide>
            <RightSide>
              <Text style={{ textDecoration: 'underline' }}>
                {
                  socialLinks.items.filter(({ fields }) => fields).map(({ fields }, index) => (
                    <Link key={index} src={fields.src}>
                      {fields.label}
                      {(index < socialLinks.items.length - 1) ? ', ' : ''}
                    </Link>
                  ))
                }
              </Text>
            </RightSide>
          </FlexContainer>
        </BlockItem>
      );
    }
    return null;
  };

  renderDetailsData = (data, isPlaceholder) => (
    <BlockItem details isPlaceholder={isPlaceholder} wrap={false}>
      <FlexDetails isPlaceholder={isPlaceholder}>
        {
          data.map(detail => detail.value ? (
            <FlexDetailsRow key={detail.title}>
              <FlexContainer>
                <LeftSide details>
                  <GreyHeader>{detail.title}</GreyHeader>
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

  renderDetails = resume => {
    const { details } = resume;
    if (DETAILS_FIELDS.every(d => !details[d])) {
      return null;
      return this.renderDetailsData(DEFAULT_DETAILS.detailsData, true);
    }
    const detailsData = [
      {
        title: 'Date of birth',
        value: details.dateOfBirth
      },
      {
        title: 'Place of birth',
        value: details.placeOfBirth
      },
      {
        title: 'Nationality',
        value: details.nationality
      },
      {
        title: 'Driving license',
        value: details.driversLicence
      }
    ];
    return this.renderDetailsData(detailsData);
  };

  renderReferences = (block, resume) => {
    const blockData = BLOCKS_MAP[block.type];
    const { hideReferences } = block;
    if (!blockData) return null;
    return (
      <BlockItem key={block._id}>
        <FlexContainer>
          <LeftSide>
            <Heading minPresenceAhead={100}>{BLOCK_NAMES[block.type]}</Heading>
          </LeftSide>
          <RightSide>
            {hideReferences ?
                <View>
                  <ReferenceMessage>References available upon request</ReferenceMessage>
                </View>
                : <View>
                  {sortBy((block.items || []), 'order').map((item, index) => {
                    if (!blockData.renderItem) return <Text>yep</Text>;
                    return <View key={index}>{blockData.renderItem(item, resume)}</View>;
                  })}
                </View>}
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
    return [...fixedBlocks,  ...sortableBlocks].map(block => {
      const blockData = BLOCKS_MAP[block.type];
      if (!blockData) return null;
      if (blockData.canDisplay && !blockData.canDisplay(block)) {
        return null;
      }
      const isCustom = block.type === 'CUSTOM';
      const blockName = isCustom ? block.title : BLOCK_NAMES[block.type];
      const dateView = DATE_VIEW_BLOCKS.includes(block.type);
      const renderData = sortBy((block.items || []), 'order');
      const blockContent = renderData.map((item, index) => {
        if (!blockData.renderItem) return <Text>yep</Text>;
        return (
          <NestedItemWrap
            flex={FLEX_VIEW_BLOCKS.includes(block.type)}
            dateView={dateView}
            lastChild={dateView && !renderData[index + 1]}
            key={index}
          >
            {blockData.renderItem(item, resume, block.isPlaceholder)}
          </NestedItemWrap>
        );
      });
      if(block.type === 'REFERENCES') {
        return this.renderReferences(block, resume);
      }
      return (
        <BlockItem
          key={block._id}
          percentage={block.type === 'SKILLS' || block.type === 'LANGUAGES'}
          courses={block.type === 'COURSES'}
          isPlaceholder={block.isPlaceholder}
          wrap={!(block.type === 'SKILLS' || block.type === 'LANGUAGES')}
        >
          {dateView ? (
            <>
              <Heading date minPresenceAhead={100}>{blockName}</Heading>
              {blockContent}
            </>
          ) : (
            <FlexContainer>
              <LeftSide>
                <Heading>{blockName}</Heading>
              </LeftSide>
              <RightSide flex={block.type === 'SKILLS' || block.type === 'LANGUAGES'}>
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
        lastName
      }
    } = resumeWithPlaceholders;
    const isPlaceholderName = !originalDetails.firstName && !originalDetails.lastName;
    const isPlaceholderSummary = !originalDetails.professionalSummary || isDescriptionEmpty(originalDetails.professionalSummary);
    return (
      <Document {...this.props}>
        <Page>
          <Header>
            {(firstName || lastName) && (
              <Name isPlaceholder={isPlaceholderName}>
                {firstName}{lastName && ` ${lastName}`}{title && `, ${title}`}
              </Name>
            )}
            {this.renderTitleLine(resumeWithPlaceholders)}
          </Header>
          <Main>
            {!isPlaceholderSummary && (
              <BlockItem isPlaceholder={isPlaceholderSummary}>
                <FlexContainer>
                  <LeftSide>
                    <Heading>
                      Profile
                    </Heading>
                  </LeftSide>
                  <RightSide>
                    {isPlaceholderSummary ? (
                      <Summary isPlaceholder>{''}</Summary>
                    ) : parseDraftText(professionalSummary, Summary, 'london')}
                  </RightSide>
                </FlexContainer>
              </BlockItem>
            )}
            {this.renderBlocks(
              resumeWithPlaceholders,
              Object.keys(BLOCKS_MAP).filter(b => !TOP_COLUMN_BLOCKS.includes(b))
            )}
            {this.renderDetails(resumeWithPlaceholders)}
            {this.renderLinks(resumeWithPlaceholders)}
          </Main>
        </Page>
      </Document>
    );
  }
}

const Page = styled(PageAtom)`
  padding: 47pt 46pt;
`;

const Header = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 22.5pt;
`;

const Main = styled(View)`
  flex-direction: column;
`;

export const GreyHeader = styled(Text)`
  font-size: 7.5pt;
  padding-top: 1pt;
`;

const Name = styled(Heading)`
  font-family: 'CrimsonText Bold';
  font-size: 13.5pt;
  font-weight: 600;
  margin-bottom: 10pt;
  text-align: center;
  text-transform: none;
  letter-spacing: 0;
  padding-top: 0;
  width: 380pt;
`;

const Title = styled(Text)`
  font-family: 'CrimsonText Bold';
  color: #121212;
  font-size: 9pt;
  line-height: 1.15;
  text-align: center;
  width: 260pt;
`;

const FlexDetails = styled(View)`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: space-between;
  justify-content: flex-start;
  height: 36pt;
  ${p => p.isPlaceholder && css`
    opacity: 0.15;
  `}
`;

const FlexDetailsRow = styled(View)`
  width: 48%;
  height: 14pt;
`;

const TextRight = styled(Text)`
  font-size: 9pt;
  text-align: right;
`;

const ReferenceMessage = styled(Text)`
  font-size: 9.5pt;
`;

const Summary = styled(Text)`
  font-size: 9pt;
  line-height: 1.2;
  padding-right: 15pt;
`;

const NestedItemWrap = styled(View)`
  ${p => p.dateView && css`
    margin-bottom: 9pt;
  `}
  ${p => p.flex && css`
    width: 48%;
  `}
  ${p => p.lastChild && css`
    margin-bottom: 0;
  `}
`;

export default LondonTemplate;
