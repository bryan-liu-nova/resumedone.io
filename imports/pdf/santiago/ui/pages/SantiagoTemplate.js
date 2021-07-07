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
  StyledHeader,
  BlockItem,
  Link,
  Separator,
  Filler,
  DetailsLeft,
  DetailsRight,
  TextLeft,
  TextRight
} from '/imports/pdf/santiago/ui/atoms';
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
  'country'
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

class SantiagoTemplate extends PureComponent {
  renderTitleLine = resume => {
    const { details } = resume;
    if (ORDERED_DETAILS_FIELDS.every(d => !details[d])) {
      return <Address isPlaceholder>{DEFAULT_DETAILS.addressOneLine}</Address>;
    }
    const fields = ORDERED_DETAILS_FIELDS.filter(f => details[f]);
    return (
      fields.length > 0 && <Address>{fields.map(f => details[f]).join(', ')}</Address>
    )
  };

  renderContacts = resume => {
    const {
      details: {
        phone,
        email
      }
    } = resume;
    return (
      <Contacts>
        <ContactText isPlaceholder={!phone}>{phone || DEFAULT_DETAILS.phone}</ContactText>
        <ContactText isPlaceholder={!email}>{email || DEFAULT_DETAILS.email}</ContactText>
      </Contacts>
    )
  };

  renderLinks = resume => {
    const { blocks } = resume;
    const socialLinks = blocks.find(b => b.items && b.items.length && b.type === 'SOCIAL_LINKS');
    if (socialLinks) {
      return (
        <BlockItem zero>
          <StyledHeader>Links</StyledHeader>
          <LinksContainer>
            {
              socialLinks.items.filter(({ fields }) => fields).map(({ fields }, index) => (
                <SocialLink
                  key={index}
                  src={fields.src}
                  style={{ textDecoration: 'underline' }}
                >
                  {fields.label}
                  {(index < socialLinks.items.length - 1) ? ', ' : ''}
                </SocialLink>
              ))
            }
          </LinksContainer>
        </BlockItem>
      );
    }
    return null;
  };

  renderDetails = resume => {
    const { details: { dateOfBirth, placeOfBirth, nationality, driversLicence } } = resume;
    if(!dateOfBirth && !placeOfBirth && !nationality && !driversLicence) return null;
    const detailsData = [
      {
        title: 'Date of birth',
        value: dateOfBirth
      },
      {
        title: 'Place of birth',
        value: placeOfBirth
      },
      {
        title: 'Nationality',
        value: nationality
      },
      {
        title: 'Driving license',
        value: driversLicence
      }
    ];
    return detailsData.some(detail => detail.value) ?
      (<BlockItem details>
        <FlexDetails>
          {
            detailsData.map(detail => detail.value ? (
              <FlexDetailsRow key={detail.title}>
                <Filler />

                <DetailsLeft>
                  <TextLeft>
                    {detail.title}
                  </TextLeft>
                </DetailsLeft>
                <DetailsRight>
                  <TextRight>
                    {detail.value}
                  </TextRight>
                </DetailsRight>
              </FlexDetailsRow>
            ) : null)
          }
        </FlexDetails>
      </BlockItem>)
      : null;
  };

