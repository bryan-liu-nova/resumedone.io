import React, { PureComponent } from 'react';
import Experiment from 'react-ab-test/lib/Experiment'
import Variant from 'react-ab-test/lib/Variant'

import Landing from '/imports/landing/ui/components/Landing';
import { withAccount } from '/imports/core/api/accounts/accountContext';
import { Analytics } from '/imports/core/api/analytics';
import history from '/imports/core/api/history';

// Loadable components to preload
import ForgotPasswordLoadable from '/imports/core/ui/loadable/ForgotPasswordLoadable';
import LoginPageLoadable from '/imports/core/ui/loadable/LoginPageLoadable';
import SetPasswordLoadable from '/imports/core/ui/loadable/SetPasswordLoadable';
import ResumesPageLoadable from '/imports/dashboard/ui/loadable/ResumesPageLoadable';
import StartPageLoadable from '/imports/onboarding/ui/loadable/StartPageLoadable';
import SocialPageLoadable from '/imports/onboarding/ui/loadable/SocialPageLoadable';
import NamePageLoadable from '/imports/onboarding/ui/loadable/NamePageLoadable';
import ContactPageLoadable from '/imports/onboarding/ui/loadable/ContactPageLoadable';
import LandingExp from '../components/LandingExp';

@withAccount
class LandingPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false
    };
  
    this.variantComputing('landing_view_experiment');
  }
  
  variantComputing = experiment => {
    const local_storage_exp = localStorage.getItem(`PUSHTELL-${experiment}`);
    if (local_storage_exp == '6' || local_storage_exp == '8' || local_storage_exp == '9') {
      localStorage.removeItem(`PUSHTELL-${experiment}`);
    }
  };

  componentDidMount() {
    setTimeout(this.setLoaded, 3000);
    setTimeout(() => {
      // Running with delay ro avoid possible quirks
      ForgotPasswordLoadable.preload();
      LoginPageLoadable.preload();
      SetPasswordLoadable.preload();
      ResumesPageLoadable.preload();
      StartPageLoadable.preload();
      SocialPageLoadable.preload();
      NamePageLoadable.preload();
      ContactPageLoadable.preload();
    }, 200);
  }

  setLoaded = () => {
    if (!this.state.loaded) {
      this.setState({ loaded: true });
    }
  };

  ctaClick = (variant, target) => {
    Analytics.track('cta_click', { variant, target });
    history.push(this.props.currentUser ? '/resumes' : '/onboard/start');
  };

  render() {
    return (
      <React.Fragment>
        <Experiment name="landing_view_experiment">
          <Variant name="0">
            <Landing ctaClick={this.ctaClick} variant={0} />
          </Variant>
          <Variant name="1">
            <Landing ctaClick={this.ctaClick} variant={1} />
          </Variant>
          <Variant name="2">
            <Landing ctaClick={this.ctaClick} variant={2} />
          </Variant>
          <Variant name="3">
            <Landing ctaClick={this.ctaClick} variant={3} />
          </Variant>
          <Variant name="4">
            <Landing ctaClick={this.ctaClick} variant={4} />
          </Variant>
          <Variant name="5">
            <Landing ctaClick={this.ctaClick} variant={5} />
          </Variant>
          <Variant name="7">
            <Landing ctaClick={this.ctaClick} variant={7} />
          </Variant>
          <Variant name="10">
            <Landing ctaClick={this.ctaClick} variant={10} />
          </Variant>
          <Variant name="11">
            <Landing ctaClick={this.ctaClick} variant={11} />
          </Variant>
          <Variant name="12">
            <Landing ctaClick={this.ctaClick} variant={12} />
          </Variant>
          <Variant name="13">
            <LandingExp ctaClick={this.ctaClick} variant={13} />
          </Variant>
          <Variant name="14">
            <LandingExp ctaClick={this.ctaClick} variant={14} />
          </Variant>
          <Variant name="15">
            <LandingExp ctaClick={this.ctaClick} variant={15} />
          </Variant>
        </Experiment>
      </React.Fragment>
    );
  }
}

export default LandingPage;
