import React from 'react';
import styled, { css } from 'styled-components';
import { theme } from '/imports/core/ui/theme';

import { Text, View } from '/imports/pdf/core/ui/atoms';

const IconCont = styled(View)`
  top: -8px;
  margin-bottom: -4px;
  ${p => p.email && css`
    margin-bottom: -2px;
  `}
`;

const Icon = styled(Text)`
  font-family: TemplateIcons;
  speak: none;
  font-size: 20px;
  text-align: center;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  color: #929292;
  ${p => p.email && css`
    font-size: 16px;
  `}
  ${p => p.color && p.color !== 'black' && css`
    color: ${p => theme.colors[p.color]};
  `}
`;

export default ({ code, email, color }) => (
  <IconCont email={email}>
    <Icon email={email} color={color}>
      {String.fromCharCode(parseInt(code, 16))}
    </Icon>
  </IconCont>
);
