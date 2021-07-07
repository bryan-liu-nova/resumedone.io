import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { Container, Flex, Box } from '/imports/core/ui/atoms';
import Logo from '/imports/core/ui/components/Logo';

class Header extends PureComponent {
  render() {
    return (
      <HeaderCont>
        <Container>
          <Flex alignItems="center">
            <Box>
              <Logo path="/resumes" />
            </Box>
            <Box grow={1}>
              <NavCont>
              </NavCont>
            </Box>
          </Flex>
        </Container>
      </HeaderCont>
    );
  }
}

const HeaderCont = styled.header`
  height: ${p => p.theme.general.headerHeight};
  background-color: white;
  > section {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  ${({ theme }) => theme.max('md')`
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: ${theme.zIndex.headerFixed};
    padding: 0 ${theme.general.mobilePadding};
  `}
`;

const NavCont = styled(Flex)`
  flex-grow: 1;
  align-items: center;
  justify-content: flex-end;
`;

export default Header;
