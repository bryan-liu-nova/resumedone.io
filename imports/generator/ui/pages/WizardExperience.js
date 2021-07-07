import React, { PureComponent } from 'react';
import { withLastLocation } from 'react-router-last-location';
import { graphql, compose } from 'react-apollo';

import WizardLayout from '/imports/generator/ui/layouts/WizardLayout';
import WizardExperienceIntro from '/imports/generator/ui/components/WizardExperienceIntro';
import { WizardHeader, WizardSubHeader } from '/imports/generator/ui/atoms';
import GenericBlock from '../components/GenericBlock';
import { Analytics } from '/imports/core/api/analytics';
import last from 'lodash/last';
import { UPDATE_RESUME_DETAIL } from '/imports/generator/api/apollo/client/mutations';

@withLastLocation
@compose(
  graphql(UPDATE_RESUME_DETAIL, { name: 'updateResumeDetail' }),
)
class WizardExperience extends PureComponent {
  componentDidMount() {
    Analytics.track('experience_view', {
      origin: this.props.lastLocation ? last(this.props.lastLocation.pathname.split('/')) : 'direct'
    });
  }

  _form = null;

  getForm = (node) => {
    this._form = node;
  };

  isFormValid = () => this._form && this._form.isFormValid(false) || Promise.resolve(true);

  onSubmit = () => {
    const { intro, resume: { _id, blocks, details: { title }} } = this.props;
    if(!intro) {
      const block = blocks.find(b => b.type === 'EMPLOYMENT');
      const item = block.items && block.items[0];
      const jobTitle = item && item.fields && item.fields.title;
      if(!title && jobTitle) {
        this.props.updateResumeDetail({
          variables: {
            docId: _id,
            path: 'details.title',
            value: jobTitle,
          }
        });
      }
    }
  };

  renderBlock = () => {
    const { resume } = this.props;
    const block = resume.blocks.find(b => b.type === 'EMPLOYMENT');
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
      <WizardLayout isFormValid={this.isFormValid} resume={resume} onSubmit={this.onSubmit}>
        {
          (intro && intro === 'intro') ?
            <WizardExperienceIntro /> :
            <>
              <WizardHeader><span>Tell us</span> about your Experience</WizardHeader>
              <WizardSubHeader>Start with your recent job</WizardSubHeader>
              {this.renderBlock()}
            </>
        }
      </WizardLayout>
    );
  }
}

export default WizardExperience;
