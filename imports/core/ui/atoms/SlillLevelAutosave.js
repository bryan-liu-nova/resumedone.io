import React, { PureComponent } from 'react';

import Autosave from '/imports/core/ui/components/Autosave';
import SkillLevel from './SkillLevel';

class SlillLevelAutosave extends PureComponent {
  render() {
    const { className, value } = this.props;
    return (
      <Autosave {...this.props}>
        {({ onChange }) => (
          <SkillLevel
              className={className}
              onChange={onChange}
              value={value || ''}
          />
        )}
      </Autosave>
    );
  }
}

export default SlillLevelAutosave;
