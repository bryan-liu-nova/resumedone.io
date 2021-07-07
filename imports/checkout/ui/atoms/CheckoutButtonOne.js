import React from 'react';
import styled, { css } from 'styled-components';
import { darken } from 'polished';

import { Button } from '/imports/core/ui/atoms';

const CheckoutButtonOne = styled(Button)`
  height: 48px;
  width: 100%;
  border-radius: 3px;
  background-color: #ff8000;
  font-family: ${({ theme }) => theme.font.family.correctText};
  font-size: 18px;
  letter-spacing: 1px;
  font-weight: 600;
  border: none;
  &:hover {
    background: ${darken(0.1, '#ff8000')};
  }
`;

export default CheckoutButtonOne;
