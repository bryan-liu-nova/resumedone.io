import React from 'react';
import styled, { css } from 'styled-components';

import { View } from '/imports/pdf/core/ui/atoms';

const DetailsLeft = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  background: #fff;
  padding-right: 4pt;
  ${p => p.icon && css`
    padding-left: 15pt;
  `}
`;

export default DetailsLeft;
