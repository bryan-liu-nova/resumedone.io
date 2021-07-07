import React, { PureComponent } from 'react';

import { WizardHeader, WizardSubHeader, WizardIntro, WizardListItem } from '/imports/generator/ui/atoms';
import { Analytics } from '/imports/core/api/analytics';

class WizardExperienceIntro extends PureComponent {
  componentDidMount() {
    Analytics.track('experience_intro_view');
  }

  render() {
    return (
      <WizardIntro>
        <WizardHeader intro red>Now let's Fill out <span>Your Work History</span></WizardHeader>
        <WizardSubHeader intro>Here's what you need to know</WizardSubHeader>
        <WizardListItem>Employers scan your resume for six second to decide if you’re a natch</WizardListItem>
        <WizardListItem>We’ll suggest bullet points that make a great impression</WizardListItem>
      </WizardIntro>
    );
  }
}

export default WizardExperienceIntro;
