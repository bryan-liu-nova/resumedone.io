import React from 'react';
import styled, { css } from 'styled-components';

import { View } from '/imports/pdf/core/ui/atoms';

const BlockItem = styled(View)`
  margin-bottom: 20pt;
  ${p => p.summary && css`
    margin-bottom: 17pt;
  `}
  ${p => p.sidebar && css`
    margin-bottom: 14pt;
  `}
  ${p => p.percentage && css`
    margin-bottom: 15pt;
  `}
  ${p => p.last && css`
    margin-bottom: 15pt;
  `}
`;

export default BlockItem;
