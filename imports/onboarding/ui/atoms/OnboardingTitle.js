import React from 'react';
import styled, { css } from 'styled-components';

import { Heading } from '/imports/core/ui/atoms';

const OnboardingTitle = styled(p => <Heading level={1} {...p} />)`
  ${({ theme, experiment }) => {
    if (experiment == '1' || experiment >= '4') {
      return css`
        font-family: Poppins, sans-serif !important;
        margin-bottom: 7px;
      `;
    }
    if (experiment == '2' || experiment == '3') {
      return css`
        font-family: Poppins, sans-serif !important;
        font-weight: 600 !important;
        font-size: 34px !important;
      `;
    }
  }}
  font-size: 36px;
  font-weight: 700;
  text-align: center;
  color: ${({ theme }) => theme.colors.black};
  margin: 0;
  line-height: 1.5;
  ${({ theme }) => theme.max('md')`
    font-size: ${({ theme }) => theme.font.size.h3};
    margin-top: 32px;
    margin-bottom: 12px;
  `}
`;

export default OnboardingTitle;
