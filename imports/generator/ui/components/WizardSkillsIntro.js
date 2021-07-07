import React, { PureComponent } from 'react';
import { WizardHeader, WizardSubHeader, WizardIntro, WizardListItem } from '/imports/generator/ui/atoms';
import { Analytics } from '/imports/core/api/analytics';

class WizardSkillsIntro extends PureComponent {
  componentDidMount() {
    Analytics.track('skills_intro_view');
  }

  render() {
    return (
      <WizardIntro>
        <WizardHeader intro>Next, Let’s take care of <span>your skills</span></WizardHeader>
        <WizardSubHeader intro>Here’s what you need to know</WizardSubHeader>
        <WizardListItem>Employers scan skills forr elevent keyword</WizardListItem>
        <WizardListItem>We’ll help you to choe the best one</WizardListItem>
      </WizardIntro>
    );
  }
}

export default WizardSkillsIntro;
