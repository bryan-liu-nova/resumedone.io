import React, { PureComponent } from 'react';

import Autosave from '/imports/core/ui/components/Autosave';
import Switch from './Switch';

class SwitchAutosave extends PureComponent {
  render() {
    const { className, name, label, value } = this.props;
    return (
      <Autosave {...this.props}>
        {({ onChange }) => (
          <Switch
              className={className}
              name={name}
              onChange={onChange}
              checked={value}
              label={label}
          />
        )}
      </Autosave>
    );
  }
}

export default SwitchAutosave;
