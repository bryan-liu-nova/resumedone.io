import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { displayDate, displayTemplateTitle } from '/imports/generator/api/helpers';

import { Text as TextAtom } from '/imports/pdf/santiago/ui/atoms';
import { theme } from '/imports/core/ui/theme';

const renderDate = (date, showOnlyYear) => date && displayDate(date, showOnlyYear ? 'yyyy' : 'LLL yyyy') || '';

class DateRangeDisplay extends PureComponent {
  render() {
    const { startDate, endDate, current, isPlaceholder, showOnlyYear } = this.props;
    return (
      <Text isPlaceholder={isPlaceholder}>{displayTemplateTitle(renderDate(startDate, showOnlyYear), current ? 'Present' : renderDate(endDate, showOnlyYear), ' - ')}</Text>
    );
  }
}

const Text = styled(TextAtom)`
  font-size: 9.75pt;
  padding-top: 3pt;
 `;

export default DateRangeDisplay;
