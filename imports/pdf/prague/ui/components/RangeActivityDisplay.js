import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import { parseDraftText } from '/imports/pdf/core/api/helpers';

import {
  Text,
  BlockNestedItem,
} from '/imports/pdf/prague/ui/atoms';
import DateRangeDisplay from './DateRangeDisplay';
import { View } from '/imports/pdf/core/ui/atoms';

class RangeActivityDisplay extends PureComponent {
  render() {
    const { title, employer, startDate, endDate, current, description, showOnlyYear } = this.props;
    return (
      <BlockNestedItem>
        <TitleCont>
          <Title>{title}</Title>
          {employer && <Text>{` | `}{employer}</Text>}
          {(startDate || endDate) && (
            <DateRangeDisplay
              startDate={startDate}
              endDate={endDate}
              current={current}
              showOnlyYear={showOnlyYear}
            />
          )}
        </TitleCont>
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

const Title = styled(Text)`
  font-family: 'Lato';
  text-transform: uppercase;
`;

const TitleCont = styled(View)`
  flex-direction: row;
`;

export default RangeActivityDisplay;
