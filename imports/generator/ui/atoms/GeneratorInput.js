import React, { PureComponent } from 'react';
import Experiment from 'react-ab-test/lib/Experiment'
import Variant from 'react-ab-test/lib/Variant'

import Autosave from '/imports/core/ui/components/Autosave';
import { GeneratorValidatedInput, GeneratorValidatedInputExp } from '/imports/core/ui/atoms';

class GeneratorInputWrap extends PureComponent {
  state = {
    value: this.props.value || '',
  };

  componentDidMount() {
    this._input.validate(this.state.value, true, true);
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.value !== this.state.value) {
      setTimeout(() => {
        if(this._input.isValid()) {
          if(this.props.validators.includes('isEmail') &&
            this.state.value !== '' &&
            this.state.value.length < 5) return false;
          this.props.onSave({ target: { value: this.state.value }});
        }
      }, 100);
    }
  }

  onChange = e => {
    this.setState({ value: e.target.value });
  };

  handleBlur = () => {
    this._input.validate(this.state.value, true, false);
  };

  getInput = (node) => {
    this._input = node;
  };

  render() {
    return <GeneratorValidatedInput
        {...this.props}
        value={this.state.value}
        onChange={this.onChange}
        onBlur={this.handleBlur}
        defaultValue={this.props.value || ''}
        ref={this.getInput}
      />;
  }
}

class GeneratorInputAutosave extends PureComponent {
  render() {
    return (
      <Autosave {...this.props}>
        {({ onChange }) => (
          <GeneratorInputWrap
            {...this.props}
            onSave={onChange}
          />
        )}
      </Autosave>
    );
  }
}


export default GeneratorInputAutosave;
