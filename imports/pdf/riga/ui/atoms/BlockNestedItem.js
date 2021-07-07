import React from 'react';
import styled, { css } from 'styled-components';

import { View } from '/imports/pdf/core/ui/atoms';

const BlockNestedItem = styled(View)`
  margin-bottom: 40px;
  ${p => p.courses && css`
    margin-bottom: 25px;
  `}
`;

export default BlockNestedItem;
