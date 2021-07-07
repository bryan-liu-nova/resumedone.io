import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Elements } from 'react-stripe-elements';

import { Page, Container, Flex, Box, Icon } from '/imports/core/ui/atoms';
import { ResponsiveConsumer } from '/imports/core/api/responsiveContext';
import {
  CheckoutTextTwo as CheckoutText,
  CheckoutIcon
} from '/imports/checkout/ui/atoms';
import Header from '../components/HeaderOne';
import LeftSide, { Security } from '../components/PaymentLeftSideTwo';
import RightSide from '../components/PaymentRightSideTwo';
import { PLAN_AMOUNT } from '/imports/checkout/api/constants';
import history from '/imports/core/api/history';
import { Analytics } from '/imports/core/api/analytics';

@withRouter
class PaymentTwo extends PureComponent {
  static propTypes = {
    plan: PropTypes.string
  };

  componentWillMount() {
    if (!this.props.plan) {
      history.push('/checkout');
    }
  }

  componentDidMount() {
    Analytics.track('payment_view', { variant: '1' });
  }

  displayPrice = () => {
    return (PLAN_AMOUNT[this.props.plan] / 100).toFixed(2);
  };

  render() {
    return (
      <ResponsiveConsumer>
        {({ isMobile }) => (
          <PageExt>
            <Header />
            {isMobile && (
              <TotalHeader>
                Total Due Today <span>${this.displayPrice()}</span>
              </TotalHeader>
            )}
            <ContainerPayment>
              <Flex justifyContent="space-between">
                <Box>
                  <PaymentHeading>Enter payment information</PaymentHeading>
                </Box>
                {!isMobile && (
                  <Box>
                    <Flex>
                      <SecureIcon icon="lock" />
                      <Box>
                        <SecureText>SECURE SERVER</SecureText>
                        <SecureMore>Tell me more</SecureMore>
                      </Box>
                    </Flex>
                  </Box>
                )}
              </Flex>
              {isMobile && (
                <FlexSecurity>
                  <Security justifyContent="space-between">
                    <Icon icon="lock" /> SECURE CHECKOUT
                  </Security>
                  <CheckoutIcon.Cards2 />
                </FlexSecurity>
              )}
              <Flex>
                <Elements>
                  <LeftSide isMobile={isMobile} plan={this.props.plan} />
                </Elements>
                <RightSide plan={this.props.plan} />
              </Flex>
            </ContainerPayment>
          </PageExt>
        )}
      </ResponsiveConsumer>
    );
  }
}

const PageExt = styled(Page)`
  background: #ffffff;
  max-height: 100vh;
`;

const TotalHeader = styled(Box)`
  padding: 20px;
  background-color: #429ff0;
  font-size: 22px;
  color: #ffffff;
  line-height: 1;
  span {
    float: right;
  }
`;

const FlexSecurity = styled(p => (
  <Flex justifyContent="space-between" {...p} />
))`
  margin-bottom: 10px;
`;

const ContainerPayment = styled(Container)`
  padding: 50px 100px;
  ${({ theme }) => theme.max('md')`
    padding: 20px 20px 70px;
 `}
`;

const PaymentHeading = styled(CheckoutText)`
  font-size: 44px;
  font-weight: 300;
  color: #429ff0;
  margin: 0 0 35px;
  ${({ theme }) => theme.max('md')`
    font-size: 22px;
    margin: 15px 0;
 `}
`;

const SecureIcon = styled(Icon)`
  font-size: 26px;
  color: #ffc902;
  margin-right: 10px;
`;

const SecureText = styled(CheckoutText)`
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.1px;
  color: #41444b;
  margin: 0;
  line-height: 1;
  text-align: left;
`;

const SecureMore = styled(CheckoutText)`
  font-size: 13px;
  color: #66b2e3;
  margin: 0;
  line-height: 1;
  text-decoration: underline;
  text-align: left;
`;

export default PaymentTwo;
