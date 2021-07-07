import React from 'react';
import styled from 'styled-components';
import { ValidatorComponent } from 'react-form-validator-core';

import Input from './Input';
import ErrorMessage from './InputErrorMessage';

class ValidatedInput extends ValidatorComponent {
  render() {
    const errorText = this.getErrorMessage();
    const { errorMessages, validators, requiredError, validatorListener, children, ...rest } = this.props;
    return (
      <InputCont>
        <Input error={!this.isValid()} {...rest} />
        {!this.isValid() && <ErrorMessage data-test-error={rest.name}>{errorText}</ErrorMessage>}
        {children}
      </InputCont>
    );
  }
}

const InputCont = styled.div`
  position: relative;
`;

export default ValidatedInput;
