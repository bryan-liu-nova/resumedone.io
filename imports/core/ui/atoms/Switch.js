import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import { lighten } from 'polished';

import Label from './Label';

class Switch extends PureComponent {
  onChange = () => {
    this.props.onChange({ target: { value: !this.props.checked } });
  };

  render() {
    return (
      <SwitchCont checked={this.props.checked} onClick={this.onChange}>
        <div>
          <SwitchItem checked={this.props.checked} />
        </div>
        <div>
          <Label>{this.props.label}</Label>
        </div>
      </SwitchCont>
    );
  }
}

const INPUT_HEIGHT = 20;
const INPUT_WIDTH = 35;
const INPUT_PADDING = 2;

const SwitchItem = styled.div`
  position: relative;
  width: ${INPUT_WIDTH}px;
  height: ${INPUT_HEIGHT}px;
  border-radius: 100px;
  // transition: ${p => p.theme.transitions.medium};
  background-color: ${p => lighten(0.07, p.theme.colors.gray.light)};
  margin-right: 10px;
  &:after {
    content: '';
    position: absolute;
    top: ${INPUT_PADDING}px;
    // transition: ${p => p.theme.transitions.medium};
    transform: translate(${INPUT_PADDING}px, 0);
    background-color: white;
    height: ${INPUT_HEIGHT - INPUT_PADDING * 2}px;
    width: ${INPUT_HEIGHT - INPUT_PADDING * 2}px;
    border-radius: 100px;
  }
  ${p => p.checked && css`
    background-color: ${p => p.theme.colors.primary};
    &:after {
      transform: translate(${INPUT_WIDTH - INPUT_HEIGHT + INPUT_PADDING}px, 0);
    }
  `}
`;

const SwitchCont = styled.div`
  display: flex;
  cursor: pointer;
  margin-top: 15px;
  > div {
    position: relative;
    &:nth-child(1) {
      flex-shrink: 0;
    }
  }
  ${p => !p.checked && css`
    &:hover {
      > div {
        > div {
          background-color: ${p.theme.colors.gray.light};
        }
      }
    }
  `}
`;

export default Switch;
