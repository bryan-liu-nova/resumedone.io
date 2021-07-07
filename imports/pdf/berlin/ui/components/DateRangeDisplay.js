import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import { displayDate, displayTemplateTitle } from '/imports/generator/api/helpers';

import { Text as TextAtom } from '/imports/pdf/berlin/ui/atoms';

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
  font-size: 8.5pt;
  margin-top: 2pt;
  ${p => !p.isPlaceholder && css`
    color: #000;
  `}
`;

export default DateRangeDisplay;
