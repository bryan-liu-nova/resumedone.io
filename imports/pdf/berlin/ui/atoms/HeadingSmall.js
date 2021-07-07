import React from 'react';
import styled, { css } from 'styled-components';

import { Text } from '/imports/pdf/core/ui/atoms';
import { theme } from '/imports/core/ui/theme';

const HeadingSmall = styled(Text)`
  font-family: 'Montserrat SemiBold';
  color: #000;
  font-size: 11pt;
  margin-bottom: 4pt;
  ${p => p.isPlaceholder && css`
    opacity: 0.15;
  `}
`;

export default HeadingSmall;
