import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Page } from '/imports/core/ui/atoms';
import Header from '../components/HeaderOne';
import Pricing from '../components/PricingOne';
import Testimonial from '../components/TestimonialOne';
import Footer from '../components/FooterOne';

@withRouter
class CheckoutOne extends PureComponent {
  static propTypes = {
    plan: PropTypes.string,
    selectPlan: PropTypes.func
  };

  render() {
    const { plan, selectPlan } = this.props;
    return (
      <PageExt>
        <Header />
        <Pricing plan={plan} selectPlan={selectPlan} />
        <Testimonial />
        <Footer />
      </PageExt>
    );
  }
}

const PageExt = styled(Page)`
  background: #f6f7fa;
`;

export default CheckoutOne;
