import React from 'react';
import styled, { css } from 'styled-components';

import { View } from '/imports/pdf/core/ui/atoms';

const BlockNestedItem = styled(View)`
  margin-bottom: 14pt;
  &:not(:last-of-type) {
    margin-bottom: 0;
  }
  ${p => p.date && css`
    margin-bottom: 0;
  `}
`;

export default BlockNestedItem;
