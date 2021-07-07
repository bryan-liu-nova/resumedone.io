import React from 'react';
import styled, { css } from 'styled-components';

import { Heading } from '/imports/core/ui/atoms';

const OnboardingSubTitle = styled(p => <Heading level={4} {...p} />)`
  ${({ theme, experiment }) => {
    if (experiment == '0') {
      return css`
        font-size: ${({ theme }) => theme.font.size.h4};
        font-weight: 400;
      `;
    }
    if (experiment == '1') {
      return css`
        font-weight: 500 !important;
        font-size: ${theme.font.size.h6};
        letter-spacing: 1.12px;
      `;
    }
    if (experiment == '2' || experiment == '3') {
      return css`
        font-weight: 500;
        font-size: 16px;
      `;
    }
    if (experiment >= '4') {
      return css`
        font-weight: 300 !important;
        font-size: ${theme.font.size.h6};
        letter-spacing: 1.12px;
        color: #737980 !important;
      `;
    }
  }}
  ${({ theme, experiment }) => experiment > '0' && css`
    font-family: Poppins, sans-serif !important;
  `}
  text-align: center;
  max-width: 640px;
  margin: 7px auto 35px;
  && {
    color: ${({ theme }) => theme.colors.gray.regular};
  }
  ${({ theme }) => theme.max('md')`
    font-size: ${({ theme }) => theme.font.size.h6};
    margin-bottom: 22px;
  `}
`;

export default OnboardingSubTitle;
