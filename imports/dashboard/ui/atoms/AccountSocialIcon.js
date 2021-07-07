import React from 'react';
import styled from 'styled-components';

const AccountSocialIcon = styled.i`
  position: relative;
  width: 24px;
  height: 24px;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-image: ${({ icon }) => `url(${icon})`};
  margin-right: 8px;
`;

export default AccountSocialIcon;
