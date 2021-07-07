import React from 'react';
import styled, { css } from 'styled-components';

import { Text as TextAtom } from '/imports/pdf/core/ui/atoms';
import { theme } from '/imports/core/ui/theme';

const Heading = styled(TextAtom)`
  font-family: 'Source Sans Semibold';
  font-size: 12pt;
  line-height: 1;
  color: #363636;
  ${p => p.isPlaceholder && css`
    opacity: 0.15;
  `}
  ${p => p.date && css`
    padding-top: 0;
    margin-bottom: 1pt;
  `}
`;

export default Heading;
