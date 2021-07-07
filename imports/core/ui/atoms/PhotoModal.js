import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import styled, { css } from 'styled-components';

import { Button, SvgIcon } from '/imports/core/ui/atoms';
import PhotoEdit from './PhotoEdit';

class PhotoModal extends PureComponent {
  render() {
    return ReactDOM.createPortal(
      <Modal>
        <Background onClick={this.props.onClose} />
        <Content>
          <Close onClick={this.props.onClose}>
            <SvgIcon.Close />
          </Close>
          <ModalHeader>Upload Profile Picture</ModalHeader>
          <ModalSubheader>This photo is displayed on your resume</ModalSubheader>
          <PhotoEdit
            onSave={this.props.onSave}
            loading={this.props.loading}
          />
        </Content>
      </Modal>,
      document.getElementById('modal-root')
    );
  }
}

const Modal = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: ${p => p.theme.zIndex.modalBg};
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  ${({ theme }) => theme.max('md')`
    align-items: flex-start;
    overflow-y: scroll;
    overflow-x: hidden;
  `}
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(15, 20, 31, 0.8);
`;

const Content = styled.div`
  width: 680px;
  min-width: 680px;
  background: #fff;
  position: relative;
  border-radius: 6px;
  padding: 32px 40px;
  z-index: ${p => p.theme.zIndex.modal};
  ${({ theme }) => theme.max('xs')`
    height: 100vh;
    overflow: scroll;
    padding-bottom: 160px;
  `}
`;

const Close = styled(p => <Button unstyled {...p} />)`
  position: absolute;
  top: 18px;
  right: 12px;
  width: 32px;
  height: 32px;
  text-align: center;
  line-height: 33px;
  border-radius: 50%;
  padding: 0;
  font-size: 22px;
  margin: 0 !important;
  z-index: 300;
  svg {
    top: 9px;
    left: 9px;
    position: absolute;
    color: ${p => p.theme.colors.gray.light};
  }
  &:hover {
    svg {
      color: ${p => p.theme.colors.primary};
    }
  }
  ${({ theme }) => theme.max('xs')`
    position: fixed;
  `}
`;

const ModalHeader = styled.div`
  font-size: 26px;
  line-height: 28px;
  margin-bottom: 4px;
  font-weight: 600;
  color: #262b33;
  ${({ theme }) => theme.max('md')`
    text-align: center;
  `}
  ${({ theme }) => theme.max('xs')`
    text-align: center;
    max-width: 320px;
    margin-left: auto;
    margin-right: auto;
  `}
`;

const ModalSubheader = styled.div`
  font-size: 19px;
  line-height: 24px;
  color: #262b33;
  font-weight: 400;
  margin-bottom: 28px;
  ${({ theme }) => theme.max('md')`
    text-align: center;
  `}
  ${({ theme }) => theme.max('xs')`
    text-align: center;
    max-width: 320px;
    margin-left: auto;
    margin-right: auto;
  `}
`;

export default PhotoModal;