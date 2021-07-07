import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import {
  CURRENCY,
  PLAN_AMOUNT,
  PLAN_NAME,
  THREE_FULL,
  THREE_LIMIT,
  THREE_MONTH
} from '/imports/checkout/api/constants';
import { currencyFormatter } from '/imports/checkout/api/utils';
import {
  CheckoutButtonThree as CheckoutButton,
  CheckoutOneContainer as Container,
  CheckoutTextOne as CheckoutText
} from '/imports/checkout/ui/atoms';
import { Analytics } from '/imports/core/api/analytics';
import history from '/imports/core/api/history';
import { ResponsiveConsumer } from '/imports/core/api/responsiveContext';
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Icon,
  Image,
  Radio,
  SvgIcon
} from '/imports/core/ui/atoms';

class Pricing extends PureComponent {
  static propTypes = {
    plan: PropTypes.string,
    selectPlan: PropTypes.func
  };

  componentDidMount() {
    this.props.selectPlan(THREE_FULL);
  }

  changePlan = e => {
    this.props.selectPlan(e.currentTarget.value);
  };

  renderCheck = () => {
    return Array(3)
      .fill('')
      .map((x, key) => (
        <td key={key}>
          <Icon icon="check" />
        </td>
      ));
  };

  selectWeek = () => {
    this.props.selectPlan(THREE_FULL);
  };

  selectLimit = () => {
    this.props.selectPlan(THREE_LIMIT);
  };

  selectYear = () => {
    this.props.selectPlan(THREE_MONTH);
  };

  isWeek = () => this.props.plan === THREE_FULL;

  isLimit = () => this.props.plan === THREE_LIMIT;

  isYear = () => this.props.plan === THREE_MONTH;

