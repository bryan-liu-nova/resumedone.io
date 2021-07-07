import React from 'react';
import styled, { css } from 'styled-components';

import Heading from './Heading';

const BlockHeader = styled(Heading)`
  position: relative;
  left: -21pt;
  font-size: 14.25pt;
  margin-bottom: 4pt;
  margin-left: 4pt;
  text-transform: capitalize;
  display: flex;
  align-items: center;
  ${p => p.summary && css`
    margin-bottom: 0;
  `}
`;

export default BlockHeader;
