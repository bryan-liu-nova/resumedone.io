import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';

import { View } from '/imports/pdf/core/ui/atoms';
import { Text as TextAtom } from '/imports/pdf/vancouver/ui/atoms';
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
  font-family: 'SolomonSans SemiBold';
  font-weight: 400;
  width: 68%;
`;

const Cont = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 4pt;
  padding-right: 12pt;
  padding-top: 2pt;
`;

const LevelStripe = styled(View)`
  position: relative;
  height: 10pt;
  width: 55pt;
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
  margin-left: 5px;
  border-radius: 4px;
  background: ${theme.colors.gray.light};
  border: 1px solid ${theme.colors.gray.light};;
  ${p => p.fill && css`
    background: #000;
    border-color: #000;
  `}
`;

export default PercentageDisplay;
