import React from 'react';
import styled, { css } from 'styled-components';
import { rgba, darken } from 'polished';

import { Button } from '/imports/core/ui/atoms';

const OnboardingButton = styled(p => <Button unstyled cta {...p} />)`
  // transition: background-color 0.1s ease-out, color 0.1s ease-out;
  box-sizing: border-box;
  text-align: center;
  border: 2px solid transparent;
  border-radius: 3px;
  font-size: ${({ theme }) => theme.font.size.h6};
  position: relative;
  padding: 14px 32px;
  line-height: 1;
  cursor: pointer;
  ${({ experiment }) => experiment >= '4' && css`
    width: 240px;
  `}
  background-color: ${({ theme, experiment }) => experiment >= '3' ? '#f37101' : theme.colors.primary};
  color: ${({ theme }) => theme.colors.gray.lighter};
  &:hover {
    background: ${({ theme, experiment }) => darken(0.05, experiment >= '3' ? '#f37101' : theme.colors.primary)};
    border-color: ${({ theme, experiment }) => darken(0.05, experiment >= '3' ? '#f37101' : theme.colors.primary)};
    color: #ffffff;
  }
  ${({ outline }) => outline && css`
    color: ${({ theme }) => theme.colors.primary}
    background: transparent;
    border-color: ${({ theme }) => theme.colors.primary};
    &:hover {
      color: ${({ theme }) => theme.colors.primary}
      background: ${({ theme }) => rgba(theme.colors.primary, 0.1)};
    }
  `}
  ${({ template }) => template && css`
    margin-bottom: 16px;
  `}
`;

export default OnboardingButton;
