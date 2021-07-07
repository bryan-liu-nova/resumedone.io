import React from 'react';
import styled, { css } from 'styled-components';

import { View } from '/imports/pdf/core/ui/atoms';

const BlockInnerItem = styled(View)`
  &:last-child {
    & > div > div {
      padding-bottom: 0;
    }
  }
  ${p => p.flexView && css`
    width: 43%;
    margin-bottom: 16px;
  `}
  ${p => p.languages && css`
    margin-bottom: 10px;
  `}
`;

export default BlockInnerItem;