  renderReferences = (block, resume) => {
    const blockData = BLOCKS_MAP[block.type];
    const { hideReferences } = block;
    if (!blockData) return null;
    return (
      <BlockItem key={block._id}>
        <StyledHeader>{BLOCK_NAMES[block.type]}</StyledHeader>
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
      const style = FLEX_VIEW_BLOCKS.includes(block.type) ? { width: '48%' } : {};
      const Container = FLEX_VIEW_BLOCKS.includes(block.type) ? BlockContainer : View;
      const blockContent = sortBy((block.items || []), 'order').map((item, index) => {
        if (!blockData.renderItem) return <Text>yep</Text>;
        return (
          <BlockItemContainer
            style={style}
            lastChild={block.items && !block.items[index + 1]}
            dateView={dateView}
            key={index}
          >
            {blockData.renderItem(item, resume, block.isPlaceholder)}
          </BlockItemContainer>
        );
      });
      if(block.type === 'REFERENCES') {
        return this.renderReferences(block, resume);
      }

      return (
        <BlockItem
          key={block._id}
          percentage={FLEX_VIEW_BLOCKS.includes(block.type)}
          hobbies={block.type === 'HOBBIES'}
          courses={block.type === 'COURSES'}
          wrap={!(block.type === 'SKILLS' || block.type === 'LANGUAGES')}
        >
              <StyledHeader isPlaceholder={block.isPlaceholder}>{blockName}</StyledHeader>
              <Container>
                {blockContent}
              </Container>
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
    const isPlaceholderContacts = !originalDetails.phone && !originalDetails.email;
    return (
      <Document {...this.props}>
        <Page>
          <Header>
            <PersonalInfo>
              {(firstName || lastName) && (
                <Name isPlaceholder={isPlaceholderName}>
                  {firstName}{lastName && ` ${lastName}`}
                </Name>
              )}
              <Title isPlaceholder={!title}>{title || DEFAULT_DETAILS.title}</Title>
              {this.renderTitleLine(resumeWithPlaceholders)}
            </PersonalInfo>
            {this.renderContacts(resumeWithPlaceholders)}
          </Header>
          <Main>
            {!isPlaceholderSummary && (
              <>
                <Separator isPlaceholder={isPlaceholderContacts} />
                {professionalSummary && (
                  <BlockItem summary>
                    <StyledHeader isPlaceholder={isPlaceholderSummary} summary>Profile</StyledHeader>
                    <SummaryInner>
                      {isPlaceholderSummary ? (
                        <Summary isPlaceholder>{professionalSummary}</Summary>
                      ) : parseDraftText(professionalSummary, Summary, 'santiago', { center: true })}
                    </SummaryInner>
                  </BlockItem>
                )}
                <Separator isPlaceholder={isPlaceholderSummary} />
              </>
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
  padding: 30pt 38pt;
`;

const Header = styled(View)`
`;

const Main = styled(View)`
  flex-direction: column;
`;

const Name = styled(Heading)`
  font-size: 24pt;
  line-height: 1;
  text-align: center;
  letter-spacing: 0.8pt;
  text-transform: none;
  padding-top: 0;
  margin-bottom: 0;
`;

const Title = styled(Text)`
  font-family: 'CrimsonText';
  font-size: 13.5pt;
  text-align: center;
  margin-bottom: 2pt;
`;

const Address = styled(Text)`
  font-size: 11.25pt;
  text-align: center;
`;

const PersonalInfo = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  margin-bottom: 14pt;
`;

const FlexDetails = styled(View)`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: space-between;
  justify-content: flex-start;
  height: 36pt;
`;

const FlexDetailsRow = styled(View)`
  position: relative;
  width: 48%;
  height: 18pt;
`;

const Contacts = styled(View)`
  font-family: 'CrimsonText SemiBold';
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 2pt;
`;

const ContactText = styled(Text)`
  font-family: 'CrimsonText SemiBold';
  font-size: 13.5pt;
`;

const BlockContainer = styled(View)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const SummaryInner = styled(View)`
  padding: 0 32pt;
`;

const Summary = styled(Text)`
  display: flex;
  text-align: center;
  line-height: 1.1;
`;

const LinksContainer = styled(Text)`
  text-align: center;
  padding-bottom: 4pt;
`;

const SocialLink = styled(p => <Link {...p} />)`
  font-size: 12pt;
`;

const ReferenceMessage = styled(Text)`
  font-size: 10.5pt;
  text-align: center;
  color: ${theme.colors.gray.regular};
  padding-top: 4pt;
`;

const BlockItemContainer = styled(View)`
  ${p => p.dateView && css`
    margin-bottom: 8pt;
  `}
  ${p => p.lastChild && css`
    margin-bottom: 0;
  `}
  &:last-child {
    margin-bottom: 0;
  }
`;

export default SantiagoTemplate;
