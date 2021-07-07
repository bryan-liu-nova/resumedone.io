import React from 'react';
import styled from 'styled-components';

import { View } from './View';
import ListItem from './ListItem';

const UnorderedListItem = ({ children, BaseText, center }) => {
  return (
    <ListItem>
      {
        !center &&
        <Number>
          <BaseText>
            {'•'}
          </BaseText>
        </Number>
      }
      <BaseText>
        {center && `•  `}
        {children}
      </BaseText>
    </ListItem>
  );
};

const Dot = styled(View)`
  position: absolute;
  width: 3pt;
  height: 3pt;
  border-radius: 3pt;
  background: #000;
  top: 4pt;
  left: 0;
`;

const Number = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
`;

export default UnorderedListItem;
