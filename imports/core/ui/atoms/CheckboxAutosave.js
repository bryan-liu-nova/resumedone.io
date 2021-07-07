import React, { PureComponent } from 'react';

import Checkbox from './Checkbox';
import Autosave from '/imports/core/ui/components/Autosave';

class CheckboxAutosave extends PureComponent {
  render() {
    const checked = this.props.checked || false;
    return (
      <Autosave {...this.props}>
        {({ onChange }) => (
          <Checkbox
            {...this.props}
            onChange={() => onChange({ target: { value: !checked }})}
            checked={checked}
          />
        )}
      </Autosave>
    );
  }
}

export default CheckboxAutosave;
