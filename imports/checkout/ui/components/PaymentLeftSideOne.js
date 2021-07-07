import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Icon } from '/imports/core/ui/atoms';
import { ResponsiveConsumer } from '/imports/core/api/responsiveContext';
import { CheckoutTextOne, CheckoutIcon } from '/imports/checkout/ui/atoms';
import { PLAN_AMOUNT, PLAN_NAME } from '/imports/checkout/api/constants';

class LeftSide extends PureComponent {
  static propTypes = {
    plan: PropTypes.string
  };

  items = [
    'Unlimited downloading, printing and emailing',
    'Multiple CV templates',
    'Covering Letter Builder',
    'Access your CV from anywhere'
  ];

  displayPrice = () => {
    return (PLAN_AMOUNT[this.props.plan] / 1000).toFixed(2);
  };

  displayItem = () => {
    const item = PLAN_NAME[this.props.plan].toLowerCase();
    return item.charAt(0).toUpperCase() + item.slice(1);
  };

  render() {
    return (
      <ResponsiveConsumer>
        {({ isMobile }) => (
          <Section>
            {!isMobile && <CheckoutIcon.Norton />}
            <TotalText>
              Total due today:
              <span>${this.displayPrice()}</span>
            </TotalText>
            <TotalDescription>
              <span>Item:</span> {this.displayItem()}
            </TotalDescription>
            <TotalList>
              {this.items.map((text, key) => (
                <TotalListItem key={key}>
                  <Icon icon="check" /> {text}
                </TotalListItem>
              ))}
            </TotalList>
            {!isMobile && (
              <SecureText>
                <Icon icon="lock" /> SECURE SERVER
              </SecureText>
            )}
          </Section>
        )}
      </ResponsiveConsumer>
    );
  }
}

const Section = styled.section`
  position: relative;
  text-align: left;
  padding: 0 60px;
  ${({ theme }) => theme.max('md')`
    padding: 30px 30px 0 15px;
  `}
`;

const TotalText = styled(CheckoutTextOne)`
  font-size: 26px;
  padding-bottom: 10px;
  border-bottom: solid 1px #dde4e8;
  margin-top: 30px;
  margin-bottom: 15px;
  && {
    color: #41444b;
  }
  span {
    float: right;
    color: #429ff0;
  }
  ${({ theme }) => theme.max('md')`
    margin-top: 0;
  `}
`;

const TotalDescription = styled(CheckoutTextOne)`
  font-size: 18px;
  color: #41444b;
  margin: 0;
  span {
    font-weight: 600;
  }
`;

const TotalList = styled.div`
  padding: 20px 30px;
  border-bottom: solid 1px #dde4e8;
  margin-bottom: 25px;
  ${({ theme }) => theme.max('md')`
    padding-right: 0;
    border: none;
    margin: 0;
  `}
`;

const TotalListItem = styled(CheckoutTextOne)`
  margin: 0;
  position: relative;
  font-size: 18px;
  line-height: 1.94;
  color: #41444b;
  i {
    color: #429ff0;
    position: absolute;
    top: 9px;
    left: -30px;
    font-weight: bold;
  }
`;

export const SecureText = styled(CheckoutTextOne)`
  margin: 0;
  font-weight: bold;
  font-size: 18px;
  line-height: 1;
  color: #41444b;
  letter-spacing: 0.2px;
  display: flex;
  align-items: center;
  i {
    font-size: 21px;
    margin-right: 8px;
  }
`;

export default LeftSide;
