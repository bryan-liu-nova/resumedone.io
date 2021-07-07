import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { displayDate, displayTemplateTitle } from '/imports/generator/api/helpers';

import { Text as TextAtom } from '/imports/pdf/riga/ui/atoms';

const renderDate = (date, showOnlyYear) => date && displayDate(date, showOnlyYear ? 'yyyy' : 'yyyy') || '';

class DateRangeDisplay extends PureComponent {
  render() {
    const { startDate, endDate, current, showOnlyYear, color, employer } = this.props;
    return (
      <Date color={color}>
        {employer && ` / `}{displayTemplateTitle(renderDate(startDate, showOnlyYear), current ? 'Present' : renderDate(endDate, showOnlyYear), ' - ')}
      </Date>
    );
  }
}

const Date = styled(TextAtom)`
  font-size: 13.2px;
  font-family: 'CrimsonText Italic';
`;

export default DateRangeDisplay;
