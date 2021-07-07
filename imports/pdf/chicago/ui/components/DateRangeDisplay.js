import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { displayDate, displayTemplateTitle } from '/imports/generator/api/helpers';

import { Text as TextAtom } from '/imports/pdf/chicago/ui/atoms';
import { View } from '/imports/pdf/core/ui/atoms';

const renderDate = (date, showOnlyYear) => date && displayDate(date, showOnlyYear ? 'yyyy' : 'LLLL yyyy') || '';

class DateRangeDisplay extends PureComponent {
  render() {
    const { startDate, endDate, current, showOnlyYear } = this.props;
    return (
      <Date>
        {displayTemplateTitle(renderDate(startDate, showOnlyYear), current ? 'Present' : renderDate(endDate, showOnlyYear), ' - ')}
      </Date>
    );
  }
}

const Date = styled(TextAtom)`
  margin-bottom: 5px;
  color: #666766;
`;

export default DateRangeDisplay;
