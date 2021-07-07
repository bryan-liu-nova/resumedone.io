import React, { PureComponent } from 'react';
import { Meteor } from 'meteor/meteor';
import styled, { css } from 'styled-components';
import { parseDraftText, isDescriptionEmpty } from '/imports/pdf/core/api/helpers';

import { View, Image as ImageAtom } from '/imports/pdf/core/ui/atoms';
import {
  Text as TextAtom,
  BlockNestedItem,
  BlockSubHeader,
  DetailsRight,
  DetailsLeft,
  Filler
} from '/imports/pdf/santiago/ui/atoms';
import DateRangeDisplay from './DateRangeDisplay';

class RangeActivityDisplay extends PureComponent {
  render() {
    const { title, startDate, endDate, current, description, city, degree, isPlaceholder, showOnlyYear } = this.props;
    return (
      <BlockNestedItem wrap={false}>
        <TitleContainer>
          <Filler long isPlaceholder={isPlaceholder} />

          <DetailsLeft icon>
            <Image src={`${Meteor.absoluteUrl()}img/${isPlaceholder ? 'santiago_icon_placeholder' : 'santiago_icon'}.png`} />
            <BlockSubHeader isPlaceholder={isPlaceholder}>{title}</BlockSubHeader>
          </DetailsLeft>
          <DetailsRight>
            <DateRangeDisplay
              startDate={startDate}
              endDate={endDate}
              current={current}
              isPlaceholder={isPlaceholder}
              showOnlyYear={showOnlyYear}
            />
          </DetailsRight>
          {
            city &&
            <CityContainer degree={degree}>
              <Info isPlaceholder={isPlaceholder}>
                {city}
              </Info>
            </CityContainer>
          }
        </TitleContainer>
          {
            degree ?
            <AdditionalInfo>
              <Info degree isPlaceholder={isPlaceholder}>
                {degree}
              </Info>
            </AdditionalInfo>
              : <AdditionalInfoSpacer />
          }
        <TextCont>
          {
            (description === null || description === '') ?
              <Text isPlaceholder={isPlaceholder}>{description}</Text>
              : parseDraftText(description, Text, 'santiago', { isPlaceholder: isPlaceholder })
          }
        </TextCont>
      </BlockNestedItem>
    );
  }
}

const TextCont = styled(View)`
  margin-top: 4pt;
  padding-right: 20pt;
`;

const Text = styled(TextAtom)`
  line-height: 1.25;
`;

const Info = styled(TextAtom)`
  font-family: 'CrimsonText Italic';
  font-size: 7.5pt;
  text-align: right;
  ${p => p.degree && css`
    color: #545454;
    font-size: 9.75pt;
    text-align: left;
  `}
`;

const TitleContainer = styled(View)`
  position: relative;
  height: 17pt;
`;

const AdditionalInfo = styled(View)`
  position: relative;
  padding-top: 11pt;
`;

const Image = styled(p => <ImageAtom {...p} />)`
  position: absolute;
  width: 9pt;
  height: 9pt;
  top: 6pt;
  left: 0;
`;

const CityContainer = styled(View)`
  postition: absolute;
  bottom: -20pt;
  right: 0;
  ${p => p.degree && css`
    bottom: -29pt;
  `}
`;

const AdditionalInfoSpacer = styled(View)`
  height: 10pt;
`;

export default RangeActivityDisplay;
