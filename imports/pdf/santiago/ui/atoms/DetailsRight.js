import React from 'react';
import styled, { css } from 'styled-components';

import { View } from '/imports/pdf/core/ui/atoms';

const DetailsRight = styled(View)`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  background: #fff;
  padding-left: 4pt;
  padding-top: 1pt;
`;

export default DetailsRight;
