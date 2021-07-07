import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import { parseDraftText, isDescriptionEmpty } from '/imports/pdf/core/api/helpers';

import { Text, BlockNestedItem, HeadingSmall } from '/imports/pdf/berlin/ui/atoms';
import { View } from '/imports/pdf/core/ui/atoms';
import DateRangeDisplay from './DateRangeDisplay';

class RangeActivityDisplay extends PureComponent {
  render() {
    const { title, startDate, endDate, current, description, city, isPlaceholder, showOnlyYear } = this.props;
    return (
      <ItemWrapper wrap={false}>
      <BlockNestedItemFlex>
          <BlockItemInner>
            <HeadingSmall isPlaceholder={isPlaceholder}>
              {title}
            </HeadingSmall>
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
              <CityText isPlaceholder={isPlaceholder}>
                {city}
              </CityText>
            </City>
          }
        </BlockNestedItemFlex>
        {
          (description === null || description === '') ?
            <Text isPlaceholder={isPlaceholder}>{description}</Text>
            : parseDraftText(description, Text, 'berlin', { isPlaceholder: isPlaceholder })
        }
      </ItemWrapper>
    );
  }
}

const BlockNestedItemFlex = styled(BlockNestedItem)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const BlockItemInner = styled(View)`
  width: 60%;
`;

const City = styled(View)`
  color: #000;
  width: 40%;
  padding-top: 4pt;
`;

const CityText = styled(Text)`
  font-size: 8pt;
  text-align: right;
`;

const ItemWrapper = styled(View)`
  margin-bottom: 15pt;
`;

export default RangeActivityDisplay;
