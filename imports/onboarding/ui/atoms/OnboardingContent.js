import React from 'react';
import styled from 'styled-components';

const OnboardingContent = styled.section`
  width: 480px;
  margin: 70px auto 0;
  ${({ theme }) => theme.max('md')`
    width: 100%;
    margin-top: 20px;
  `}
`;

export default OnboardingContent;
