import React from 'react';
import styled, { css } from 'styled-components';
import { UnspinFrame } from '/imports/core/ui/atoms';

const OnboardingSocialIcon = styled.a`
  position: absolute;
  width: 28px;
  height: 28px;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  animation: ${UnspinFrame} 10s linear infinite;
  ${({ fb }) => fb && css`
    top: -14px;
    left: 67px;
    background-image: url(/img/onboarding/icon-facebook.svg);
  `}
  ${({ li }) => li && css`
    top: 108px;
    left: 137px;
    background-image: url(/img/onboarding/icon-linkedin.svg);
  `}
  ${({ gm }) => gm && css`
    top: 108px;
    left: -3px;
    background-image: url(/img/onboarding/icon-google.svg);
  `}
`;

export default OnboardingSocialIcon;
