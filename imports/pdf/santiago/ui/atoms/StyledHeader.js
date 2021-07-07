import React from 'react';
import styled, { css } from 'styled-components';

import { View, Text } from '/imports/pdf/core/ui/atoms';
import Heading from './Heading';

const StyledHeader = ({ children, isPlaceholder, summary }) => (
  <Container
    isPlaceholder={isPlaceholder}
    summary={summary}
    wrap={false}
    minPresenceAhead={100}
  >
    <HeadingInner>
      <HeadingCont>
        {children}
      </HeadingCont>
    </HeadingInner>
  </Container>
);

const Container = styled(View)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1pt 0 5pt;
  background: #f2f2f2;
  margin-bottom: 15pt;
  padding-top: 6px;
  ${p => p.summary && css`
    margin-bottom: 10.5pt;
  `}
  ${p => p.isPlaceholder && css`
    background: #fdfdfd;
  `}
`;

const HeadingInner = styled(View)`
  display: inline-block;
  border-bottom: 1px solid #000;
`;

const HeadingCont = styled(Heading)`
  padding: 0;
  margin: 0;
  line-height: 0.7;
  padding-top: 2px;
`;

export default StyledHeader;
