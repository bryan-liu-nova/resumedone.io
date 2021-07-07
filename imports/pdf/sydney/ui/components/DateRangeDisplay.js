import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { displayDate, displayTemplateTitle } from '/imports/generator/api/helpers';

import { View } from '/imports/pdf/core/ui/atoms';
import { Text as TextAtom } from '/imports/pdf/sydney/ui/atoms';

const renderDate = (date, showOnlyYear) => date && displayDate(date, showOnlyYear ? 'yyyy' : 'MMM - yyyy') || '';

class DateRangeDisplay extends PureComponent {
  render() {
    const { startDate, endDate, current, showOnlyYear } = this.props;
    return (
      <View>
        {startDate && <Text>{renderDate(startDate, showOnlyYear)}</Text>}
        {endDate && <Text>{current ? 'Present' : renderDate(endDate, showOnlyYear)}</Text>}
      </View>
    );
  }
}

const Text = styled(TextAtom)`
  text-transform: uppercase;
  font-family: 'Raleway SemiBold';
`;

export default DateRangeDisplay;
