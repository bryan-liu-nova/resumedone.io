import React, { PureComponent } from 'react';
import { graphql, compose } from 'react-apollo';
import Experiment from 'react-ab-test/lib/Experiment'
import Variant from 'react-ab-test/lib/Variant'

import history from '/imports/core/api/history';

import { Page, Box } from '/imports/core/ui/atoms';
import { OnboardingTitle, OnboardingSubTitle } from '/imports/onboarding/ui/atoms';
import OnboardingProgress from '/imports/onboarding/ui/components/OnboardingProgress';
import OnboardingSlider from '/imports/onboarding/ui/components/OnboardingSlider';
import { CREATE_RESUME } from '/imports/dashboard/api/apollo/client/mutations';
import { LIST_RESUMES } from '/imports/dashboard/api/apollo/client/queries';
import { Random } from 'meteor/random';
import { CURRENT_USER } from '/imports/core/api/apollo/client/queries';
import client from '/imports/core/api/apollo/client/init';
import { Analytics } from '/imports/core/api/analytics';
import { withLastLocation } from 'react-router-last-location';
import { withAccount } from '/imports/core/api/accounts/accountContext';

import OnboardingContainer from '/imports/onboarding/ui/components/Onboarding';
import Onboarding1 from '/imports/onboarding/ui/components/Onboarding1';
import GeneratorPageLoadable from '/imports/generator/ui/loadable/GeneratorPageLoadable';
import Loading from '/imports/core/ui/components/SelectTemplatesLoading';

@withAccount
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
class SelectTemplatePage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      //loading: !(this.props.lastLocation && this.props.lastLocation.pathname && this.props.lastLocation.pathname.includes('/resume/')),
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
    const userId = this.props.currentUser && this.props.currentUser._id;
    window.analytics.track('template_selected', { template: templateName });
    window.analytics.alias(userId);
    window.analytics.identify(userId);
    this.props.mutate({
      variables: {
        template
      },
      refetchQueries: [{ query: LIST_RESUMES }]
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


export default SelectTemplatePage;
