import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';

import { View } from '/imports/pdf/core/ui/atoms';
import { Text as TextAtom } from '/imports/pdf/barcelona/ui/atoms';
import { theme } from '/imports/core/ui/theme';

class PercentageDisplay extends PureComponent {
  render() {
    const { title, percentage, hideStripe, color, isPlaceholder } = this.props;
    return (
      <Cont>
        <Text isPlaceholder={isPlaceholder}>
          {title}
        </Text>
        {
          !hideStripe &&
          <LevelStripe isPlaceholder={isPlaceholder}>
            {
              Array.from({ length: 10 }).map((x, i) => <Stripe key={i} fill={i < percentage/10} color={color} />)
            }
          </LevelStripe>
        }
      </Cont>
    );
  }
}

export const Text = styled(TextAtom)`
  font-family: 'PtSerif';
  font-size: 9.75pt;
  line-height: 1;
  margin-bottom: 5pt;
  color: #2c2c2c;
`;

const Cont = styled(View)`
  margin: 1pt 0 8pt 0;
`;

const LevelStripe = styled(View)`
  position: relative;
  height: 10pt;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  ${p => p.isPlaceholder && css`
    opacity: 0.15;
  `}
`;

const Stripe = styled(View)`
  display: inline-block;
  width: 6px;
  height: 6px;
  margin-right: 8px;
  border-radius: 5px;
  background: ${theme.colors.gray.light};
  border: 1pt solid ${theme.colors.gray.light};;
  ${p => p.fill && css`
    background: ${p => theme.colors[p.color]};
    border-color: ${p => theme.colors[p.color]};
  `}
`;

export default PercentageDisplay;
