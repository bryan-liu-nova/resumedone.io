import React from 'react';
import styled, { css } from 'styled-components';

import { Text as TextAtom } from '/imports/pdf/core/ui/atoms';

const Heading = styled(TextAtom)`
  font-family: 'SolomonSans Bold';
  font-size: 10.5pt;
  margin-bottom: 13pt;
  text-transform: uppercase;
  color: #000;
  letter-spacing: 0.75pt;
  ${p => p.isPlaceholder && css`
    opacity: 0.15;
  `}
`;

export default Heading;
