import React from 'react';
import styled from 'styled-components';

import { View } from './View';

const ListItem = styled(View)`
    margin-top: 2pt;
    margin-bottom: 2pt;
    position: relative;
    display: flex;
    flex-direction: row;
    padding-left: 10pt;
  `;

export default ListItem;
