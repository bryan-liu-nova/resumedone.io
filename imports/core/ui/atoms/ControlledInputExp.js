import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';

import { getBorderColor } from '/imports/core/ui/helpers';
import { inputStyle } from '/imports/core/ui/mixins';
import InputStripe from './InputStripe';
import Icon from '/imports/core/ui/atoms/ValidatedInputIcon';
import '../../../../public/css/experiment.css';


class InputCont extends PureComponent {
  state = {
    value: this.props.value || '',
    hideIcon: false,
  };

  componentDidUpdate(prevProps) {
    if(prevProps.defaultValue !== this.props.defaultValue && this.props.defaultValue !== this.state.value) {
      this.setState({ value: this.props.defaultValue });
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
    const { error, onBlur, label, experiment, ...rest } = this.props;

    return (
      <WrapExp>
        <LabelExp><span className="-ol-label-text">{label}</span></LabelExp>
        <InputExp
          value={value}
          ref={r => this.input === r}
          onChange={this.onChange}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          {...rest}
        />
        <Icon error={error} empty={!value} hide={hideIcon} experiment />
      </WrapExp>
    )
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
