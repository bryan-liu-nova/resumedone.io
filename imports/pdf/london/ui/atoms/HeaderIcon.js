import React from 'react';
import styled from 'styled-components';

import { Text as TextAtom, View } from '/imports/pdf/core/ui/atoms';

const IconCont = styled(View)`  
  background-color: red;
  padding: 10pt;
`;

const Icon = styled(TextAtom)`
  font-family: Icomoon;
  speak: none;
  font-size: 12pt;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
`;

export default ({ code }) => (
  <IconCont>
    <Icon>
      {String.fromCharCode(parseInt(code, 16))}
    </Icon>
  </IconCont>
);
