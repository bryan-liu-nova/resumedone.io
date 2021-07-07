import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { Button as ButtonAtom, Icon } from '/imports/core/ui/atoms';

class BlockControls extends PureComponent {
  toggleEditMode = () => {
    const { toggleEditMode, onAfterAction } = this.props;
    toggleEditMode();
    if (onAfterAction) onAfterAction();
  };

  moveUp = () => {
    const { moveUp, onAfterAction } = this.props;
    moveUp();
    if (onAfterAction) onAfterAction();
  };

  moveDown = () => {
    const { moveDown, onAfterAction } = this.props;
    moveDown();
    if (onAfterAction) onAfterAction();
  };

  remove = () => {
    const { remove, onAfterAction } = this.props;
    remove();
    if (onAfterAction) onAfterAction();
  };

  render() {
    const {
      block: {
        type,
        required,
        fixedOrder,
        order
      },
      resume: {
        blocks
      },
    } = this.props;
    const hideControls = required && fixedOrder != null;
    const orderedLength = blocks.filter(b => b.order != null).length;
    const isCustom = type === 'CUSTOM';
    if (hideControls) return null;
    return (
      <>
        {isCustom && (
          <Button unstyled onClick={this.toggleEditMode}>
            <Icon icon="edit" scale={0.8} />
            <ControlName>Edit</ControlName>
          </Button>
        )}
        {order > 0 && (
          <Button unstyled onClick={this.moveUp}>
            <Icon icon="arrow-up" />
            <ControlName>Move up</ControlName>
          </Button>
        )}
        {order + 1 < orderedLength && (
          <Button unstyled onClick={this.moveDown}>
            <Icon icon="arrow-down" />
            <ControlName>Move down</ControlName>
          </Button>
        )}
        {!required && (
          <Button unstyled onClick={this.remove}>
            <Icon icon="trash-2" />
            <ControlName>Remove</ControlName>
          </Button>
        )}
      </>
    )
  }
}

const Button = styled(p => <ButtonAtom unstyled {...p} />)`
  ${p => p.theme.max('md')`
    display: block;
  `}
`;

const ControlName = styled.span`
  ${p => p.theme.min('md')`
    display: none;
  `}
`;

export default BlockControls;
