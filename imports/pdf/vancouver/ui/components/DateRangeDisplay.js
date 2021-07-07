import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import { displayDate, displayTemplateTitle } from '/imports/generator/api/helpers';

import { Text as TextAtom } from '/imports/pdf/vancouver/ui/atoms';
import { View } from '/imports/pdf/core/ui/atoms';

const renderDate = (date, showOnlyYear) => date && displayDate(date, showOnlyYear ? 'yyyy' : 'LLL yyyy') || '';

class DateRangeDisplay extends PureComponent {
  render() {
    const { startDate, endDate, current, city, isPlaceholder, showOnlyYear } = this.props;
    return (
      <View>
        <Date isPlaceholder={isPlaceholder}>
          {displayTemplateTitle(renderDate(startDate, showOnlyYear), current ? 'Present' : renderDate(endDate, showOnlyYear), ' - ')}
        </Date>
        {city ? <Text isPlaceholder={isPlaceholder}>{city}</Text> : null}
      </View>
    );
  }
}

const Date = styled(TextAtom)`
  color: #000;
  margin-bottom: 2pt;
`;

const Text = styled(TextAtom)`
  font-size: 7.5pt;
  color: #2e2e2e;
`;

export default DateRangeDisplay;
