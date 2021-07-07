import React, { PureComponent } from 'react';

import Autosave from '/imports/core/ui/components/Autosave';
import ControlledInput from './ControlledInput';

class ControlledInputAutosave extends PureComponent {
  render() {
    const { className, type, placeholder, name, value } = this.props;
    return (
      <Autosave {...this.props}>
        {({ onChange }) => (
          <ControlledInput
            className={className}
            type={type}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            value={value || ''}
          />
        )}
      </Autosave>
    );
  }
}

export default ControlledInputAutosave;
