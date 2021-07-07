import React from 'react';
import styled from 'styled-components';

import { Text, View } from '/imports/pdf/core/ui/atoms';

const IconCont = styled(View)`
  margin-bottom: 10px;
  padding-top: 20px;
`;

const Icon = styled(Text)`
  font-family: TemplateIcons;
  speak: none;
  font-size: 16px;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  color: #000;
`;

export default ({ code }) => (
  <IconCont>
    <Icon>
      {String.fromCharCode(parseInt(code, 16))}
    </Icon>
  </IconCont>
);
