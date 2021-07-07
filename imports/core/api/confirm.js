import React from 'react';

import { Confirm } from '/imports/core/ui/atoms';

export const withConfirm = Component => (
  class Wrapper extends React.Component {
    state = {
      confirm: null
    };

    confirm = confirm => this.setState({ confirm });

    onCancel = () => {
      this.setState({ confirm: null });
      if (this.state.confirm.onCancel) this.state.confirm.onCancel();
    };

    render() {
      const { confirm } = this.state;
      return (
        <>
          <Component {...this.props} confirm={this.confirm} />
          {confirm && <Confirm {...confirm} onCancel={this.onCancel} />}
        </>
      );
    }
  }
);
