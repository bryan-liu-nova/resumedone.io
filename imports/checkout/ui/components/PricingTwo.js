import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import {
  PLAN_AMOUNT,
  PLAN_NAME,
  TWO_2WEEK,
  TWO_MONTH
} from '/imports/checkout/api/constants';
import { currencyFormatter } from '/imports/checkout/api/utils';
import {
  CheckoutButtonTwo as CheckoutButton,
  CheckoutOneContainer as Container,
  CheckoutTextTwo as CheckoutText
} from '/imports/checkout/ui/atoms';
import { Analytics } from '/imports/core/api/analytics';
import history from '/imports/core/api/history';
import { ResponsiveConsumer } from '/imports/core/api/responsiveContext';
import { Box, Button, ButtonGroup, Flex, Radio } from '/imports/core/ui/atoms';

class Pricing extends PureComponent {
  static propTypes = {
    plan: PropTypes.string,
    selectPlan: PropTypes.func
  };

  componentDidMount() {
    this.props.selectPlan(TWO_2WEEK);
  }

  leftItems = [
    'Unlimited printing and downloading for 14 days',
    'Create unlimited additional CV and letter variations',
    'After 14 days, auto-renews at $29.99 billed every 4 weeks',
    'Cancel any time'
  ];

  rightItems = [
    'Pay $71.40 up-front and save 78%',
    'Full access to all features, including covering letters',
    'Automatically renews each year, cancel anytime',
    'Pay once, use all year long'
  ];

  centerItems = [
    {
      image: 'download-2',
      text: 'Download & save in multiple formats\n (PDF, Word, TXT)'
    },
    {
      image: 'file-2',
      title: 'Covering Letter Builder',
      text: 'Create a covering letter in minutes'
    },
    {
      image: 'search-2',
      title: 'Resume Check',
      text: 'Scans your resume for 20 critical mistakes'
    },
    {
      image: 'sms-2',
      title: "we'll refund your money.",
      text:
        "If you're unhappy for any reason during the first 14 days, just let us know – ",
      end: true
    }
  ];

  changePlan = e => {
    this.props.selectPlan(e.currentTarget.value);
  };

  selectWeek = () => {
    this.props.selectPlan(TWO_2WEEK);
  };

  selectYear = () => {
    this.props.selectPlan(TWO_MONTH);
  };

  isWeek = () => this.props.plan === TWO_2WEEK;

  isYear = () => this.props.plan === TWO_MONTH;

  continue = () => {
    Analytics.track('add_to_cart', { product: this.props.plan, variant: '1' });
    history.push('/checkout/payment');
  };

