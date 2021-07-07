import React from 'react';
import { Link as LinkAtom } from '/imports/pdf/core/ui/atoms';
import styled from 'styled-components';

const Link = styled(LinkAtom)`
  font-family: 'CrimsonText';
  color: #6d6e71;
  font-size: 12px;
  line-height: 16px;
  text-decoration: none;
`;

export default Link;