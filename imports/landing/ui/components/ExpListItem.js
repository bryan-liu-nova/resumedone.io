import React, { PureComponent } from 'react';
import Experiment from 'react-ab-test/lib/Experiment'
import Variant from 'react-ab-test/lib/Variant'

import ListItem from '/imports/landing/ui/components/ListItem';
import '../../../../public/css/all.min.css';

export default ({ children }) => (
  <Experiment name="landing_view_experiment">
    <Variant name="1">
      <ListItem variant={1}>{children}</ListItem>
    </Variant>
  </Experiment>
);
