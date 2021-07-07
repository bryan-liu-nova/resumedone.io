import React from 'react';
import styled, { css } from 'styled-components';
import { theme } from '/imports/core/ui/theme';

import { View } from '/imports/pdf/core/ui/atoms';

const StyledItemContainer = styled(View)`
  position: relative;
  padding-left: 18px;
`;

const Decoration = styled(View)`
  position: absolute;
  width: 9px;
  height: 9px;
  border-radius: 5px;
  background: #bbbcbe;
  top: 3px;
  left: -5px;
  z-index: 10;
`;

export default ({ children, color }) => (
  <StyledItemContainer>
    {children}
    <Decoration color={color} />
  </StyledItemContainer>
);
