import React from 'react';
import styled, { css } from 'styled-components';

import { View } from '/imports/pdf/core/ui/atoms';

const BlockItem = styled(View)`
  margin-bottom: 50px;
  ${p => p.left && css`
    margin-bottom: 30px;
    padding-top: 26px;
    border-top: 1px solid #2d2d2d;
  `}
  ${p => p.summary && css`
    margin-bottom: 50px;
  `}
`;

export default BlockItem;