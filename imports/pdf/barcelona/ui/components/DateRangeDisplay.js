import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import { displayDate, displayTemplateTitle } from '/imports/generator/api/helpers';

import { Text as TextAtom } from '/imports/pdf/barcelona/ui/atoms';
import { View } from '/imports/pdf/core/ui/atoms';
import { theme } from '/imports/core/ui/theme';

const renderDate = (date, showOnlyYear) => date && displayDate(date, showOnlyYear ? 'yyyy' : 'LLL yyyy') || '';

class DateRangeDisplay extends PureComponent {
  render() {
    const { startDate, endDate, current, city, color, isPlaceholder, showOnlyYear } = this.props;
    return (
      <Container>
        <Date color={color} isPlaceholder={isPlaceholder}>
          {displayTemplateTitle(renderDate(startDate, showOnlyYear), current ? 'Present' : renderDate(endDate, showOnlyYear), ' - ')}
        </Date>
        {city ? <Text isPlaceholder={isPlaceholder}>{city}</Text> : null}
      </Container>
    );
  }
}

const Date = styled(TextAtom)`
  font-family: 'PtSerif Bold';
  font-size: 8.25pt;
  margin-bottom: 8pt;
  color: ${p => theme.colors[p.color]};
`;

const Text = styled(TextAtom)`
  font-size: 7.5pt;
  color: #444444;
`;

const Container = styled(View)`
  padding-top: 4pt;
`;

export default DateRangeDisplay;
