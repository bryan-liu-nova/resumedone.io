import React, { PureComponent } from 'react';

import Autosave from '/imports/core/ui/components/Autosave';
import Textarea from './Textarea';

class TextareaAutosave extends PureComponent {
  render() {
    const { className, type, placeholder, name, value } = this.props;
    return (
      <Autosave {...this.props}>
        {({ onChange }) => (
          <Textarea
            className={className}
            type={type}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            defaultValue={value || ''}
          />
        )}
      </Autosave>
    );
  }
}

export default TextareaAutosave;
