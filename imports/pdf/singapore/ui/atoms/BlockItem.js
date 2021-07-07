import React from 'react';
import styled, { css } from 'styled-components';

import { View } from '/imports/pdf/core/ui/atoms';

const BlockItem = styled(View)`
  margin-bottom: 6pt;
  ${p => p.dateView && css`
    margin-bottom: 28pt;
  `}
`;

export default BlockItem;
