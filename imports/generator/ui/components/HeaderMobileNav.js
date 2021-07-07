import React from 'react';
import styled from 'styled-components';
import { Flex } from '/imports/core/ui/atoms';

export default styled(p => <Flex alignItems="center" {...p} />)`
  width: 100%;
  color: #3d4047;
  font-weight: bold;
  font-size: 18px;
  > div {
    flex-grow: 1;
    text-align: center;
    padding-right: 50px;
  }
`;
