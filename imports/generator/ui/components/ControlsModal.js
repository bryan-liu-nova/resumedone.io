import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { Modal, Button } from '/imports/core/ui/atoms';

class ControlsModal extends PureComponent {
  render() {
    const { children, noCancel, onClose } = this.props;
    return (
      <ControlsModalCont {...this.props} animation="fromBottom">
        {children}
        {!noCancel && <Button onClick={onClose} unstyled>Cancel</Button>}
      </ControlsModalCont>
    )
  }
}

const ControlsModalCont = styled(Modal)`
  background: ${p => p.theme.colors.black};
  top: auto;
  button {
    color: white;
    margin: 0 0 ${p => p.theme.general.mobilePadding} ${p => p.theme.general.mobilePadding};
    &:first-of-type {
      margin-top: ${p => p.theme.general.mobilePadding};
    }
    i {
      margin-right: 10px;
      margin-left: -2px;
    }
  }
`;

export default ControlsModal;
