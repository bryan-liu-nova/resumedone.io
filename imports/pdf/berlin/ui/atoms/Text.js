import React from 'react';
import styled, { css } from 'styled-components';

import { Text as TextAtom } from '/imports/pdf/core/ui/atoms';
import { theme } from '/imports/core/ui/theme';

const Text = styled(TextAtom)`
  font-family: 'Montserrat';
  font-size: 9pt;
  line-height: 1.45;
  ${p => p.isPlaceholder && css`
    opacity: 0.15;
  `}
`;

export default Text;
