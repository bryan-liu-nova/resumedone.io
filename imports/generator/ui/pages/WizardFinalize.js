import React, { PureComponent } from 'react';

import GeneratorForm from '/imports/generator/ui/components/GeneratorForm';
import WizardLayout from '/imports/generator/ui/layouts/WizardLayout';
import { Analytics } from '/imports/core/api/analytics';
import last from 'lodash/last';
import { withLastLocation } from 'react-router-last-location';

@withLastLocation
class WizardFinalize extends PureComponent {
  componentDidMount() {
    localStorage.setItem('resumedone:finalize-seen', 'true');
    localStorage.setItem('resumedone:from-finalize', 'true');
    Analytics.track('finalize_view', {
      origin: this.props.lastLocation ? last(this.props.lastLocation.pathname.split('/')) : 'direct'
    });
  }

  render() {
    return (
      <WizardLayout resume={this.props.resume}>
        <GeneratorForm resume={this.props.resume} noPadding />
      </WizardLayout>
    );
  }
}

export default WizardFinalize;
