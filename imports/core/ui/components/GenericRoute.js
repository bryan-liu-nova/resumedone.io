import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import AuthenticatedRoute from './AuthenticatedRoute';
import PublicRoute from './PublicRoute';

class GenericRoute extends PureComponent {
  render() {
    const { isPublic, ...rest } = this.props;
    const RouteComponent = isPublic ? PublicRoute : AuthenticatedRoute;
    return (
      <RouteComponent {...rest} />
    );
  }
}

export default GenericRoute;
