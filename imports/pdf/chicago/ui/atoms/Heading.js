import React from 'react';
import styled from 'styled-components';

import { Text as TextAtom } from '/imports/pdf/core/ui/atoms';

const Heading = styled(TextAtom)`
  font-family: 'Raleway Medium';
  font-weight: 500;
  font-size: 18px;
  line-height: 1em;
  color: #000;
  text-transform: uppercase;
  letter-spacing: 3.6px;
  margin-bottom: 15px;
  word-break: break-word;
`;

export default Heading;