import React, { PureComponent } from 'react';
import { graphql, compose } from 'react-apollo';
import styled, { css } from 'styled-components';
import { ValidatorForm } from 'react-form-validator-core';
import { withLastLocation } from 'react-router-last-location';
import last from 'lodash/last';
import Experiment from 'react-ab-test/lib/Experiment'
import Variant from 'react-ab-test/lib/Variant'
import emitter from 'react-ab-test/lib/emitter'

import { Flex, Label, Box } from '/imports/core/ui/atoms';
import { UPDATE_RESUME_DETAIL } from '/imports/generator/api/apollo/client/mutations';
import { SET_EMAIL_AND_NAME } from '/imports/onboarding/api/apollo/client/mutations';
import {
  START_FORM_MAP,
  START_FORM_MAP_2
} from '/imports/generator/api/form';
import { WizardHeader, WizardSubHeader, TipIcon } from '/imports/generator/ui/atoms';
import WizardLayout from '/imports/generator/ui/layouts/WizardLayout';
import WizardLayoutExp from '/imports/generator/ui/layouts/WizardLayoutExp';
import { Analytics } from '/imports/core/api/analytics';
import { updateAfterDetailSave, updateDetailsOptimisticResponse } from '/imports/generator/api/apollo/client/helpers';

@withLastLocation
@compose(
  graphql(UPDATE_RESUME_DETAIL, { name: 'updateResumeDetail' }),
  graphql(SET_EMAIL_AND_NAME, { name: 'updateEmailName' }),
)
class WizardStartPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      plan: null,
    };
  }

  componentDidMount() {
    const firstInput = document.querySelector('input');
    if(firstInput) firstInput.focus();
    Analytics.track('heading_view', {
      origin: this.props.lastLocation ? last(this.props.lastLocation.pathname.split('/')) : 'direct',
      variant: 'original'
    });
    try {
      document.getElementsByTagName('body')[0].classList.remove('_container');
    } catch(error) {
      console.error("Can't find body tag");
    }
  }

  getForm = (node) => {
    this._form = node;
  };

  onSubmit = () => {
    const { resume: { details: { lastName, firstName, email, phone } } } = this.props;
    this.props.updateEmailName({
      variables: { lastName, firstName, email, phone },
    });

  };

  isFormValid = () => this._form.isFormValid(false);

  renderStartForm = (form, newStyle, isExp) => {
    const { resume: { _id, details, settings } } = this.props;
    return (
      <ValidatorForm
        ref={this.getForm}
        onSubmit={this.onSubmit}
      >
        <FlexCont grid center={newStyle}>
          {form.map((d, i) => {
            const FormComponent = d.component;
            const props = d.props || {};
            const gridWidth = d.fullWidth ? 12 : 6;
            const path = `details.${d.name}`;
            return (
              <FormBox md={gridWidth} sm={gridWidth} xs={12} padded key={`exposed-${name}-${i}`}>
                {!isExp && d.label && (
                  <Label form>
                    {d.label}
                    {d.tip && <TipIcon tip={d.tip}/>}
                  </Label>
                )}
                <FormComponent
                    type="text"
                    mutation={UPDATE_RESUME_DETAIL}
                    name={d.name}
                    variables={{
                      docId: _id,
                      path,
                    }}
                    value={details[d.name]}
                    template={settings.template}
                    optimisticResponse={updateDetailsOptimisticResponse(_id, path)}
                    update={updateAfterDetailSave(_id)}
                    label={d.label}
                    experiment={isExp}
                    {...props}
                />
              </FormBox>
            );
          })}
        </FlexCont>
      </ValidatorForm>
    );
  };

  renderExpHeader() {
    return (
      <>
        <WizardHeaderExp>What's the <span>best way</span> for Employers to contact you?</WizardHeaderExp>
        <WizardSubHeaderExp>We suggest including an email and phone number</WizardSubHeaderExp>
      </>
    );
  }

  render() {
    return(
      <WizardLayout isFormValid={this.isFormValid} onSubmit={this.onSubmit} resume={this.props.resume}>
        <WizardHeader>What's the <span>best way</span> for Employers to contact you?</WizardHeader>
        <WizardSubHeader>We suggest including an email and phone number</WizardSubHeader>
        {this.renderStartForm(START_FORM_MAP)}
      </WizardLayout>
    );
  }
}

const WizardHeaderExp = styled.h1`
  margin: -11px 0 22px;
  color: #000;
  font-size: 36px;
  line-height: 50px;
  font-weight: 700;
  letter-spacing: .04em;
  font-family: inherit;
  text-align: center;
  span {
    color: #2096f3;
  }
`;

const WizardSubHeaderExp = styled.p`
  margin: -7px 0;
  color: #737980;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: .08em;
  font-family: inherit;
  text-align: center;
`;

const FormBox = styled(Box)`
  margin-bottom: 18px;
`;

const FlexCont = styled(p => <Flex {...p} />)`
  ${p => p.center && css`
    min-width: 400px;
    max-width: 60%;
    margin: 0 auto;
  `}
`;

export default WizardStartPage;
