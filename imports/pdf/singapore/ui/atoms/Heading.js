import React from 'react';
import styled, { css } from 'styled-components';

import { Text as TextAtom } from '/imports/pdf/core/ui/atoms';
import { theme } from '/imports/core/ui/theme';

const Heading = styled(TextAtom)`
  font-family: 'HelveticaNeue Medium';
  font-size: 11.25pt;
  margin-bottom: 18pt;
  letter-spacing: 1.125pt;
  text-transform: uppercase;
  color: #000000;
  ${p => p.isPlaceholder && css`
    opacity: 0.15;
  `}
`;

export default Heading;
