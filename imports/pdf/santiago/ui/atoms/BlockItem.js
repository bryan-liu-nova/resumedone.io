import React from 'react';
import styled, { css } from 'styled-components';

import { View } from '/imports/pdf/core/ui/atoms';

const BlockItem = styled(View)`
  padding-top: 6pt;
  margin-bottom: 14pt;
  ${p => p.percentage && css`
    margin-bottom: 8pt;
  `}
  ${p => p.hobbies && css`
    margin-bottom: 8pt;
  `}
  ${p => p.courses && css`
    margin-bottom: 0;
  `}
  ${p => p.details && css`
    margin-bottom: 15pt;
  `}
  ${p => p.summary && css`
  `}
  ${p => p.zero && css`
    margin-bottom: 0;
  `}
`;

export default BlockItem;
