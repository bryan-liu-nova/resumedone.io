import React, { PureComponent } from 'react';
import { Meteor } from 'meteor/meteor';
import styled from 'styled-components';
import { graphql, compose } from 'react-apollo';
import { injectStripe } from 'react-stripe-elements';
import PropTypes from 'prop-types';

import { Flex, Box, Icon } from '/imports/core/ui/atoms';
import {
  CheckoutButtonOne as Button,
  CheckoutIcon,
  CheckoutTextOne as CheckoutText
} from '/imports/checkout/ui/atoms';
import { CURRENT_USER } from '/imports/core/api/apollo/client/queries';
import {
  StripeCardInput,
  StripeCVCInput,
  StripeExpiryInput
} from './StripeInputsThree';
import { CREATE_SUBSCRIPTION } from '/imports/checkout/api/apollo/client/mutations';
import { PLAN_AMOUNT, PLAN_SUB_INFO } from '/imports/checkout/api/constants';
import { withAccount } from '/imports/core/api/accounts/accountContext';
import history from '/imports/core/api/history';
import PaymentStatusMessage from './PaymentStatusMessage';
import { Analytics } from '/imports/core/api/analytics';

@injectStripe
@withAccount
@compose(graphql(CREATE_SUBSCRIPTION, { name: 'createSubscription' }))
class PaymentForm extends PureComponent {
  static propTypes = {
    plan: PropTypes.string,
    isMobile: PropTypes.bool
  };

  state = {
    paymentError: '',
    loading: false,
    isSubmitted: false,
    processed: false
  };

  setPaymentError = paymentError => this.setState({ paymentError });

  onServerError = error => {
    this.setPaymentError(error.message);
    this.setState({ loading: false });
  };

  saveBillingInfo = token => {
    const {
      currentUser: {
        personalData: { email }
      }
    } = this.props;
    this.setState({ loading: true });
    const tokenId =
      Meteor.settings.public.common.env === 'production'
        ? token.id
        : 'tok_visa';
    this.props
      .createSubscription({
        variables: {
          token: tokenId,
          email,
          plan: this.props.plan
        },
        refetchQueries: [{ query: CURRENT_USER }]
      })
      .then(({ data: { createSubscription } }) => {
        if (createSubscription.success) {
          history.push('/account');
          Analytics.track('purchase');
        } else {
          this.setState({ loading: false });
          this.setPaymentError(
            createSubscription.error
              ? createSubscription.error.message
              : 'Unexpected error occured. Please try again later'
          );
          Analytics.track('card_denied');
        }
      })
      .catch(err => {
        this.setState({ loading: false });
        this.setPaymentError(err.message);
        Analytics.track('unexpected_payment_error');
      });
  };

  onError = () => {
    this.setState({ loading: false });
  };

  onSubmit = e => {
    e.preventDefault();
    this.setState({ isSubmitted: true, loading: true });
    const { stripe } = this.props;
    Analytics.track('init_payment');
    if (!stripe) {
      return this.onError();
    }
    stripe
      .createToken({ type: 'card', name: 'Initial' })
      .then(({ error, token }) => {
        if (error) {
          Analytics.track('card_denied');
          this.onServerError(error);
        } else {
          this.saveBillingInfo(token);
        }
      });
  };

