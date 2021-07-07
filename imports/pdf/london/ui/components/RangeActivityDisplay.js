import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import { parseDraftText, isDescriptionEmpty } from '/imports/pdf/core/api/helpers';

import { Text as TextAtom, BlockNestedItem, BlockSubHeader, LeftSide, RightSide, FlexContainer } from '/imports/pdf/london/ui/atoms';
import DateRangeDisplay from './DateRangeDisplay';
import { View } from '/imports/pdf/core/ui/atoms';

class RangeActivityDisplay extends PureComponent {
  render() {
    const { title, startDate, endDate, current, description, city, isPlaceholder, showOnlyYear } = this.props;
    return (
      <BlockNestedItem date wrap={false}>
        <FlexContainer>
          <LeftSide>
            <DateRangeDisplay
              startDate={startDate}
              endDate={endDate}
              current={current}
              showOnlyYear={showOnlyYear}
              isPlaceholder={isPlaceholder}
            />
          </LeftSide>
          <RightSide noflex>
            <FlexContainer>
              <LeftSide title>
                <BlockSubHeader isPlaceholder={isPlaceholder}>{title}</BlockSubHeader>
              </LeftSide>
              {
                city &&
                  <RightSide title>
                    <City isPlaceholder={isPlaceholder}>
                      {city}
                    </City>
                  </RightSide>
              }
            </FlexContainer>
            <TextCont>
              {
                (description === null || description === '') ?
                  <Text isPlaceholder={isPlaceholder}>{description}</Text>
                  : parseDraftText(description, EditorText, 'london', { isPlaceholder: isPlaceholder })
              }
            </TextCont>
          </RightSide>
        </FlexContainer>
      </BlockNestedItem>
    );
  }
}

const TextCont = styled(View)`
  margin-top: 2pt;
  margin-bottom: 0;
`;

const Text = styled(TextAtom)`
  font-size: 9pt;
  line-height: 1.2;
  padding-right: 15pt;
`;

const EditorText = styled(Text)`
`;

const City = styled(TextAtom)`
  font-size: 7.5pt;
  text-align: right;
  padding-top: 4pt;
  ${p => !p.isPlaceholder && css`
    color: #323232;
  `}
`;

export default RangeActivityDisplay;
