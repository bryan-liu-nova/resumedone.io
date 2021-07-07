import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import { displayDate, displayTemplateTitle } from '/imports/generator/api/helpers';

import { Text as TextAtom, LocationIcon } from '/imports/pdf/milan/ui/atoms';
import { View } from '/imports/pdf/core/ui/atoms';

const renderDate = (date, showOnlyYear) => date && displayDate(date, showOnlyYear ? 'yyyy' : 'LLL yyyy') || '';

class DateRangeDisplay extends PureComponent {
  render() {
    const { startDate, endDate, current, city, isPlaceholder, showOnlyYear } = this.props;
    return (
      <Cont>
        <Text isPlaceholder={isPlaceholder}>
          {displayTemplateTitle(renderDate(startDate, showOnlyYear), current ? 'Present' : renderDate(endDate, showOnlyYear), ' - ')}
        </Text>
        { city &&
            <CityCont  >
              <LocationIcon code="e913" isPlaceholder={isPlaceholder} />
              <CityText isPlaceholder={isPlaceholder}>
                {city}
              </CityText>
            </CityCont>
        }
      </Cont>
    );
  }
}

const Text = styled(TextAtom)`
  font-family: 'Lato SemiBold';
  font-size: 9pt;
  margin-top: 2pt;
  color: #0b0b0b;
`;

const Cont = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const CityCont = styled(View)`
  position: relative;
  padding-left: 16pt;
  margin-left: 5pt;
`;

const CityText = styled(Text)`
  color: #707070;
`;

export default DateRangeDisplay;
