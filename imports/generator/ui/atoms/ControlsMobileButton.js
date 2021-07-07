import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Button as ButtonAtom, Icon } from '/imports/core/ui/atoms/index';
import ControlsModal from '/imports/generator/ui/components/ControlsModal';
import BlockControls from '../components/BlockControls';

class ControlsMobileButton extends PureComponent {
  state = {
    modalOpened: false,
  };

  toggleModal = () => this.setState(st => ({ modalOpened: !st.modalOpened }));

  render() {
    return (
      <>
        <Button onClick={this.toggleModal} unstyled>
          <Icon icon="more-horizontal" />
        </Button>
        {this.state.modalOpened && (
          <ControlsModal
            onClose={this.toggleModal}
            content={this.props.content}
            {...this.props}
          >
            <BlockControls
              {...this.props}
              onAfterAction={this.toggleModal}
            />
          </ControlsModal>
        )}
      </>
    );
  }
}

const Button = styled(ButtonAtom)`
  position: relative;
  top: 2px;
`;

export default ControlsMobileButton;
