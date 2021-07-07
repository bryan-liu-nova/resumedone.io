import React, { PureComponent } from 'react';
import styled from 'styled-components';

const HeaderBackground = styled.div`
  position: absolute;
  background: ${p => p.theme.colors.darkBlack};
  width: 100%;
  height: 380px;
  z-index: 99;
  display: block;
  top: -60px;
  transform: skewY(-6deg);
  ${({ theme }) => theme.max('xs')`
    transform: none;
  `}
`;

export default HeaderBackground;
