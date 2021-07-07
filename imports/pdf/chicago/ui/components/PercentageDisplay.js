import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';

import { View } from '/imports/pdf/core/ui/atoms';
import { Text as TextAtom } from '/imports/pdf/chicago/ui/atoms';

class PercentageDisplay extends PureComponent {
  render() {
    const { title, percentage, hideStripe } = this.props;
    return (
      <View>
        <Container>
          <Decoration />
          <Text>{title}</Text>
        </Container>
        {
          !hideStripe &&
          <LevelStripe>
            <Stripe percentage={percentage} />
          </LevelStripe>
        }
      </View>
    );
  }
}

const Container = styled(View)`
  position: relative;
  padding-left: 16px;
  margin-bottom: 2px;
`;

const Decoration = styled(View)`
  position: absolute;
  width: 5px;
  height: 5px;
  top: 5px;
  left: 0;
  background-color: #252525;
  border-radius: 5px;
`;

const Text = styled(TextAtom)`
`;

const LevelStripe = styled(View)`
  position: relative;
  height: 5px;
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
  background: #000;
`;

export default PercentageDisplay;
