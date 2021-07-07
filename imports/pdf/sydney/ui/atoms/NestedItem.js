import React from 'react';
import styled, { css } from 'styled-components';

import { View } from '/imports/pdf/core/ui/atoms';

const NestedItem = styled(View)`
  margin-bottom: 50px;
  ${p => p.education && css`
    margin-bottom: 30px;
  `}
  ${p => p.courses && css`
    margin-bottom: 20px;
  `}
`;

export default NestedItem;
