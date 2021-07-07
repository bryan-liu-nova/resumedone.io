import React from 'react';
import styled, { css } from 'styled-components';

import { View } from '/imports/pdf/core/ui/atoms';

const BlockItem = styled(View)`
  padding-top: 26px;
  border-top: 1px solid #000;
  margin-bottom: 30px;
  ${p => p.left && css`
  `}
  ${p => p.summary && css`
    padding-top: 0;
    border-top-color: transparent;
  `}
`;

export default BlockItem;