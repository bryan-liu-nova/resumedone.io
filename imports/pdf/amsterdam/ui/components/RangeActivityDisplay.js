import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { parseDraftText, isDescriptionEmpty } from '/imports/pdf/core/api/helpers';

import { Text as TextAtom, BlockNestedItem, Heading } from '/imports/pdf/amsterdam/ui/atoms';
import { View } from '/imports/pdf/core/ui/atoms';
import DateRangeDisplay from './DateRangeDisplay';

class RangeActivityDisplay extends PureComponent {
  render() {
    const { title, startDate, endDate, current, description, city, isPlaceholder, showOnlyYear } = this.props;
    return (
      <ItemWrapper wrap={false}>
        <BlockNestedItemFlex>
          <BlockItemInner>
            <Heading isPlaceholder={isPlaceholder}>{title}</Heading>
            <DateRangeDisplay
              startDate={startDate}
              endDate={endDate}
              current={current}
              isPlaceholder={isPlaceholder}
              showOnlyYear={showOnlyYear}
            />
          </BlockItemInner>
          {
            city &&
            <City>
              <CityText isPlaceholder={isPlaceholder}>{city}</CityText>
            </City>
          }
        </BlockNestedItemFlex>
        <TextCont>
          {
            (description === null || description === '') ?
              <Text isPlaceholder={isPlaceholder}>{description}</Text>
              : parseDraftText(description, Text, 'amsterdam', { isPlaceholder: isPlaceholder })
          }
        </TextCont>
      </ItemWrapper>
    );
  }
}

const TextCont = styled(View)`
  padding-top: 6pt;
`;

const Text = styled(TextAtom)`
`;

const BlockNestedItemFlex = styled(BlockNestedItem)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 0;
`;

const BlockItemInner = styled(View)`
`;

const City = styled(View)`
`;

const CityText = styled(Text)`
  font-size: 6.75pt;
  padding-top: 3pt;
`;

const ItemWrapper = styled(View)`
`;

export default RangeActivityDisplay;
