import React from 'react';
import styled, { css } from 'styled-components';

const OnboardingSocialButton = styled.a`
  width: 100%;
  height: 48px;
  margin-bottom: 16px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  border-radius: 3px;
  padding-left: 60px;
  background-repeat: no-repeat;
  background-size: 24px 24px;
  background-position: 12px 12px;
  color: #fff;
  cursor: pointer;
  position: relative;
  font-size: ${({ theme }) => theme.font.size.h6};
  text-decoration: none;
  &::before {
    content: '';
    position: absolute;
    display: block;
    top: 0;
    bottom: 0;
    left: 48px;
    width: 1px;
    background-color: rgba(0,0,0,0.2);
  }
  ${({ fb }) => fb && css`
    background-color: #537bc0;
    background-image: url(/img/onboarding/facebook.svg);
    &:hover {
      background-color: #436db7;
    }
  `}
  ${({ li }) => li && css`
    background-color: #0077b5;
    background-image: url(/img/onboarding/linkedin.svg);
    &:hover {
      background-color: #00669c;
    }
  `}
  ${({ gm }) => gm && css`
    background-color: #d34836;
    background-image: url(/img/onboarding/google.svg);
    &:hover {
      background-color: #c43d2b;;
    }
  `}
`;

export default OnboardingSocialButton;
