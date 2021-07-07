import React from 'react';
import styled, { css } from 'styled-components';
import { theme } from '/imports/core/ui/theme';

import { Text, View } from '/imports/pdf/core/ui/atoms';

const IconCont = styled(View)`
  top: 4px;
  margin-right: 8px;
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
  color: #636466;
  ${p => p.email && css`
    font-size: 8px;
  `}
  ${p => p.color && p.color !== 'black' && css`
    color: ${p => theme.colors[p.color]};
  `}
`;

export default ({ code, email, color }) => (
  <IconCont>
    <Icon email={email} color={color}>
      {String.fromCharCode(parseInt(code, 16))}
    </Icon>
  </IconCont>
);
