import React from 'react';
import styled, { css } from 'styled-components';

import { View, Text } from '/imports/pdf/core/ui/atoms';

const Filler = ({ long, references, isPlaceholder }) => (
  <Container long={long} references={references} isPlaceholder={isPlaceholder}>
    <Dots>
      { '. '.repeat(long ? 162 : 78) }
    </Dots>
  </Container>
);

const Container = styled(View)`
  position: absolute;
  left: 0;
  right: 0;
  top: 2pt;
  width: 100%;
  height: 1em;
  overflow: hidden;
  z-index: 1;
  ${p => p.long && css`
    top: 6pt;
  `}
  ${p => p.references && css`
    top: 2pt;
  `}
  ${p => p.isPlaceholder && css`
    opacity: 0.15;
  `}
`;

const Dots = styled(Text)`
  font-size: 8pt;
`;

export default Filler;
