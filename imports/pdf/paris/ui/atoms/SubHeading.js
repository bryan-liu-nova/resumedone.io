import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { Heading } from '/imports/pdf/paris/ui/atoms';

const SubHeading = styled(Heading)`
  font-family: 'CrimsonText Bold';
  text-transform: none;
  letter-spacing: 0;
  font-size: 12pt;
  margin-top: 4pt;
  color: #2a2a2a;
  line-height: 1.2;
`;

export default SubHeading;
