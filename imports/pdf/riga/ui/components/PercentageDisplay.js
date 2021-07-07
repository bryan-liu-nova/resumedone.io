import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import { theme } from '/imports/core/ui/theme';

import { View } from '/imports/pdf/core/ui/atoms';
import { Text as TextAtom } from '/imports/pdf/riga/ui/atoms';

class PercentageDisplay extends PureComponent {
  render() {
    const { title, percentage, hideStripe, color } = this.props;
    return (
      <Item>
        <Container>
          <Decoration color={color} />
          <Text>{title}</Text>
        </Container>
        {
          !hideStripe &&
          <LevelStripe>
            <Stripe percentage={percentage} color={color} />
          </LevelStripe>
        }
      </Item>
    );
  }
}

const Item = styled(View)`
  margin-bottom: 10px;
`;

const Container = styled(View)`
  position: relative;
  padding-left: 16px;
  margin-bottom: 2px;
`;

const Decoration = styled(View)`
  position: absolute;
  width: 6px;
  height: 6px;
  top: 7px;
  left: 0;
  background-color: #929292;
  border-radius: 5px;
  ${p => p.color && p.color !== 'black' && css`
    background-color: ${p => theme.colors[p.color]};
  `}
`;

const Text = styled(TextAtom)`
`;

const LevelStripe = styled(View)`
  position: relative;
  height: 5px;
  margin-top: 0;
  width: 100%;
  background-color: #bbbcbe;
`;

const Stripe = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
  width: ${p => p.percentage}%;
  height: 100%;
  background: #000;
  ${p => p.color && p.color !== 'black' && css`
    background-color: ${p => theme.colors[p.color]};
  `}
`;

export default PercentageDisplay;
