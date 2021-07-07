import React from 'react';
import styled from 'styled-components';

const TextContainer = styled.div`
  font-size: ${({ theme }) => theme.font.size.h6};
  color: ${({ theme }) => theme.colors.gray.regular};
  & h4 {
    font-family: ${({ theme }) => theme.font.family.header};
    margin: 0;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  }
  & p {
    font-family: ${({ theme }) => theme.font.family.text};
    color: ${({ theme }) => theme.colors.gray.regular};
    margin: 0;
    max-width: 448px;
  }
  & a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    cursor: pointer;
  }
  ${({ theme }) => theme.max('sm')`
    margin-bottom: 12px;
  `}
`;

export default TextContainer;