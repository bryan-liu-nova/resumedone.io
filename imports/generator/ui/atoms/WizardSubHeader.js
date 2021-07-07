import React from 'react';
import styled, { css } from 'styled-components';

import { Text } from '/imports/core/ui/atoms';

const WizardSubHeader = styled(Text)`
  font-family: ${p => p.theme.font.family.wizardSubheader};
  font-size: 16px;
  font-weight: normal;
  margin-top: 0;
  margin-bottom: 35px;
  span {
    color: ${p => p.theme.colors.primary};
  }
  ${p => p.intro && css`
     font-family: ${p => p.theme.font.accent};
     font-size: 18px;
     color: #7e8592;
  `}
  ${p => p.center && css`
     text-align: center;
     font-weight: 600;
  `}
`;

export default WizardSubHeader;
