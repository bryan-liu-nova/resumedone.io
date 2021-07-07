import React, { PureComponent } from 'react';

import { WizardHeader, WizardSubHeader, WizardIntro, WizardListItem } from '/imports/generator/ui/atoms';
import { Analytics } from '/imports/core/api/analytics';

class WizardEducationIntro extends PureComponent {
  componentDidMount() {
    Analytics.track('education_intro_view');
  }

  render() {
    return (
      <WizardIntro>
        <WizardHeader intro>Great! Let’s work on <span>your Education</span></WizardHeader>
        <WizardSubHeader intro>Here’s what you need to know</WizardSubHeader>
        <WizardListItem>Employers quickly scan the education section</WizardListItem>
        <WizardListItem>We’ll take care of the formating so it’s easy to find</WizardListItem>
      </WizardIntro>
    );
  }
}

export default WizardEducationIntro;
