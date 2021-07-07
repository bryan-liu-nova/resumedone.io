import React from 'react';
import styled, { css } from 'styled-components';

import { Button } from '/imports/core/ui/atoms/index';

const LineButton = styled(p => <Button unstyled {...p} />)`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 17px;
  text-transform: none;
  ${({ theme, danger }) => danger && css`
    color: ${theme.colors.danger};
  `}
  ${({ right }) => right && css`
    float: right;
  `}
  &:disabled {
    background: none;
    color: ${({ theme }) => theme.colors.gray.regular};
    cursor: auto;
  }
  ${({ theme, right }) => theme.max('sm')`
    ${ right && css`
      float: left;
    `}
  `}
`;

export default LineButton;