import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { Button as ButtonAtom, Icon } from '/imports/core/ui/atoms';
import { darken } from 'polished';

class BlockItemControls extends PureComponent {
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

  expand = () => {
    const { expand, onAfterAction } = this.props;
    expand();
    if (onAfterAction) onAfterAction();
  };

  remove = () => {
    const { remove, onAfterAction } = this.props;
    remove();
    if (onAfterAction) onAfterAction();
  };

  render() {
    const {
      item: {
        order
      },
      items,
      isCollapsed,
      isMobile
    } = this.props;
    const chevronDir = (() => {
      if (isMobile) return 'left';
      else if (isCollapsed) return 'down';
      else return 'up';
    })();
    return (
      <>
        {order > 0 && (
          <Button onClick={this.moveUp}>
            <Icon icon="arrow-up" /> <ControlName>Move up</ControlName>
          </Button>
        )}
        {order + 1 < items.length && (
          <Button onClick={this.moveDown}>
            <Icon icon="arrow-down" /> <ControlName>Move down</ControlName>
          </Button>
        )}
        <Button onClick={this.remove}>
          <TrashIcon /><ControlName>Remove</ControlName>
        </Button>
        <ButtonExpand onClick={this.expand}>
          <Icon icon={`chevron-${chevronDir}`} scale={1.1} /> <ControlName>Expand</ControlName>
        </ButtonExpand>
      </>
    )
  }
}

const Button = styled(p => <ButtonAtom unstyled {...p} />)`
  color: ${p => p.theme.colors.gray.light};
  margin-right: 10px;
  display: none;
  ${p => p.theme.max('md')`
    display: inline-block;
  `}
  ${p => p.theme.min('md')`
    &:hover {
      color: ${p => darken(0.1, p.theme.colors.primary)} !important;
    }
  `}
`;

const ButtonExpand = styled(p => <Button {...p} />)`
  display: inline-block !important;
`;

const ControlName = styled.span`
  ${p => p.theme.min('md')`
    display: none;
  `}
`;

const TrashIcon = styled.span`
  background-image: url(/img/ui/wizard/delete.svg);
  width: 16px;
  height: 16px;
  display: inline-block;
`;

export default BlockItemControls;