  continue = () => {
    Analytics.track('add_to_cart', { product: this.props.plan, variant: '2' });
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

  price = () => {
    return (
      <>
        {PLAN_NAME[this.props.plan]}
        {this.priceDisplay(PLAN_AMOUNT[this.props.plan])}
      </>
    );
  };

  render() {
    return (
      <ResponsiveConsumer>
        {({ isMobile }) => (
          <Section>
            <Flex justifyContent="space-between" alignItems="center">
              <PriceHeading noMargin>
                Get Full Access to Resumes & Job Tools!
              </PriceHeading>
              {!isMobile && (
                <Box width="200px">
                  <CheckoutButton onClick={this.continue}>
                    CONTINUE
                  </CheckoutButton>
                </Box>
              )}
            </Flex>
            {(isMobile && (
              <>
                <ButtonGroup>
                  <ButtonRadio
                    onClick={this.selectWeek}
                    checked={this.isWeek()}
                  >
                    14-Day full
                  </ButtonRadio>
                  <ButtonRadio
                    onClick={this.selectLimit}
                    checked={this.isLimit()}
                  >
                    14-Day Limited
                  </ButtonRadio>
                  <ButtonRadio
                    onClick={this.selectYear}
                    checked={this.isYear()}
                  >
                    Monthly
                  </ButtonRadio>
                </ButtonGroup>
                <PricingTable>
                  <thead>
                    <tr>
                      <th>{this.price()}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Dozens of professional designs</td>
                    </tr>
                    <tr>
                      <td>Multiple Formats (DOC, PDF, TXT)</td>
                    </tr>
                    <tr>
                      <td>Unlimited Download, Print, and Email</td>
                    </tr>
                    <tr>
                      <td>
                        <Flex alignItems="center">
                          <FedexImage />
                          <FedexFlex>
                            <Box>
                              Professional Printouts{' '}
                              <Hint>
                                <SvgIcon.Hint />
                              </Hint>
                            </Box>
                            <Box>Pickup at over 1,800 locations</Box>
                          </FedexFlex>
                        </Flex>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Flex fullWidth alignItems="center">
                          Cover Letter Builder{' '}
                          <Hint>
                            <SvgIcon.Hint />
                          </Hint>
                        </Flex>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td>
                        After 14 days, your subscription auto-renews to $29.99
                        and is billed every 4 weeks. You may cancel anytime.
                      </td>
                    </tr>
                  </tfoot>
                </PricingTable>
              </>
            )) || (
              <PricingTable>
                <thead>
                  <tr>
                    <th />
                    <PricingTableTH
                      selected={this.isLimit()}
                      onClick={this.selectLimit}
                    >
                      <SelectedBorder show={this.isLimit()} />
                      <Checkbox checked={this.isLimit()} />
                      {PLAN_NAME[THREE_LIMIT]}
                      {this.priceDisplay(PLAN_AMOUNT[THREE_LIMIT])}
                    </PricingTableTH>
                    <PricingTableTH
                      popular
                      selected={this.isWeek()}
                      onClick={this.selectWeek}
                    >
                      <PopularBorder show={this.isWeek()} />
                      <PopularHeading blue={this.isWeek()}>
                        MOST POPULAR
                      </PopularHeading>
                      <Checkbox popular checked={this.isWeek()} />
                      {PLAN_NAME[THREE_FULL]}
                      {this.priceDisplay(PLAN_AMOUNT[THREE_FULL])}
                    </PricingTableTH>
                    <PricingTableTH
                      selected={this.isYear()}
                      onClick={this.selectYear}
                    >
                      <SelectedBorder show={this.isYear()} />
                      <Checkbox checked={this.isYear()} />
                      {PLAN_NAME[THREE_MONTH]}
                      {this.priceDisplay(PLAN_AMOUNT[THREE_MONTH])}
                    </PricingTableTH>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Dozens of professional designs</td>
                    {this.renderCheck()}
                  </tr>
                  <tr>
                    <td>
                      Multiple Formats <br />
                      (DOC, PDF, TXT)
                    </td>
                    {this.renderCheck()}
                  </tr>
                  <tr>
                    <td>Unlimited Download, Print, and Email</td>
                    {this.renderCheck()}
                  </tr>
                  <tr>
                    <td>
                      <Flex alignItems="center">
                        <FedexImage />
                        <FedexFlex>
                          <Box>
                            Professional Printouts{' '}
                            <Hint>
                              <SvgIcon.Hint />
                            </Hint>
                          </Box>
                          <Box>Pickup at over 1,800 locations</Box>
                        </FedexFlex>
                      </Flex>
                    </td>
                    {this.renderCheck()}
                  </tr>
                  <tr>
                    <td>
                      <Flex wrap="wrap">
                        <Flex fullWidth alignItems="center">
                          Free Mobile App{' '}
                          <Hint>
                            <SvgIcon.Hint />
                          </Hint>
                          <br />
                        </Flex>
                        <MarketImage store="app-store" />
                        <MarketImage store="google-play" />
                      </Flex>
                    </td>
                    {this.renderCheck()}
                  </tr>
                  <tr>
                    <td>
                      <Flex fullWidth alignItems="center">
                        Cover Letter Builder{' '}
                        <Hint>
                          <SvgIcon.Hint />
                        </Hint>
                      </Flex>
                    </td>
                    {this.renderCheck()}
                  </tr>
                  <tr>
                    <td>
                      <Flex fullWidth alignItems="center">
                        Resume Check™{' '}
                        <Hint>
                          <SvgIcon.Hint />
                        </Hint>
                      </Flex>
                    </td>
                    {this.renderCheck()}
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td />
                    <td colSpan={2}>
                      After 14 days, your subscription auto-renews to $29.99 and
                      is billed every 4 weeks. You may cancel anytime.
                    </td>
                    <td>
                      Pay $125.40 up-front and save 61%. Automatically renews
                      each year. Cancel anytime.
                    </td>
                  </tr>
                </tfoot>
              </PricingTable>
            )}
            <PriceDescription>
              <span>14-day money back guarantee. </span>
              You may cancel by email, by chat or by calling us toll-free at{' '}
              <span>0203 868 3610.</span>
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
            {isMobile && (
              <CheckoutButtonMobile onClick={this.continue}>
                CONTINUE
              </CheckoutButtonMobile>
            )}
          </Section>
        )}
      </ResponsiveConsumer>
    );
  }
}

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
    margin-bottom: 30px;
  `}
`;

const Section = styled(Container)`
  background-color: #ffffff;
  margin-top: 35px;
  padding: 50px 70px;
  border: solid 1px #dde4e8;
  ${({ theme }) => theme.max('md')`
    border: none;
    padding: 15px 15px 25px;
    background-color: transparent;
    margin: 0;
  `}
`;

const PriceHeading = styled(CheckoutText)`
  font-size: 34px;
  ${({ theme }) => theme.max('md')`
    font-size: 24px;
    font-weight: 500;
    line-height: 1.25;
    text-align: center;
    padding: 10px 50px 30px;
  `}
`;

const ButtonRadio = styled(Button)`
  height: 44px;
  width: 100%;
  border: solid 1px ${p => (p.checked && '#429ff0') || '#dde4e8'};
  background-color: ${p => (p.checked && '#429ff0') || '#ffffff'};
  color: ${p => (p.checked && '#ffffff') || '#3d4047'};
  font-family: ${({ theme }) => theme.font.family.correctText};
  font-size: 16px;
  font-weight: 600;
  text-transform: lowercase;
  &:hover {
    background-color: ${p => (p.checked && '#429ff0') || '#ffffff'};
    border: solid 1px ${p => (p.checked && '#429ff0') || '#dde4e8'};
  }
  && {
    padding: 0;
  }
`;

const FedexImage = styled(() => <Image src="/img/checkout/fedex.png" />)``;

const FedexFlex = styled(p => <Flex direction="column" {...p} />)`
  margin-left: 25px;
  ${Box} {
    line-height: 1.5;
    &:first-child {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    &:last-child {
      color: #a6adbe;
      font-size: 12px;
    }
  }
`;

const CheckoutButtonMobile = styled(CheckoutButton)`
  height: 48px;
`;

const MarketImage = styled(p => (
  <Image src={`/img/checkout/${p.store}.png`} {...p} />
))`
  max-width: 70px;
  margin-top: 8px;
  &:last-child {
    margin-left: 6px;
  }
`;

const Hint = styled.div`
  margin-left: 3px;
  width: 14px;
  height: 14px;
  color: #c9d1d9;
  & > svg {
    width: 100%;
    height: 100%;
  }
`;

const PricingTable = styled.table`
  margin-top: 110px;
  border-collapse: collapse;
  font-family: ${p => p.theme.font.family.correctText};
  font-size: 15px;
  line-height: 1;
  color: #3d4047;
  width: 100%;
  ${({ theme }) => theme.max('md')`
     margin-top: 25px;
   `}

  td, th {
    border: solid 1px #dde4e8;
    z-index: 2;
  }

  td {
    text-align: center;
    &:first-child {
      padding: 10px 16px;
      text-align: left;
      ${({ theme }) => theme.max('md')`
      padding: 15px 20px;
    `}
    }
    i {
      color: #429ff0;
      font-size: 22px;
      font-weight: 600;
    }
  }

  tfoot td {
    padding: 10px 16px;
    font-size: 14px;
    line-height: 1.43;
    color: #989eaa;
    text-align: left;
    background: #ffffff;
  }

  tr {
    background: #ffffff;
    &:nth-child(even) {
      background: #f7fbff;
    }
  }

  th:empty,
  td:empty {
    border: none;
    background: transparent;
  }
`;

const PriceDisplay = styled(CheckoutText)`
  font-size: 60px;
  display: flex;
  align-items: end;
  justify-content: center;
  margin-top: 10px;
  color: #a2a8b5;
  > span {
    margin: 10px 2px;
    font-size: 22px;
  }
  .currency {
    font-size: 20px;
    line-height: 41px;
  }
  ${({ theme }) => theme.max('md')`
     color: #3d4047;
     font-size: 70px;
     span {
       font-size: 24px;
     }
  `}
`;

const PricingTableTH = styled.th`
  cursor: pointer;
  background: #f7fbff;
  position: relative;
  padding: 25px 0 20px;
  width: 210px;
  color: ${p => (p.selected && '#3d4047') || '#a2a8b5'};
  font-size: 13px;
  font-weight: 500;
  &:first-child {
    width: 332px;
  }
  ${({ theme }) => theme.max('md')`
    color: #3d4047;
    background: #ffffff;
  `}
  ${p =>
    p.selected &&
    css`
      ${PriceDisplay} {
        color: #3d4047;
      }
    `}
  && {
    ${p =>
      p.popular &&
      css`
        width: 240px;
        padding: 10px 0 35px;
        background: #ffffff;
        border: none;
      `}
  }
`;

const SelectedBorder = styled.div`
  position: absolute;
  background: transparent;
  top: 0;
  height: 452px;
  z-index: 1;
  width: 100%;
  ${p =>
    p.show &&
    css`
      box-shadow: 0 0 11px 2px rgba(51, 51, 51, 0.18);
      border: 4px solid #429ff0;
    `};
`;

const PopularBorder = styled(SelectedBorder)`
  top: -30px;
  height: 482px;
  ${p =>
    (p.show &&
      css`
        border-radius: 5px 5px 0 0;
      `) ||
    css`
      border-left: solid 1px #dde4e8;
      border-right: solid 1px #dde4e8;
    `};
`;

const PopularHeading = styled(CheckoutText)`
  position: absolute;
  top: -60px;
  height: 40px;
  line-height: 40px;
  width: 100%;
  background: ${p => (p.blue && '#429ff0') || '#919ea8'};
  border-radius: 5px 5px 0 0;
  z-index: 2;
  margin: 0;
  display: block;
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
`;

const PriceDescription = styled(CheckoutText)`
  margin-top: 60px;
  font-size: 18px;
  text-align: center;
  ${({ theme }) => theme.max('md')`
    margin: 15px 0;
    font-size: 14px;
    line-height: 1.43;
    color: #707684;
    span {
      color: #3d4047;
    }
  `}
`;

const Checkbox = styled(Radio)`
  width: 22px;
  height: 22px;
  position: absolute;
  top: ${p => (p.popular && 5) || 20}px;
  left: 10px;
  border-radius: 3px;
  border: solid 1px #d4dce0;
  background-color: #ffffff;
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
