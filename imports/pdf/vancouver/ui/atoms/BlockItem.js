import React from 'react';
import styled, { css } from 'styled-components';

import { View } from '/imports/pdf/core/ui/atoms';

const BlockItem = styled(View)`
  margin-bottom: 28pt;
  ${p => p.details && css`
    margin-bottom: 12pt;
  `}
  ${p => p.summary && css`
    margin-bottom: 17pt;
  `}
  ${p => p.references && css`
    margin-bottom: 12pt;
  `}
  ${p => p.isPlaceholder && css`
    opacity: 0.15;
  `}
`;

export default BlockItem;
