import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';

import Icon from './Icon';

class Checkbox extends PureComponent {
  render() {
    const checked = this.props.checked || false;
    const width = this.props.width || '18px';
    const height = this.props.height || '18px';
    const borderRadius = this.props.borderRadius || '0';
    const { wizard } = this.props;

    return (
      <CheckboxCont checked={checked} width={width} height={height} wizard={wizard}>
        <Input {...this.props} type="checkbox" />
        {checked && <CheckIcon wizard={wizard} />}
      </CheckboxCont>
    );
  }
}

const CheckboxCont = styled.div`
  position: relative;
  display:inline-block;
  width: ${p => p.width};
  height: ${p => p.height};
  border: 1px solid ${p => p.theme.colors.gray.regular};
  borderRadius: ${p => p.borderRadius};
  text-align: center;
  flex-grow: 0;
  flex-shrink: 0;
  ${p => p.theme.max('md')`
    ${p => !p.wizard && css`
      width: 32px;
      height: 32px;
    `}
  `}
`;

const CheckIcon = styled(p => <Icon icon="check" {...p} />)`
  position: absolute;
  left: 15%;
  top: -27%;
  font-size: 20px;
  line-height: 1;
  pointer-events: none;
  position: absolute;
  left: 0;
  color: ${p => p.theme.colors.black};
  ${p => p.theme.max('md')`
    ${p => !p.wizard && css`
      font-size: 35px;
    `}
  `}
`;

const Input = styled.input`
  position:absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
`;

export default Checkbox;
