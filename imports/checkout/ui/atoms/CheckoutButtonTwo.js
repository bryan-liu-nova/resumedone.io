import React from 'react';
import styled, { css } from 'styled-components';
import { darken } from 'polished';

import { Button } from '/imports/core/ui/atoms';

const CheckoutButton = styled(Button)`
  height: 38px;
  width: 100%;
  border-radius: 1px;
  background-color: #00b384;
  font-family: ${({ theme }) => theme.font.family.correctText};
  font-size: 18px;
  font-weight: 500;
  border: none;
  &:hover {
    background: ${darken(0.1, '#00b384')};
  }
  && {
    padding: 0;
  }
  ${({ theme }) => theme.max('md')`
    background-color: #429ff0;
    width: 100%
    margin-bottom: 30px;
    &:hover {
      background: ${darken(0.1, '#429ff0')};
    }
 `}
`;

export default CheckoutButton;
