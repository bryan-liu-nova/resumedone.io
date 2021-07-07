import React from 'react';
import styled, { css } from 'styled-components';

import { Text as TextAtom, View } from '/imports/pdf/core/ui/atoms';

const Heading = styled(TextAtom)`
  font-family: 'Montserrat SemiBold';
  font-size: 15.5pt;
  letter-spacing: 1.7pt;
  margin-bottom: 2pt;
  text-transform: uppercase;
`;

const Container = styled(View)`
  position: relative;
  margin-bottom: 22pt;
  ${p => p.right && css`
    padding-top: 21pt;
    border-top: 1.2px solid #d8d8d8;
  `}
`;

const Decoration = styled(View)`
  position: absolute;
  bottom: -5pt;
  width: 26pt;
  height: 3px;
  background: #000;
  ${p => p.isPlaceholder && css`
    opacity: 0.15;
  `}
`;

export default ({ children, right, isPlaceholder }) => (
  <Container right={right} wrap={false} minPresenceAhead={100}>
    <Heading>
      {children}
    </Heading>
    <Decoration isPlaceholder={isPlaceholder} />
  </Container>
);
