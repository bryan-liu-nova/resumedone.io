import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import IconAtom from './Icon';
import { inputStyle } from '/imports/core/ui/mixins';

class Select extends PureComponent {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.object)
  };

  onChange = e => {
    this.props.onChange && this.props.onChange(e.target.value);
  };

  render() {
    const {
      name,
      options,
      dark,
      onChange,
      className,
      value
    } = this.props;
    const selectedOption = options.find(o => o.value === value) || {};
    return (
      <SelectCont className={className}>
        <Selected dark={dark}>
          {selectedOption.title}
          <Icon icon="chevron-down" />
        </Selected>
        <Stripe />
        <Input
            name={name}
            onChange={onChange}
            value={value || options[0].value}
        >
          {options.map(({ value, title }, i) => (
            <option key={`${value}-${i}`} value={value}>
              {title}
            </option>
          ))}
        </Input>
      </SelectCont>
    );
  }
}

const SelectCont = styled.div`
  position: relative;
`;

export const Selected = styled.p`
  margin: 0;
  user-select: none;
  cursor: pointer;
  outline: none;
  min-height: 46px;
  ${inputStyle}
  ${p => p.dark && css`
    background: transparent;
    color: white;
    border: 0;
    padding: 9.5px 56px 9.5px 17px;
    > i {
      color: white;
      right: 24px;
    }
  `}
  ${p => p.huge && css`
    font-size: 19px;
  `}
  span {
    color: ${p => p.theme.colors.gray.regular};
  }
`;

export const Icon = styled(IconAtom)`
  position: absolute;
  font-size: 24px;
  top: 50%;
  transform: translate(0, -50%);
  right: 10px;
  color: ${p => p.theme.colors.primary};
`;

const Stripe = styled.div`
  position: absolute;
  height: 2px;
  bottom: 0;
  background-color: ${p => p.theme.colors.primary};
  left: 0;
  width: 100%;
  visibility: hidden;
  transform: rotateY(90deg);
  // transition: all .3s ease;
`;

const Input = styled.select`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  &:focus {
    & ~ div {
      visibility: visible;
      transform: rotateY(0);
    }
  }
`;

export default Select;
