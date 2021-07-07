import React from 'react';
import styled from 'styled-components';

import { View } from '/imports/pdf/core/ui/atoms';

const BlockNestedItem = styled(View)`
  margin-bottom: 10pt;
  &:not(:last-of-type) {
    margin-bottom: 0;
  }
`;

export default BlockNestedItem;
