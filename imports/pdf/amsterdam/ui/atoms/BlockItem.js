import React from 'react';
import styled, { css } from 'styled-components';

import { View } from '/imports/pdf/core/ui/atoms';

const BlockItem = styled(View)`
  margin-bottom: 10pt;
  ${p => p.left && css`
    margin-bottom: 18pt;
  `}
  ${p => p.links && css`
    margin-bottom: 15pt;
  `}
  ${p => p.courses && css`
    margin-bottom: 0;
  `}
`;

export default BlockItem;
