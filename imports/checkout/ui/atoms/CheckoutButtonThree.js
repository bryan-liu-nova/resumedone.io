import React from 'react';
import styled, { css } from 'styled-components';
import { darken } from 'polished';

import { Button } from '/imports/core/ui/atoms';

const CheckoutButton = styled(Button)`
  height: 44px;
  border-radius: 4px;
  background-color: #ff6600;
  width: 100%;
  font-family: ${({ theme }) => theme.font.family.correctText};
  font-size: 17px;
  letter-spacing: 2px;
  font-weight: 600;
  border: none;
  &:hover {
    background: ${darken(0.1, '#ff6600')};
  }
`;

export default CheckoutButton;
