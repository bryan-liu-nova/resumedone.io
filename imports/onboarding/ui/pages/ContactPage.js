import React, { PureComponent } from 'react';
import { graphql, compose } from 'react-apollo';
import { ValidatorForm } from 'react-form-validator-core';

import history from '/imports/core/api/history';

import { Page, Box } from '/imports/core/ui/atoms';
import {
  OnboardingTitle,
  OnboardingSubTitle,
  OnboardingContent,
  OnboardingFormGroup,
  OnboardingLabel,
  OnboardingInput,
} from '/imports/onboarding/ui/atoms';
import OnboardingProgress from '../components/OnboardingProgress';
import OnboardingButtons from '../components/OnboardingButtons';

//import {
//  SET_EMAIL_AND_PHONE,
//  GO_BACK_TO_NAME,
//} from '/imports/onboarding/api/apollo/client/mutations';
//import { CREATE_RESUME } from '/imports/dashboard/api/apollo/client/mutations';
import { withAccount } from '/imports/core/api/accounts/accountContext';
import { ERROR_MESSAGES } from '/imports/core/api/constants';

@withAccount
//@compose(
//  graphql(SET_EMAIL_AND_PHONE, { name: 'setEmailAndPhone' }),
//  graphql(CREATE_RESUME, { name: 'createResume' }),
//  graphql(GO_BACK_TO_NAME, { name: 'goBack' }),
//)
class ContactPage extends PureComponent {
  state = {
    email: this.props.currentUser.personalData.email,
    phone: this.props.currentUser.personalData.phone,
  };

  goBack = () => {
    this.props.goBack();
  };

  goNext = () => this._form.submit();

  componentDidMount() {
    document.querySelector('input').focus();
  }

  handleChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  handleChangePhone = (e) => {
    this.setState({ phone: e.target.value });
  };

  onSubmit = () => {
    const { setEmailAndPhone, createResume } = this.props;
    setEmailAndPhone({
      variables: this.state,
    }).then(({ data: { setEmailAndPhone: { success, finished, error } } }) => {
      if (error) {
        alert(error);
      }
      if (success && finished) {
        createResume({
          variables: {
            isPersonal: true,
          },
        }).then(({ data: { createResume } }) => {
          if (createResume) {
            history.push(`/resume/${createResume._id}/start`);
          }
        });
      }
    });
  };

  render() {
    const { email, phone } = this.state;
    return (
      <Page>
        <OnboardingTitle>Supply Contact Information</OnboardingTitle>
        <Box alignX="center">
          <OnboardingProgress sections={2} progress={3.99 / 8}/>
        </Box>
        <OnboardingSubTitle>It’s important to let employers know how to contact you. Enter your
          phone number and email address below.</OnboardingSubTitle>
        <OnboardingContent>
          <ValidatorForm
            onSubmit={this.onSubmit}
            noValidate
            instantValidate={false}
          >
            <OnboardingFormGroup>
              <OnboardingLabel>Email</OnboardingLabel>
              <OnboardingInput
                type="email"
                onChange={this.handleChangeEmail}
                value={email}
                placeholder="e.g. mail@example.com"
                validators={['required', 'isEmail']}
                errorMessages={[ERROR_MESSAGES.required, ERROR_MESSAGES.email]}
              />
            </OnboardingFormGroup>
            <OnboardingFormGroup>
              <OnboardingLabel>Phone</OnboardingLabel>
              <OnboardingInput
                onChange={this.handleChangePhone}
                value={phone}
                type="text"
                placeholder="e.g. 890-455-0401"
              />
            </OnboardingFormGroup>
            <OnboardingButtons goBack={this.goBack}/>
          </ValidatorForm>
        </OnboardingContent>
      </Page>
    );
  }
}

export default ContactPage;
