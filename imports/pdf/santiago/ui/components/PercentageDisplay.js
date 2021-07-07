import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';

import { View } from '/imports/pdf/core/ui/atoms';
import {
  Text as TextAtom,
  DetailsLeft,
  DetailsRight,
  TextLeft,
  TextRight as TRAtom,
  Filler
} from '/imports/pdf/santiago/ui/atoms';
import { displayLanguageLevel } from '/imports/pdf/core/api/helpers';

class PercentageDisplay extends PureComponent {
  render() {
    const { title, percentage, hideStripe, isPlaceholder } = this.props;
    return (
      <Container>
        <Filler isPlaceholder={isPlaceholder} />

        <DetailsLeft>
          <TextLeft isPlaceholder={isPlaceholder}>
            {title}
          </TextLeft>
        </DetailsLeft>
        {!hideStripe &&
          <DetailsRight>
            <TextRight isPlaceholder={isPlaceholder}>
              {displayLanguageLevel(percentage)}
            </TextRight>
          </DetailsRight>
        }
      </Container>
    );
  }
}

export const Text = styled(TextAtom)`
  font-weight: 400;
`;

const Container = styled(View)`
  position: relative;
  height: 18pt;
`;

const TextRight = styled(TRAtom)`
  text-transform: capitalize;
`;

export default PercentageDisplay;
