import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { Analytics } from '/imports/core/api/analytics';

import { Flex, Box, Radio } from '/imports/core/ui/atoms';
import history from '/imports/core/api/history';
import { ResponsiveConsumer } from '/imports/core/api/responsiveContext';
import {
  CheckoutHeadingOne as CheckoutHeading,
  CheckoutTextOne as CheckoutText,
  CheckoutButtonOne as CheckoutButton,
  CheckoutOneContainer as Container
} from '/imports/checkout/ui/atoms';
import {
  ONE_2WEEK,
  ONE_MONTH,
  PLAN_AMOUNT,
  PLAN_NAME
} from '/imports/checkout/api/constants';
import { currencyFormatter } from '/imports/checkout/api/utils';

class Pricing extends PureComponent {
  static propTypes = {
    plan: PropTypes.string,
    selectPlan: PropTypes.func
  };

  componentDidMount() {
    this.props.selectPlan(ONE_2WEEK);
  }

  leftItems = [
    'Unlimited printing and downloading for 14 days',
    'Create unlimited additional CV and letter variations',
    'After 14 days, auto-renews to $17.90, billed every four weeks',
    'Cancel at any time'
  ];

  rightItems = [
    '$65.40 up-front and save 70%',
    'Full access to all features, including covering letters',
    'Pay once, use all year long',
    'Will be renewed automatically each year – you can cancel at any time'
  ];

  centerItems = [
    {
      image: 'download',
      text: 'Download & save in different formats (PDF, Word, TXT, HTML)'
    },
    {
      image: 'file',
      title: 'Covering Letter Builder',
      text: 'Create a covering letter in minutes'
    },
    {
      image: 'copy',
      text: 'Customise and download different professionally designed CVs'
    },
    {
      image: 'calendar',
      text:
        "If you're unhappy for any reason during the first 14 days, just let us know – we'll refund your money."
    }
  ];

  changePlan = e => {
    this.props.selectPlan(e.currentTarget.value);
  };

  continue = () => {
    Analytics.track('add_to_cart', { product: this.props.plan, variant: '0' });
    history.push('/checkout/payment');
  };

  priceDisplay = (price, bold) => {
    const priceParts = currencyFormatter.formatToParts(price / 100);
    const priceFormatted = priceParts.map(({ type, value }) => {
      switch (type) {
        case 'currency':
          return bold ? (
            <span className="currency">
              <b>{value}</b>
            </span>
          ) : (
            <span className="currency">{value}</span>
          );
        case 'decimal':
          return bold ? (
            <span>
              <b>{value}</b>
            </span>
          ) : (
            <span>{value}</span>
          );
        case 'fraction':
          return <span>{value}</span>;
        default:
          return value;
      }
    });
    return <PriceDisplay noMargin>{priceFormatted}</PriceDisplay>;
  };

