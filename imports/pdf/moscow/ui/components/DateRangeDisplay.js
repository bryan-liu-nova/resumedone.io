import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import { displayDate, displayTemplateTitle } from '/imports/generator/api/helpers';

import { Text as TextAtom } from '/imports/pdf/moscow/ui/atoms';
import { View } from '/imports/pdf/core/ui/atoms';
import { theme } from '/imports/core/ui/theme';

const renderDate = (date, showOnlyYear) => date && displayDate(date, showOnlyYear ? 'yyyy' : 'LLL yyyy') || '';

class DateRangeDisplay extends PureComponent {
  render() {
    const { startDate, endDate, current, color, city, isPlaceholder, showOnlyYear } = this.props;
    return (
      <View>
        <Date isPlaceholder={isPlaceholder}>
          {displayTemplateTitle(renderDate(startDate, showOnlyYear), current ? 'Present' : renderDate(endDate, showOnlyYear), ' - ')}
        </Date>
        {city ? (
          <Text
            color={color}
            isPlaceholder={isPlaceholder}
          >
            {city}
          </Text>
        ) : null}
      </View>
    );
  }
}

const Date = styled(TextAtom)`
  margin-bottom: 4pt;
  color: #2c2c2c;
`;

const Text = styled(TextAtom)`
  font-family: 'Roboto Medium';
  font-size: 8.25pt;
  text-transform: uppercase;
  color: ${p => theme.colors[p.color]};
`;

export default DateRangeDisplay;
