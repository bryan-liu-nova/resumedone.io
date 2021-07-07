import React from 'react';
import { Link as LinkAtom } from '/imports/pdf/core/ui/atoms';
import styled from 'styled-components';

const Link = styled(LinkAtom)`
  font-family: 'Raleway';
  color: #000;
  font-size: 11.5px;
  line-height: 15px;
  text-decoration: none;
`;

export default Link;