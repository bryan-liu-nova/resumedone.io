import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Autosave from '/imports/core/ui/components/Autosave';
import Dropdown from './Dropdown';

const years = (() => {
  const currentYear = new Date().getFullYear();
  let result = [];
  for(let i = currentYear; i >= 1950; i--) {
    result.push({ value: i, title: i });
  }
  return result;
})();

class SimpleYearPickerAutosave extends PureComponent {
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
            options={years}
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

export default SimpleYearPickerAutosave;
