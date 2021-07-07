import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { parseDraftText } from '/imports/pdf/core/api/helpers';

import {
  Text as TextAtom,
  StyledHeading,
  NestedItem
} from '/imports/pdf/sydney/ui/atoms';
import DateRangeDisplay from './DateRangeDisplay';
import { View } from '/imports/pdf/core/ui/atoms';

class RangeActivityDisplay extends PureComponent {
  render() {
    const { title, employer, startDate, endDate, current, description, showOnlyYear, blockType } = this.props;
    return (
      <NestedItem courses={blockType && (blockType === 'COURSES')}>
        <Header>
          <LeftSide>
            <StyledHeading>
              {title && <Title>{title}</Title>}
              {employer && <Company>{employer}</Company>}
            </StyledHeading>
          </LeftSide>
          <RightSide>
            <DateRangeDisplay
              startDate={startDate}
              endDate={endDate}
              current={current}
              showOnlyYear={showOnlyYear}
            />
          </RightSide>
        </Header>
        <Description>
          {
            (description === null || description === '') ?
              <Text>{description}</Text>
              : parseDraftText(description, TextAtom, 'sydney')
          }
        </Description>
      </NestedItem>
    );
  }
}

const Text = styled(TextAtom)`
  font-family: 'Raleway SemiBold';
  text-transform: uppercase;
  font-size: 12px;
  line-height: 20px;
`;

const Description = styled(View)`
`;

const Header = styled(View)`
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const LeftSide = styled(View)`
  width: 69.5%;
  padding-right: 10px;
`;

const RightSide = styled(View)`
  width: 30.5%;
  border-left: 1px solid #2d2d2d;
  padding-left: 18px;
`;

const Title = styled(Text)`
  color: #000;
`;

const Company = styled(Text)`

`;

export default RangeActivityDisplay;
