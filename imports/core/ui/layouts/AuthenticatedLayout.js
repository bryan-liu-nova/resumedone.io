import React, { PureComponent } from 'react';

class AuthenticatedLayout extends PureComponent {
  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}

export default AuthenticatedLayout;
