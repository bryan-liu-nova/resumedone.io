import React from 'react';
import styled, { css } from 'styled-components';

import { Text as TextAtom, View } from '/imports/pdf/core/ui/atoms';

const IconCont = styled(View)` 
  position: absolute;
  top: 4pt;
  left: 6pt;
`;

const Icon = styled(TextAtom)`
  font-family: TemplateIcons;
  speak: none;
  font-size: 9pt;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  color: #848484;
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
