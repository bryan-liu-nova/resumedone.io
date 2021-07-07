import React, { PureComponent } from 'react';
import { WizardHeader, WizardSubHeader, WizardIntro, WizardListItem } from '/imports/generator/ui/atoms';
import { Analytics } from '/imports/core/api/analytics';

class WizardSummaryIntro extends PureComponent {
  componentDidMount() {
    Analytics.track('summary_intro_view');
  }

  render() {
    return (
      <WizardIntro>
        <WizardHeader intro>Finally Let’s work on your <span>summary</span></WizardHeader>
        <WizardSubHeader intro>Here’s what you need to know</WizardSubHeader>
        <WizardListItem>Your summary shows employers you’re right for the job</WizardListItem>
        <WizardListItem>We’ll help you write a great one with expert content you can customize</WizardListItem>
      </WizardIntro>
    );
  }
}

export default WizardSummaryIntro;
