import React, { PureComponent } from 'react';
import Experiment from 'react-ab-test/lib/Experiment'
import Variant from 'react-ab-test/lib/Variant'

import Autosave from '/imports/core/ui/components/Autosave';
import InputGoogleAutocomplete from './InputGoogleAutocomplete';
import InputGoogleAutocompleteExperiment from './InputGoogleAutocompleteExperiment';

class InputGoogleAutocompleteAutosave extends PureComponent {
  state = {
    forcedValue: ''
  };

  componentDidMount() {
    if (this.props.isCity && !this.props.value) {
      fetch('http://ip-api.com/json/').then(res => {
        res.json().then(json => {
          this.setState({ forcedValue: json.city });
        });
      });
    }
  }

  render() {
    const { className, type, placeholder, name, value, types, variables, isSchool, label } = this.props;
    console.log(this.props);
    return (
      <Autosave {...this.props}>
        {({ onChange }) =>
          <InputGoogleAutocomplete
            className={className}
            type={type}
            name={name}
            label={label}
            onChange={onChange}
            placeholder={placeholder}
            forcedValue={this.state.forcedValue}
            types={types}
            variables={variables}
            defaultValue={value || ''}
            isSchool={isSchool}
          />
        }
      </Autosave>
    );
  }
}

export default InputGoogleAutocompleteAutosave;
