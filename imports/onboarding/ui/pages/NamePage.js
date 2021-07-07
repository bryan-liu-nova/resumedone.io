import React, { PureComponent } from 'react';
import { ValidatorForm } from 'react-form-validator-core';
import history from '/imports/core/api/history';
import { graphql, compose } from 'react-apollo';

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
import { ERROR_MESSAGES } from '/imports/core/api/constants';
import { AccountConsumer } from '/imports/core/api/accounts/accountContext';
//import { SET_FIRST_AND_LAST_NAME } from '/imports/onboarding/api/apollo/client/mutations';
import { withAccount } from '/imports/core/api/accounts/accountContext';
//import { DELETE_ACCOUNT } from '/imports/dashboard/api/apollo/client/mutations';
import { CURRENT_USER } from '/imports/core/api/apollo/client/queries';

@withAccount
//@compose(
  //graphql(SET_FIRST_AND_LAST_NAME, { name: 'setFirstAndLastName' }),
  //graphql(DELETE_ACCOUNT, { name: 'deleteAccount' })
//)
class NamePage extends PureComponent {
  state = {
    firstName: this.props.currentUser.personalData.firstName,
    lastName: this.props.currentUser.personalData.lastName
  };

  componentDidMount() {
    document.querySelector('input').focus();
  }

  goBack = () => {
    this.props.deleteAccount({
      update: (cache, res) => {
        cache.writeQuery({
          query: CURRENT_USER,
          data: {
            currentUser: null
          }
        });
      }
    }).then(() => {
      history.push('/onboard/social');
    });
  };

  goNext = () => this._form.submit();

  handleChangeFirst = (e) => {
    this.setState({ firstName: e.target.value });
  };

  handleChangeLast = (e) => {
    this.setState({ lastName: e.target.value });
  };

  onSubmit = () => {
    this.props.setFirstAndLastName({
      variables: this.state
    }).then(({ data: { setFirstAndLastName: { success, next } } }) => {
      if (success) {
        history.push(`/onboard/${next}`);
      }
    });
  };

  render() {
    const { firstName, lastName } = this.state;
    return (
      <AccountConsumer>
        {({ currentUser }) => {
          const personalData = currentUser.personalData || {};
          return (
            <Page>
              <OnboardingTitle>Add Your Name</OnboardingTitle>
              <Box alignX="center">
                <OnboardingProgress sections={2} progress={3 / 8}/>
              </Box>
              <OnboardingSubTitle>You made a great template selection! Now let’s add your name to it.</OnboardingSubTitle>
              <OnboardingContent>
                <ValidatorForm
                    onSubmit={this.onSubmit}
                    noValidate
                    instantValidate={false}
                >
                  <OnboardingFormGroup>
                    <OnboardingLabel>First name</OnboardingLabel>
                    <OnboardingInput
                        onChange={this.handleChangeFirst}
                        defaultValue={personalData.firstName}
                        value={firstName}
                        type="text"
                        placeholder="e.g. John"
                        validators={['required']}
                        errorMessages={[ERROR_MESSAGES.required]}
                    />
                  </OnboardingFormGroup>
                  <OnboardingFormGroup>
                    <OnboardingLabel>Last name</OnboardingLabel>
                    <OnboardingInput
                        onChange={this.handleChangeLast}
                        defaultValue={personalData.lastName}
                        value={lastName}
                        type="text"
                        placeholder="e.g. Doe"
                        validators={['required']}
                        errorMessages={[ERROR_MESSAGES.required]}
                    />
                  </OnboardingFormGroup>
                  <OnboardingButtons goBack={this.goBack} />
                </ValidatorForm>
              </OnboardingContent>
            </Page>
          )
        }}
      </AccountConsumer>
    );
  }
}

export default NamePage;
