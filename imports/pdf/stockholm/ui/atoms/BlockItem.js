import React from 'react';
import styled, { css } from 'styled-components';

import { View } from '/imports/pdf/core/ui/atoms';

const BlockItem = styled(View)`
  margin-bottom: 11pt;
  ${p => p.padded && css`
    padding-left: 21pt;
    margin-bottom: 2pt;
  `}
  ${p => p.profile && 'margin-bottom: 12pt;'}
  ${p => p.links && 'margin-bottom: 15pt;'}
  ${p => p.courses && 'margin-bottom: 3pt;'}
`;

export default BlockItem;
