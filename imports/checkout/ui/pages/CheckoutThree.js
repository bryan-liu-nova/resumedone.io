import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Page, Flex, Image } from '/imports/core/ui/atoms';
import {
  CheckoutOneContainer as Container,
  CheckoutTextOne as CheckoutText
} from '/imports/checkout/ui/atoms';
import Header from '../components/HeaderOne';
import Pricing from '../components/PricingThree';
import Testimonial from '../components/TestimonialThree';

@withRouter
class CheckoutThree extends PureComponent {
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
        <SeenInContainer>
          <SeenInHeading>As Seen In</SeenInHeading>
          <Flex justifyContent="center">
            <Image src="/img/checkout/companies.png" />
          </Flex>
        </SeenInContainer>
        <Testimonial />
      </PageExt>
    );
  }
}

const PageExt = styled(Page)`
  background: #f6f7fa;
`;

const SeenInContainer = styled(Container)`
  border: solid 1px #dde4e8;
  background-color: #f4f8fa;
  padding: 60px 40px 50px;
  ${Image} {
    width: 100%;
  }
  ${({ theme }) => theme.max('md')`
    padding-top: 40px;
  `}
`;

const SeenInHeading = styled(CheckoutText)`
  font-size: 36px;
  text-align: center;
  margin: 0 0 30px
    ${({ theme }) => theme.max('md')`
    font-size: 32px;
  `};
`;

export default CheckoutThree;
