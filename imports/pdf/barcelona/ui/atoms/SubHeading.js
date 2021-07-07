import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { Heading } from '/imports/pdf/paris/ui/atoms';

const SubHeading = styled(Heading)`
  font-family: 'PtSerif Bold';
  text-transform: none;
  letter-spacing: 0;
  font-size: 12pt;
  margin-bottom: 2pt;
  margin-top: 4pt;
`;

export default SubHeading;
