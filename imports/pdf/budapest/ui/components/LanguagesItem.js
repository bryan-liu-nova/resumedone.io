import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import { theme } from '/imports/core/ui/theme';

import { View } from '/imports/pdf/core/ui/atoms';
import { Text as TextAtom } from '/imports/pdf/budapest/ui/atoms';

class LanguagesItem extends PureComponent {
  render() {
    const { title, percentage, hideStripe, color } = this.props;
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
  width: 9px;
  height: 9px;
  top: 2px;
  left: 0;
  background-color: #fff;
  border-radius: 5px;
`;

const Text = styled(TextAtom)`
  text-transform: uppercase;
  font-size: 12px;
  color: #e6e6e7;
`;

const LevelStripe = styled(View)`
  position: relative;
  height: 6px;
  margin-top: 0;
  width: 100%;
  background-color: #fff;
`;

const Stripe = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
  width: ${p => p.percentage}%;
  height: 100%;
  background: #bbbcbe;
`;

export default LanguagesItem;
