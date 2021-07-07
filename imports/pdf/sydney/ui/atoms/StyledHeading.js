import React from 'react';
import styled from 'styled-components';

import { View } from '/imports/pdf/core/ui/atoms';

const Container = styled(View)`
  position: relative;
  padding-left: 18px;
`;

const Decoration = styled(View)`
  position: absolute;
  width: 4px;
  height: 4px;
  background: #2d2d2d;
  top: 6px;
  left: 0;
`;

export default ({ children }) => (
  <Container>
    {children}
    <Decoration />
  </Container>
);
