import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';

class RadioButton extends PureComponent {
  onClick = () => {
    this.props.onChange(this.props.value);
  };

  render() {
    const { children, onChange, ...rest } = this.props;
    const checked = this.props.checked || false;
    return (
      <RadioCont
        checked={checked}
        onClick={this.onClick}
      >
        {children}
        <Input type="radio" {...rest} />
      </RadioCont>
    );
  }
}

const RadioCont = styled.div`
  position: relative;
  display: inline-block;
  border: 2px solid ${p => p.theme.colors.black};
  text-align: center;
  flex-grow: 0;
  flex-shrink: 0;
  padding: 7px 18px;
  font-size: 14px;
  &:hover {
    background: black;
    color: white;
  }
  ${p =>
    p.checked &&
    css`
      background: black;
      color: white;
    `};
  ${p => p.theme.max('sm')`
    padding: 7px;
  `}
`;

const Input = styled.input`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

export default RadioButton;
