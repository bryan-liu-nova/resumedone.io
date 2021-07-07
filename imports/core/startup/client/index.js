import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import AppRoot from '/imports/core/ui/layouts/AppRoot';

import '/imports/pdf/core/startup/client';

Meteor.startup(() => {
  render(
    <AppRoot />,
    document.getElementById('root'),
  );
});
