import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import { graphql } from 'react-apollo';
import sortBy from 'lodash/sortBy';
import FlipMove from 'react-flip-move';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  EditableTitle as EditableTitleAtom,
  Flex,
  Box,
  Label,
  FormGroup,
  DropdownAutosave,
} from '/imports/core/ui/atoms';
import { ResponsiveConsumer } from '/imports/core/api/responsiveContext';
import { HiddenDetails, BlockTitle, TipIcon, TextareaEditorWithData, SuggestionInputWithData } from '/imports/generator/ui/atoms';
import { TEMPLATES } from '/imports/generator/api/constants';
import ColorSelect from './ColorSelect';
import FormInfo from './FormInfo';
import AddBlocks from './AddBlocks';
import GenericBlock from './GenericBlock';
import PreviewButton from './PreviewButton';
import { UPDATE_RESUME_DETAIL } from '/imports/generator/api/apollo/client/mutations';
import { EXPOSED_DETAILS_MAP, HIDDEN_DETAILS_MAP } from '/imports/generator/api/form';
import { ValidatorForm } from 'react-form-validator-core';
import { setExpandedItem } from '/imports/generator/api/redux/actions';
import { setSavingStatus } from '/imports/pdf/core/api/redux/actions';
import { updateAfterDetailSave, updateDetailsOptimisticResponse } from '/imports/generator/api/apollo/client/helpers';

const templateOptions = TEMPLATES.map(({ name: title, id: value }) => ({
  title,
  value,
}));

@connect(
  null,
  dispatch =>
    bindActionCreators({ setExpandedItem, setSavingStatus }, dispatch)
)
@graphql(UPDATE_RESUME_DETAIL)
class GeneratorForm extends PureComponent {
  shouldComponentUpdate() {
    // Blocking the updates when the user is typing, in order to avoid typing lag
    return !window.isTyping;
  }

  componentWillUnmount() {
    this.props.setExpandedItem('');
  }

  updateTitle = value => {
    const { resume: { _id: docId }, mutate } = this.props;
    this.props.setSavingStatus('SAVING');
    mutate({
      variables: {
        docId,
        path: 'name',
        value,
      },
    });
  };

  renderTemplateControls = () => {
    const {
      resume: {
        _id,
        settings,
      },
    } = this.props;
    return (
      <FlexControls grid hiddenSM hiddenXS>
        <Box md={6} sm={6} xs={12} padded>
          <Label form>Template</Label>
          <DropdownAutosave
            mutation={UPDATE_RESUME_DETAIL}
            variables={{
              docId: _id,
              path: `settings.template`,
              needUpdate: true
            }}
            name="template"
            docType="resume"
            value={settings.template}
            options={templateOptions}
            stripe
          />
        </Box>
        <Box md={6} sm={6} xs={12} padded>
          <Label form>Accent color</Label>
          <ColorSelect
            selected={settings.color}
            resumeId={_id}
            template={settings.template}
          />
        </Box>
      </FlexControls>
    );
  };

  renderExposedForm = () => {
    const { resume: { _id, details, settings } } = this.props;
    return (
      <ValidatorForm onSubmit={() => {}}>
        <BlockTitle>Personal details</BlockTitle>
        <Flex grid>
          {EXPOSED_DETAILS_MAP.map((d, i) => {
            const FormComponent = d.component;
            const props = d.props || {};
            const path = `details.${d.name}`;
            return (
              <FormBox md={6} sm={6} xs={12} padded key={`exposed-${name}-${i}`}>
                {d.label && (
                  <Label form>
                    {d.label}
                    {d.tip && <TipIcon tip={d.tip}/>}
                  </Label>
                )}
                <FormComponent
                  type="text"
                  mutation={UPDATE_RESUME_DETAIL}
                  name={d.name}
                  docType="resume"
                  variables={{
                    docId: _id,
                    path,
                  }}
                  value={details[d.name]}
                  template={settings.template}
                  optimisticResponse={updateDetailsOptimisticResponse(_id, path)}
                  update={updateAfterDetailSave(_id)}
                  {...props}
                />
              </FormBox>
            );
          })}
        </Flex>
      </ValidatorForm>
    );
  };

