import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import { darken } from 'polished';
import { Flex, Button, SvgIcon } from '/imports/core/ui/atoms';

import 'croppie/croppie.css';
import Croppie from 'croppie/croppie.min.js';

class PhotoCrop extends PureComponent {
  state = {
    c: null,
  };

  componentDidMount() {
    const c = new Croppie(document.getElementById('photo'), {
      viewport: {
        width: 200,
        height: 200
      },
      mouseWheelZoom: false,
    });
    c.bind({ url: this.props.image })
      .then(() => {
        c.setZoom(0);
      });
    this.setState({ c });
  }

  componentWillUnmount() {
    if(this.state.c) this.state.c.destroy();
  }

  save = () => {
    const { onSave } = this.props;
    const { c } = this.state;
    if(c) {
      const result = c.result({
        type: 'canvas',
        size: 'viewport'
      }).then(data => {
        onSave(data);
      });
    }
  };

  onClick = () => {
    this._input.click();
  };

  getInput = (node) => {
    this._input = node;
  };

  onChange = ({ target: { validity, files: [file] } }) => {
    if (validity.valid) {
      const reader = new FileReader();
      reader.addEventListener(
        'load',
        () => {
          const { c } = this.state;
          if(c) {
            c.bind({ url: reader.result })
            setTimeout(() => {
              c.setZoom(0);
            }, 50);
        }},
        false
      );
      reader.readAsDataURL(file);
    }
  };

  render() {
    return (
      <div>
        <Container>
          <div id="photo" />
        </Container>
        <Controls alignItems="center" justifyContent="space-between">
          <Label>
            Zoom image
          </Label>

          <UpdateButton onClick={this.onClick}>
            <SvgIcon.UpdatePhoto />
            Upload new photo
          </UpdateButton>
          <Icons alignItems="center" justifyContent="space-between">
            <SvgIcon.SliderIconSmall />
            <SvgIcon.SliderIconBig />
          </Icons>
          <SaveButton
            onClick={this.save}
            disabled={this.props.loading}
          >
            Save
          </SaveButton>
        </Controls>
        <UploadInput
          ref={this.getInput}
          type="file"
          accept="image/jpeg, image/x-png, .jpg, .jpeg, .png"
          required
          onChange={this.onChange}
        />
      </div>
    );
  }
}

const UploadInput = styled.input`
  display: none;
`;

const Container = styled.div`
  height: 280px;
  margin-bottom: 50px;
  .cr-boundary {
    background: #0f141f;
    .cr-vp-square {
      border: none;
    }
  }
  .cr-slider-wrap {
    padding-top: 24px;
    position: relative;
    z-index: 10;
        
    input[type=range] {
      -webkit-appearance: none;
      width: 140px;
    }
    input[type=range]:focus {
      outline: none;
    }
    input[type=range]::-webkit-slider-runnable-track {
      width: 100%;
      height: 2px;
      cursor: pointer;
      animate: 0.2s;
      background: #cfd6e6;
      border-radius: 2px;
    }
    input[type=range]::-webkit-slider-thumb {
      border: 2px solid ${p => p.theme.colors.primary};
      height: 18px;
      width: 18px;
      transform: translateY(-2px);
      border-radius: 10px;
      background: #fff;
      cursor: pointer;
      -webkit-appearance: none;
    }
    input[type=range]:focus::-webkit-slider-runnable-track {
      background: #cfd6e6;
    }
    input[type=range]::-moz-range-track {
      width: 100%;
      height: 2px;
      cursor: pointer;
      animate: 0.2s;
      background: #cfd6e6;
      border-radius: 2px;
    }
    input[type=range]::-moz-range-thumb {
      border: 2px solid ${p => p.theme.colors.primary};
      height: 18px;
      width: 18px;
      top: -2px;
      border-radius: 10px;
      background: #fff;
      cursor: pointer;
    }
    input[type=range]::-ms-track {
      width: 100%;
      height: 2px;
      cursor: pointer;
      animate: 0.2s;
      background: transparent;
      border-color: transparent;
      border-width: 16px 0;
      color: transparent;
    }
    input[type=range]::-ms-fill-lower {
      background: ${p => p.theme.colors.primary};
      border-radius: 2.6px;
    }
    input[type=range]::-ms-fill-upper {
      background: ${p => p.theme.colors.primary};
      border-radius: 2.6px;
    }
    input[type=range]::-ms-thumb {
      border: 2px solid ${p => p.theme.colors.primary};
      height: 18px;
      width: 18px;
      top: -2px;
      border-radius: 10px;
      background: #fff;
      cursor: pointer;
    }
    input[type=range]:focus::-ms-fill-lower {
      background: ${p => p.theme.colors.primary};
    }
    input[type=range]:focus::-ms-fill-upper {
      background: ${p => p.theme.colors.primary};
    }
  }
`;

const Controls = styled(p => <Flex {...p} />)`
  position: relative;
  margin-top: -25px;
  ${({ theme }) => theme.max('xs')`
    justify-content: center;
  `}
`;

const UpdateButton = styled.button`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: ${p => p.theme.colors.primary};
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 20;
  padding-left: 0;
  svg {
    margin-right: 4px;
  }
  &:hover {
    color: ${p => darken(0.1, p.theme.colors.primary)};
  }
  ${({ theme }) => theme.max('xs')`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 50px;
  `}
`;

const Icons = styled(p => <Flex {...p} />)`
  width: 200px;
  margin-left: -53px;
  color: ${p => p.theme.colors.gray.light};
  ${({ theme }) => theme.max('xs')`
    margin-left: 0;
    margin-top: 10px;
  `}
`;

const SaveButton = styled(Button)`
  z-index: 20;
  padding: 14px 24px;
  font-weight: 600;
  ${({ theme }) => theme.max('xs')`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 100px;
    width: 180px;
  `}
`;

const Label = styled.p`
  position: absolute;
  text-align: center;
  top: -20px;
  font-size: 12px;
  color: ${p => p.theme.colors.gray.regular};
  left: 50%;
  transform: translateX(-50%);
`;

export default PhotoCrop;