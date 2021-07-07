import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Elements } from 'react-stripe-elements';

import { Page } from '/imports/core/ui/atoms';
import { ResponsiveConsumer } from '/imports/core/api/responsiveContext';
import {
  CheckoutTextOne as CheckoutText,
  CheckoutOneContainer as Container
} from '/imports/checkout/ui/atoms';
import Header from '../components/HeaderOne';
import PaymentForm from '../components/PaymentFormThree';
import { PLAN_AMOUNT, PLAN_SUB_INFO } from '/imports/checkout/api/constants';
import history from '/imports/core/api/history';
import { Analytics } from '/imports/core/api/analytics';

@withRouter
class PaymentThree extends PureComponent {
  static propTypes = {
    plan: PropTypes.string
  };

  componentWillMount() {
    if (!this.props.plan) {
      history.push('/checkout');
    }
  }

  componentDidMount() {
    Analytics.track('payment_view', { variant: '2' });
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
            <ContainerPayment>
              <FormHead>
                <Heading>
                  Total Due Today: <span>${this.displayPrice()}</span>
                </Heading>
                <FormTip />
                <FormPip />
              </FormHead>
              <Elements>
                <PaymentForm plan={this.props.plan} isMobile={isMobile} />
              </Elements>
              <SectionHelp>
                <HelpHeading>Need to Cancel? No Problem.</HelpHeading>
                <HelpText>
                  Our #1 goal is to help you get a job quickly. Try us for{' '}
                  {PLAN_SUB_INFO[this.props.plan].TRIAL} days and if you're not
                  satisfied, we'll refund your money. Depending on where you
                  are, foreign exchange fees may apply. You can cancel your
                  account at any time online or by phone to avoid future
                  charges.
                </HelpText>
                <HelpHeading>Money Back Guarantee</HelpHeading>
                <HelpText>
                  We've designed ResumeDone to give you the tools you need to
                  create resumes and cover letters that get you hired. If you're
                  unhappy for any reason during your{' '}
                  {PLAN_SUB_INFO[this.props.plan].TRIAL}-day trial, just let us
                  know and we'll refund your money.
                </HelpText>
              </SectionHelp>
            </ContainerPayment>
          </PageExt>
        )}
      </ResponsiveConsumer>
    );
  }
}

const PageExt = styled(Page)`
  background: #f6f7fa;
  min-height: 100vh;
`;

const ContainerPayment = styled(Container)`
  padding: 40px 250px;
  ${({ theme }) => theme.max('md')`
    padding: 0;
  `}
`;

const SectionHelp = styled.section`
  ${({ theme }) => theme.max('md')`
    background: #ffffff;
    padding: 0 20px 50px;
    p:first-child {
      margin-top: 0;
    }
  `}
`;

const FormTip = styled.div`
  position: absolute;
  bottom: -10px;
  left: 50%;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid #edf3fa;
  z-index: 2;
  ${({ theme }) => theme.max('md')`
    display: none;
  `}
`;

const FormPip = styled(FormTip)`
  bottom: -12px;
  left: calc(50% - 4px);
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-top: 12px solid #d7dee2;
  z-index: 1;
  ${({ theme }) => theme.max('md')`
    display: none;
  `}
`;

const FormHead = styled.div`
  border-radius: 2px;
  border: solid 1px #d7dee2;
  background-color: #edf3fa;
  padding: 20px;
  position: relative;
  ${({ theme }) => theme.max('md')`
    padding-bottom: 15px;
  `}
`;

const Heading = styled(CheckoutText)`
  font-size: 20px;
  margin: 0;
  text-align: center;
  ${({ theme }) => theme.max('md')`
    font-size: 22px;
    text-align: left;
    span {
      color: #429ff0;
      float: right;
    }
  `}
`;

const HelpHeading = styled(CheckoutText)`
  font-weight: 500;
  margin-top: 25px;
  margin-bottom: 5px;
  font-size: 18px;
`;

const HelpText = styled(CheckoutText)`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.21;
  color: #8c9099;
  margin: 0;
  ${({ theme }) => theme.max('md')`
    color: #696e79;
  `}
`;

export default PaymentThree;
