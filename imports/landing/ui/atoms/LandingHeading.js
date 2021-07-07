import React from 'react';
import styled from 'styled-components';

import { Heading } from '/imports/core/ui/atoms';

const LandingHeading = styled(p => <Heading level={1} {...p} />)`
  font-size: 2.5625rem;
  line-height: 4.125rem;
  margin: 0;
  text-align: center;
  font-family: ${({ theme }) => theme.font.family.header};
  && {
    color: ${p => p.white ? 'white' : p.theme.colors.gray.darker};
  }
  ${({ theme }) => theme.max('xs')`
    font-size: 2.1875rem;
    line-height: 3.0625rem;
  `}
`;

export default LandingHeading;
