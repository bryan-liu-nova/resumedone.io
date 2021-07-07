import React, { PureComponent } from 'react';
import { Meteor } from 'meteor/meteor';
import styled from 'styled-components';
import { graphql, compose } from 'react-apollo';
import { injectStripe } from 'react-stripe-elements';
import PropTypes from 'prop-types';

import { CREATE_SUBSCRIPTION } from '/imports/checkout/api/apollo/client/mutations';
import { PLAN_AMOUNT, PLAN_SUB_INFO } from '/imports/checkout/api/constants';
import { withAccount } from '/imports/core/api/accounts/accountContext';

import { Flex, Box, Input, Select, Icon } from '/imports/core/ui/atoms';
import {
  CheckoutTextTwo as CheckoutText,
  CheckoutButtonTwo as Button,
  CheckoutIcon
} from '/imports/checkout/ui/atoms';
import PaymentStatusMessage from './PaymentStatusMessage';
import history from '/imports/core/api/history';
import { CURRENT_USER } from '/imports/core/api/apollo/client/queries';
import {
  StripeCardInput,
  StripeCVCInput,
  StripeExpiryInput
} from './StripeInputsTwo';

@injectStripe
@withAccount
@compose(graphql(CREATE_SUBSCRIPTION, { name: 'createSubscription' }))
class LeftSide extends PureComponent {
  static propTypes = {
    plan: PropTypes.string
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
        } else {
          this.setState({ loading: false });
          this.setPaymentError(
            createSubscription.error ||
              'Unexpected error occured. Please try again later'
          );
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
    if (!stripe) {
      return this.onError();
    }
    stripe
      .createToken({ type: 'card', name: 'Initial' })
      .then(({ error, token }) => {
        error ? this.onServerError(error) : this.saveBillingInfo(token);
      });
  };

  render() {
    const { isSubmitted, loading, processed } = this.state;
    const { isMobile } = this.props;
    return (
      <BoxLeft>
        <Form onSubmit={this.onSubmit}>
          {!isMobile && <Heading>Card Information</Heading>}
          <Flex wrap="wrap">
            <Box md={12} sm={12}>
              <Label form>Card number</Label>
              <StripeCardInput showInvalidState={isSubmitted} />
            </Box>
            <Box md={6} sm={6}>
              <Label form>{(isMobile && 'CVV') || 'Security code'}</Label>
              <StripeCVCInput showInvalidState={isSubmitted} />
            </Box>
            <BoxPadded md={6} sm={6}>
              <Label form>Expiry date:</Label>
              <StripeExpiryInput showInvalidState={isSubmitted} />
            </BoxPadded>
          </Flex>
          <FormInfo>
            By clicking "Get My Resume" below you agree to be charged $
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
          <Flex
            wrap={(isMobile && 'wrap') || 'nowrap'}
            justifyContent="space-between"
            alignItems="center"
          >
            {!processed && (
              <CheckoutButton>
                {loading ? 'Processing...' : 'Get My Resume'}
              </CheckoutButton>
            )}
            <CheckoutIcon.Norton />
          </Flex>
          {!isMobile && (
            <Security>
              <Icon icon="lock" /> SECURE CHECKOUT
            </Security>
          )}
        </Form>
        <PaymentStatusMessage error message={this.state.paymentError} />
        {!isMobile && (
          <>
            <HelpHeading>How Would I Cancel?</HelpHeading>
            <HelpText>
              We'd be sorry to see you go! You can cancel at any time online or
              by phone. If you're not satisfied during your{' '}
              {PLAN_SUB_INFO[this.props.plan].TRIAL} days trial, let us know and
              we'll refund your money.
            </HelpText>
          </>
        )}
      </BoxLeft>
    );
  }
}

const BoxLeft = styled(Box)`
  max-width: 585px;
  width: 100%;
`;

const Form = styled.form`
  border: solid 1px #d7dee2;
  background-color: #ffffff;
  padding: 30px;
  ${({ theme }) => theme.max('md')`
    padding: 0;
    border: none;
 `}
`;

const Heading = styled(CheckoutText)`
  font-size: 20px;
  font-weight: 500;
  color: #404248;
  margin: 0;
  text-align: left;
`;

const BoxPadded = styled(Box)`
  padding-left: 15px;
`;

const Label = styled.label`
  font-family: ${p => p.theme.font.family.correctText};
  font-size: 17px;
  color: #6f7582;
  font-weight: 500;
  margin-bottom: 5px;
  margin-top: 20px;
  display: block;
`;

const FormInfo = styled(CheckoutText)`
  margin: 20px 0;
  font-size: 14px;
  line-height: 1.29;
  color: #6f7582;
  span {
    color: #b0b5c1;
  }
  a {
    color: #98a1b3;
  }
`;

const CheckoutButton = styled(Button)`
  height: 42px;
  border-radius: 3px;
  width: 260px;
  ${({ theme }) => theme.max('md')`
    height: 48px;
    margin-bottom: 30px;
 `}
`;

export const Security = styled(CheckoutText)`
  margin: 30px 0 0;
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

export const HelpHeading = styled(CheckoutText)`
  font-weight: 500;
  color: #404248;
  margin-top: 30px;
  margin-bottom: 8px;
`;

export const HelpText = styled(CheckoutText)`
  font-size: 14px;
  line-height: 1.21;
  color: #8c9099;
  margin: 0;
`;

export default LeftSide;
