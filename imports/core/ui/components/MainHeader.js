import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { Container } from '/imports/core/ui/atoms';

class Header extends PureComponent {
  render() {
    return (
      <Section>
        <HeaderContainer>
          {this.props.children}
        </HeaderContainer>
      </Section>
    );
  }
}

const Section = styled.section`
  background: ${p => p.theme.colors.darkBlack};
  height: 65px;
  z-index: 1000;
  position: relative;
  ${({ theme }) => theme.max('sm')`
    padding: 0 10px;
  `}
`;

const HeaderContainer = styled(p => <Container {...p} />)`
  width: 100%;
  max-width: 1100px;
  height: 100%;
  padding: 1rem 0 6.5rem;
`;

export default Header;
