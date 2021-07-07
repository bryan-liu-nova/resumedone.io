import React from 'react';
import styled from 'styled-components';
import { ValidatorComponent } from 'react-form-validator-core';

import Input from './Input';
import ControlledInput from './ControlledInput';
import ErrorMessage from './InputErrorMessage';

class GeneratorValidatedInput extends ValidatorComponent {
  render() {
    const errorText = this.getErrorMessage();
    const { errorMessages, validators, requiredError, validatorListener, onSave, hideIcon, children, ...rest } = this.props;
    const Component = this.props.validated ? ControlledInput : Input;
    return (
      <InputCont>
        <Component error={!this.isValid()} autoComplete="off" {...rest} />
        {!this.isValid() && <ErrorMessage name={rest.name}>{errorText}</ErrorMessage>}
        {children}
      </InputCont>
    );
  }
}

const InputCont = styled.div`
  position: relative;
  margin-bottom: 12px;
`;

export default GeneratorValidatedInput;
