import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { displayDate, displayTemplateTitle } from '/imports/generator/api/helpers';

import { Text as TextAtom } from '/imports/pdf/singapore/ui/atoms';

const renderDate = (date, showOnlyYear) => date && displayDate(date, showOnlyYear ? 'yyyy' : 'LL/yyyy') || '';

class DateRangeDisplay extends PureComponent {
  render() {
    const { startDate, endDate, current, isPlaceholder, showOnlyYear } = this.props;
    return (
        <Date isPlaceholder={isPlaceholder}>
          {displayTemplateTitle(renderDate(startDate, showOnlyYear), current ? 'Present' : renderDate(endDate, showOnlyYear), ' - ')}
        </Date>
    );
  }
}

const Date = styled(TextAtom)`
  font-size: 8.25pt;
  margin-bottom: 4pt;
  color: #000;
`;

export default DateRangeDisplay;
