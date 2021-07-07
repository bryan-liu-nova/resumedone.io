import React, { PureComponent } from 'react';
import { Mutation } from 'react-apollo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import debounce from 'lodash/debounce';
import last from 'lodash/last';

import { setSavingStatus } from '/imports/pdf/core/api/redux/actions';
import { generateDebounceKey } from '/imports/core/ui/helpers';

const SAVE_TYPES = ['current', 'title'];

class MutationWrap extends PureComponent {
  onCompleted = data => {
    const { onCompleted, name, docType } = this.props;
    if (name === 'template') {
      const template = data.updateResumeDetail.settings.template;
      window.analytics.track('template_selected', {
        template,
        context: last(window.location.pathname.split('/'))
      });
    } else {
      window.analytics.track(`update_${name}`, {
        target: (docType || '').toLowerCase(),
        context: last(window.location.pathname.split('/')),
      });
    }
    if (onCompleted) {
      onCompleted(data);
    }
  };

  render() {
    return (
      <Mutation
          mutation={this.props.mutation}
          update={this.props.update}
          onError={this.props.onError}
          onCompleted={this.props.onCompleted}
      >
        {mutate => <Autosave mutate={mutate} {...this.props} />}
      </Mutation>
    );
  }
}

@connect(
  null,
  dispatch =>
    bindActionCreators({ setSavingStatus }, dispatch)
)
class Autosave extends PureComponent {
  blockTimeout = false;

  onChange = (e) => {
    const { onChange, setSavingStatus } = this.props;
    const { field, needUpdate } = this.props.variables;
    setSavingStatus('SAVING');
    if (onChange) onChange(e);
    this.save(e.target.value);
    // if(!(e.target.value instanceof Date) && !SAVE_TYPES.includes(field)) {
    if(!needUpdate) {
       window.isTyping = true;
    }
    clearTimeout(this.blockTimeout);
    this.blockTimeout = setTimeout(() => {
      window.isTyping = false;
    }, 1500);
  };

  save = debounce(value => {
    const {
      mutate,
      variables,
      optimisticResponse,
      update
    } = this.props;
    const options = {
      variables: {
        ...variables,
        value
      },
      context: {
        debounceKey: generateDebounceKey(variables)
      }
    };
    if (optimisticResponse) options.optimisticResponse = optimisticResponse(value);
    if (update) options.update = update;
    mutate(options);
  }, 30);

  render() {
    return this.props.children({ onChange: this.onChange });
  }
}

export default MutationWrap;
