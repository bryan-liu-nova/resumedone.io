import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Autosave from '/imports/core/ui/components/Autosave';
import Dropdown from './Dropdown';

class DropdownAutosave extends PureComponent {
  static propTypes = {
    options: PropTypes.array,
    dark: PropTypes.bool,
    stripe: PropTypes.bool,
  };

  render() {
    const { options, dark, stripe, value, preview, placeholder } = this.props;
    return (
      <Autosave {...this.props}>
        {({ onChange }) => (
          <Dropdown
              onChange={onChange}
              options={options}
              defaultSelected={value || ''}
              dark={dark}
              preview={preview}
              stripe={stripe}
              placeholder={placeholder}
          />
        )}
      </Autosave>
    );
  }
}

export default DropdownAutosave;
