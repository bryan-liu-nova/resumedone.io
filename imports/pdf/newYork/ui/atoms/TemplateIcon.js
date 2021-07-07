import React from 'react';
import styled, { css } from 'styled-components';

import { Text as TextAtom, View } from '/imports/pdf/core/ui/atoms';

const IconCont = styled(View)` 
  position: absolute;
  top: 0;
  left: -6pt;
  ${p => p.isPlaceholder && css`
    opacity: 0.15;
  `}
`;

const Icon = styled(TextAtom)`
  font-family: TemplateIcons;
  speak: none;
  font-size: 14pt;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
`;

export default ({ code, isPlaceholder }) => (
  <IconCont isPlaceholder={isPlaceholder}>
    <Icon>
      {String.fromCharCode(parseInt(code, 16))}
    </Icon>
  </IconCont>
);
