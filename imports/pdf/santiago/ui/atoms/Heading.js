import React from 'react';
import styled, { css } from 'styled-components';

import { Text as TextAtom } from '/imports/pdf/core/ui/atoms';
import { theme } from '/imports/core/ui/theme';

const Heading = styled(TextAtom)`
  font-family: 'CrimsonText SemiBold';
  font-size: 15pt;
  margin-bottom: 8pt;
  text-transform: uppercase;
  padding-top: 2pt;
  letter-spacing: 0.89pt;
  color: #2c2c2c;
  ${p => p.isPlaceholder && css`
    opacity: 0.15;
  `}
`;

export default Heading;
