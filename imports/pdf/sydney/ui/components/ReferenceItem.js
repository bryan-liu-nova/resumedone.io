import React, { PureComponent } from 'react';
import styled from 'styled-components';

import {
  Text as TextAtom,
  StyledHeading,
  NestedItem
} from '/imports/pdf/sydney/ui/atoms';
import { View } from '/imports/pdf/core/ui/atoms';

class RangeActivityDisplay extends PureComponent {
  render() {
    const { title, company, phone, email } = this.props;
    return (
      <NestedItem>
        <Header>
          <LeftSide>
            <StyledHeading>
              {title && <Title>{title}</Title>}
            </StyledHeading>
          </LeftSide>
          <RightSide>
            {company && <Company>{company}</Company>}
          </RightSide>
        </Header>
        <Description>
          <span>P: {phone}</span>{} | <span>E: {email}</span>
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

const Description = styled(TextAtom)`
  span {
    font-weight: 700;
    color: #000;
  }
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
