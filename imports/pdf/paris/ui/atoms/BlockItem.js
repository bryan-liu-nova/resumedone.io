import React from 'react';
import styled, { css } from 'styled-components';

import { View } from '/imports/pdf/core/ui/atoms';

const BlockItem = styled(View)`
  margin-bottom: 10pt;
  ${p => p.summary && css`
    margin-bottom: 17pt;
  `}
  ${p => p.courses && css`
    margin-bottom: 7pt;
  `}
  ${p => p.links && css`
    margin-bottom: 18pt;
  `}
  ${p => p.percentage && css`
    margin-bottom: 23pt;
  `}
`;

export default BlockItem;
