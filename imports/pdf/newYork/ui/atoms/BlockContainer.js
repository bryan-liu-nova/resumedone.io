import React from 'react';
import styled, { css } from 'styled-components';

import { View } from '/imports/pdf/core/ui/atoms';

const BlockContainer = styled(View)`
  position: relative;
  padding-left: 18pt;
`;

const Decoration = styled(View)`
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  border: 1.5px solid #212121;
  background: #fff;
  top: 4px;
  left: -5.5px;
  ${p => p.isPlaceholder && css`
    border-color: #dadada;
  `}
`;

export default ({ children, isPlaceholder }) => (
  <BlockContainer>
    {children}
    <Decoration isPlaceholder={isPlaceholder} />
  </BlockContainer>
);
