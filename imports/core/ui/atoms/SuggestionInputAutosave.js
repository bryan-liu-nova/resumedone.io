import React, { PureComponent } from 'react';

import Autosave from '/imports/core/ui/components/Autosave';
import SuggestionInput from './SuggestionInput';

class InputAutosave extends PureComponent {
  render() {
    const { className, type, placeholder, name, value, options, areas, selectedOptions } = this.props;
    return (
      <Autosave {...this.props}>
        {({ onChange }) => (
          <SuggestionInput
            {...this.props}
            className={className}
            type={type}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            defaultValue={value || ''}
            options={options}
            selectedOptions={selectedOptions}
            areas={areas}
          />
        )}
      </Autosave>
    );
  }
}

export default InputAutosave;