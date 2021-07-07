import React from 'react';
import styled from 'styled-components';

import { View } from '/imports/pdf/core/ui/atoms';

const Container = styled(View)`
  position: relative;
  width: 100%;
  height: 20px;
  justify-content: center;
  margin-bottom: 4px;
`;

const Line = styled(View)`
  width: 100%;
  height: 1px;
  background: #404040;
`;

const Decoration = styled(View)`
  position: absolute;
  width: 10px;
  height: 10px;
  top: 5px;
  left: 50%;
  border: 1px solid #404040;
  transform: translateX(-50%) rotate(45deg);
  background: #fff;
`;

export default () => (
  <Container>
    <Line />
    <Decoration />
  </Container>
);
