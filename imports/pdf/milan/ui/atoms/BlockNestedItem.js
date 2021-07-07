import React from 'react';
import styled, { css } from 'styled-components';

import { View } from '/imports/pdf/core/ui/atoms';

const BlockNestedItem = styled(View)`
  margin-bottom: 8pt;
  ${p => p.lastChild && css`
    margin-bottom: 0;
  `}
  ${p => p.sidebar && css`
    margin-bottom: 4pt;
  `}
`;

export default BlockNestedItem;
