import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Button as ButtonAtom, Icon } from '/imports/core/ui/atoms/index';
import ControlsModal from '/imports/generator/ui/components/ControlsModal';
import BlockItemControls from '../components/BlockItemControls';
import PreviewMobileControls from '../components/PreviewMobileControls';

class SlidersMobileButton extends PureComponent {
  state = {
    modalOpened: false,
  };

  toggleModal = () => this.setState(st => ({ modalOpened: !st.modalOpened }));

  render() {
    return (
      <>
        <SlidersButton onClick={this.toggleModal}>
          <Icon icon="sliders" />
        </SlidersButton>
        {this.state.modalOpened && (
          <ControlsModal
            {...this.props}
            onClose={this.toggleModal}
            noCancel
          >
            <PreviewMobileControls {...this.props} />
          </ControlsModal>
        )}
      </>
    );
  }
}

const Button = styled(ButtonAtom)`
  position: relative;
  top: 2px;
  color: ${p => p.theme.colors.gray.light} !important;
`;

const SlidersButton = styled(p => <Button unstyled {...p} />)`
  color: white !important;
  font-size: 26px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: calc(${p => p.theme.general.gridGap} * 2);
  ${p => p.theme.max('md')`
    left: ${p.theme.general.mobilePadding};
  `}
`;

export default SlidersMobileButton;
