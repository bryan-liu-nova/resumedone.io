import React, { PureComponent } from 'react';
import { Meteor } from 'meteor/meteor';
import styled from 'styled-components';
import { graphql, compose } from 'react-apollo';
import history from '/imports/core/api/history';

import PaymentPrice from './PaymentPrice';
import PaymentButtons from './PaymentButtons';
import { withAccount } from '/imports/core/api/accounts/accountContext';
import { injectStripe } from 'react-stripe-elements';
import { CheckoutButtonPrevious } from '/imports/checkout/ui/atoms';
import { Flex } from '/imports/core/ui/atoms';
import { CREATE_SUBSCRIPTION } from '/imports/checkout/api/apollo/client/mutations';
import { GET_DOWNLOAD_LINK } from '/imports/generator/api/apollo/client/mutations';
import { CURRENT_USER } from '/imports/core/api/apollo/client/queries';
import { Analytics } from '/imports/core/api/analytics';

@injectStripe
@withAccount
@compose(
  graphql(CREATE_SUBSCRIPTION, { name: 'createSubscription' }),
  graphql(GET_DOWNLOAD_LINK, { name: 'getDownloadLink' })
)
class PaymentForm extends PureComponent {
  state = {
    loading: false,
    isSubmitted: false,
    processed: false
  };

  onServerError = error => {
    this.props.setPaymentError(error.message);
    this.setState({ loading: false });
    Analytics.track('card_denied');
  };

  back = () => {
    const { resume } = this.props;
    const path = resume ? `/resume/${resume._id}/edit` : '/account';
    history.push(path);
  };

  saveBillingInfo = token => {
    const {
      currentUser: {
        personalData: { email }
      },
      resume
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
          Analytics.track('purchase');
          if (resume) {
            this.props
              .getDownloadLink({
                variables: {
                  resumeId: resume._id
                }
              })
              .then(
                ({
                  data: {
                    getDownloadLink: { resumeId, downloadKey }
                  }
                }) => {
                  this.setState({ processed: true, loading: false });
                  const a = document.createElement('a');
                  a.target = '_blank';
                  a.href = `${Meteor.absoluteUrl()}api/get-resume/${resumeId}/${downloadKey}`;
                  a.click();
                  history.push(`/resume/${resumeId}/edit`);
                }
              );
          } else {
            history.push(`/account`);
          }
        } else {
          Analytics.track('card_denied');
          this.setState({ loading: false });
          this.props.setPaymentError(
            createSubscription.error
              ? createSubscription.error.message
              : 'Unexpected error occured. Please try again later'
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
      <>
        <form onSubmit={this.onSubmit}>
          <PaymentPrice isSubmitted={isSubmitted} processed={processed} />
          {!processed && <PaymentButtons loading={loading} />}
        </form>
        <CheckoutButtonPrevious centered onClick={this.back}>
          <ButtonIcon
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 24 24"
            attr="[object Object]"
            height="1em"
            width="1em"
          >
            <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z" />
          </ButtonIcon>
          Back
        </CheckoutButtonPrevious>
      </>
    );
  }
}

const ButtonIcon = styled.svg`
  font-size: 25px;
  position: absolute;
  top: 15px;
  left: 45px;
  stroke: none;
`;

export default PaymentForm;
