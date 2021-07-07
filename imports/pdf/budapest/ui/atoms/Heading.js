import React from 'react';
import styled, { css } from 'styled-components';

import { Text as TextAtom } from '/imports/pdf/core/ui/atoms';

const Heading = styled(TextAtom)`
  font-family: 'Lato Bold';
  font-size: 16px;
  color: #808183;
  text-transform: uppercase;
  margin-bottom: 18px;
  word-break: break-word;
  ${p => p.light && css`
    color: #e6e6e7;
  `}
`;

export default Heading;
