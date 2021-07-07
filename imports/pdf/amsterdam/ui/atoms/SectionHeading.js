import React from 'react';
import styled, { css } from 'styled-components';

import Heading from './Heading';

const SectionHeading = styled(Heading)`
  font-family: 'Montserrat Bold';
  text-transform: uppercase;
  font-size: 12pt;
  letter-spacing: 0.75pt;
  padding-bottom: 5pt;
  width: 100%;
  border-bottom: 2px solid #444444;
  margin-bottom: 16.5pt;
  ${p => p.isPlaceholder && css`
    border-bottom-color: #d5d5d5;
    opacity: 1;
  `}
`;

export default SectionHeading;
