import React from 'react';
import styled, { css } from 'styled-components';

import { View } from '/imports/pdf/core/ui/atoms';

const Separator = styled(View)`
  margin-bottom: 8pt;
  ${p => p.isPlaceholder && css`
    opacity: 0.15;
  `}
`;

const LineOne = styled(View)`
  width: 100%;
  height: 2px;
  background-color: #000;
  margin-bottom: 3px;
`;

const LineTwo = styled(View)`
  width: 100%;
  height: 1px;
  background-color: #666;
`;

export default ({ isPlaceholder }) => (
  <Separator isPlaceholder={isPlaceholder}>
    <LineOne />
    <LineTwo />
  </Separator>
);
