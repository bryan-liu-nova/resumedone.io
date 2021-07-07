import React from 'react';
import styled from 'styled-components';

import { View } from './View';
import { Text } from './Text';
import ListItem from './ListItem';

const OrderedListItem = ({ children, num, BaseText, center }) => {
  return (
    <ListItem>
      {
        !center &&
          <Number>
            <BaseText>
              {num}.
            </BaseText>
          </Number>
      }
      <BaseText>
        {center && `${num}.  `}
        {children}
      </BaseText>
    </ListItem>
  );
};

const Number = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
`;

export default OrderedListItem;
