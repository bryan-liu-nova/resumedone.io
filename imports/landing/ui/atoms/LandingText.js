import React from 'react';
import styled from 'styled-components';

import { Text } from '/imports/core/ui/atoms';

const LandingText = styled(p => <Text {...p}/>)`
  font-family: ${({ theme }) => theme.font.family.text};
  ${({ theme }) => theme.max('xs')`
    font-size: ${theme.font.size.h4};
  `}
`;

export default LandingText;
