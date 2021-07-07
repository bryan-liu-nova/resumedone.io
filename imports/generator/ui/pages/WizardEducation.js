import React, { PureComponent } from 'react';

import WizardEducationIntro from '/imports/generator/ui/components/WizardEducationIntro';
import WizardLayout from '/imports/generator/ui/layouts/WizardLayout';
import { WizardHeader, WizardSubHeader } from '/imports/generator/ui/atoms';
import GenericBlock from '../components/GenericBlock';
import { Analytics } from '/imports/core/api/analytics';
import last from 'lodash/last';
import { withLastLocation } from 'react-router-last-location';

@withLastLocation
class WizardEducation extends PureComponent {
  componentDidMount() {
    Analytics.track('education_view', {
      origin: this.props.lastLocation ? last(this.props.lastLocation.pathname.split('/')) : 'direct'
    });
  }

  _form = null;

  getForm = (node) => {
    this._form = node;
  };

  isFormValid = () => this._form && this._form.isFormValid(false) || Promise.resolve(true);

  renderBlock = () => {
    const { resume } = this.props;
    const block = resume.blocks.find(b => b.type === 'EDUCATION');
    return (
      <GenericBlock
          key="random_id"
          block={block}
          resumeId={resume._id}
          resume={resume}
          noTitle
          getForm={this.getForm}
          isFormValid={this.isFormValid}
      />
    );
  };

  render() {
    const { resume, intro } = this.props;
    return (
      <WizardLayout isFormValid={this.isFormValid} resume={resume}>
        {
        (intro && intro === 'intro') ?
          <WizardEducationIntro /> :
          <>
            <WizardHeader><span>Tell us</span> about your Education</WizardHeader>
            <WizardSubHeader>Start with your recent university</WizardSubHeader>
            {this.renderBlock()}
          </>
        }
      </WizardLayout>
    );
  }
}

export default WizardEducation;
