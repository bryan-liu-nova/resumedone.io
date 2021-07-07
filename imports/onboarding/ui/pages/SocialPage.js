import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { Random } from 'meteor/random';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

import history from '/imports/core/api/history';
import { Page, Box, Flex } from '/imports/core/ui/atoms';
import {
  OnboardingTitle,
  OnboardingSubTitle,
  OnboardingContent,
  OnboardingSocialButton,
} from '/imports/onboarding/ui/atoms';
import OnboardingProgress from '../components/OnboardingProgress';
import OnboardingSocialImage from '../components/OnboardingSocialImage';
import OnboardingButtons from '../components/OnboardingButtons';
import { CURRENT_USER } from '/imports/core/api/apollo/client/queries';
import client from '/imports/core/api/apollo/client/init';

const socials = [
  { fb: true, title: 'Connect with Facebook' },
  { li: true, title: 'Connect with LinkedIn' },
  //{ gm: true, title: 'Connect with Google+' },
];

@withRouter
class SocialPage extends PureComponent {
  componentDidMount() {
  }

  goBack = () => history.push('/onboard/start');

  goNext = () => {
    const { location: { state } } = this.props;
    const template = (state || {}).template || 'london';
    Accounts.createUser({
      email: `${Random.id()}@mail.com`,
      password: Random.id(),
      profile: { template }
    }, (err) => {
      if (err) return console.log(err);
      client.resetStore().then(() => {
        client.query({ query: CURRENT_USER }).then((res) => {
          console.log('resuuuu', res);
          history.push('/onboard/name');
        });
      });
    });
  };

  loginWithFB = () => {
    const { location: { state } } = this.props;
    const template = (state || {}).template || 'london';

    Meteor.loginWithFacebook({ requestPermissions: ['email'] }, (err) => {
      if (err) {
        alert(err.message);
        return console.log(err);
      }
      client.resetStore().then(() => {
        client.query({ query: CURRENT_USER }).then(d => {
          console.log(d);
          history.push('/onboard/name');
        });
      });
    });
  };

  loginWithLI = () => {
    const { location: { state } } = this.props;
    const template = (state || {}).template || 'london';

    Meteor.loginWithLinkedIn({ requestPermissions: ['email'] }, (err) => {
      if (err) return console.log(err);
      client.resetStore().then(() => {
        client.query({ query: CURRENT_USER }).then(d => {
          console.log(d);
          history.push('/onboard/name');
        });
      });
    });
  };

  render() {
    return (
      <Page>
        <OnboardingTitle>Connect Your Social Profile</OnboardingTitle>
        <Box alignX="center">
          <OnboardingProgress sections={2} progress={2 / 8}/>
        </Box>
        <OnboardingSubTitle>
          Prefil your resume with data from your social profile.
        </OnboardingSubTitle>
        <OnboardingContent>
          <SocialFlex>
            <OnboardingSocialImage socials={socials}/>
            <ButtonsWrapper>
              <OnboardingSocialButton href="#" fb onClick={this.loginWithFB}>
                Connect with Facebook
              </OnboardingSocialButton>
              <OnboardingSocialButton href="#" li onClick={this.loginWithLI}>
                Connect with LinkedIn
              </OnboardingSocialButton>
            </ButtonsWrapper>
          </SocialFlex>
          <OnboardingButtons next="Skip" goBack={this.goBack} goNext={this.goNext} />
        </OnboardingContent>
      </Page>
    );
  }
}

const SocialFlex = styled(p => <Flex alignItems="center" justifyContent="center" grow={1} {...p} />)`
  margin-bottom: 80px;
  ${({ theme }) => theme.max('md')`
    flex-flow: column nowrap;
    margin-bottom: 0;
  `}
`;


const ButtonsWrapper = styled.div`
  width: 228px;
`;

export default SocialPage;
