import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { Icon, Button as ButtonAtom, InputStripe } from '/imports/core/ui/atoms';

class EditableTitle extends PureComponent {
  static propTypes = {
    defaultValue: PropTypes.string,
    onSave: PropTypes.func,
    onClick: PropTypes.func,
    toggleEditable: PropTypes.func,
    controlled: PropTypes.bool,
    editable: PropTypes.bool,
  };

  state = {
    editable: false,
    value: this.props.defaultValue,
    width: 0,
    changed: false,
  };

  componentDidMount() {
    this.setState({ width: this.span.offsetWidth });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.value !== prevState.value) {
      this.setState({ width: this.span.clientWidth, changed: true });
    }
    if (prevProps.editable !== this.props.editable) {
      this.setState({ editable: this.props.editable }, () => {
        if (this.props.editable) {
          this.input.focus();
          this.input.select();
        }
      });
    }
  }

  save = () => {
    const { onSave } = this.props;
    const { value, changed } = this.state;
    this.toggleEditable();
    if (onSave && changed) onSave(value || 'Untitled');
  };

  toggleEditable = () => {
    if (this.props.toggleEditable) {
      this.props.toggleEditable();
    } else {
      this.setState(st => ({ editable: !st.editable }));
    }
  };

  onClick = () => {
    if (!this.props.onClick) {
      if (!this.props.controlled && !this.state.editable) {
        this.toggleEditable();
      }
    } else if (!this.state.editable) {
      this.props.onClick();
    }
  };

  onChange = e => {
    this.setState({ value: e.target.value });
  };

  getInputRef = (node) => {
    this.input = node;
  };

  onClickEdit = () => {
    this.toggleEditable();
    this.input.focus();
    this.input.select();
  };

  render() {
    const { className, controlled, onClick } = this.props;
    const { value, width, editable } = this.state;
    const disabled = controlled ? !editable : false;
    return (
      <>
        <Cont controlled={controlled}>
          {onClick && !editable && <ClickOverlay onClick={this.onClick}/>}
          <TitleInput
              type="text"
              ref={this.getInputRef}
              className={className}
              onChange={this.onChange}
              controlled={controlled}
              value={value}
              width={width}
              onBlur={this.save}
              disabled={disabled}
          />
          <InputStripe/>
          {(!controlled) && (
            <Button unstyled onClick={this.onClickEdit}>
              <Icon icon="edit-2"/>
            </Button>
          )}
        </Cont>
        <HiddenSpan
          className={className}
          ref={r => this.span = r}
          dangerouslySetInnerHTML={{ __html: value.replace(/ /g, '&nbsp;') }}
        />
      </>
    );
  }
}

const Cont = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
  ${p => p.controlled && css`
    button {
      right: -20px;
    }
  `}
  &:hover {
    button {
      opacity: 1;
    }
  }
`;

const HiddenSpan = styled.span`
  visibility: hidden;
  position: fixed !important;
  font-weight: 500;
  top: -10000px;
  left: -10000px;
`;

const TitleInput = styled.input`
  display: inline-block;
  border: 0;
  margin: 0;
  line-height: 1.4;
  color: ${p => p.theme.colors.black};
  font-weight: 500;
  background: transparent;
  width: ${p => p.width + (p.controlled ? 0 : 10)}px;
  &:disabled {
    color: ${p => p.theme.colors.black};
  }
  ${p => !p.controlled ? css`padding: 0 5px;` : css`padding: 0;`}
  &:focus ~ div {
    visibility: visible;
    transform: rotateY(0);
    background-color: ${p => p.theme.colors.primary};
  }
  &:focus ~ button {
    visibility: hidden;
  }
`;

const ClickOverlay = styled.section`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  z-index: 1;
  &:hover + ${TitleInput} {
    color: ${p => p.theme.colors.primary};
  }
`;

const Button = styled(ButtonAtom)`
  position: absolute;
  right: -15px;
  top: 48%;
  transform: translateY(-50%);
  opacity: 0;
  cursor: pointer;
  // transition: opacity .3s ease;
  color: ${p => p.theme.colors.gray.regular};
  &:hover {
    color: ${p => p.theme.colors.primary};
  }
  ${p => p.theme.max('md')`
    opacity: 0;
    visibility: hidden;
  `}
`;

export default EditableTitle;
