import React, { PureComponent } from 'react';
import { ValidatorForm } from 'react-form-validator-core';

import WizardLayout from '/imports/generator/ui/layouts/WizardLayout';
import WizardSummaryIntro from '/imports/generator/ui/components/WizardSummaryIntro';
import { WizardHeader, WizardSubHeader } from '/imports/generator/ui/atoms';
import { UPDATE_RESUME_DETAIL } from '/imports/generator/api/apollo/client/mutations';
import {
  FormGroup,
  TextareaEditorAutosave,
} from '/imports/core/ui/atoms';
import { TextareaEditorWithData } from '/imports/generator/ui/atoms';
import { Analytics } from '/imports/core/api/analytics';
import last from 'lodash/last';
import { withLastLocation } from 'react-router-last-location';
import { updateAfterDetailSave, updateDetailsOptimisticResponse } from '/imports/generator/api/apollo/client/helpers';

@withLastLocation
class WizardSummary extends PureComponent {
  componentDidMount() {
    Analytics.track('summary_view', {
      origin: this.props.lastLocation ? last(this.props.lastLocation.pathname.split('/')) : 'direct'
    });
  }

  getLastJob = () => {
    const {
      resume: {
        blocks,
        details: {
          title
        }
      }
    } = this.props;
    if(title) return title;
    const employment = blocks.find(block => block.type === 'EMPLOYMENT');
    if(!employment) return null;
    return employment.items && employment.items.length > 0 && employment.items[0].fields && employment.items[0].fields.title || null;
  };

  render() {
    const { resume: { _id, details }, intro } = this.props;
    if(intro && intro === 'intro') {
      return (
        <WizardLayout resume={this.props.resume}>
          <WizardSummaryIntro />
        </WizardLayout>
      );
    }
    return (
      <WizardLayout resume={this.props.resume}>
        <WizardHeader><span>Write down</span> your Professional summary</WizardHeader>
        <WizardSubHeader>Include 2-3 clear sentences about your overall experience</WizardSubHeader>
        <FormGroup>
          <ValidatorForm onSubmit={() => {}}>
            <TextareaEditorWithData
                mutation={UPDATE_RESUME_DETAIL}
                variables={{
                  docId: _id,
                  path: 'details.professionalSummary',
                }}
                name="professionalSummary"
                value={details.professionalSummary}
                optimisticResponse={updateDetailsOptimisticResponse(_id, 'details.professionalSummary')}
                update={updateAfterDetailSave(_id)}
                rows={5}
                placeholder="e.g. Passionate science teacher with 8+ years of experience and a track record of..."
                searchType="summary"
                suggestionBlockType="paragraph"
                lastJob={this.getLastJob()}
            />
          </ValidatorForm>
        </FormGroup>
      </WizardLayout>
    );
  }
}

export default WizardSummary;
