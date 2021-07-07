import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';

import { View } from '/imports/pdf/core/ui/atoms';
import { Text as TextAtom } from '/imports/pdf/stockholm/ui/atoms';
import { theme } from '/imports/core/ui/theme';

class PercentageDisplay extends PureComponent {
  render() {
    const { title, percentage, color, hideStripe, isPlaceholder } = this.props;
    return (
      <Cont>
        <Text isPlaceholder={isPlaceholder}>{title}</Text>
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
  color: #2c2c2c;
`;

const Cont = styled(View)`
  margin: 2pt 0 7pt 0;
  padding-right: 6pt;
`;

const LevelStripe = styled(View)`
  position: relative;
  height: 3px;
  margin-top: 0;
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
