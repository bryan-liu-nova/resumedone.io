import React from 'react';
import styled, { css } from 'styled-components';

import { View } from '/imports/pdf/core/ui/atoms';

const BlockItem = styled(View)`
  padding-top: 26px;
  border-top: 1px solid #bbbcbe;
  margin-bottom: 22px;
  ${p => p.dateView && css`
  `}
  ${p => p.left && css`
    margin-bottom: 34px;
    border-top-color: #808183;
  `}
  ${p => p.summary && css`
    border-top-color: transparent;
  `}
`;

export default BlockItem;