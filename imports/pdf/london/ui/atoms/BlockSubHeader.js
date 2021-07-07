import React from 'react';
import styled, { css } from 'styled-components';

import Heading from './Heading';

const BlockSubHeader = styled(Heading)`
  font-family: 'CrimsonText SemiBold';
  font-size: 11.25pt;
  text-transform: none;
  letter-spacing: 0;
  ${p => !p.isPlaceholder && css`
    color: #2c2c2c;
  `}
`;

export default BlockSubHeader;
