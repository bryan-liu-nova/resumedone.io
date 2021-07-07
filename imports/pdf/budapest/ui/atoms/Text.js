import React from 'react';
import styled, { css } from 'styled-components';

import { Text as TextAtom } from '/imports/pdf/core/ui/atoms';

const Text = styled(TextAtom)`
  font-family: 'Lato';
  font-size: 12px;
  line-height: 16px;
  color: #808183;
  ${p => p.light && css`
    color: #e6e6e7;
  `}
`;

export default Text;
