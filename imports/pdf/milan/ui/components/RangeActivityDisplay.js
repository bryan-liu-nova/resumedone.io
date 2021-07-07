import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import { theme } from '/imports/core/ui/theme';
import { parseDraftText, isDescriptionEmpty } from '/imports/pdf/core/api/helpers';

import { Text as TextAtom, BlockNestedItem, HeadingSmall } from '/imports/pdf/milan/ui/atoms';
import { View } from '/imports/pdf/core/ui/atoms';
import DateRangeDisplay from './DateRangeDisplay';

class RangeActivityDisplay extends PureComponent {
  render() {
    const { title, startDate, endDate, current, description, city, isPlaceholder, showOnlyYear } = this.props;
    return (
      <View wrap={false}>
        <View>
          <HeadingSmall isPlaceholder={isPlaceholder}>
            {title}
          </HeadingSmall>
          <DateRangeDisplay
            startDate={startDate}
            endDate={endDate}
            current={current}
            city={city}
            isPlaceholder={isPlaceholder}
            showOnlyYear={showOnlyYear}
          />
        </View>
        <TextCont>
          {
            (description === null || description === '') ?
              <TextCond isPlaceholder={isPlaceholder}>{description}</TextCond>
              : parseDraftText(description, TextCond, 'milan', { isPlaceholder: isPlaceholder })
          }
        </TextCont>
      </View>
    );
  }
}

const Text = styled(TextAtom)`
  margin-top: 2pt;
  margin-bottom: 0;
`;

const BlockItemInner = styled(View)`
  width: 60%;
`;

const City = styled(View)`
  color: #000;
  width: 40%;
`;

const CityText = styled(Text)`
  font-size: 8pt;
  text-align: right;
`;

const TextCont = styled(View)`
  margin-bottom: 4pt;
  margin-top: 4pt;
`;

const TextCond = styled(Text)`
  font-family: 'Lato Medium';
  line-height: 1.5;
  color: #585858;
`;

export default RangeActivityDisplay;
