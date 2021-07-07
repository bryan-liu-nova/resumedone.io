import React from 'react';
import styled, { css } from 'styled-components';

import { View } from '/imports/pdf/core/ui/atoms';

const BlockItem = styled(View)`
  margin-bottom: 20pt;
  ${p => p.profile && css`
    margin-bottom: 30pt;
  `}
  ${p => p.right && css`
    margin-bottom: 24pt;
  `}
  ${p => p.links && css`
    margin-bottom: 10pt;
  `}
  ${p => p.percentage && css`
    margin-bottom: 9pt;
  `}
  ${p => p.sidebar && css`
    margin-bottom: 24pt;
  `}
`;

export default BlockItem;
