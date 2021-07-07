import React from 'react';
import styled, { css } from 'styled-components';

import { View } from '/imports/pdf/core/ui/atoms';

const BlockItems = styled(View)`
  position: relative;
  ${p => p.flexView && css`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  `}
`;

const Empty1 = styled(View)`
  position: absolute;
  width: 12px;
  height: 10px;
  background: #fff;
  left: 30%;
  top: 0;
  z-index: 1;
`;

const Empty2 = styled(View)`
  position: absolute;
  width: 12px;
  height: 4px;
  background: #fff;
  left: 30%;
  bottom: 0;
  z-index: 1;
`;

export default ({ children, flexView, dateView }) => (
  <BlockItems flexView={flexView}>
    {dateView && (
      <>
      <Empty1 />
      <Empty2 />
      </>
    )}
    {children}
  </BlockItems>
);
