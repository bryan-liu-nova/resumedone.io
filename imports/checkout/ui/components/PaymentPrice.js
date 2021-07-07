import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { Heading, Text } from '/imports/core/ui/atoms';
import {
  ContentSection,
  PaymentProviderIcon,
  PaymentContent
} from '/imports/checkout/ui/atoms';
import { CHARGE_AMOUNT } from '/imports/checkout/api/constants';

const paymentProviders = [
  {
    name: 'creditcard',
    img: [
      { src: '/img/payment_visa.svg', height: 20 },
      { src: '/img/payment_creditcard.svg', height: 20 },
      { src: '/img/payment_mastercard.svg', height: 20 }
    ],
    bar: {
      color: 'green',
      width: '120px',
      offset: '0'
    }
  }
  // {
  //   name: 'paypal',
  //   img: [{ src: '/img/payment_paypal.svg', height: 'auto' }],
  //   bar: {
  //     color: 'blue',
  //     width: '90px',
  //     offset: '128px'
  //   }
  // }
];

class PaymentPrice extends PureComponent {
  state = { provider: 'creditcard' };

  getBar = option => {
    const provider = paymentProviders.find(
      provider => provider.name === this.state.provider
    );
    return provider && provider.bar[option];
  };

  render() {
    const { provider } = this.state;
    const { isSubmitted, setPaymentError, processed } = this.props;

    if (processed) {
      return (
        <ProcessedCont>
          <Heading>Success!</Heading>
          <Text>Now you are able to download your CV!</Text>
        </ProcessedCont>
      );
    }

    return (
      <ContentSectionPayment>
        {paymentProviders.map(({ name, bar, img }) => (
          <PaymentProviderIcon
            src={img}
            handleClick={() => this.setState({ provider: name })}
            key={name}
          />
        ))}
        <PaymentProviderSlider>
          <PaymentProviderSelectionSlide
            offset={this.getBar('offset')}
            color={this.getBar('color')}
            width={this.getBar('width')}
          />
        </PaymentProviderSlider>
        <PaymentContent
          provider={provider}
          isSubmitted={isSubmitted}
          setPaymentError={setPaymentError}
        />
        <ContentPriceAmount>
          $ {(CHARGE_AMOUNT / 1000).toFixed(2)}
        </ContentPriceAmount>
      </ContentSectionPayment>
    );
  }
}

const ContentSectionPayment = styled(ContentSection)`
  padding: 35px 40px;
`;

const ContentPriceAmount = styled.span`
  position: absolute;
  right: 30px;
  top: 20px;
  font-weight: 700;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.gray.dark};
`;

const PaymentProviderSlider = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray.light};
  display: inline;
  float: left;
  margin: 0 0 28px;
  padding: 0;
  width: 100%;
  height: 5px;
  position: relative;
`;

const ProcessedCont = styled.div`
  padding: 100px 20px;
`;

const PaymentProviderSelectionSlide = styled.div`
  background: ${({ theme, color }) => {
    if (color === 'green') {
      return theme.colors.secondary;
    }
    if (color === 'blue') {
      return theme.colors.primary;
    }
  }};
  width: ${({ width }) => width};
  height: 5px;
  position: absolute;
  top: 0;
  left: ${({ offset }) => (offset ? offset : 0)};
  // transition: all .6s ease;
`;

export default PaymentPrice;
