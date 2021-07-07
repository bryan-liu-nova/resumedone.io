import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Elements } from 'react-stripe-elements';

import { Page, Container, Flex, Box } from '/imports/core/ui/atoms';
import { ResponsiveConsumer } from '/imports/core/api/responsiveContext';
import Header from '../components/HeaderOne';
import LeftSide from '../components/PaymentLeftSideOne';
import RightSide from '../components/PaymentRightSideOne';
import history from '/imports/core/api/history';
import { Analytics } from '/imports/core/api/analytics';

@withRouter
class PaymentOne extends PureComponent {
  static propTypes = {
    plan: PropTypes.string
  };

  componentWillMount() {
    if (!this.props.plan) {
      history.push('/checkout');
    }
  }

  componentDidMount() {
    Analytics.track('payment_view', { variant: '0' });
  }

  render() {
    return (
      <ResponsiveConsumer>
        {({ isMobile }) => (
          <PageExt>
            <Header />
            <ContainerPayment>
              <Flex wrap={(isMobile && 'wrap') || 'nowrap'}>
                <Box width="100%">
                  <LeftSide plan={this.props.plan} />
                </Box>
                <Box width="100%">
                  <Elements>
                    <RightSide plan={this.props.plan} />
                  </Elements>
                </Box>
              </Flex>
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
  padding: 40px 70px;
  ${({ theme }) => theme.max('md')`
    padding: 0;
  `}
`;

export default PaymentOne;
