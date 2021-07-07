import React, { PureComponent } from 'react';

import YearPicker from './YearPicker';
import Autosave from '/imports/core/ui/components/Autosave';

class YearPickerAutosave extends PureComponent {
  render() {
    const { name, placeholder, value, disabled } = this.props;
    return (
      <Autosave {...this.props}>
        {({ onChange }) => (
          <YearPicker
            onChange={onChange}
            placeholder={placeholder}
            name={name}
            defaultValue={value || ''}
            {...this.props}
          />
        )}
      </Autosave>
    );
  }
}

export default YearPickerAutosave;