import React, { PureComponent } from 'react';

import Autosave from '/imports/core/ui/components/Autosave';
import AutocompleteInput from './AutocompleteInput';

class InputAutosave extends PureComponent {
  render() {
    const { className, type, placeholder, name, value, options } = this.props;
    return (
      <Autosave {...this.props}>
        {({ onChange }) => (
          <AutocompleteInput
            {...this.props}
            className={className}
            type={type}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            value={value || ''}
            options={options}
          />
        )}
      </Autosave>
    );
  }
}

export default InputAutosave;