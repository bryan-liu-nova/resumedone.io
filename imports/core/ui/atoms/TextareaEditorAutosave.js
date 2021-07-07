import React, { PureComponent } from 'react';

import TextareaEditor from './TextareaEditor';
import Autosave from '/imports/core/ui/components/Autosave';

class TextareaEditorAutosave extends PureComponent {
  render() {
    const { className, placeholder, name, rows, cols, value, help } = this.props;
    return (
      <Autosave {...this.props}>
        {({ onChange }) => (
          <TextareaEditor
              {...this.props}
              className={className}
              onChange={onChange}
              rows={rows}
              cols={cols}
              name={name}
              placeholder={placeholder || ''}
              defaultValue={value || ''}
              help={help}
          />
        )}
      </Autosave>
    );
  }
}

export default TextareaEditorAutosave;
