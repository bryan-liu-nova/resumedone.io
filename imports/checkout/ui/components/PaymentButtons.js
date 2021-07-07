import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { Flex } from '/imports/core/ui/atoms';
import { CheckoutButtonBig } from '/imports/checkout/ui/atoms';

class PaymentButtons extends PureComponent {
  render() {
    const { loading } = this.props;
    return (
      <Flex
        direction={'column'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <CheckoutButtonBig lock type="submit">
          {loading ? 'Processing...' : 'Get your Resume'}
        </CheckoutButtonBig>
      </Flex>
    );
  }
}

export default PaymentButtons;
