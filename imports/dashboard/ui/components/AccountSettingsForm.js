import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { graphql } from 'react-apollo';
import { ValidatorForm } from 'react-form-validator-core';
import PropTypes from 'prop-types';

import {
  FormGroup,
  Label,
  ValidatedInput
} from '/imports/core/ui/atoms';
import { ERROR_MESSAGES } from '/imports/core/api/constants';
import { LineButton, TextContainer } from '/imports/dashboard/ui/atoms';
import { SET_USER_INFO } from '/imports/dashboard/api/apollo/client/mutations';
import { withAccount } from '/imports/core/api/accounts/accountContext';

@withAccount
@graphql(SET_USER_INFO, { name: 'setInfo' })
class AccountSettingsForm extends PureComponent {
  static propTypes = {
    userInfo: PropTypes.shape({
      personalData: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
      }),
      email: PropTypes.string,
    }),
    onSubmit: PropTypes.func,
  };

  state = {
    firstName: this.props.currentUser.personalData.firstName || '',
    lastName: this.props.currentUser.personalData.lastName || '',
    email: this.props.currentUser.personalData.email || '',
    loading: false
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = (e) => {
    e.preventDefault();
    const { setInfo } = this.props;
    const { firstName, lastName, email } = this.state;
    this.setState({ loading: true });
    setInfo({
      variables: { firstName, lastName, email },
    }).then(() => {
      this.setState({ loading: false });
    });
  };

  render() {
    const { firstName, lastName, email, loading } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormInputsContainer>
          <FormSettingsGroup>
            <Label>First Name</Label>
            <ValidatedInput
                type="text"
                name="firstName"
                placeholder="Name"
                validators={['required']}
                onChange={this.onChange}
                value={firstName}
                errorMessages={[ERROR_MESSAGES.required]}
            />
          </FormSettingsGroup>
          <FormSettingsGroup>
            <Label>Last Name</Label>
            <ValidatedInput
                type="text"
                name="lastName"
                placeholder="Last Name"
                validators={['required']}
                onChange={this.onChange}
                value={lastName}
                errorMessages={[ERROR_MESSAGES.required]}
            />
          </FormSettingsGroup>
        </FormInputsContainer>
        <FormInputsContainer>
          <FormSettingsGroup>
            <Label>Email</Label>
            <ValidatedInput
                type="email"
                name="email"
                placeholder="Email"
                validators={['required', 'isEmail']}
                onChange={this.onChange}
                value={email}
                errorMessages={[ERROR_MESSAGES.required, ERROR_MESSAGES.email]}
            />
          </FormSettingsGroup>
          <TextContainerForm>
            <p>Use this email to log in to your Resume.io account and receive notifications.</p>
          </TextContainerForm>
        </FormInputsContainer>
        <LineButtonContainer>
          <LineButton
              type="submit"
              right
              disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </LineButton>
        </LineButtonContainer>
      </Form>
    );
  }
}

const Form = styled(ValidatorForm)`
  width: 100%;
`;

const FormInputsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${({ theme }) => theme.max('sm')`
    flex-direction: column;
    align-items: start;
  `}
`;

const FormSettingsGroup = styled(p => <FormGroup {...p} />)`
  width: 50%;
  &:nth-child(odd) {
    margin-right: 40px;
    flex: 0 0 calc(50% - 20px);
  }
  ${({ theme }) => theme.max('sm')`
    margin-right: 0;
    width: 100%;
  `}
`;

const TextContainerForm = styled(p => <TextContainer {...p} />)`
  padding-right: 20px;
  padding-top: 12px;
  ${({ theme }) => theme.max('sm')`
    width: 100%;
    max-width: none;
    padding-top: 0;
    margin-top: -8px;
    & p {
      max-width: none;
    }
  `}
`;

const LineButtonContainer = styled.div`
  width: 100%;
  height: 28px;
  padding-top: 8px;
`;

export default AccountSettingsForm;
