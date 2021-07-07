import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Logo from '/imports/core/ui/components/Logo';

import { Container, Box } from '/imports/core/ui/atoms';

class Header extends PureComponent {
  render() {
    return (
      <Section>
        <Container>
          <TopHeader>
            <Box>
              <Logo light path="/resumes" />
            </Box>
          </TopHeader>
        </Container>
      </Section>
    );
  }
}

const TopHeader = styled.h1`
  text-align: left;
  font-size: 1.875rem;
  line-height: 3rem;
  color: #ffffff;
  padding: 0.4375rem 0 6.5rem;
  font-family: ${({ theme }) => theme.font.family.tahoma};
  margin: 0 10px;
  ${({ theme }) => theme.max('xs')`
    line-height: 2.4rem;
    padding-top: 1rem;
    padding-bottom: 2.375rem;
  `}
`;

const Section = styled.section`
  background: ${p => p.theme.colors.secondary};
  height: 65px;
  z-index: 999;
  position: relative;
`;

export default Header;
