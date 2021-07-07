import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import { parseDraftText, isDescriptionEmpty } from '/imports/pdf/core/api/helpers';

import {
  Text as TextAtom,
  BlockNestedItem,
  BlockSubHeader,
  LeftSide as LSAtom,
  RightSide,
  FlexContainer
} from '/imports/pdf/vancouver/ui/atoms';
import DateRangeDisplay from './DateRangeDisplay';
import { View } from '/imports/pdf/core/ui/atoms';

class RangeActivityDisplay extends PureComponent {
  render() {
    const { title, startDate, endDate, current, description, city, degree, isPlaceholder, showOnlyYear } = this.props;
    return (
      <BlockNestedItem wrap={false}>
        <FlexContainer>
          <LeftSide>
            <DateRangeDisplay
              startDate={startDate}
              endDate={endDate}
              current={current}
              city={city}
              isPlaceholder={isPlaceholder}
              showOnlyYear={showOnlyYear}
            />
          </LeftSide>
          <RightSide>
            <View>
              <BlockSubHeader isPlaceholder={isPlaceholder}>
                {title}
              </BlockSubHeader>
              {degree ? <Degree isPlaceholder={isPlaceholder}>{degree}</Degree> : null}
              <TextCont>
                {
                  (description === null || description === '') ?
                    <Text isPlaceholder={isPlaceholder}>{description}</Text>
                    : parseDraftText(description, Text, 'vancouver', { isPlaceholder: isPlaceholder })
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
  margin-top: 4pt;
`;

const Text = styled(TextAtom)`
`;

const Degree = styled(TextAtom)`
  font-size: 9.5pt;
  margin-top: 6pt;
  color: #2e2e2e;
`;

const LeftSide = styled(LSAtom)`
  padding-top: 3pt;
`;

export default RangeActivityDisplay;