  render() {
    const { isSubmitted, loading, processed } = this.state;
    const { isMobile } = this.props;
    return (
      <Form onSubmit={this.onSubmit}>
        {isMobile && (
          <SecurityTop>
            <Icon icon="lock" /> SECURE CHECKOUT
          </SecurityTop>
        )}
        <Flex justifyContent="space-between">
          <FormTopHeading>Enter payment information</FormTopHeading>
          <CheckoutIcon.BWCards />
        </Flex>
        <Flex wrap="wrap">
          <Box md={12} sm={12}>
            <Label form>Card number</Label>
            <StripeCardInput showInvalidState={isSubmitted} />
          </Box>
          <Box md={6} sm={6}>
            <Label form>{(isMobile && 'CVV') || 'Security code'}</Label>
            <StripeCVCInput showInvalidState={isSubmitted} />
          </Box>
          <BoxPadded sm={6} md={6}>
            <Label form>Expiration Date</Label>
            <StripeExpiryInput showInvalidState={isSubmitted} />
          </BoxPadded>
        </Flex>
        {isMobile && (
          <FlexSecure justifyContent="space-between" alignItems="center">
            <CheckoutIcon.Norton />
            <Security>
              <Icon icon="lock" /> SECURE CHECKOUT
            </Security>
          </FlexSecure>
        )}
        <FormInfo>
          By clicking "Get Your Resume" below you agree to be charged $
          {PLAN_AMOUNT[this.props.plan] / 100} now and accept our{' '}
          <a href="/terms-and-conditions" target="_blank">
            Terms and Conditions
          </a>{' '}
          and{' '}
          <a href="/privacy-policy" target="_blank">
            Privacy Policy
          </a>
          . You will be billed ${PLAN_SUB_INFO[this.props.plan].AMOUNT / 100}{' '}
          after {PLAN_SUB_INFO[this.props.plan].TRIAL} days, and every{' '}
          {PLAN_SUB_INFO[this.props.plan].PERIOD} after that until your
          subscription ends which <b>you can cancel at any time.</b>
        </FormInfo>
        <Flex justifyContent="space-between" alignItems="center">
          {!processed && (
            <CheckoutButton>
              {loading ? 'Processing...' : 'Get Your Resume'}
            </CheckoutButton>
          )}
          {!isMobile && <CheckoutIcon.Norton />}
        </Flex>
        {!isMobile && (
          <Security>
            <Icon icon="lock" /> SECURE CHECKOUT
          </Security>
        )}
        <PaymentStatusMessage error message={this.state.paymentError} />
      </Form>
    );
  }
}

const Form = styled.form`
  border: solid 1px #d7dee2;
  background-color: #ffffff;
  padding: 30px;
  ${({ theme }) => theme.max('md')`
    border: none;
    padding: 20px;
    svg {
      width: 88px;
    }
  `}
`;

const BoxPadded = styled(Box)`
  padding-left: 15px;
`;

const Label = styled.label`
  font-family: ${p => p.theme.font.family.correctText};
  font-size: 16px;
  color: #3d4047;
  font-weight: 500;
  margin-bottom: 3px;
  margin-top: 30px;
  display: block;
`;

const FormInfo = styled(CheckoutText)`
  margin: 25px 63px 30px 0;
  font-size: 10px;
  line-height: 1.29;
  color: #8c9099;
  span {
    color: #ff6600;
  }
  a {
    color: #98a1b3;
  }
  b {
    color: #3d4047;
  }
  ${({ theme }) => theme.max('md')`
    font-size: 13px;
    margin: 10px 0 15px;
    color: #474a51;
    b {
      font-weight: 400;
      color: #474a51;
    }
  `}
`;

const CheckoutButton = styled(Button)`
  height: 42px;
  width: 312px;
  ${({ theme }) => theme.max('md')`
    height: 48px;
    border-radius: 4px;
    width: 100%;
  `}
`;

const FlexSecure = styled(Flex)`
  margin-top: 20px;
`;

const Security = styled(CheckoutText)`
  margin: 25px 0 0;
  font-size: 14px;
  letter-spacing: 0.2px;
  color: #41444b;
  i {
    color: #ffc000;
    font-size: 15px;
    margin-right: 10px;
  }
  ${({ theme }) => theme.max('md')`
    margin: 0;
  `}
`;

const SecurityTop = styled(Security)`
  color: #429ff0;
  && {
    margin: 0 0 15px;
  }
`;

const FormTopHeading = styled(CheckoutText)`
  font-size: 22px;
  font-weight: 500;
  margin: 0;
`;

export default PaymentForm;
