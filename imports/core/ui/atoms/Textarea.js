import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { inputStyle } from '/imports/core/ui/mixins';
import InputStripe from './InputStripe';

class InputCont extends PureComponent {
  render() {
    return (
      <Wrap>
        <Textarea {...this.props} />
        <InputStripe />
      </Wrap>
    );
  }
}

const Wrap = styled.div`
  position: relative;
  border-radius: ${p => p.theme.general.borderRadius};
  overflow: hidden;
`;

const Textarea = styled.textarea`
  display: block;
  box-shadow: none;
  resize: none;
  &:focus {
    & ~ div {
      visibility: visible;
      transform: rotateY(0);
    }
  }
  ${inputStyle}
`;

export default InputCont;
