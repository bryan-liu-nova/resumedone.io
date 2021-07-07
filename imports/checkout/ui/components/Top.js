import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { CheckoutHeading, CheckoutText } from '/imports/checkout/ui/atoms';

class Top extends PureComponent {
  render() {
    return (
      <Section>
        <CheckoutHeading white>Votre CV est créé!</CheckoutHeading>
        <CheckoutText color="white" align="center">
          Effectuez un paiement afin d’accéder à votre compte qui vous permettra
          de modifier ou de télécharger votre CV.
        </CheckoutText>
      </Section>
    );
  }
}

const Section = styled.section`
  text-align: center;
  padding: 30px 0;
  position: relative;
  z-index: 999;
  ${({ theme }) => theme.max('xs')`
    padding-bottom: 15px;
  `}
`;

export default Top;
