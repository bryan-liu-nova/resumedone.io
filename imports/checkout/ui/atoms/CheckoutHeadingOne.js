import React from 'react';
import styled from 'styled-components';

import { Heading } from '/imports/core/ui/atoms';

const CheckoutHeading = styled(p => <Heading level={3} {...p} />)`
  font-family: ${p => p.theme.font.family.correctAccent};
  font-size: 44px;
  font-weight: 600;
  line-height: 1;
  margin: 0;
  text-align: center;
  && {
    color: #3d4047;
  }
`;

export default CheckoutHeading;
