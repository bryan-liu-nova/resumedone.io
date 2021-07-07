import React from 'react';
import styled from 'styled-components';

import { Heading } from '/imports/core/ui/atoms';

const CheckoutHeading = styled(p => <Heading level={3} {...p} />)`
  font-family: ${p => p.theme.font.family.header};
  font-size: 40px;
  margin: 0;
  text-align: center;
  && {
    color: ${p => (p.white ? 'white' : p.theme.colors.black)};
  }
  ${({ theme }) => theme.max('xs')`
    font-size: 31px;
  `}
`;

export default CheckoutHeading;
