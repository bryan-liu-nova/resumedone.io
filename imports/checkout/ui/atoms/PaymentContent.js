import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { Text, Input, Flex, Box } from '/imports/core/ui/atoms';
import {
  StripeCardInput,
  StripeCVCInput,
  StripeExpiryInput
} from '/imports/checkout/ui/atoms';

const PaymentContentPaypal = () => {
  return (
    <PaymentText>
      Cliquez sur le bouton <b>Payer maintenant de manière sécurisée</b> afin
      d'effectuer votre paiement par PayPal.
    </PaymentText>
  );
};

class PaymentContentCreditcard extends PureComponent {
  render() {
    const { isSubmitted } = this.props;
    return (
      <div>
        <PaymentText>
          Veuillez introduire ci-dessous les références de votre carte afin
          d'effectuer le paiement.
        </PaymentText>
        <CardInputContainer>
          <Flex grid>
            <Box md={12} padded>
              <StripeCardInput showInvalidState={isSubmitted} />
            </Box>
          </Flex>
          <Flex grid>
            <Box md={6} sm={6} xs={6} padded>
              <StripeCVCInput showInvalidState={isSubmitted} />
            </Box>
            <Box md={6} sm={6} xs={6} padded>
              <StripeExpiryInput showInvalidState={isSubmitted} />
            </Box>
          </Flex>
        </CardInputContainer>
      </div>
    );
  }
}

class PaymentContent extends PureComponent {
  render() {
    const { provider, isSubmitted } = this.props;
    let content = null;

    if (provider === 'creditcard') {
      content = <PaymentContentCreditcard isSubmitted={isSubmitted} />;
    }

    if (provider === 'paypal') {
      content = <PaymentContentPaypal isSubmitted={isSubmitted} />;
    }

    return <PaymentContentContainer>{content}</PaymentContentContainer>;
  }
}

const PaymentContentContainer = styled.div`
  clear: both;
  min-height: 45px;
`;

const PaymentText = styled(p => <Text {...p} />)`
  font-size: ${({ theme }) => theme.font.size.h6};
  color: ${({ theme }) => theme.colors.gray.regular};
  line-height: ${({ theme }) => theme.font.lineHeight.base};
`;

const CardInputContainer = styled.div`
  position: relative;
  > div {
    margin-bottom: ${p => `calc(${p.theme.general.gridGap})`};
  }
`;

export default PaymentContent;
