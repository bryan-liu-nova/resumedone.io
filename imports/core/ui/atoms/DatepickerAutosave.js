import React, { PureComponent } from 'react';

import Datepicker from './Datepicker';
import Autosave from '/imports/core/ui/components/Autosave';

class DatepickerAutosave extends PureComponent {
  render() {
    const { className, name, placeholder, value, disabled } = this.props;
    return (
      <Autosave {...this.props}>
        {({ onChange }) => (
          <Datepicker
              className={className}
              onChange={onChange}
              placeholder={placeholder}
              name={name}
              defaultValue={value || ''}
              disabled={disabled}
              {...this.props}
          />
        )}
      </Autosave>
    );
  }
}

export default DatepickerAutosave;
