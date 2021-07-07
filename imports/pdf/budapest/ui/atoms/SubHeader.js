import React from 'react';
import styled, { css } from 'styled-components';
import { theme } from '/imports/core/ui/theme';

import Heading from './Heading';

const SubHeader = styled(Heading)`
  font-family: 'Lato Bold';
  font-size: 12px;
  margin-bottom: 0;
  text-transform: none;
  color: #636466;
  ${p => p.upper && css`
    text-transform: uppercase;
  `}
  ${p => p.color && p.color !== 'black' && css`
    color: ${p => theme.colors[p.color]};
  `}
`;

export default SubHeader;
