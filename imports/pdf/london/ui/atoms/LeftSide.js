import React from 'react';
import styled, { css } from 'styled-components';

import { View } from '/imports/pdf/core/ui/atoms';

const LeftSide = styled(View)`
  width: 25%;
  ${p => p.details && css`
    width: 33%;
  `}
  ${p => p.title && css`
    width: 75%;
  `}
  ${p => p.half && css`
    width: 50%;
  `}
`;

export default LeftSide;
