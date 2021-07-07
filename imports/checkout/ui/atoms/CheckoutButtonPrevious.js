import React from 'react';
import styled, { css } from 'styled-components';

import { Button } from '/imports/core/ui/atoms';

const CheckoutButtonPrevious = styled(p => <Button {...p} />)`
  background: transparent;
  border-radius: 40px;
  min-width: 290px;
  font-size: 15px;
  position: relative;
  padding: 18px 20px 19px 0;
  padding-left: 35px;
  display: inline-block;
  margin-bottom: 10px;
  color: #9e9e9e;
  font-family: ${({ theme }) => theme.font.family.openSans};
  font-weight: 400;
  border: none;
  ${p =>
    p.centered &&
    css`
      display: block;
      margin-left: auto;
      margin-right: auto;
    `}
  &:hover {
    box-shadow: none;
    text-decoration: underline;
    background: transparent;
  }
`;

export default CheckoutButtonPrevious;
