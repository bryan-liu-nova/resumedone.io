import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { parseDraftText, isDescriptionEmpty } from '/imports/pdf/core/api/helpers';

import { Text as TextAtom, BlockNestedItem, Heading } from '/imports/pdf/stockholm/ui/atoms';
import DateRangeDisplay from './DateRangeDisplay';
import { View } from '/imports/pdf/core/ui/atoms';

class RangeActivityDisplay extends PureComponent {
  render() {
    const { title, startDate, endDate, current, description, customCity, isPlaceholder, showOnlyYear } = this.props;
    return (
      <BlockNestedItem wrap={false}>
        <Heading isPlaceholder={isPlaceholder}>{title}</Heading>
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
            : parseDraftText(description, Text, 'stockholm', { isPlaceholder: isPlaceholder })
          }
        </TextCont>
      </BlockNestedItem>
    );
  }
}

const TextCont = styled(View)`
`;

const Text = styled(TextAtom)`
  line-height: 1.4;
`;

export default RangeActivityDisplay;