  priceDisplay = price => {
    const priceParts = currencyFormatter.formatToParts(price / 100);
    const priceFormatted = priceParts.map(({ type, value }) => {
      switch (type) {
        case 'currency':
          return <span className="currency">{value}</span>;
        case 'decimal':
          return <span>{value}</span>;
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
              <PriceHeading>
                Upgrade for Instant Access to All Features
              </PriceHeading>
              {(isMobile && (
                <MobileSection>
                  <RadioButtonGroup>
                    <ButtonRadio
                      onClick={this.selectWeek}
                      checked={this.isWeek()}
                    >
                      {PLAN_NAME[TWO_2WEEK]}
                    </ButtonRadio>
                    <ButtonRadio
                      onClick={this.selectYear}
                      checked={this.isYear()}
                    >
                      {PLAN_NAME[TWO_MONTH]}
                    </ButtonRadio>
                  </RadioButtonGroup>
                  <CheckoutText noMargin>
                    {(this.isWeek() && PLAN_NAME[TWO_2WEEK]) ||
                      PLAN_NAME[TWO_MONTH]}
                  </CheckoutText>
                  {this.priceDisplay(
                    this.isWeek()
                      ? PLAN_AMOUNT[TWO_2WEEK]
                      : PLAN_AMOUNT[TWO_MONTH]
                  )}
                  <Divider />
                  <CenterHeading>FEATURES</CenterHeading>
                  {this.centerItems.map(({ image, text, title, end }, key) => (
                    <CenterItem key={key}>
                      <CenterItemText first={key === 0} last={key === 3}>
                        {(title && !end && <span>{title}</span>) || ''}
                        {text}
                        {(title && end && <span>{title}</span>) || ''}
                        {key === 3 &&
                          ' After 14 days, auto-renews at $29.99 billed every 4 weeks, Cancel anytime'}
                      </CenterItemText>
                    </CenterItem>
                  ))}
                  <CheckoutButtonMobile onClick={this.continue}>
                    CONTINUE
                  </CheckoutButtonMobile>
                </MobileSection>
              )) || (
                <Flex grid alignItems="center" justifyContent="center">
                  <Card md={4}>
                    <CardHeader>
                      <Checkbox
                        onChange={this.changePlan}
                        name="plan"
                        value={TWO_2WEEK}
                        checked={this.isWeek()}
                      />
                      <CheckoutText noMargin>
                        {PLAN_NAME[TWO_2WEEK]}
                      </CheckoutText>
                      {this.priceDisplay(PLAN_AMOUNT[TWO_2WEEK])}
                    </CardHeader>
                    <Divider />
                    <CardBody>
                      <PriceUl>
                        {this.leftItems.map((text, key) => (
                          <li key={key}>{text}</li>
                        ))}
                      </PriceUl>
                    </CardBody>
                  </Card>
                  <CenterCard md={4}>
                    <CenterHeading>All Subscription Features</CenterHeading>
                    {this.centerItems.map(
                      ({ image, text, title, end }, key) => (
                        <CenterItem key={key}>
                          <CenterItemImage image={image} />
                          <CenterItemText>
                            {(title && !end && <span>{title}</span>) || ''}
                            {text}
                            {(title && end && <span>{title}</span>) || ''}
                          </CenterItemText>
                        </CenterItem>
                      )
                    )}
                    <CheckoutButton onClick={this.continue}>
                      Continue
                    </CheckoutButton>
                  </CenterCard>
                  <Card md={4}>
                    <CardHeader>
                      <Checkbox
                        right
                        onChange={this.changePlan}
                        name="plan"
                        value={TWO_MONTH}
                        checked={this.isYear()}
                      />
                      <CheckoutText noMargin>
                        {PLAN_NAME[TWO_MONTH]}
                      </CheckoutText>
                      {this.priceDisplay(PLAN_AMOUNT[TWO_MONTH])}
                    </CardHeader>
                    <Divider />
                    <CardBody>
                      <PriceUl>
                        {this.rightItems.map((text, key) => (
                          <li key={key}>{text}</li>
                        ))}
                      </PriceUl>
                    </CardBody>
                  </Card>
                </Flex>
              )}
              <PriceDescription>
                You may cancel by email or by calling us toll free at{' '}
                <span>0203 868 3610</span>
              </PriceDescription>
              <TermsDescription>
                <span>
                  <a href="/terms-and-conditions" target="_blank">
                    Terms and Conditions
                  </a>
                  &nbsp;&nbsp;
                  <a href="/privacy-policy" target="_blank">
                    Privacy Policy
                  </a>
                </span>
              </TermsDescription>
            </Container>
          </Section>
        )}
      </ResponsiveConsumer>
    );
  }
}

const Section = styled.section`
  text-align: center;
  padding: 95px 0;
  ${({ theme }) => theme.max('md')`
    padding: 0;
  `}
`;

const MobileSection = styled.section`
  padding: 20px;
`;

const RadioButtonGroup = styled(ButtonGroup)`
  margin-bottom: 30px;
`;

const ButtonRadio = styled(Button)`
  height: 40px;
  width: 100%;
  border: solid 1px #429ff0;
  background-color: ${p => (p.checked && '#429ff0') || '#ffffff'};
  color: ${p => (p.checked && '#ffffff') || '#429ff0'};
  font-family: ${({ theme }) => theme.font.family.correctText};
  font-size: 17px;
  font-weight: 500;
  &:hover {
    background-color: ${p => (p.checked && '#429ff0') || '#ffffff'};
    border: solid 1px #429ff0;
  }
  && {
    padding: 0;
  }
`;

const PriceHeading = styled(CheckoutText)`
  font-size: 42px;
  margin-bottom: 50px;
  color: #3d4047;
  ${({ theme }) => theme.max('md')`
    margin: 0;
    font-size: 28px;
    line-height: 1.21;
    color: #41444b;
    background-color: #edf3fa;
    padding: 17px 86px;
  `}
`;

const CheckoutButtonMobile = styled(CheckoutButton)`
  height: 44px;
  border-radius: 3px;
  background-color: #429ff0;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 1px;
  color: #ffffff;
`;

