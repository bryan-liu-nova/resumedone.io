import React from 'react';
import styled from 'styled-components';

const PaymentSidebar = styled.div`
  background: ${p => p.theme.colors.gray.lighter};
  border-radius: ${p => p.theme.general.borderRadius};
  display: inline;
  float: left;
  height: 100%;
  left: 0;
  margin: 0;
  padding: 12px 15px 25px 25px;
  top: 0;
  width: 320px;
  ${({ theme }) => theme.max('sm')`
    width: 100%;
    background: #fff;
    padding: 35px 40px;
  `}
  ${({ theme }) => theme.max('xs')`
    padding: 0;
  `}
`;

export default PaymentSidebar;
