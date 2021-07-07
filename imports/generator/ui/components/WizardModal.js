import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Modal } from '/imports/core/ui/atoms';
import { WIZARD_MODAL_DATA } from '/imports/generator/api/constants';
import { Button as ButtonAtom, SvgIcon } from '/imports/core/ui/atoms';

const modalStyles = {
  modalContainer: {
    display: 'block',
    backgroundColor: 'rgba(52,60,73,.5)'
  },
  modalBackdrop: {
    backgroundColor: 'transparent'
  },
  modalBody: {
    maxWidth: '460px',
    background: '#fff',
    margin: 'auto',
    width: '100%',
    height: 'auto',
    position: 'relative',
    overflow: 'hidden',
    paddingBottom: '35px',
    marginTop: '5%',
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px'
  }
};

class WizardModal extends PureComponent {
  render() {
    const { open, onClose, onAction, step, num } = this.props;
    const _step = num === 1 ? step + 'One' : step;
    const message = WIZARD_MODAL_DATA[_step] && WIZARD_MODAL_DATA[_step].message;
    const actionText = WIZARD_MODAL_DATA[_step] && WIZARD_MODAL_DATA[_step].actionText || false;
    const header = 'More information needed';
    return open ? (
      <Modal
        onClose={onClose}
        fullScreen
        styles={modalStyles}
        animation="empty"
      >
        <WizardPopup>
          <WizardPopupHeader>
            <IconContainer>
              <SvgIcon.Alert viewBox="0 0 18 18" />
            </IconContainer>
            {header}
            <CloseContainer onClick={onClose}>
              <SvgIcon.Close />
            </CloseContainer>
          </WizardPopupHeader>
          <Message>
            {message}
          </Message>
          <WizardPopupButtons>
            {actionText && <ActionButton onClick={onAction}>{actionText}</ActionButton>}
            <Button onClick={onClose}>Ok</Button>
          </WizardPopupButtons>
        </WizardPopup>
      </Modal>
    ) : null;
  }
}

const WizardPopup = styled.div`
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

const WizardPopupHeader = styled.div`
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background-color: #429ff0;
  font-size: 22px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 28px;
  ${p => p.theme.max('xs')`
    font-size: 18px;
  `}
`;

const Message = styled.div`
  font-size: 16px;
  line-height: 1.8;
  padding: 35px;
  ${p => p.theme.max('xs')`
    font-size: 14px;
  `}
`;

const WizardPopupButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  text-align: right;
  padding: 10px 35px;
  ${p => p.theme.max('xs')`
    flex-direction: column;
    align-items: stretch;
  `}
`;

const Button = styled(p => <ButtonAtom {...p} />)`
  text-transform: uppercase;
  font-size: 14px;
  height: 44px;
  ${p => p.theme.max('xs')`
    font-size: 12px;
  `}
`;

const ActionButton = styled(p => <Button {...p} />)`
  border-radius: 3px;
  border: solid 1px #d9dde5;
  background-color: #fff;
  color: #797f8c;
  margin-right: 12px;
  &:hover {
    background-color: #fff;
    border: solid 1px #d9dde5;
  }
  ${p => p.theme.max('xs')`
    margin-right: 0;
    margin-bottom: 10px;
  `}
`;

const IconContainer = styled.div`
  padding-top: 10px;
  margin-right: 4px;
`;

const CloseContainer = styled.div`
  position: absolute;
  top: 18px;
  right: 10px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  color: #add9ff;
`;

export default WizardModal;
