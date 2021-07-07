import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Flex, Box } from '/imports/core/ui/atoms';
import { CheckoutTextTwo as CheckoutText } from '/imports/checkout/ui/atoms';
import {
  HelpHeading,
  HelpText
} from '/imports/checkout/ui/components/PaymentLeftSideTwo';
import {
  PLAN_AMOUNT,
  PLAN_NAME,
  PLAN_SUB_INFO
} from '/imports/checkout/api/constants';

class RightSide extends PureComponent {
  static propTypes = {
    plan: PropTypes.string
  };

  items = [
    { text: 'Unlimited download, print, and email', image: 'download-2' },
    { text: 'Multiple resume templates', image: 'template-2' },
    { text: 'Cover Letter Builder', image: 'file-2' },
    { text: 'Resume Check', image: 'search-2' }
  ];

  displayPrice = () => {
    return (PLAN_AMOUNT[this.props.plan] / 100).toFixed(2);
  };

  render() {
    return (
      <BoxRight>
        <TotalBox>
          <TotalHeading>Review my order</TotalHeading>
          <Divider />
          <TotalDescription>
            Item: {PLAN_NAME[this.props.plan]}
          </TotalDescription>
          <Flex wrap="wrap">
            {this.items.map(({ text, image }, key) => (
              <TotalItem key={key}>
                <TotalImage image={image} />
                <TotalItemText key={key}>{text}</TotalItemText>
              </TotalItem>
            ))}
          </Flex>
        </TotalBox>
        <TotalFooter>
          Total Due Today <span>${this.displayPrice()}</span>
        </TotalFooter>
        <HelpHeading>Our Guarantee</HelpHeading>
        <HelpText>
          ResumeDone offers the professional guidance to create custom resumes
          and cover letters. If you're not satisfied during your{' '}
          {PLAN_SUB_INFO[this.props.plan].TRIAL} days trial, contact us for a
          refund.
        </HelpText>
      </BoxRight>
    );
  }
}

const BoxRight = styled(Box)`
  max-width: 325px;
  margin-left: 40px;
  width: 100%;
  ${({ theme }) => theme.max('md')`
    display: none;
  `}
`;

const TotalBox = styled(Box)`
  max-width: 325px;
  padding: 36px 30px;
  border: solid 1px #d7dee2;
  background-color: #fbfcfd;
`;

const TotalHeading = styled(CheckoutText)`
  font-size: 24px;
  font-weight: 500;
  color: #404248;
  margin: 0 0 10px;
`;

const Divider = styled.div`
  border: solid 1px #e8ecf0;
  width: 100%;
`;

const TotalDescription = styled(CheckoutText)`
  font-size: 17px;
  line-height: 1.29;
  color: #404248;
  margin: 15px 0 35px;
`;

const TotalItem = styled(Box)`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-bottom: 18px;
`;

const TotalImage = styled.div`
  height: 30px;
  width: 30px;
  background: no-repeat center url(/img/checkout/${p => p.image}.png);
`;

const TotalItemText = styled(CheckoutText)`
  font-size: 14px;
  line-height: 1.29;
  color: #404248;
  margin: 0 0 0 20px;
`;

const TotalFooter = styled(Box)`
  padding: 20px 30px;
  background-color: #7d96ad;
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  line-height: 1;
  span {
    float: right;
  }
`;

export default RightSide;