const TermsDescription = styled.div`
  text-align: center;
  span {
    a {
      font-size: 12px;
      color: #98a1b3;
      text-decoration: underline;
    }
  }

  ${({ theme }) => theme.max('md')`
    margin-bottom: 20px;
  `}
`;

const PriceDescription = styled(CheckoutText)`
  margin-top: 40px;
  font-size: 14px;
  color: #787c85;
  span {
    font-weight: 600;
    color: #3d4047;
  }
  ${({ theme }) => theme.max('md')`
    margin: 0 0 20px;
    padding: 0 87px;
    font-size: 15px;
    line-height: 1.2;
    text-align: center;
    color: #747a86;
    span {
      color: #747a86;
      font-weight: 400;
    }
  `}
`;

const PriceDisplay = styled(CheckoutText)`
  font-size: 44px;
  color: #646872;
  display: flex;
  align-items: end;
  justify-content: center;
  margin-top: 10px;
  > span {
    margin: 5px 2px;
    font-size: 20px;
  }
  ${({ theme }) => theme.max('md')`
    align-items: center;
    color: #3d4047;
    font-size: 70px;
    span {
      font-size: 24px;
    }
  `}
`;

const Card = styled(Box)`
  border: solid 1px #dde4e8;
  background-color: #fbfcfd;
  max-width: 280px;
  height: 350px;
`;

const CenterCard = styled(Box)`
  max-width: 315px;
  box-shadow: -4px -8px 16px 0 #e3e8ec, 6px 8px 16px 0 #e3e8ec;
  background-color: #ffffff;
  padding: 27px 22px 55px;
  z-index: 1;
`;

const CenterHeading = styled(CheckoutText)`
  font-size: 22px;
  margin: 0 0 20px;
  font-weight: 500;
  color: #3d4047;
  text-align: center;
  ${({ theme }) => theme.max('md')`
    font-size: 18px;
    letter-spacing: 1px;
    margin-bottom: 10px
    font-weight: 600;
  `}
`;

const CenterItem = styled.div`
  margin-bottom: 20px;
`;

const CenterItemImage = styled.div`
  height: 30px;
  width: 30px;
  background: no-repeat center url(/img/checkout/${p => p.image}.png);
  float: left;
`;

const CenterItemText = styled(CheckoutText)`
  line-height: 1.29;
  font-size: 14px;
  color: #787c85;
  text-align: left;
  margin: 0 0 0 42px;
  span {
    font-size: 15px;
    display: block;
    font-weight: 600;
    line-height: 1.2;
    color: #3f4248;
  }
  ${({ theme }) => theme.max('md')`
    font-size: 18px;
    line-height: 1.33;
    color: #747a86;
    text-align: center;
    margin: 0;
    ${p =>
      p.first &&
      css`
        padding: 0 40px;
      `}
    span {
      ${p =>
        p.last &&
        css`
          display: inline;
        `}
      font-size: 18px;
      line-height: 1.33;
      font-weight: 600;
      color: #3d4047;
    }
  `}
`;

const CardHeader = styled.div`
  position: relative;
  text-align: center;
  padding: 25px 0 20px;
`;

const Divider = styled.div`
  border-bottom: solid 1px #dde4e8;
  width: 50%;
  margin: auto;
  ${({ theme }) => theme.max('md')`
   width: 100%
   margin-top: 30px;
   margin-bottom: 40px;
  `}
`;

const CardBody = styled.div`
  padding: 20px 20px 40px 0;
  position: relative;
`;

const PriceUl = styled.ul`
  padding-left: 45px;
  font-family: ${p => p.theme.font.family.correctText};
  font-size: ${({ theme }) => theme.font.size.h6};
  margin: 0;
  li {
    color: #787c85;
    position: relative;
    list-style: none;
    line-height: 1.29;
    text-align: left;
    margin-bottom: 18px;
    &::before {
      background: #429ff0;
      content: ' ';
      position: absolute;
      left: -28px;
      top: 6px;
      display: block;
      width: 5px;
      height: 5px;
      border-radius: 50%;
    }
  }
`;

const Checkbox = styled(Radio)`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 18px;
  left: 18px;
  border-radius: 0;
  border: solid 1px #e5ebf2;
  background-color: transparent;
  ${p =>
    p.checked &&
    css`
      i {
        color: #429ff0;
      }
    `}
  ${p =>
    p.right &&
    css`
      right: 18px;
      left: auto;
    `}
`;

export default Pricing;