  renderHiddenForm = () => {
    const { resume: { _id, details } } = this.props;
    return (
      <HiddenDetails>
        <Flex grid>
          {HIDDEN_DETAILS_MAP.map((d, i) => {
            const FormComponent = d.component;
            const props = d.props || {};
            const path = `details.${d.name}`;
            return (
              <FormBox key={`${_id}-exposed-${i}`} md={6} sm={6} xs={12} padded>
                {d.label && (
                  <Label form>
                    {d.label}
                    {d.tip && <TipIcon tip={d.tip}/>}
                  </Label>
                )}
                <FormComponent
                  type="text"
                  mutation={UPDATE_RESUME_DETAIL}
                  variables={{
                    docId: _id,
                    path,
                  }}
                  docType="resume"
                  value={details[d.name]}
                  optimisticResponse={updateDetailsOptimisticResponse(_id, path)}
                  update={updateAfterDetailSave(_id)}
                  {...props}
                />
              </FormBox>
            );
          })}
        </Flex>
      </HiddenDetails>
    );
  };

  renderProfessionalSummary = () => {
    const { resume: { _id, details } } = this.props;
    return (
      <ValidatorForm onSubmit={() => {}}>
        <BlockTitle>Professional summary</BlockTitle>
        <FormGroup>
          <Label>Include 2-3 clear sentences about your overall experience</Label>
          <TextareaEditorWithData
            mutation={UPDATE_RESUME_DETAIL}
            variables={{
              docId: _id,
              path: 'details.professionalSummary',
            }}
            docType="resume"
            name="professionalSummary"
            value={details.professionalSummary}
            optimisticResponse={updateDetailsOptimisticResponse(_id, 'details.professionalSummary')}
            update={updateAfterDetailSave(_id)}
            rows={5}
            placeholder="e.g. Passionate science teacher with 8+ years of experience and a track record of..."
            searchType="summary"
            suggestionBlockType="paragraph"
          />
        </FormGroup>
      </ValidatorForm>
    );
  };

  renderBlocks = () => {
    const { resume } = this.props;
    const fixedBlocks = sortBy(resume.blocks.filter(b => b.fixedOrder != null), 'fixedOrder');
    const sortableBlocks = sortBy(resume.blocks.filter(b => b.order != null), 'order');
    const orderedLength = resume.blocks.filter(b => b.order != null).length;
    return (
      <>
        {[...fixedBlocks, ...sortableBlocks].map(block => (
          <GenericBlock
            key={block.animationKey}
            block={block}
            resumeId={resume._id}
            orderedLength={orderedLength}
            resume={resume}
          />
        ))}
      </>
    );
  };

  renderAddBlocks = () => {
    const { resume } = this.props;
    return (
      <AddBlocksCont>
        <BlockTitle>Add blocks</BlockTitle>
        <AddBlocks resume={resume} />
      </AddBlocksCont>
    );
  };

  render() {
    const { resume, noPadding } = this.props;
    return (
      <ResponsiveConsumer>
        {({ breakpoint, isMobile }) => (
          <FormWrap noPadding={noPadding}>
            <Form noPadding={noPadding}>
              <TitleCont>
                <EditableTitle
                  onSave={this.updateTitle}
                  defaultValue={resume.name}
                />
              </TitleCont>
              <FormInfo resume={resume}/>
              {this.renderTemplateControls()}
              {this.renderExposedForm()}
              {this.renderHiddenForm()}
              {this.renderProfessionalSummary()}
              {this.renderBlocks()}
              {this.renderAddBlocks()}
            </Form>
            {breakpoint !== 'lg' && <PreviewButton resumeId={resume._id}/>}
          </FormWrap>
        )}
      </ResponsiveConsumer>
    );
  }
}

const TitleCont = styled.div`
  text-align: center;
  margin-top: 10px;
  margin-bottom: 15px;
  ${p => p.theme.max('sm')`
    margin-top: 0;
  `}
  ${p => p.theme.max('md')`
    margin-bottom: 10px;
  `}
`;

const FormWrap = styled.div`
  flex: 1;
  max-width: 860px;
  height: 100%;
  background-color: white;
  overflow: ${p => p.noPadding ? 'hidden' : 'auto'};
  margin: auto;
`;

const AddBlocksCont = styled.div`
  margin-top: 40px;
`;

const Form = styled.div`
  ${p => !p.noPadding && css`
    padding: 48px 48px;
    ${p => p.theme.max('sm')`
      padding: 20px;
    `};
  `}
`;

const FormBox = styled(Box)`
  margin-bottom: 18px;
`;

const EditableTitle = styled(EditableTitleAtom)`
  font-size: ${p => p.theme.font.size.h3};
`;

const FlexControls = styled(p => <Flex {...p} />)`
  margin-bottom: 40px;
`;

export default GeneratorForm;
