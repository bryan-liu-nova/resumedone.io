import React, { PureComponent } from 'react';
import { graphql } from 'react-apollo';
import styled from 'styled-components';
import { Elements } from 'react-stripe-elements';
import { withRouter } from 'react-router-dom';

import { Page, Container } from '/imports/core/ui/atoms';
import TopHeader from '../components/TopHeader';
import Top from '../components/Top';
import Advantages from '../components/Advantages';
import PaymentInfo from '../components/PaymentInfo';
import PaymentForm from '../components/PaymentForm';
import PaymentStatusMessage from '../components/PaymentStatusMessage';
import HeaderBackground from '../components/HeaderBackground';
import { GET_RESUME } from '/imports/generator/api/apollo/client/queries';

@withRouter
@graphql(GET_RESUME, {
  options: p => ({
    variables: {
      resumeId: p.match.params.resumeId
    }
  })
})
class Checkout extends PureComponent {
  state = {
    paymentError: ''
  };

  componentDidMount() {
    localStorage.setItem('resumedone:checkout-seen', 'true');
  }

  setPaymentError = paymentError => this.setState({ paymentError });

  render() {
    const { paymentError } = this.state;
    const {
      data: { getResume, loading },
      match: {
        params: { resumeId }
      }
    } = this.props;
    return (
      <PageExt>
        <TopHeader />
        <ContainerComp>
          <Top />
          {resumeId && <Advantages resume={getResume} loading={loading} />}
          <PaymentStatusMessage error message={paymentError} />
          <Elements>
            <PaymentForm
              setPaymentError={this.setPaymentError}
              resume={getResume}
            />
          </Elements>
          <PaymentInfo />
        </ContainerComp>
        <HeaderBackground />
      </PageExt>
    );
  }
}

const PageExt = styled(Page)`
  background: #f7f7f7;
  min-height: 100vh;
  overflow: hidden;
`;

const ContainerComp = styled(Container)`
  max-width: 850px;
  padding: 0 10px;
  font-family: ${({ theme }) => theme.font.family.openSans};
  ${({ theme }) => theme.max('xs')`
    padding: 0;
  `}
`;

export default Checkout;
