import React from 'react';
import styled, { css } from 'styled-components';

import { Text as TextAtom } from '/imports/pdf/core/ui/atoms';
import { theme } from '/imports/core/ui/theme';

const Heading = styled(TextAtom)`
  font-family: 'PtSerif Bold';
  font-size: 12pt;
  line-height: 1;
  margin-bottom: 13pt;
  letter-spacing: 0.24pt;
  color: ${p => theme.colors[p.color]};
  ${p => p.summary && css`
    margin-bottom: 14pt;
  `}
  ${p => p.sidebar && css`
    margin-bottom: 14pt;
  `}
  ${p => p.references && css`
    margin-bottom: 14pt;
  `}
  ${p => p.isPlaceholder && css`
    opacity: 0.15;
  `}
`;

export default Heading;
