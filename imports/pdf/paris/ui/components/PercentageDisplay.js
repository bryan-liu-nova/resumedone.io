import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';

import { View } from '/imports/pdf/core/ui/atoms';
import { Text as TextAtom } from '/imports/pdf/paris/ui/atoms';
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
            <Stripe percentage={percentage} />
          </LevelStripe>
        }
      </Cont>
    );
  }
}

export const Text = styled(TextAtom)`
  font-size: 10.5pt;
  color: #2d2d2d;
`;

const Cont = styled(View)`
  margin-top: 5pt;
  margin-bottom: 4pt;
`;

const LevelStripe = styled(View)`
  position: relative;
  height: 2px;
  margin-top: 5pt;
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
  background: #444444;
`;

export default PercentageDisplay;
