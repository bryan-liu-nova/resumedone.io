import React from 'react';
import styled, { css } from 'styled-components';

import { Text as TextAtom } from '/imports/pdf/core/ui/atoms';
import { theme } from '/imports/core/ui/theme';

const Heading = styled(TextAtom)`
  font-family: 'CrimsonText Bold';
  font-size: 9pt;
  line-height: 1;
  margin-bottom: 8pt;
  text-transform: uppercase;
  padding-top: 0;
  letter-spacing: 0.15pt;
  color: #121212;
  ${p => p.date && css`
    margin-bottom: 6pt;
  `}
  ${p => p.isPlaceholder && css`
    color: ${theme.colors.gray.placeholder};
  `}
`;

export default Heading;
