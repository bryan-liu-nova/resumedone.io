import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { parseDraftText, isDescriptionEmpty } from '/imports/pdf/core/api/helpers';

import { Text as TextAtom, BlockNestedItem, Heading, BlockSubHeader, LeftSide as LSAtom, RightSide, FlexContainer } from '/imports/pdf/moscow/ui/atoms';
import DateRangeDisplay from './DateRangeDisplay';
import { View } from '/imports/pdf/core/ui/atoms';
import { theme } from '/imports/core/ui/theme';

class RangeActivityDisplay extends PureComponent {
  render() {
    const { title, startDate, endDate, current, description, color, city, degree, isPlaceholder, showOnlyYear } = this.props;
    return (
      <BlockNestedItem wrap={false}>
        <FlexContainer>
          <LeftSide>
            <DateRangeDisplay
              startDate={startDate}
              endDate={endDate}
              current={current}
              color={color}
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
                    : parseDraftText(description, Text, 'moscow', { isPlaceholder: isPlaceholder })
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
  margin-top: 8pt;
`;

const Text = styled(TextAtom)`
`;

const City = styled(TextAtom)`
  font-size: 8.5pt;
  text-align: right;
`;

const Degree = styled(TextAtom)`
  font-size: 11.25pt;
  margin-top: 8pt;
  line-height: 1;
  color: #797979;
`;

const LeftSide = styled(LSAtom)`
  padding-top: 4pt;
`;

export default RangeActivityDisplay;
