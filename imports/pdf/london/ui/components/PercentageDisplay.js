import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';

import { View } from '/imports/pdf/core/ui/atoms';
import { Text as TextAtom } from '/imports/pdf/london/ui/atoms';
import { displayLanguageLevel } from '/imports/pdf/core/api/helpers';

class PercentageDisplay extends PureComponent {
  render() {
    const { title, percentage, hideStripe, isPlaceholder } = this.props;
    return (
      <Cont>
        <Text isPlaceholder={isPlaceholder}>{title}</Text>
        {
          !hideStripe &&
          <TextValue isPlaceholder={isPlaceholder}>{displayLanguageLevel(percentage)}</TextValue>
        }
      </Cont>
    );
  }
}

export const Text = styled(TextAtom)`
  font-weight: 400;
  font-size: 9pt;
  font-family: 'CrimsonText Bold';
  ${p => !p.isPlaceholder && css`
    color: #121212;
  `}
`;

const TextValue = styled(TextAtom)`
  font-size: 9pt;
  text-transform: capitalize;
`;

const Cont = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 2pt;
`;

export default PercentageDisplay;
