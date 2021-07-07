import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';

import { getBorderColor } from '/imports/core/ui/helpers';
import { inputStyle } from '/imports/core/ui/mixins';
import InputStripe from './InputStripe';
import Icon from '/imports/core/ui/atoms/ValidatedInputIcon';

class InputCont extends PureComponent {
  state = {
    value: this.props.value || '',
    hideIcon: false,
  };

  componentDidUpdate(prevProps) {
    if(prevProps.defaultValue !== this.props.defaultValue && this.props.defaultValue !== this.state.value) {
      this.setState({ value: this.props.defaultValue });
    }
    if(prevProps.value !== this.props.value && this.props.value !== this.state.value) {
      this.setState({ value: this.props.value });
    }
  }

  onChange = e => {
    this.setState({ value: e.target.value }, () => {
      const { onChange } = this.props;
      if (onChange) onChange({ target: { value: this.state.value }});
    });
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
    const { value, hideIcon } = this.state;
    const { error, onBlur, ...rest } = this.props;
    return (
      <Wrap>
        <Input
            {...rest}
            value={value}
            ref={r => this.input === r}
            onChange={this.onChange}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
        />
        <Icon error={error} empty={!value} hide={hideIcon} />
        <InputStripe error={error} />
      </Wrap>
    )
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
      background-color: ${p => p.theme.colors.primary};
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
