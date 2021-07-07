import React from 'react';
import styled from 'styled-components';

import { Heading } from '/imports/core/ui/atoms';

const DashboardHeading = styled(p => <Heading level={1} noMargin {...p} />)`
  && {
    font-size: 1.8125rem;
    font-weight: 400;
    font-family: ${({ theme }) => theme.font.family.text};
  }
`;

export default DashboardHeading;
