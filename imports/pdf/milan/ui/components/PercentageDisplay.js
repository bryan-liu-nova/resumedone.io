import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';

import { View } from '/imports/pdf/core/ui/atoms';
import { Text as TextAtom } from '/imports/pdf/milan/ui/atoms';
import { theme } from '/imports/core/ui/theme';

class PercentageDisplay extends PureComponent {
  render() {
    const { title, percentage, hideStripe, isPlaceholder } = this.props;
    return (
      <Cont>
        <Text isPlaceholder={isPlaceholder}>
          {title}
        </Text>
        {
          !hideStripe &&
          <LevelStripe isPlaceholder={isPlaceholder}>
            {
              Array.from({ length: 5 }).map((x, i) => <Stripe key={i} fill={i < percentage/20} />)
            }
          </LevelStripe>
        }
      </Cont>
    );
  }
}

export const Text = styled(TextAtom)`
  font-family: 'Lato SemiBold';
  font-size: 9pt;
  color: #000;
`;

const Cont = styled(View)`
`;

const LevelStripe = styled(View)`
  position: relative;
  height: 10pt;
  margin-top: 2pt;
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
  width: 8px;
  height: 8px;
  margin-right: 9px;
  border-radius: 4px;
  background: ${theme.colors.gray.light};
  border: 1px solid ${theme.colors.gray.light};;
  ${p => p.fill && css`
    background: #000;
    border-color: #000;
  `}
`;

export default PercentageDisplay;
