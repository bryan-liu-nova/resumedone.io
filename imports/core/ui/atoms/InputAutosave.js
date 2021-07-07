import React, { PureComponent } from 'react';
import Experiment from 'react-ab-test/lib/Experiment'
import Variant from 'react-ab-test/lib/Variant'

import Autosave from '/imports/core/ui/components/Autosave';
import Input from './Input';
import InputExperiment from './InputExperiment';

class InputAutosave extends PureComponent {
  componentDidMount() {
    if ((this.props.isCity || this.props.isState) && !this.props.value) {
      fetch('https://freegeoip.app/json/').then(res => {
        res.json().then(json => {
          if(this._input) {
            let value = '';
            if(this.props.isCity) value = json.city || '';
            if(this.props.isState) value = json.region_name || '';
            this._input.onChange({ target: { value }});
          }
          // document.querySelector('[name="city"]').value = json.city;
        });
      }).catch(e => {
        console.log('Geo IP error', e);
      });
    }
  }

  _input = null;

  getInput = (node) => {
    this._input = node;
  };

  render() {
    const { className, type, placeholder, name, value, label } = this.props;
    return (
      <Autosave {...this.props}>
        {({ onChange }) =>
          <Input
            className={className}
            type={type}
            name={name}
            label={label}
            onChange={onChange}
            placeholder={placeholder}
            defaultValue={value || ''}
            ref={this.getInput}
          />}
      </Autosave>
    );
  }
}

export default InputAutosave;
