import React from 'react';
import styled, { css } from 'styled-components';

import { Heading } from '/imports/core/ui/atoms';

const WizardHeader = styled(Heading)`
  font-family: ${p => p.theme.font.family.wizardHeader};
  font-size: 30px;
  line-height: 1.2;
  margin-top: 0.8em;
  margin-bottom: 0.4em;
  span {
    color: ${p => p.theme.colors.primary};
  }
  ${p => p.intro && css`
     font-size: 31px;
  `}
  ${p => p.red && css`
     & span {
      color: ${p => p.theme.colors.danger};
     }
  `}
  ${p => p.center && css`
     text-align: center;
  `}
`;

export default WizardHeader;
