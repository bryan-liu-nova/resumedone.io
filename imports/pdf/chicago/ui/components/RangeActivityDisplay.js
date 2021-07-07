import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import { parseDraftText } from '/imports/pdf/core/api/helpers';

import {
  Text,
  SubHeading,
  BlockNestedItem,
} from '/imports/pdf/chicago/ui/atoms';
import DateRangeDisplay from './DateRangeDisplay';
import { View } from '/imports/pdf/core/ui/atoms';

class RangeActivityDisplay extends PureComponent {
  render() {
    const { title, startDate, endDate, current, description, showOnlyYear } = this.props;
    return (
      <BlockNestedItem>
          <SubHeading>{title}</SubHeading>
          <DateRangeDisplay
            startDate={startDate}
            endDate={endDate}
            current={current}
            showOnlyYear={showOnlyYear}
          />
          <TextCont>
            {
              (!description || description === null || description === '') ?
                <Text>{description}</Text>
                : parseDraftText(description, Text, 'chicago')
            }
          </TextCont>
      </BlockNestedItem>
    );
  }
}

const TextCont = styled(View)`
`;

export default RangeActivityDisplay;
