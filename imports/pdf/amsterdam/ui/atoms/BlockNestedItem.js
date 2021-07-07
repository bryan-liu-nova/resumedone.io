import React from 'react';
import styled, { css } from 'styled-components';

import { View } from '/imports/pdf/core/ui/atoms';

const BlockNestedItem = styled(View)`
  margin-bottom: 11pt;
  ${p => p.last && css`
    margin-bottom: 18pt;
  `}
`;

export default BlockNestedItem;
