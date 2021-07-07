import React from 'react';
import styled, { css } from 'styled-components';
import { theme } from '/imports/core/ui/theme';

import { Text as TextAtom } from '/imports/pdf/core/ui/atoms';

const Heading = styled(TextAtom)`
  font-family: 'Lato Medium';
  font-size: 15pt;
  margin-bottom: 16pt;
  color: ${p => theme.colors[p.color]};
  ${p => p.sidebar && css`
    margin-bottom: 14.25pt;
  `}
  ${p => p.links && css`
    margin-bottom: 10pt;
  `}
  ${p => p.isPlaceholder && css`
    opacity: 0.15;
  `}
`;

export default Heading;
