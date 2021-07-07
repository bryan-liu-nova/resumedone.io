import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { parseDraftText, isDescriptionEmpty } from '/imports/pdf/core/api/helpers';

import { Text, BlockNestedItem, SubHeading } from '/imports/pdf/paris/ui/atoms';
import DateRangeDisplay from './DateRangeDisplay';
import { View } from '/imports/pdf/core/ui/atoms';

class RangeActivityDisplay extends PureComponent {
  render() {
    const { title, startDate, endDate, current, description, customCity, isPlaceholder, showOnlyYear } = this.props;
    return (
      <BlockNestedItem wrap={false}>
        <SubHeading isPlaceholder={isPlaceholder}>
          {title}
        </SubHeading>
        <DateRangeDisplay
          startDate={startDate}
          endDate={endDate}
          current={current}
          customCity={customCity}
          isPlaceholder={isPlaceholder}
          showOnlyYear={showOnlyYear}
        />
        <TextCont>
          {
            (description === null || description === '') ?
              <Text isPlaceholder={isPlaceholder}>{description}</Text>
              : parseDraftText(description, Text, 'paris', { isPlaceholder: isPlaceholder })
          }
        </TextCont>
      </BlockNestedItem>
    );
  }
}

const TextCont = styled(View)`
  margin-top: 2pt;
  margin-bottom: 0;
`;

export default RangeActivityDisplay;