  render() {
    return (
      <ResponsiveConsumer>
        {({ isMobile }) => (
          <Section>
            <Container>
              <PriceHeading>Employers are waiting for your CV.</PriceHeading>
              <PricingFlex grid alignItems="center" justifyContent="center">
                <Card md={4}>
                  {(isMobile && (
                    <CardMobileHeader>
                      <Checkbox
                        onChange={this.changePlan}
                        name="plan"
                        value={ONE_2WEEK}
                        checked={this.props.plan === ONE_2WEEK}
                      />
                      <CardMobileText>
                        {PLAN_NAME[ONE_2WEEK]}
                        {this.priceDisplay(PLAN_AMOUNT[ONE_2WEEK], true)}
                      </CardMobileText>
                      {this.props.plan === ONE_2WEEK && <CardHeaderDivider />}
                    </CardMobileHeader>
                  )) || (
                    <CardHeader>
                      <Checkbox
                        onChange={this.changePlan}
                        name="plan"
                        value={ONE_2WEEK}
                        checked={this.props.plan === ONE_2WEEK}
                      />
                      <CheckoutText noMargin>
                        {PLAN_NAME[ONE_2WEEK]}
                      </CheckoutText>
                      <PriceDisplay noMargin>
                        {this.priceDisplay(PLAN_AMOUNT[ONE_2WEEK])}
                      </PriceDisplay>
                    </CardHeader>
                  )}
                  <CardBody
                    collapsed={isMobile && this.props.plan === ONE_MONTH}
                  >
                    <PriceUl>
                      {this.leftItems.map((text, key) => (
                        <li key={key}>{text}</li>
                      ))}
                    </PriceUl>
                  </CardBody>
                </Card>
                <CenterCard md={4}>
                  <CenterHeading>SUBSCRIPTION FEATURES</CenterHeading>
                  {this.centerItems.map(({ image, text, title }, key) => (
                    <CenterItem key={key}>
                      <CenterItemImage image={image} />
                      <CenterItemText>
                        {(title && <span>{title}</span>) || ''} {text}
                      </CenterItemText>
                    </CenterItem>
                  ))}
                  <CheckoutButton onClick={this.continue}>
                    CONTINUE
                  </CheckoutButton>
                </CenterCard>
                <Card md={4}>
                  {(isMobile && (
                    <CardMobileHeader>
                      <Checkbox
                        onChange={this.changePlan}
                        name="plan"
                        value={ONE_MONTH}
                        checked={this.props.plan === ONE_MONTH}
                      />
                      <CardMobileText>
                        {PLAN_NAME[ONE_MONTH]}
                        {this.priceDisplay(PLAN_AMOUNT[ONE_MONTH], true)}
                      </CardMobileText>
                      {this.props.plan === ONE_MONTH && <CardHeaderDivider />}
                    </CardMobileHeader>
                  )) || (
                    <CardHeader>
                      <Checkbox
                        onChange={this.changePlan}
                        name="plan"
                        value={ONE_MONTH}
                        checked={this.props.plan === ONE_MONTH}
                      />
                      <CheckoutText noMargin>
                        {PLAN_NAME[ONE_MONTH]}
                      </CheckoutText>
                      <PriceDisplay noMargin>
                        {this.priceDisplay(PLAN_AMOUNT[ONE_MONTH])}
                      </PriceDisplay>
                    </CardHeader>
                  )}
                  <CardBody
                    collapsed={isMobile && this.props.plan === ONE_2WEEK}
                  >
                    <PriceUl>
                      {this.rightItems.map((text, key) => (
                        <li key={key}>{text}</li>
                      ))}
                    </PriceUl>
                  </CardBody>
                </Card>
                {isMobile && (
                  <>
                    <CheckoutButton onClick={this.continue}>
                      CONTINUE
                    </CheckoutButton>
                    <CardHeaderDivider />
                  </>
                )}
              </PricingFlex>
              <PriceDescription>
                You may cancel by email by live chat, or by calling us free of
                charge on 0203 868 3610
              </PriceDescription>
              {isMobile && (
                <Features>
                  <FeaturesTitle>ALL PLANS INCLUDE:</FeaturesTitle>
                  {this.centerItems.map(({ image, text, title }, key) => (
                    <FeaturesItem key={key}>
                      <FeaturesImage image={image} />
                      <FeaturesText>
                        {(title && <span>{title}</span>) || ''} {text}
                      </FeaturesText>
                    </FeaturesItem>
                  ))}
                </Features>
              )}
            </Container>
          </Section>
        )}
      </ResponsiveConsumer>
    );
  }
}

const Section = styled.section`
  text-align: center;
  padding: 60px 0 70px;
  ${({ theme }) => theme.max('md')`
    padding: 0;
  `}
`;

const PricingFlex = styled(Flex)`
  ${({ theme }) => theme.max('md')`
    padding: 25px 15px;
    margin: 0;
  `}
`;

const PriceHeading = styled(CheckoutHeading)`
  margin-bottom: 50px;
  ${({ theme }) => theme.max('md')`
    background-color: #043544;
    margin: 0;
    padding: 12px 68px 18px;
    font-size: 28px;
    line-height: 1.07;
    text-align: center;
    && {
      color: #ffffff;
      font-weight: 500;
    }
  `}
`;

const PriceDescription = styled(CheckoutText)`
  margin-top: 40px;
  font-size: 14px;
  color: #808694;
  ${({ theme }) => theme.max('md')`
    display: none;
  `}
`;

