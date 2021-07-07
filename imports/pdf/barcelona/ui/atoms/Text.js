import React from 'react';
import styled, { css } from 'styled-components';

import { Text as TextAtom } from '/imports/pdf/core/ui/atoms';

const Text = styled(TextAtom)`
  font-family: 'SolomonSans';
  font-size: 9pt;
  line-height: 1.3;
  color: #777777;
  ${p => p.isPlaceholder && css`
    opacity: 0.15;
  `}
`;

export default Text;
