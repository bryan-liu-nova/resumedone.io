import React, { Fragment, Component } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import { rgba } from 'polished';
import styled, { css } from 'styled-components';

import HeadingAtom from './Heading';
import TextAtom from './Text';
import Button from './Button';
import Flex from './Flex';

class Confirm extends Component {
  static propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    cancelText: PropTypes.string,
    confirmText: PropTypes.string,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    className: PropTypes.string
  };

  render() {
    const {
      className,
      confirmText,
      cancelText,
      onCancel,
      onConfirm,
      title,
      text
    } = this.props;
    return ReactDOM.createPortal(
      <Fragment>
        <ModalBackdrop onClick={onCancel} />
        <CSSTransition
            appear
            in
            classNames="modal"
            timeout={600}
        >
          <ModalContainer className={className}>
            {title && <Heading>{title}</Heading>}
            {text && <Text>{text}</Text>}
            <ButtonsFlex>
              <ModalButton outline onClick={onConfirm}>{confirmText || 'Confirm'}</ModalButton>
              <ModalButton onClick={onCancel}>{cancelText || 'Cancel'}</ModalButton>
            </ButtonsFlex>
          </ModalContainer>
        </CSSTransition>
      </Fragment>,
      document.getElementById('modal-root')
    );
  }
}

const ModalBackdrop = styled.div`
  position:fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: ${p => p.theme.zIndex.modalBg};
  background: ${p => rgba(p.theme.colors.black, 0.8)};
`;

const Heading = styled(p => <HeadingAtom level={2} {...p} />)`
  margin-bottom: 10px;
  margin-top: 0;
  line-height: 1.2;
  text-transform: capitalize;
`;

const Text = styled(TextAtom)`
  margin-top: 0;
  margin-bottom: 50px;
  line-height: 1.5;
`;

const ButtonsFlex = styled(Flex)`
  justify-content: flex-end;
  align-items: center;
  ${p => p.theme.max('md')`
    justify-content: center;
    > button:first-of-type {
      margin-left: 0;
    }
  `}
`;

const ModalContainer = styled.div`
  position:fixed;
  display:flex;
  flex-direction: column;
  border-radius: 6px;
  padding: 32px 40px;
  background: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: ${p => p.theme.zIndex.modal};
  ${p => p.theme.min('md')`
    width: 540px;
  `}
  ${p => p.theme.max('md')`
    width: 60vw;
  `}
  ${p => p.theme.max('sm')`
    width: 94vw;
  `}
  &.modal-appear {
      transform: translate(-50%, -150%);
    }
    &.modal-appear-active {
      transform: translate(-50%, -50%);
      // transition: all 300ms ease-out;
    }
    &.modal-exit {
      transform: translate(-50%, -50%);
    }
    &.modal-exit-active {
      transform: translate(-50%, -150%);
      // transition: all 300ms ease-in;
    }
`;

const ModalButton = styled(Button)`
  padding: 0.9em 1.5em;
  margin-left: 10px;
`;

export default Confirm;
