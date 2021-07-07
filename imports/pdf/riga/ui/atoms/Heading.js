import React from 'react';
import styled, { css } from 'styled-components';

import { Text as TextAtom } from '/imports/pdf/core/ui/atoms';

const Heading = styled(TextAtom)`
  font-family: 'Montserrat Bold';
  font-weight: 600;
  font-size: 15px;
  color: #333e50;
  text-transform: uppercase;
  margin-bottom: 20px;
  word-break: break-word;
  padding-top: 15px;
  padding-bottom: 12px;
  border-bottom: 1px solid #333e50;
  text-align: center;
  letter-spacing: 4px;
  ${p => p.left && css`
    border-top: 1px solid #333e50;
    margin-bottom: 40px;
  `}
`;

export default Heading;