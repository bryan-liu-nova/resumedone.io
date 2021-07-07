import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { Box, Image, Flex, Icon } from '/imports/core/ui/atoms';
import {
  CheckoutOneContainer as Container,
  CheckoutTextOne
} from '/imports/checkout/ui/atoms';
import Logo from '/imports/core/ui/components/Logo';

class Header extends PureComponent {
  render() {
    return (
      <Section>
        <Container>
          <HeaderFlex>
            <Box>
              <Logo noLink />
            </Box>
          </HeaderFlex>
        </Container>
      </Section>
    );
  }
}

const HeaderFlex = styled(p => <Flex alignItems="center" {...p} />)`
  height: 100%;
`;

const Section = styled.section`
  height: 80px;
  box-shadow: 0 2px 4px 0 rgba(199, 207, 214, 0.2);
  background-color: #ffffff;
  z-index: 999;
  position: relative;
  ${({ theme }) => theme.max('md')`
    height: 50px;
    padding: 13px 16px;
  `}
`;

export default Header;
