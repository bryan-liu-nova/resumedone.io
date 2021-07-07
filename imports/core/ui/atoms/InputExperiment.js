import React, { Component } from 'react';
import styled, { css } from 'styled-components';

import Icon from '/imports/core/ui/atoms/ValidatedInputIcon';
import '../../../../public/css/all.min.css';
import '../../../../public/css/experiment.css';

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
    const { error, defaultValue, value, forcedValue, onChange, onBlur, label, experiment, ...rest } = this.props;
    return (
      <WrapExp>
        <LabelExp><span className="-ol-label-text">{label}</span></LabelExp>
        <InputExp
          ref={r => this.input = r}
          defaultValue={value || defaultValue}
          onChange={this.onChange}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          {...rest}
        />
        <Icon error={error} empty={!this.state.inputValid} hide={this.state.hideIcon} experiment/>
      </WrapExp>
    );
  }
}

const WrapExp = styled.div.attrs({
  className: '-ol-input-wrap'
})`
`;

const LabelExp = styled.label.attrs({
  className: '-ol-label'
})`
`;

const InputExp = styled.input.attrs({
  className: '-ol-input'
})`
  border-top: 0;
  border-right: 0;
  border-left: 0;

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
`;

export default InputCont;
