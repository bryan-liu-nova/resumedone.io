import React, { PureComponent } from 'react';
import styled from 'styled-components';

import {
  CheckoutHeadingOne,
  CheckoutOneContainer as Container
} from '/imports/checkout/ui/atoms';

class Footer extends PureComponent {
  render() {
    return (
      <Section>
        <Container>
          <FooterHeading>
            <span>A million+</span> CVs made, and counting!
          </FooterHeading>
        </Container>
      </Section>
    );
  }
}

const FooterHeading = styled(CheckoutHeadingOne)`
  font-size: 40px;
  text-align: center;
  font-weight: 400;
  && {
    color: #fccf00;
    span {
      color: white;
    }
  }
`;

const Section = styled.section`
  height: 180px;
  padding: 70px;
  border-radius: 1px;
  background: #31434b url(/img/checkout/footer-background.png) repeat;
  ${({ theme }) => theme.max('md')`
    display: none;
  `}
`;

export default Footer;
