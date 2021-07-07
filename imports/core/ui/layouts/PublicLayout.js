import React, { PureComponent } from 'react';

class PublicLayout extends PureComponent {
  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}

export default PublicLayout;
