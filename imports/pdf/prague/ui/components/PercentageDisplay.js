import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { View } from '/imports/pdf/core/ui/atoms';
import { Text as TextAtom } from '/imports/pdf/prague/ui/atoms';

class PercentageDisplay extends PureComponent {
  render() {
    const { title, percentage, hideStripe } = this.props;
    return (
      <Cont>
        <Text>{title}</Text>
        {
          !hideStripe &&
          <LevelStripe>
            <Stripe percentage={percentage} />
          </LevelStripe>
        }
      </Cont>
    );
  }
}

export const Text = styled(TextAtom)`
  margin-bottom: 4px;
  line-height: 1;
`;

const Cont = styled(View)`
  margin-bottom: 8px;
`;

const LevelStripe = styled(View)`
  position: relative;
  height: 4px;
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
  background: #404040;
`;

export default PercentageDisplay;