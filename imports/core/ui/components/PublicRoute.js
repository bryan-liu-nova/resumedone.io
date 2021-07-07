import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AccountConsumer } from '/imports/core/api/accounts/accountContext';
import ErrorBoundary from '/imports/core/ui/components/ErrorBoundary';

const PublicRoute = ({ component: Component, layout: Layout, redirectLogged, ...rest }) => (
  <AccountConsumer>
    {({ currentUser, userLoading }) => {
      // if (!userLoading && currentUser && redirectLogged) {
      //   return <Redirect to="/resumes" />;
      // }
      return (
        <ErrorBoundary>
          <Route
              {...rest}
              render={props => {
                return Layout ? (
                  <Layout>
                    <Component {...props} />
                  </Layout>
                ) : (
                  <Component {...props} />
                );
              }}
          />
        </ErrorBoundary>
      );
    }}
  </AccountConsumer>
);

export default PublicRoute;
