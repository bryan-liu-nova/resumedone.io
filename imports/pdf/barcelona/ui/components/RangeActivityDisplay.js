import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import { parseDraftText, isDescriptionEmpty } from '/imports/pdf/core/api/helpers';

import {
  Text as TextAtom,
  BlockNestedItem,
  BlockSubHeader,
  LeftSide,
  RightSide,
  FlexContainer
} from '/imports/pdf/barcelona/ui/atoms';
import DateRangeDisplay from './DateRangeDisplay';
import { View } from '/imports/pdf/core/ui/atoms';
import { theme } from '/imports/core/ui/theme';

class RangeActivityDisplay extends PureComponent {
  render() {
    const { title, startDate, endDate, current, description, city, degree, color, isPlaceholder, showOnlyYear } = this.props;
    return (
      <BlockNestedItem wrap={false}>
        <FlexContainer>
          <LeftSide>
            <DateRangeDisplay
              startDate={startDate}
              endDate={endDate}
              current={current}
              city={city}
              color={color}
              isPlaceholder={isPlaceholder}
              showOnlyYear={showOnlyYear}
            />
          </LeftSide>
          <RightSide>
            <View>
              <BlockSubHeader isPlaceholder={isPlaceholder}>{title}</BlockSubHeader>
              {degree ? <Degree isPlaceholder={isPlaceholder}>{degree}</Degree> : null}
              <TextCont>
                {
                  (description === null || description === '') ?
                    <Text isPlaceholder={isPlaceholder}>{description}</Text>
                    : parseDraftText(description, Text, 'barcelona', { isPlaceholder: isPlaceholder })
                }
              </TextCont>
            </View>
          </RightSide>
        </FlexContainer>
      </BlockNestedItem>
    );
  }
}

const TextCont = styled(View)`
`;

const Text = styled(TextAtom)`
`;

const Degree = styled(TextAtom)`
  font-size: 9.5pt;
  margin-top: 2pt;
  margin-bottom: 2pt;
`;

export default RangeActivityDisplay;
