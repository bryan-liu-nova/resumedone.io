import React from 'react';
import styled, { css } from 'styled-components';

import { View } from '/imports/pdf/core/ui/atoms';

const RightSide = styled(View)`
  width: 70%;
  ${p => p.flex && css`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-right: 8pt;
  `}
  ${p => p.details && css`
    width: 67%;
  `}
  ${p => p.title && css`
    width: 25%;
  `}
  ${p => p.half && css`
    width: 50%;
  `}
`;

export default RightSide;
