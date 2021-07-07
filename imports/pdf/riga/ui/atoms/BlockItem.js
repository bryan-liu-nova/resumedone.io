import React from 'react';
import styled, { css } from 'styled-components';

import { View } from '/imports/pdf/core/ui/atoms';

const BlockItem = styled(View)`
  margin-bottom: 50px;
  ${p => p.left && css`
    margin-bottom: 70px;
  `}
  ${p => p.dateView && css`
    > div:first-child {
      margin-bottom: 40px;
    }
  `}
  &:last-child {
    margin-bottom: 0;
  }
`;

export default BlockItem;