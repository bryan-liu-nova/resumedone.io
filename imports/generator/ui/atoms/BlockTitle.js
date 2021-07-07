import React from 'react';
import styled from 'styled-components';

import { Heading } from '/imports/core/ui/atoms';

const BlockTitle = styled(p => <Heading level={3} {...p} />)`
  font-family: ${p => p.theme.font.family.correctHeader};
  font-size: 22px;
  line-height: 28px;
  color: #262b33;
  text-transform: capitalize;
  margin-bottom: 10px;
`;

export default BlockTitle;
