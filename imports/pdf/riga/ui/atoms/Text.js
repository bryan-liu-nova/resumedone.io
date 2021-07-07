import React from 'react';
import styled, { css } from 'styled-components';
import { theme } from '/imports/core/ui/theme';

import { Text as TextAtom } from '/imports/pdf/core/ui/atoms';

const Text = styled(TextAtom)`
  font-family: 'CrimsonText';
  font-size: 12px;
  line-height: 20px;
  color: #6d6e71;
  ${p => p.color && p.color !== 'black' && css`
    color: ${p => theme.colors[p.color]};
  `}
`;

export default Text;
