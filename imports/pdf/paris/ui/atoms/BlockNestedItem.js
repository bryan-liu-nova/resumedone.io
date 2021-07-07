import React from 'react';
import styled, { css } from 'styled-components';

import { View } from '/imports/pdf/core/ui/atoms';

const BlockNestedItem = styled(View)`
  margin-bottom: 8pt;
  &:not(:last-of-type) {
    margin-bottom: 0;
  }
  ${p => p.sidebar && css`
    margin-top: 0;
    margin-bottom: 2pt;
  `}
`;

export default BlockNestedItem;
