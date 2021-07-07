import React from 'react';
import styled, { css } from 'styled-components';

import { Text as TextAtom } from '/imports/pdf/core/ui/atoms';
import { theme } from '/imports/core/ui/theme';

const Heading = styled(TextAtom)`
  font-family: 'CrimsonText SemiBold';
  font-size: 13.5pt;
  margin-bottom: 6pt;
  text-transform: uppercase;
  letter-spacing: 1pt;
  color: #2c2c2c;
  ${p => p.sidebar && css`
    margin-bottom: 0;
  `}
  ${p => p.summary && css`
    margin-bottom: 12pt;
  `}
  ${p => p.isPlaceholder && css`
    opacity: 0.15;
  `}
`;

export default Heading;
