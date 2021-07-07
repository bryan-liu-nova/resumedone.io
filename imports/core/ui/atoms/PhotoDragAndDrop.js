import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';

class PhotoDragAndDrop extends PureComponent {
  onChange = ({ target: { validity, files: [file] } }) => {
    const { onChange } = this.props;
    if (validity.valid) {
      this.setState({ value: file });
    }
  };

  render() {
    return (
      <Container>
        <Image />
        <Message>
          Drag & drop or select a photo from your computer. <br />
          Supported formats: jpeg & png
        </Message>
        <Input
          type="file"
          accept="image/jpeg, image/x-png, .jpg, .jpeg, .png"
          onChange={this.props.onChange}
        />
      </Container>
    );
  }
}

const Container = styled.div`
  position: relative;
  text-align: center;
  cursor: pointer;
  color: ${p => p.theme.colors.gray.regular};
  padding: 35px 50px 50px;
  border-width: 3px;
  border-style: dashed;
  border-color: ${p => p.theme.colors.gray.regular};
  border-image: url(/img/ui/crop/border-dash-rounded.svg) 3 / 1 / 0 round;
  transition: color 0.1s ease 0s;
  &:hover {
    color: ${p => p.theme.colors.primary};
  }
  &::after {
    content: "";
    position: absolute;
    left: -3px;
    top: -3px;
    right: -3px;
    bottom: -3px;
    pointer-events: none;
    opacity: 0;
    border-width: 3px;
    border-style: dashed;
    border-color: ${p => p.theme.colors.primary};
    border-image: url(/img/ui/crop/border-dash-rounded-hover.svg) 3 / 1 / 0 round;
    transition: opacity 0.1s ease 0s;
   }
   &:hover::after {
    opacity: 1;
   }
`;

const Image = styled.div`
  display: block;
  width: 60px;
  height: 60px;
  background-image: url(/img/ui/crop/upload-image.svg);
  background-size: contain;
  margin: 0px auto 12px;
  background-repeat: no-repeat;
`;

const Message = styled.div`

`;

const Input = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  opacity: 0;
  cursor: pointer;
`;

export default PhotoDragAndDrop;