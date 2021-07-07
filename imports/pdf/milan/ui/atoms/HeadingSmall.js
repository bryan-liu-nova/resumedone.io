import React from 'react';
import styled, { css } from 'styled-components';

import { Text } from '/imports/pdf/core/ui/atoms';
import { theme } from '/imports/core/ui/theme'

const HeadingSmall = styled(Text)`
  font-family: 'Lato SemiBold';
  color: #0e0e0e;
  font-size: 11.25pt;
  margin-bottom: 4.75pt;
  ${p => p.isPlaceholder && css`
    opacity: 0.15;
  `}
`;

export default HeadingSmall;
