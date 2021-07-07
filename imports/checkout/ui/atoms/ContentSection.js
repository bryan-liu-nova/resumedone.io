import React from 'react';
import styled from 'styled-components';

const ContentSection = styled.div`
  position: relative;
  background: #fff;
  margin: 0 0 30px 0;
  border-radius: ${p => p.theme.general.borderRadius};
  box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
  z-index: 999;
  &::after {
    content: '';
    clear: both;
    display: block;
  }
  ${({ theme }) => theme.max('xs')`
    padding: 25px 15px;
    border-radius: 0;
  `}
`;

export default ContentSection;
