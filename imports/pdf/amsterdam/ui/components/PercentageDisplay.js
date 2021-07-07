import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';

import { View } from '/imports/pdf/core/ui/atoms';
import { Text as TextAtom } from '/imports/pdf/amsterdam/ui/atoms';
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
  font-size: 8.25pt;
  color: #373737;
`;

const Cont = styled(View)`
  margin: 2pt 0 5pt 0;
`;

const LevelStripe = styled(View)`
  position: relative;
  height: 8pt;
  margin-top: 4pt;
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
  width: 10px;
  height: 10px;
  margin-right: 12px;
  border-radius: 5px;
  background: #fff;
  border: solid 1px #212121;
  ${p => p.fill && css`
    background: #212121;
  `}
`;

export default PercentageDisplay;
