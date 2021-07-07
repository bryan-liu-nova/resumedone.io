// Stripe card input should be wrapped in <Elements> element from 'react-stripe-elements'.
// It has a built in validation. Validation technique is different from the regular input validation

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { CardNumberElement } from 'react-stripe-elements';

// import { getBorderColor, getStripeInputStyleProps } from 'core/ui/helpers';
import { ERROR_MESSAGES } from '/imports/core/api/constants';
import CardLogoImg from './CardLogoImg';
import { InputErrorMessage, InputStripe } from '/imports/core/ui/atoms';
import { inputStyle } from '/imports/core/ui/mixins';
import { getStripeInputStyleProps } from '/imports/core/ui/helpers';

const stripeStyleOptions = getStripeInputStyleProps();

class StripeCardInput extends PureComponent {
  static propTypes = {
    showInvalidState: PropTypes.bool, // Determines whether the invalid state should be shown
    placeholder: PropTypes.string
  };

  state = {
    cardType: null,
    isValid: false,
    focus: false,
    error: ''
  };

  onChange = cardData => {
    this.setState({
      cardType: cardData.brand,
      isValid: cardData.complete,
      error: cardData.empty
        ? ERROR_MESSAGES.required
        : (cardData.error || {}).message
    });
  };

  onFocus = () => {
    this.setState({ focus: true });
  };

  onBlur = () => {
    this.setState({ focus: false });
  };

  render() {
    const { showInvalidState, placeholder } = this.props;
    const { cardType, isValid, error, focus } = this.state;
    const isError = !isValid && showInvalidState;
    return (
      <CardInputWrap>
        <InputWrap>
          <CardNumber
            onChange={this.onChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            placeholder={placeholder}
            error={isError}
            {...stripeStyleOptions}
          />
          {cardType && <CardLogoImg brand={cardType} />}
          <InputStripe focus={focus} error={isError} />
        </InputWrap>
        {isError && <InputErrorMessage>{error}</InputErrorMessage>}
      </CardInputWrap>
    );
  }
}

export const CardNumber = styled(({ error, ...rest }) => (
  <CardNumberElement {...rest} />
))`
  ${inputStyle}
`;

export const InputWrap = styled.div`
  position: relative;
  border-radius: ${p => p.theme.general.borderRadius};
  overflow: hidden;
  background: ${p => p.theme.colors.gray.lighter};
  min-height: 46px;
`;

const CardInputWrap = styled.div`
  position: relative;
`;

export default StripeCardInput;
