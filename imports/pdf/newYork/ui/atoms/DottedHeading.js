import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';

import { View, Text } from '/imports/pdf/core/ui/atoms';
import { theme } from '/imports/core/ui/theme';

class DottedHeading extends PureComponent {
  render() {
    return (
      <Container minPresenceAhead={100}>
        <ItemContainer>
          <Dot />
        </ItemContainer>
        <ItemContainer>
          <Item>
            {this.props.children}
          </Item>
        </ItemContainer>
        <ItemContainer>
          <Dot />
        </ItemContainer>
      </Container>
    );
  }
}

const Dot = styled(View)`
  display: inline-block;
  width: 6px;
  height: 6px;
  border: 1px solid #242424;
  border-radius: 5pt;
  background-color: #fff;
  top: -1.5px;
`;

const ItemContainer = styled(View)`
  display: inline-block;
  padding: 0 3pt;
`;

const Item = styled(Text)`
  font-family: 'Oswald';
  font-size: 10.5pt;
  font-weight: 400;
  text-transform: uppercase;
  color: #2c2c2c;
`;

const Container = styled(View)`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 8pt;
  position: relative;
`;

export default DottedHeading;
