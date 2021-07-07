import React from 'react';
import styled, { css } from 'styled-components';

import { View } from '/imports/pdf/core/ui/atoms';
import Heading from './Heading';

const LineHeading = styled(Heading)`
  position: absolute;
  display: inline-block;
  border-bottom-style: solid;
  border-bottom-color: #000;
  border-bottom-width: 2px;
  padding-bottom: 3px;
  ${p => p.isPlaceholder && css`
    opacity: 1;
    border-bottom-color: #d9d9d9;
  `}
`;

const Container = styled(View)`
  position: relative;
  height: 26pt;
  margin-bottom: 10pt;
`;

export default ({ children, isPlaceholder }) => (
  <Container minPresenceAhead={100}>
    <LineHeading isPlaceholder={isPlaceholder}>
      {children}
    </LineHeading>
  </Container>
);
