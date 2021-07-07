import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import PhotoDragAndDrop from './PhotoDragAndDrop';
import PhotoCrop from './PhotoCrop';

class PhotoEdit extends PureComponent {
  static propTypes = {
    onSave: PropTypes.func,
  };

  state = {
    image: null
  };

  onChange = ({ target: { validity, files: [file] } }) => {
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () =>
        this.setState({
          image: reader.result,
        }),
      false
    );
    reader.readAsDataURL(file);
  };

  render() {
    return !this.state.image ?
      <PhotoDragAndDrop
        onChange={this.onChange}
      /> :
      <PhotoCrop
        onSave={this.props.onSave}
        image={this.state.image}
        loading={this.props.loading}
      />
  }
}

export default PhotoEdit;