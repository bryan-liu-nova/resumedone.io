import React from 'react';
import styled, { css } from 'styled-components';

import { View } from '/imports/pdf/core/ui/atoms';

const BlockItem = styled(View)`
  margin-bottom: 24pt;
  ${p => p.references && css`
    margin-bottom: 18pt;
  `}
  ${p => p.dateView && css`
    margin-bottom: 34pt;
  `}
`;

export default BlockItem;
