import React from 'react';
import styled, { css } from 'styled-components';

import { Text as TextAtom } from '/imports/pdf/core/ui/atoms';

const Text = styled(TextAtom)`
  font-family: 'Source Sans';
  font-size: 9.75pt;
  line-height: 1.54;
  color: #323942;
  ${p => p.isPlaceholder && css`
    opacity: 0.15;
  `}
`;

export default Text;
