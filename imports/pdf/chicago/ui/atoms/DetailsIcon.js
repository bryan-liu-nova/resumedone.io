import React from 'react';
import styled, { css } from 'styled-components';

import { Text, View } from '/imports/pdf/core/ui/atoms';

const IconCont = styled(View)`
  position: absolute;
  top: 0;
  right: 0;
  background: #f3f2f2;
  width: 29px;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: 8px;
`;

const Icon = styled(Text)`
  font-family: TemplateIcons;
  speak: none;
  font-size: 10px;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  color: #9d9d9d;
`;

export default ({ code, email }) => (
  <IconCont>
    <Icon>
      {String.fromCharCode(parseInt(code, 16))}
    </Icon>
  </IconCont>
);
