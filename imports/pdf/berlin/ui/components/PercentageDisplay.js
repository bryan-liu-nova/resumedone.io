import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';

import { View } from '/imports/pdf/core/ui/atoms';
import { Text as TextAtom } from '/imports/pdf/berlin/ui/atoms';
import { theme } from '/imports/core/ui/theme';

class PercentageDisplay extends PureComponent {
  render() {
    const { title, percentage, color, hideStripe, isPlaceholder } = this.props;
    return (
      <Cont>
        <Text isPlaceholder={isPlaceholder}>
          {title}
        </Text>
        {
          !hideStripe &&
          <LevelStripe isPlaceholder={isPlaceholder}>
            <Stripe percentage={percentage} color={color} />
          </LevelStripe>
        }
      </Cont>
    );
  }
}

export const Text = styled(TextAtom)`
  font-size: 10pt;
  font-weight: 400;
`;

const Cont = styled(View)`
  margin: 0 0 12pt 0;
`;

const LevelStripe = styled(View)`
  position: relative;
  height: 6px;
  margin-top: 3pt;
  width: 100%;
  background-color: ${theme.colors.gray.light};
  ${p => p.isPlaceholder && css`
    opacity: 0.15;
  `}
`;

const Stripe = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
  width: ${p => p.percentage}%;
  height: 100%;
  background: ${p => theme.colors[p.color]};
`;

export default PercentageDisplay;
