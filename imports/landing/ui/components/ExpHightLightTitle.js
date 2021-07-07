import React, { PureComponent } from 'react';
import Experiment from 'react-ab-test/lib/Experiment'
import Variant from 'react-ab-test/lib/Variant'

import HightLightTitle from '/imports/landing/ui/components/HightLightTitle';
import '../../../../public/css/all.min.css';

export default ({ children }) => (
  <Experiment name="landing_view_experiment">
    <Variant name="1">
      <HightLightTitle variant={1}>{children}</HightLightTitle>
    </Variant>
  </Experiment>
);
