import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { displayDate, displayTemplateTitle } from '/imports/generator/api/helpers';

import { Text as TextAtom } from '/imports/pdf/amsterdam/ui/atoms';

const renderDate = (date, showOnlyYear) => date && displayDate(date, showOnlyYear ? 'yyyy' : 'LLL yyyy') || '';

class DateRangeDisplay extends PureComponent {
  render() {
    const { startDate, endDate, current, isPlaceholder, showOnlyYear } = this.props;
    return (
      <Text isPlaceholder={isPlaceholder}>
        {displayTemplateTitle(renderDate(startDate, showOnlyYear), current ? 'Present' : renderDate(endDate, showOnlyYear), ' - ')}
        </Text>
    );
  }
}

const Text = styled(TextAtom)`
  font-family: 'Montserrat SemiBold';
  font-size: 7.5pt;
  color: #323232;
  margin-top: 8pt;
`;

export default DateRangeDisplay;
