import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { displayDate, displayTemplateTitle } from '/imports/generator/api/helpers';

import { Text as TextAtom } from '/imports/pdf/stockholm/ui/atoms';
import { theme } from '/imports/core/ui/theme';
import { View } from '/imports/pdf/core/ui/atoms';

const renderDate = (date, showOnlyYear) => date && displayDate(date, showOnlyYear ? 'yyyy' : 'LLLL yyyy') || '';

class DateRangeDisplay extends PureComponent {
  render() {
    const { startDate, endDate, current, customCity, isPlaceholder, showOnlyYear } = this.props;
    return (
      <Wrapper>
        <Text isPlaceholder={isPlaceholder}>{displayTemplateTitle(renderDate(startDate, showOnlyYear), current ? 'Present' : renderDate(endDate, showOnlyYear), '  -  ')}</Text>
        {
          customCity &&
            <Text isPlaceholder={isPlaceholder}>{customCity}</Text>
        }
      </Wrapper>
    );
  }
}

const Text = styled(TextAtom)`
  font-size: 9pt;
  line-height: 1.4;
  color: #566d77;
`;

const Wrapper = styled(View)`
`;

export default DateRangeDisplay;
