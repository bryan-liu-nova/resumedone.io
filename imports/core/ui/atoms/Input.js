import React, { Component } from 'react';
import styled, { css } from 'styled-components';

import { getBorderColor } from '/imports/core/ui/helpers';
import { inputStyle } from '/imports/core/ui/mixins';
import InputStripe from './InputStripe';
import Icon from '/imports/core/ui/atoms/ValidatedInputIcon';

class InputCont extends Component {
  state = {
    hideIcon: false,
    inputValid: !!(this.props.value || this.props.defaultValue)
  };

  shouldComponentUpdate(newProps, prevState) {
    if (
      this.state.inputValid !== prevState.inputValid ||
      this.state.hideIcon !== prevState.hideIcon
    ) {
      return true;
    }
    if (newProps.defaultValue === this.input.value || newProps.value === this.input.value) {
      return false;
    }
    for (let key in newProps) {
      if(newProps[key] !== this.props[key]) return true;
    }
    return false;
  }

  onChange = e => {
    const { onChange } = this.props;
    if (e.target.value && !this.state.inputValid) {
      this.setState({ inputValid: true });
    } else if (!e.target.value && this.state.inputValid) {
      this.setState({ inputValid: false });
    }
    if (onChange) onChange(e);
  };

  handleFocus = () => {
    this.setState({ hideIcon: true });
  };

  handleBlur = () => {
    this.setState({ hideIcon: false });
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  };

  render() {
    const { error, defaultValue, value, forcedValue, onChange, onBlur, ...rest } = this.props;
    return (
      <Wrap>
        <Input
            ref={r => this.input = r}
            defaultValue={value || defaultValue}
            onChange={this.onChange}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            {...rest}
        />
        <Icon error={error} empty={!this.state.inputValid} hide={this.state.hideIcon} />
        <InputStripe error={error} />
      </Wrap>
    );
  }
}

const Wrap = styled.div`
  position: relative;
  border-radius: ${p => p.theme.general.borderRadius};
  overflow: hidden;
`;

const Input = styled.input`
  ${inputStyle}
  &:focus {
    & ~ div {
      visibility: visible;
      transform: rotateY(0);
    }
  }
 && {
    ${({error, theme}) =>
      error &&
      css`
        border-color: ${theme.colors.red};
    `};
  }
}
`;

export default InputCont;
