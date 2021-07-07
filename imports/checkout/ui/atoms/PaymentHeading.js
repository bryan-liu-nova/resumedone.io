import React from 'react';
import styled from 'styled-components';

const PaymentHeading = styled.h2`
  font-family: ${({ theme }) => theme.font.family.openSans};
  display: inline;
  float: left;
  font-size: 28px;
  margin: 0;
  padding: 0 0 20px;
  color: ${({ theme }) => theme.colors.gray.darker};
  ${({ theme }) => theme.max('sm')`
    font-size: 22px;
  `}
`;

export default PaymentHeading;
