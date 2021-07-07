import React, { PureComponent } from 'react';
import { graphql, compose } from 'react-apollo';
import Experiment from 'react-ab-test/lib/Experiment'
import Variant from 'react-ab-test/lib/Variant'
import emitter from 'react-ab-test/lib/emitter'

import history from '/imports/core/api/history';

import OnboardingContainer from '../components/Onboarding';
import { Page, Box } from '/imports/core/ui/atoms';
import { OnboardingTitle, OnboardingSubTitle } from '/imports/onboarding/ui/atoms';
import OnboardingProgress from '../components/OnboardingProgress';
import OnboardingSlider from '../components/OnboardingSlider';
import { CREATE_RESUME } from '/imports/dashboard/api/apollo/client/mutations';
import { Accounts } from 'meteor/accounts-base';
import { Random } from 'meteor/random';
import { CURRENT_USER } from '/imports/core/api/apollo/client/queries';
import client from '/imports/core/api/apollo/client/init';
import { Analytics } from '/imports/core/api/analytics';
import { withLastLocation } from 'react-router-last-location';

import OnboardingLayout from '/imports/onboarding/ui/layouts/OnboardingLayout';
import Onboarding1 from '/imports/onboarding/ui/components/Onboarding1';
import Onboarding2 from '/imports/onboarding/ui/components/Onboarding2';
import Onboarding3 from '/imports/onboarding/ui/components/Onboarding3';
import GeneratorPageLoadable from '/imports/generator/ui/loadable/GeneratorPageLoadable';
import Loading from '/imports/core/ui/components/SelectTemplatesLoading';

@withLastLocation
@compose(
  graphql(CREATE_RESUME, {
    options: {
      onCompleted: ({ createResume }) => {
        if (createResume) {
          history.push(`/resume/${createResume._id}/start`);
        }
      },
    },
  }),
)
class StartPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: !(this.props.lastLocation && this.props.lastLocation.pathname && this.props.lastLocation.pathname.includes('/resume/')),
    };
  }

  componentDidMount() {
    GeneratorPageLoadable.preload();
    GeneratorPageLoadable.preload();
    setTimeout(() => {
      this.setState({ loading: false });
    }, 6000);
  }

  componentWillUnmount() {
    try {
      document.getElementsByTagName('body')[0].classList.remove('_container');
    } catch (error) {
      console.error("Can't find body tag");
    }
  }

  selectTemplate = (template, name) => {
    const templateName = name || template;
    Accounts.createUser({
      email: `${Random.id()}@mail.com`,
      password: Random.id(),
      profile: { template },
    }, (err) => {
      if (err) return console.log(err);
      Analytics.track('template_selected', { template: templateName });
      client.resetStore().then(() => {
        client.query({ query: CURRENT_USER }).then(({ data: { currentUser } }) => {
          Analytics.alias(currentUser._id);
          Analytics.identify(currentUser._id);
          this.props.mutate();
        });
      });

    });
  };

  render() {
    return this.state.loading
      ? <Loading />
      : (
        <OnboardingContainer experiment="0" onSelect={this.selectTemplate} />
      )
  }
}


export default StartPage;
