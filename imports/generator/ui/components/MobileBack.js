import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';

export default styled.button`
  font-weight: normal;
  text-transform: none;
  font-size: 14px;
  left: 25px;
  top: 0;
  border: none;
  background: transparent;
  transform: rotateZ(180deg);
  color: ${p => p.theme.colors.primary};
  cursor: pointer;
  ${p => p.hide && css`
    opacity: 0;
    pointer-events: none;
  `}
`;
