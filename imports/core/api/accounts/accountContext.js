import React from 'react';

const AccountContext = React.createContext();

export const AccountProvider = AccountContext.Provider;
export const AccountConsumer = AccountContext.Consumer;

export const withAccount = Component => (
  class Wrapper extends React.Component {
    render() {
      return (
        <AccountConsumer>
          {userData => (<Component {...this.props} {...userData} />)}
        </AccountConsumer>
      );
    }
  }
);
