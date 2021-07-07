// Stripe card input should be wrapped in <Elements> element from 'react-stripe-elements'.
// It has a built in validation. Validation technique is different from the regular input validation

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CardExpiryElement } from 'react-stripe-elements';

import { InputErrorMessage, InputStripe } from '/imports/core/ui/atoms';
import { ERROR_MESSAGES } from '/imports/core/api/constants';
import { inputStyle } from '/imports/core/ui/mixins';
import { getStripeInputStyleProps } from '/imports/core/ui/helpers';
import { InputWrap } from './StripeCardInput';

const stripeStyleOptions = getStripeInputStyleProps();

class StripeExpiryInput extends PureComponent {
  static propTypes = {
    showInvalidState: PropTypes.bool, // Determines whether the invalid state should be shown
    placeholder: PropTypes.string
  };

  state = {
    isValid: false,
    error: '',
    focus: false
  };

  onChange = cardData => {
    this.setState({
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
    const { isValid, error, focus } = this.state;
    const isError = !isValid && showInvalidState;
    return (
      <CardInputWrap>
        <InputWrap>
          <CardExpiry
            onChange={this.onChange}
            placeholder={placeholder}
            error={!isValid && showInvalidState}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            {...stripeStyleOptions}
          />
          <InputStripe focus={focus} error={isError} />
        </InputWrap>
        {isError && <InputErrorMessage>{error}</InputErrorMessage>}
      </CardInputWrap>
    );
  }
}

export const CardExpiry = styled(({ error, ...rest }) => (
  <CardExpiryElement {...rest} />
))`
  ${inputStyle}
`;

const CardInputWrap = styled.div`
  position: relative;
`;

export default StripeExpiryInput;
