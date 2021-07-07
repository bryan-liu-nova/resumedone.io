import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { displayDate, displayTemplateTitle } from '/imports/generator/api/helpers';

import { Text as TextAtom } from '/imports/pdf/paris/ui/atoms';
import { theme } from '/imports/core/ui/theme';
import { View } from '/imports/pdf/core/ui/atoms';

const renderDate = (date, showOnlyYear) => date && displayDate(date, showOnlyYear ? 'yyyy' : 'LLL yyyy') || '';

class DateRangeDisplay extends PureComponent {
  render() {
    const { startDate, endDate, current, customCity, isPlaceholder, showOnlyYear } = this.props;
    return (
      <Wrapper>
        <Text isPlaceholder={isPlaceholder}>{displayTemplateTitle(renderDate(startDate, showOnlyYear), current ? 'Present' : renderDate(endDate, showOnlyYear), ' - ')}{customCity && `, ${customCity}`}</Text>
      </Wrapper>
    );
  }
}

const Text = styled(TextAtom)`
  font-family: 'CrimsonText Italic';
  font-size: 12pt;
  color: #898989;
`;

const Wrapper = styled(View)`
  margin-bottom: 6pt;
`;

export default DateRangeDisplay;
