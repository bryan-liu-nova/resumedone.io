import React, { PureComponent } from 'react';
import Experiment from 'react-ab-test/lib/Experiment'
import Variant from 'react-ab-test/lib/Variant'

import LandingCTA from '/imports/landing/ui/components/LandingCTA';
import '../../../../public/css/all.min.css';

// eslint-disable-next-line react/prop-types
export default ({ onClick }) => (
  <Experiment name="landing_view_experiment">
    <Variant name="1">
      <LandingCTA onClick={onClick} variant={1} />
    </Variant>
  </Experiment>
);
