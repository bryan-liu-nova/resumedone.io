import React, { PureComponent } from 'react';
import { Meteor } from 'meteor/meteor';
import styled from 'styled-components';
import { graphql, compose } from 'react-apollo';
import { injectStripe } from 'react-stripe-elements';
import PropTypes from 'prop-types';

import { CREATE_SUBSCRIPTION } from '/imports/checkout/api/apollo/client/mutations';
import { withAccount } from '/imports/core/api/accounts/accountContext';

import { Flex, Icon, Box } from '/imports/core/ui/atoms';
import {
  CheckoutTextOne,
  CheckoutIcon,
  CheckoutButtonOne
} from '/imports/checkout/ui/atoms';
import { ResponsiveConsumer } from '/imports/core/api/responsiveContext';
import { SecureText } from './PaymentLeftSideOne';
import PaymentStatusMessage from './PaymentStatusMessage';
import history from '/imports/core/api/history';
import { CURRENT_USER } from '/imports/core/api/apollo/client/queries';
import {
  StripeCardInput,
  StripeCVCInput,
  StripeExpiryInput
} from './StripeInputsOne';

@injectStripe
@withAccount
@compose(graphql(CREATE_SUBSCRIPTION, { name: 'createSubscription' }))
class RightSide extends PureComponent {
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
    return (
      <ResponsiveConsumer>
        {({ isMobile }) => (
          <Section>
            <PaymentStatusMessage error message={this.state.paymentError} />
            <Form onSubmit={this.onSubmit}>
              <Heading>Payment information</Heading>
              <CardImages justifyContent="space-between">
                <Box>
                  <CheckoutIcon.Cards />
                </Box>
                <Box>
                  <Security>
                    SECURE CHECKOUT <Icon icon="lock" />
                  </Security>
                </Box>
              </CardImages>
              <Flex wrap="wrap">
                <Box md={12} sm={12}>
                  <Label form>Card number</Label>
                  <StripeCardInput showInvalidState={isSubmitted} />
                </Box>
                <Box md={6} sm={6}>
                  <Label form>Security code</Label>
                  <StripeCVCInput showInvalidState={isSubmitted} />
                </Box>
                <BoxPadded md={6} sm={6}>
                  <Label form>Expiry date:</Label>
                  <StripeExpiryInput showInvalidState={isSubmitted} />
                </BoxPadded>
              </Flex>
              <FormInfo>
                By clicking the 'Get your CV' button, you're confirming that you
                have read, understood and accepted our{' '}
                <a href="/terms-and-conditions" target="_blank">
                  Terms and Conditions
                </a>{' '}
                &{' '}
                <a href="/privacy-policy" target="_blank">
                  Privacy Policy
                </a>
                . You will be charged $1.90 now. After 14 days, your
                subscription will automatically be renewed and you will be
                charged $17.90 every four weeks if you have not cancelled within
                the 14 days. You can cancel your subscription at any time by
                contacting our support team via email, phone or live chat.
              </FormInfo>
              {!processed && (
                <CheckoutButtonOne>
                  {loading ? 'Processing...' : 'GET YOUR CV'}
                </CheckoutButtonOne>
              )}
              {isMobile && (
                <FlexBottom>
                  <SecureText>
                    <Icon icon="lock" /> SECURE SERVER
                  </SecureText>
                  <CheckoutIcon.Norton />
                </FlexBottom>
              )}
            </Form>
            <SectionHelp>
              <HelpHeading>Need to cancel? No problem</HelpHeading>
              <HelpText>
                Get the best deal and save with a monthly subscription. Your
                credit card will be billed immediately after purchase. Depending
                on where you are, foreign exchange fees may apply. You can
                cancel your account at any time online or via email to avoid
                future charges.
              </HelpText>
              <HelpHeading>The CVHelp guarantee</HelpHeading>
              <HelpText>
                We've worked hard to design a tool that helps you create the
                best CV to help you get the job. If you're unhappy for any
                reason during your 14-day trial, just let us know and we'll
                refund your money.
              </HelpText>
            </SectionHelp>
          </Section>
        )}
      </ResponsiveConsumer>
    );
  }
}

const Section = styled.section``;

const SectionHelp = styled.section`
  ${({ theme }) => theme.max('md')`
    padding: 0 15px 50px;
  `}
`;

const Form = styled.form`
  box-shadow: 0 1px 2px 1px #e9ebf2;
  background-color: #ffffff;
  padding: 30px 40px 50px;
  ${({ theme }) => theme.max('md')`
    padding: 20px 15px 50px;
  `}
`;

const Heading = styled(CheckoutTextOne)`
  margin: 0;
  font-size: 30px;
  ${({ theme }) => theme.max('md')`
    font-size: 28px;
  `}
`;

const CardImages = styled(Flex)`
  margin-top: 10px;
  padding-top: 20px;
  padding-bottom: 15px;
  border-top: solid 1px #dde4e8;
  ${({ theme }) => theme.max('md')`
    padding-bottom: 0;
    svg {
      width: 170px;
    }
  `}
`;

const FlexBottom = styled(p => (
  <Flex justifyContent="space-between" alignItems="center" {...p} />
))`
  margin-top: 15px;
`;

const Security = styled(CheckoutTextOne)`
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  color: #3d4047;
  padding: 8px 5px 5px 20px;
  border-radius: 2px;
  background-color: #eef3f6;
`;

const BoxPadded = styled(Box)`
  padding-left: 15px;
`;

const Label = styled.label`
  font-family: ${p => p.theme.font.family.correctText};
  color: #3d4047;
  font-weight: 500;
  margin-bottom: 3px;
  margin-top: 15px;
  display: block;
`;

const FormInfo = styled(CheckoutTextOne)`
  line-height: 1.19;
  color: #3d4047;
  margin: 25px 0;
  span {
    color: #ff8000;
  }
`;

const HelpHeading = styled(CheckoutTextOne)`
  font-size: 18px;
  font-weight: 500;
  color: #41444b;
  margin-top: 30px;
  margin-bottom: 5px;
`;

const HelpText = styled(CheckoutTextOne)`
  font-size: 13px;
  line-height: 1.23;
  color: #7e828c;
  margin: 0;
`;

export default RightSide;
