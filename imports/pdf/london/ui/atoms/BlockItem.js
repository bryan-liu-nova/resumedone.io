import React from 'react';
import styled, { css } from 'styled-components';

import { View } from '/imports/pdf/core/ui/atoms';

const BlockItem = styled(View)`
  padding-top: 7.5pt;
  margin-bottom: 16.5pt;
  border-top-style: solid;
  border-top-color: #000000;
  border-top-width: 0.75pt;
  ${p => p.details && css`
    padding-top: 6pt;
  `}
  ${p => p.links && css`
    margin-bottom: 4pt;
  `}
  ${p => p.percentage && css`
    margin-bottom: 7.3pt;
  `}
  ${p => p.courses && css`
    margin-bottom: 8pt;
  `}
  ${p => p.isPlaceholder && css`
    border-top-color: #ececec;
  `}
`;

export default BlockItem;
