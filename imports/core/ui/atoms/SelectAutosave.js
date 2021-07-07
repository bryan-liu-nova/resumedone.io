import React, { PureComponent } from 'react';

import Autosave from '/imports/core/ui/components/Autosave';
import Select from './Select';

class SelectAutosave extends PureComponent {
  render() {
    const { className, options, dark } = this.props;
    return (
      <Autosave {...this.props}>
        {({ onChange, value }) => (
          <Select
              className={className}
              onChange={onChange}
              options={options}
              dark={dark}
              value={value || ''}
          />
        )}
      </Autosave>
    );
  }
}

export default SelectAutosave;
