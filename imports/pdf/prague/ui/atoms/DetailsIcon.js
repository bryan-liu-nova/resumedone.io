import React from 'react';
import styled, { css } from 'styled-components';

import { Text, View } from '/imports/pdf/core/ui/atoms';

const IconCont = styled(View)`
  top: 2px;
  margin-right: 8px;
  ${p => p.email && css`
    top: 5px;
  `}
  ${p => p.references && css`
    top: 0;
    margin-right: 0;
    margin-bottom: 10px;
  `}
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
  color: #404040;
  ${p => p.email && css`
    font-size: 10px;
  `}
  ${p => p.references && css`
    font-size: 32px;
  `}
`;

export default ({ code, email, references }) => (
  <IconCont email={email} references={references}>
    <Icon email={email} references={references}>
      {String.fromCharCode(parseInt(code, 16))}
    </Icon>
  </IconCont>
);
