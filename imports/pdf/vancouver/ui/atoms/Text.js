import React from 'react';
import styled, { css } from 'styled-components';

import { Text as TextAtom } from '/imports/pdf/core/ui/atoms';

const Text = styled(TextAtom)`
  font-family: 'SolomonSans SemiBold';
  font-size: 9pt;
  line-height: 1.75;
  color: #707070;
  ${p => p.isPlaceholder && css`
    opacity: 0.15;
  `}
`;

export default Text;