const PriceDisplay = styled(CheckoutText)`
  font-size: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  > span {
    margin-right: 5px;
    font-size: 23px;
  }
`;

const Card = styled(Box)`
  border: solid 1px #dde4e8;
  background-color: #ffffff;
  max-width: 300px;
  height: 379px;
  ${({ theme }) => theme.max('md')`
    max-width: 100%;
    height: auto;
    margin-bottom: 15px;
  `}
`;

const CenterCard = styled(Box)`
  max-width: 350px;
  border-radius: 2px;
  background: url(/img/checkout/price-background.png);
  padding: 50px 30px;
  color: white;
  ${({ theme }) => theme.max('md')`
    display: none;
  `}
`;

const CenterHeading = styled(CheckoutHeading)`
  font-size: 20px;
  letter-spacing: 1.1px;
  margin: 0 0 25px;
  && {
    color: #ffffff;
  }
`;

const CenterItem = styled.div`
  margin-bottom: 30px;
`;

const CenterItemImage = styled.div`
  height: 30px;
  width: 30px;
  background: no-repeat center url(/img/checkout/${p => p.image}.png);
  float: left;
`;

const CenterItemText = styled(CheckoutText)`
  line-height: 1.33;
  font-size: 15px;
  color: #ffffff;
  text-align: left;
  margin: 0 0 0 50px;
  span {
    display: block;
    font-weight: 600;
  }
`;

const Features = styled.section`
  background: #ffffff;
  width: 100%;
  padding: 25px 15px 30px;
`;

const FeaturesTitle = styled(CheckoutHeading)`
  font-size: 18px;
  margin: 0;
  text-align: left;
`;

const FeaturesItem = styled.div`
  margin-top: 25px;
`;

const FeaturesImage = styled.div`
  height: 42px;
  width: 42px;
  background: no-repeat center url(/img/checkout/${p => p.image}-mobile.png);
  float: left;
`;

const FeaturesText = styled(CenterItemText)`
  font-size: 18px;
  line-height: 1.22;
  color: #3d4047;
  margin-left: 60px;
`;

const CardHeader = styled.div`
  border-bottom: solid 1px #dde4e8;
  position: relative;
  text-align: center;
  padding: 25px 70px 20px;
`;

const CardMobileHeader = styled.div`
  position: relative;
  padding: 10px 15px;
`;

const CardMobileText = styled(CheckoutText)`
  font-size: 18px;
  font-weight: 600;
  text-align: left;
  margin: 0 0 0 45px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  span {
    text-align: right;
    font-size: 24px;
    font-weight: 500;
    b {
      font-size: 36px;
    }
  }
`;

const CardHeaderDivider = styled.div`
  border: solid 1px #e8ecf0;
  width: 100%;
  margin: 25px auto auto;
`;

const CardBody = styled.div`
  padding: 15px 40px 15px 0;
  position: relative;
  ${p =>
    p.collapsed &&
    css`
      display: none;
    `}
`;

const PriceUl = styled.ul`
  padding-left: 40px;
  font-family: ${p => p.theme.font.family.correctText};
  font-size: ${({ theme }) => theme.font.size.h6};
  margin: 0;
  ${({ theme }) => theme.max('md')`
    padding-left: 30px;
  `}
  li {
    position: relative;
    list-style: none;
    line-height: 1.43;
    text-align: left;
    margin-bottom: 20px;
    &:last-child {
      margin: 0;
    }
    &::before {
      background: #429ff0;
      content: ' ';
      position: absolute;
      left: -23px;
      top: 6px;
      display: block;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      ${({ theme }) => theme.max('md')`
        left: -15px
      `}
    }
  }
`;

const Checkbox = styled(Radio)`
  width: 28px;
  height: 28px;
  position: absolute;
  top: 18px;
  left: 18px;
  border-radius: 0;
  border: solid 1px #d4dbdf;
  background-color: #ffffff;
  ${p =>
    p.checked &&
    css`
      background-color: #429ff0;
      border: none;
    `}
  ${({ theme }) => theme.max('md')`
    top: 15px;
    left: 15px;
  `}
`;

export default Pricing;
