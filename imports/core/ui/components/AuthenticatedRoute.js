import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Loading from '/imports/core/ui/components/Loading';
import ErrorBoundary from '/imports/core/ui/components/ErrorBoundary';
import { AccountConsumer } from '/imports/core/api/accounts/accountContext';

const AuthenticatedRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <AccountConsumer>
    {({ currentUser, userLoading }) => (
      <ErrorBoundary>
        <Route
            {...rest}
            render={props => {
              if (userLoading) {
                return <Loading />;
              }
              if (!userLoading && !currentUser) {
                return <Redirect to="/sign-in" />;
              }
              if (currentUser) {
                return Layout ? (
                  <Layout>
                    <Component currentUser={currentUser} {...rest} {...props} />
                  </Layout>
                ) : (
                  <Component currentUser={currentUser} {...rest} {...props} />
                );
              }
              return <Loading />;
            }}
        />
      </ErrorBoundary>
    )}
  </AccountConsumer>
);

export default AuthenticatedRoute;
