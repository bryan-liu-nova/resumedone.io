import React from 'react';
import styled from 'styled-components';

import { Text } from '/imports/core/ui/atoms';

const CheckoutText = styled(Text)`
  font-family: ${p => p.theme.font.family.text};
  font-size: ${({ theme }) => theme.font.size.h6};
  line-height: 24px;
  padding: 0 10px;
  ${({ theme }) => theme.max('xs')`
    padding: 0 15px;
  `}
`;

export default CheckoutText;
