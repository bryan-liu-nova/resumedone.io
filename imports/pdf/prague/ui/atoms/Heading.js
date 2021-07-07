import React from 'react';
import styled from 'styled-components';

import { Text as TextAtom } from '/imports/pdf/core/ui/atoms';

const Heading = styled(TextAtom)`
  font-family: 'Raleway SemiBold';
  font-weight: 600;
  font-size: 15px;
  color: #000;
  text-transform: uppercase;
  margin-bottom: 18px;
  word-break: break-word;
  letter-spacing: 4px;
`;

export default Heading;