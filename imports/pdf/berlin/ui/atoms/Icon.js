import React from 'react';
import styled from 'styled-components';

import { Text as TextAtom } from '/imports/pdf/core/ui/atoms';

const Icon = styled(TextAtom)`
  font-family: Icomoon;
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
`;

export default ({ code }) => (
  <Icon>
    {String.fromCharCode(parseInt(code, 16))}
  </Icon>
);
