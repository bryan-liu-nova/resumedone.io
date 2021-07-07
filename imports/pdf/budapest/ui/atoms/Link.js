import React from 'react';
import { Link as LinkAtom } from '/imports/pdf/core/ui/atoms';
import styled from 'styled-components';

const Link = styled(LinkAtom)`
  font-family: 'Lato';
  color: #808183;
  font-size: 12px;
  line-height: 16px;
  text-decoration: none;
`;

export default Link;