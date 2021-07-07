import React from 'react';
import styled, { css } from 'styled-components';

import { View } from '/imports/pdf/core/ui/atoms';

const BlockNestedItem = styled(View)`
  ${p => p.flexView && css`
    display: flex;
    flex-direction: row;
  `}
`;

export default BlockNestedItem;
