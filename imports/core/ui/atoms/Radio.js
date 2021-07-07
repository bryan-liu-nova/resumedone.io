import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip'

import { Icon } from '/imports/core/ui/atoms';

class Radio extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    className: PropTypes.string,
    lockedText: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    onChange: PropTypes.func,
    huge: PropTypes.bool,
  };

  render() {
    const checked = this.props.checked || false;
    const { className, lockedText, ...rest } = this.props;

    return (
      <RadioCont
          className={className}
          checked={checked}
          data-tip={lockedText || ''}
          locked={lockedText}
          huge={this.props.huge}
      >
        <Input type="radio" {...rest} />
        <Checked checked={checked}>
          <Icon icon="check" />
        </Checked>
        <Locked locked={lockedText}>
          <Icon icon="lock" />
        </Locked>
        <Tooltip effect="solid" delayShow={300} />
      </RadioCont>
    );
  }
}

const Checked = styled.div`
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  // transition: ${p => p.theme.transitions.medium};
  transform-origin: center;
  color: white;
  font-size: 22px;
  ${p => p.checked && css`
    transform: translate(-50%, -50%) scale(1);
  `}
`;

const Locked = styled.div`
  position: absolute;
  top: 52%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${p => p.theme.colors.gray.light};
  font-size: 16px;
  opacity: 0;
  visibility: hidden;
  ${p => p.locked && css`
    opacity: 1;
    visibility: visible;
  `}
`;

const RadioCont = styled.div`
  position: relative;
  display: inline-block;
  width: 42px;
  height: 42px;
  border: 1px solid ${p => p.theme.colors.gray.regular};
  text-align: center;
  border-radius: 50%;
  flex-grow: 0;
  flex-shrink: 0;
  &:before {
    content: '';
    position: absolute;
    display: block;
    opacity: 0;
    top: 50%;
    left: 50%;
    visibility: hidden;
    transform: translate(-50%, -50%) scale(0);
    // transition: all .3s ease;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: white;
  }
  ${p => !p.checked && !p.locked && css`
    &:hover {
      &:before {
        opacity: 1;
        visibility: visible;
        transform: translate(-50%, -50%) scale(1);
      }
    }
  `}
  ${p => p.locked && css`
    background-color: ${p => p.theme.colors.gray.lighter} !important;
  `}
  ${p => p.huge && css`
    width: 28px;
    height: 28px;
    &:after {
      width: calc(100% - 6px);
      height: calc(100% - 6px);
      top: 3px;
      left: 3px;
    }
  `}
`;

const Tooltip = styled(ReactTooltip)`
  max-width: 270px;
  padding: 10px 15px;
  font-size: 12px;
  text-align: left;
  z-index: ${p => p.theme.zIndex.popover};
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

export default Radio;
