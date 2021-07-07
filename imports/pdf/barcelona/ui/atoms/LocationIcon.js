import React from 'react';
import styled, { css } from 'styled-components';

import { Text as TextAtom, View } from '/imports/pdf/core/ui/atoms';

const IconCont = styled(View)` 
  margin-right: 4pt;
`;

const Icon = styled(TextAtom)`
  font-family: TemplateIcons;
  speak: none;
  font-size: 12pt;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  color: #75757b;
  ${p => p.isPlaceholder && css`
    opacity: 0.15;
  `}
`;

export default ({ code, isPlaceholder }) => (
  <IconCont>
    <Icon isPlaceholder={isPlaceholder}>
      {String.fromCharCode(parseInt(code, 16))}
    </Icon>
  </IconCont>
);
