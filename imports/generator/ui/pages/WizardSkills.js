import React, { PureComponent } from 'react';

import WizardLayout from '/imports/generator/ui/layouts/WizardLayout';
import WizardSkillsIntro from '/imports/generator/ui/components/WizardSkillsIntro';
import { WizardHeader, WizardSubHeader } from '/imports/generator/ui/atoms';
import GenericBlock from '../components/GenericBlock';
import { Analytics } from '/imports/core/api/analytics';
import last from 'lodash/last';
import { withLastLocation } from 'react-router-last-location';

@withLastLocation
class WizardSkills extends PureComponent {
  componentDidMount() {
    Analytics.track('skills_view', {
      origin: this.props.lastLocation ? last(this.props.lastLocation.pathname.split('/')) : 'direct'
    });
  }

  renderBlock = () => {
    const { resume } = this.props;
    const block = resume.blocks.find(b => b.type === 'SKILLS');
    return (
      <GenericBlock
        key="random_id"
        block={block}
        resumeId={resume._id}
        resume={resume}
        noTitle
        startExpanded
      />
    );
  };

  render() {
    const { resume, intro } = this.props;
    return (
      <WizardLayout resume={resume}>
        {
          (intro && intro === 'intro') ?
            <WizardSkillsIntro /> :
            <>
              <WizardHeader><span>Tell us</span> about your Skills</WizardHeader>
              <WizardSubHeader>Start with the one you are most experienced at</WizardSubHeader>
              {this.renderBlock()}
            </>
        }
      </WizardLayout>
    );
  }
}

export default WizardSkills;
