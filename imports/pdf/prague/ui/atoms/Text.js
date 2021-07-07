import React from 'react';
import styled from 'styled-components';

import { Text as TextAtom } from '/imports/pdf/core/ui/atoms';

const Text = styled(TextAtom)`
  font-family: 'Lato Light';
  font-size: 13px;
  line-height: 20px;
  color: #000;
`;

export default Text;
