import React, { PureComponent } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { withRouter } from 'react-router-dom';
import { lighten, darken } from 'polished';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import last from 'lodash/last';

import { Flex as FlexAtom, Box, Button, Icon, Image, PhotoModal } from '/imports/core/ui/atoms';
import { UPLOAD_IMAGE, UPDATE_RESUME_DETAIL } from '/imports/generator/api/apollo/client/mutations';

@graphql(UPLOAD_IMAGE, { name: 'uploadFile' })
@graphql(UPDATE_RESUME_DETAIL, { name: 'uploadResumeDetail' })
class PhotoUpload extends PureComponent {
  static propTypes = {
    uploadFile: PropTypes.func,
    onUploaded: PropTypes.func,
    disabled: PropTypes.bool,
    value: PropTypes.string,
  };

  state = {
    loading: false,
    modalOpen: false
  };

  componentDidMount() {
    window.analytics.track('upload_picture_popup', { path: last(window.location.pathname.split('/')) });
  }

  open = () => this.setState({ modalOpen: true });

  close = () => this.setState({ modalOpen: false });

  save = image => {
    const { uploadFile, onUploaded } = this.props;
    this.setState({ loading: true, modalOpen: false });
    uploadFile({
      variables: { image },
    }).then(({ data: { uploadImage }}) => {
      onUploaded(uploadImage);
      window.analytics.track('picture_uploaded', { path: last(window.location.pathname.split('/')) });
      this.setState({ loading: false, modalOpen: false });
    }).catch(e => {
      console.log(e);
      this.setState({ loading: false });
    });
  };

  remove = (e) => {
    e.stopPropagation();
    const { docId, uploadResumeDetail } = this.props;
    uploadResumeDetail({
      variables: {
        docId,
        path: 'details.userPic',
        value: ''
      }
    });
  };

  renderOverlay = () => {
    const { loading } = this.state;
    const { disabled, value } = this.props;
    if (disabled) {
      return <LockIcon />;
    } else if (loading) {
      return <Spinner />;
    } else if (!value) {
      return <UserIcon />;
    }
    return null;
  };

  renderControls = () => {
    const { loading } = this.state;
    const { disabled, value } = this.props;
    if (disabled) {
      return <UploadLabel gray>This template doesn't support photo upload</UploadLabel>;
    } else if (loading) {
      return <UploadLabel gray>Loading photo</UploadLabel>;
    } else if (value) {
      return <Button link onClick={this.remove}><Icon icon="trash" /> Delete</Button>
    }
    return <UploadLabel>Upload photo</UploadLabel>;
  };

  render() {
    const { loading } = this.state;
    const { disabled, value } = this.props;
    return (
      <>
        <Flex
            alignItems="center"
            onClick={this.open}
            disabled={disabled}
            loading={loading}
        >
          <Box>
            <PhotoCont
                loading={loading}
                disabled={disabled}
                gotValue={!!value}
            >
              {value && <UploadedImage src={value} />}
              {this.renderOverlay()}
            </PhotoCont>
          </Box>
          <Box grow={1}>
            {this.renderControls()}
          </Box>
        </Flex>
      {this.state.modalOpen &&
        <PhotoModal
          onClose={this.close}
          onSave={this.save}
          loading={this.state.loading}
        />
      }
      </>
    );
  }
}

const Flex = styled(FlexAtom)`
  margin-top: 12px;
  ${p => !p.disabled && !p.loading && css`
    cursor: pointer;
    &:hover {
      > div {
        > span {
          color: ${p => darken(0.2, p.theme.colors.primary)};
        }
        > div {
          background-color: ${p => lighten(0.52, p.theme.colors.primary)};
          color: ${p => p.theme.colors.primary};
        }
      }
    }
  `}
  button {
    font-weight: 400;
    &:hover {
      color: ${p => p.theme.colors.danger} !important;
    }
  }
`;

const UploadedImage = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: ${p => p.theme.general.borderRadius};
`;

const UserIcon = styled(p => <Icon icon="user" {...p} />)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const LockIcon = styled(p => <Icon icon="lock" {...p} />)`
  position: absolute;
  top: 50%;
  left: 50%;
  color: ${p => p.theme.colors.gray.light};
  transform: translate(-50%, -50%);
  font-size: 16px;
`;

const UploadLabel = styled.span`
  color: ${p => p.theme.colors.primary};
  font-size: 16px;
  line-height: 1.4 !important;
  ${p => p.gray && css`
    color: ${p => p.theme.colors.gray.regular};  
  `}
`;

const PhotoCont = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
  margin-right: 10px;
  text-align: center;
  line-height: 62px;
  font-size: 28px;
  border-radius: ${p => p.theme.general.borderRadius};
  background-color: ${p => p.theme.colors.gray.lighter};
  color: ${p => p.theme.colors.gray.regular};
  ${p => (p.loading || p.disabled) && css`
    &:before {
      content: '';
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      width: 32px;
      height: 32px;
      border: 1px solid ${p=> p.theme.colors.gray.light};
      ${p.gotValue && css`
        background: ${p.theme.colors.black};
        border-color: ${p.theme.colors.black};
      `}
    }
  `}
`;

const rotate = keyframes`
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
`;

const sweep = keyframes`
  0% {
  clip-path: polygon(0% 0%, 0% 0%, 0% 0%, 50% 50%, 0% 0%, 0% 0%, 0% 0%);
}
  50% {
  clip-path: polygon(0% 0%, 0% 100%, 0% 100%, 50% 50%, 100% 0%, 100% 0%, 0% 0%);
}
  100% {
  clip-path: polygon(0% 0%, 0% 100%, 100% 100%, 50% 50%, 100% 100%, 100% 0%, 0% 0%);
}
`;

const Spinner = styled.div`
  border-radius: 50%;
  box-sizing: border-box;
  animation: ${sweep} 1s linear alternate infinite, ${rotate} 0.8s linear infinite;
  width: 16px; 
  height: 16px; 
  border-color: ${p => p.theme.colors.gray.light};
  border-style: solid;
  border-width: 2px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default PhotoUpload;
