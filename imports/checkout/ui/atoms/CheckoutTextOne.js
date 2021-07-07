import React from 'react';
import styled from 'styled-components';

import { Text } from '/imports/core/ui/atoms';

const CheckoutText = styled(Text)`
  font-family: ${p => p.theme.font.family.correctText};
  font-size: ${({ theme }) => theme.font.size.base};
  line-height: 1;
  color: #3d4047;
`;

export default CheckoutText;
