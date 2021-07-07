import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import { theme } from '/imports/core/ui/theme';
import { parseDraftText, isDescriptionEmpty } from '/imports/pdf/core/api/helpers';

import {
  Text,
  BlockNestedItem,
  SubHeader,
  StyledItemContainer
} from '/imports/pdf/budapest/ui/atoms';
import DateRangeDisplay from './DateRangeDisplay';
import { View } from '/imports/pdf/core/ui/atoms';

class RangeActivityDisplay extends PureComponent {
  render() {
    const { title, employer, startDate, endDate, current, description, showOnlyYear, lastChild, color } = this.props;
    return (
      <BlockNestedItem flexView>
          <LeftSide>
            {employer && <SubHeader upper color={color}>{employer}</SubHeader>}
            <DateRangeDisplay
              startDate={startDate}
              endDate={endDate}
              current={current}
              showOnlyYear={showOnlyYear}
            />
          </LeftSide>
          <RightSide lastChild={lastChild}>
            <StyledItemContainer>
              <SubHeader>{title}</SubHeader>
              <TextCont>
                {
                  (description === null || description === '') ?
                    <Text>{description}</Text>
                    : parseDraftText(description, Text, 'budapest')
                }
              </TextCont>
            </StyledItemContainer>
          </RightSide>
      </BlockNestedItem>
    );
  }
}

const TextCont = styled(View)`
`;

const LeftSide = styled(View)`
  width: 31%;
  padding-right: 10px;
`;

const RightSide = styled(View)`
  width: 69%;
  border-left: 1px solid #bbbcbe;
  padding-bottom: 20px;
`;

export default RangeActivityDisplay;
