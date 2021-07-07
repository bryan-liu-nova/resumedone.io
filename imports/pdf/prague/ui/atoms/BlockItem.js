import React from 'react';
import styled, { css } from 'styled-components';

import { View } from '/imports/pdf/core/ui/atoms';

const BlockItem = styled(View)`
  padding-top: 25px;
  margin-bottom: 25px;
  border-top: 1px solid #404040;
  ${p => p.left && css`
    padding-top: 20px;
    margin-bottom: 20px;
  `}
`;

export default BlockItem;