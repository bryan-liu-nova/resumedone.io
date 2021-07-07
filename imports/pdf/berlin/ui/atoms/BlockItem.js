import React from 'react';
import styled, { css } from 'styled-components';

import { View } from '/imports/pdf/core/ui/atoms';

const BlockItem = styled(View)`
  margin-bottom: 6pt;
  ${p => p.courses && css`
    margin-bottom: 0;
  `}
  ${p => p.isPlaceholder && css`
    border-top-color: #e2e2e2;
  `}
`;

export default BlockItem;
