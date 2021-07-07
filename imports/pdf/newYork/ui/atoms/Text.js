import React from 'react';
import styled, { css } from 'styled-components';

import { Text as TextAtom } from '/imports/pdf/core/ui/atoms';

const Text = styled(TextAtom)`
  font-family: 'Source Sans';
  font-size: 8.25pt;
  line-height: 1.4;
  color: #434343;
  ${p => p.isPlaceholder && css`
    opacity: 0.15;
  `}
`;

export default Text;
