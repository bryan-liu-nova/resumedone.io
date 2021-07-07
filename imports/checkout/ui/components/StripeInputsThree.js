import {
  StripeCardInput,
  StripeCVCInput,
  StripeExpiryInput
} from '/imports/checkout/ui/atoms';
import styled, { css } from 'styled-components';
import { CardNumber, InputWrap } from '../atoms/StripeCardInput';
import { CardCVC } from '../atoms/StripeCVCInput';
import { CardExpiry } from '../atoms/StripeExpiryInput';
import React from 'react';

const inputStyle = css`
  height: 40px;
  border-radius: 3px;
  border: solid 1px #d7dee2;
  background-color: #ffffff;
  width: 100%;
  padding: 6px 12px;
  ${({ theme }) => theme.max('md')`
    height: 46px;
    background-color: #f0f4f8;
    border: none;
    padding: 9px 18px;
  `}
`;

const wrapStyle = css`
  min-height: auto;
  background-color: #ffffff;
  ${({ theme }) => theme.max('md')`
    background-color: #f0f4f8;
  `}
`;

const PaymentInput = styled.div`
  ${CardNumber}, ${CardCVC}, ${CardExpiry} {
    ${inputStyle}
  }
  ${InputWrap} {
    ${wrapStyle}
  }
`;

const Card = ({ showInvalidState }) => (
  <PaymentInput>
    <StripeCardInput showInvalidState={showInvalidState} />
  </PaymentInput>
);

const CVC = ({ showInvalidState }) => (
  <PaymentInput>
    <StripeCVCInput showInvalidState={showInvalidState} />
  </PaymentInput>
);

const Expiry = ({ showInvalidState }) => (
  <PaymentInput>
    <StripeExpiryInput showInvalidState={showInvalidState} />
  </PaymentInput>
);

export {
  Card as StripeCardInput,
  CVC as StripeCVCInput,
  Expiry as StripeExpiryInput
};
