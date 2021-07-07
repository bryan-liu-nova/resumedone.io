import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import { parseDraftText, isDescriptionEmpty } from '/imports/pdf/core/api/helpers';

import { Text as TextAtom, BlockNestedItem, BlockSubHeader, LeftSide as LSAtom, RightSide, FlexContainer } from '/imports/pdf/singapore/ui/atoms';
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
              isPlaceholder={isPlaceholder}
              showOnlyYear={showOnlyYear}
            />
          </LeftSide>
          <RightSide>
            <Container>
              <TitleContainer>
                <BlockSubHeader isPlaceholder={isPlaceholder}>
                  {title}
                </BlockSubHeader>
                {city ? (
                  <City isPlaceholder={isPlaceholder}>
                    {city}
                  </City>
                  ) : null}
              </TitleContainer>
              {degree ? <Degree isPlaceholder={isPlaceholder}>{degree}</Degree> : null}
              <TextCont>
                {
                  (description === null || description === '') ?
                    <Text isPlaceholder={isPlaceholder}>{description}</Text>
                    : parseDraftText(description, Text, 'singapore', { isPlaceholder: isPlaceholder })
                }
              </TextCont>
            </Container>
          </RightSide>
        </FlexContainer>
      </BlockNestedItem>
    );
  }
}

const TextCont = styled(View)`
  margin-top: 9.75pt;
`;

const Text = styled(TextAtom)`
  line-height: 1.6;
`;

const City = styled(TextAtom)`
  font-family: 'HelveticaNeue Italic';
  font-size: 7.5pt;
  text-align: left;
  padding-top: 3pt;
  color: #000;
`;

const Degree = styled(TextAtom)`
  font-size: 10pt;
  margin-top: 2pt;
`;

const TitleContainer = styled(View)`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Container = styled(View)`
  position: relative;
  flex-grow: 1;
  width: 100%;
  padding-right: 3pt;
`;

const LeftSide = styled(LSAtom)`
  padding-top: 3pt;
`;

export default RangeActivityDisplay;
