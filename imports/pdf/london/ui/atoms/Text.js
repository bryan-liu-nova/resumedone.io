import React from 'react';
import styled, { css } from 'styled-components';

import { Text as TextAtom } from '/imports/pdf/core/ui/atoms';
import { theme } from '/imports/core/ui/theme';

const Text = styled(TextAtom)`
  font-family: 'CrimsonText SemiBold';
  font-size: 9pt;
  line-height: 1.45;
  color: #2c2c2c;
  ${p => p.isPlaceholder && css`
    opacity: 0.15;
  `}
`;

export default Text;
