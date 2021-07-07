import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import { theme } from '/imports/core/ui/theme';
import { parseDraftText, isDescriptionEmpty } from '/imports/pdf/core/api/helpers';

import { Text as TextAtom, BlockNestedItem, Heading } from '/imports/pdf/newYork/ui/atoms';
import DateRangeDisplay from './DateRangeDisplay';
import { View } from '/imports/pdf/core/ui/atoms';

class RangeActivityDisplay extends PureComponent {
  render() {
    const { title, startDate, endDate, current, description, educationDegree, isPlaceholder, showOnlyYear } = this.props;
    return (
      <BlockNestedItem wrap={false}>
        <Heading isPlaceholder={isPlaceholder} date>{title}</Heading>
        <DateRangeDisplay
          startDate={startDate}
          endDate={endDate}
          current={current}
          isPlaceholder={isPlaceholder}
          showOnlyYear={showOnlyYear}
        />
        {
          educationDegree &&
            <Degree isPlaceholder={isPlaceholder}>Degree: {educationDegree}</Degree>
        }
        {
          description &&
          <TextCont>
            {
              (description === null || description === '') ?
                <Text isPlaceholder={isPlaceholder}>{description}</Text>
                : parseDraftText(description, Text, 'newyork', { isPlaceholder: isPlaceholder })
            }
          </TextCont>
        }
      </BlockNestedItem>
    );
  }
}

const TextCont = styled(View)`
  margin-top: 4pt;
`;

const Text = styled(TextAtom)`
`;

const Degree = styled(TextAtom)`
  margin-top: 6pt;
  color: #888888;
`;

export default RangeActivityDisplay;
