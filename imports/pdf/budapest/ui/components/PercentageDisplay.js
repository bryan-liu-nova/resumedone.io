import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import { theme } from '/imports/core/ui/theme';

import { View } from '/imports/pdf/core/ui/atoms';
import { Text as TextAtom } from '/imports/pdf/budapest/ui/atoms';

class PercentageDisplay extends PureComponent {
  render() {
    const { title, percentage, hideStripe, color } = this.props;
    return (
      <Cont>
        <Text>{title}</Text>
        {
          !hideStripe &&
          <LevelStripe>
            <Stripe percentage={percentage} color={color} />
          </LevelStripe>
        }
      </Cont>
    );
  }
}

export const Text = styled(TextAtom)`
  font-size: 10px;
  text-transform: uppercase;
  margin-bottom: 1px;
`;

const Cont = styled(View)`
`;

const LevelStripe = styled(View)`
  position: relative;
  height: 6px;
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
  background-color: #636466;
  ${p => p.color && p.color !== 'black' && css`
    background-color: ${p => theme.colors[p.color]};
  `}
`;

export default PercentageDisplay;