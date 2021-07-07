import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';

import { View } from '/imports/pdf/core/ui/atoms';
import { Text as TextAtom } from '/imports/pdf/newYork/ui/atoms';
import { theme } from '/imports/core/ui/theme';

class PercentageDisplay extends PureComponent {
  render() {
    const { title, percentage, color, hideStripe, isPlaceholder } = this.props;
    return (
      <Cont>
        <TextCont isPlaceholder={isPlaceholder}>{title}</TextCont>
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
  font-weight: 400;
`;

const Cont = styled(View)`
  margin-bottom: 12pt;
`;

const LevelStripe = styled(View)`
  position: relative;
  height: 2.5px;
  margin-top: 8pt;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
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

const TextCont = styled(Text)`
  font-size: 10.5pt;
  color: #3a3a3a;
`;

export default PercentageDisplay;
