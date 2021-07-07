import React from 'react';
import styled, { css } from 'styled-components';

import { Text as TextAtom } from '/imports/pdf/core/ui/atoms';

const Heading = styled(TextAtom)`
  font-family: 'Source Sans Semibold';
  font-size: 11.25pt;
  margin-bottom: 3pt;
  color: #2c2c2c;
  ${p => p.isPlaceholder && css`
    opacity: 0.15;
  `}
`;

export default Heading;
