import React, { PureComponent } from 'react';
import { Meteor } from 'meteor/meteor';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/browser';
import { Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider, Query } from 'react-apollo';
import { ThemeProvider } from 'styled-components';
import { StripeProvider } from 'react-stripe-elements';
import Scriptly from 'scriptly';
// import { hotjar } from 'react-hotjar';
import { store } from '/imports/core/api/redux/store';
import { LastLocationProvider } from 'react-router-last-location';

import theme from '/imports/core/ui/theme';
import history from '/imports/core/api/history';
import client from '/imports/core/api/apollo/client/init';
import { ResponsiveProvider } from '/imports/core/api/responsiveContext';
import { getCurrentBreakpoint } from '/imports/core/ui/helpers';
import { AccountProvider } from '/imports/core/api/accounts/accountContext';
import GenericRoute from '/imports/core/ui/components/GenericRoute';
import GlobalStyles from '../globalStyles';
import { CURRENT_USER } from '/imports/core/api/apollo/client/queries';

// Import routes
import coreRoutes from '/imports/core/api/routes';
import landingRoutes from '/imports/landing/api/routes';
import generatorRoutes from '/imports/generator/api/routes';
import dashboardRoutes from '/imports/dashboard/api/routes';
import onboardingRoutes from '/imports/onboarding/api/routes';
import checkoutRoutes from '/imports/checkout/api/routes';
import documentsRoutes from '/imports/documents/api/routes';
import NotFound from '/imports/core/ui/pages/NotFound';
import ErrorOccured from '/imports/core/ui/components/ErrorOccured';

const combinedRoutes = [
  ...coreRoutes,
  ...landingRoutes,
  ...generatorRoutes,
  ...dashboardRoutes,
  ...onboardingRoutes,
  ...checkoutRoutes,
  ...documentsRoutes
];

// hotjar.initialize(Meteor.settings.public.hotjar.id, Meteor.settings.public.hotjar.version);
Sentry.init({ dsn: 'https://496a50a70ec84fa99aebf1b2fc306913@sentry.io/1484511' });

class AppRoot extends PureComponent {
  state = {
    stripe: null,
    currentBreakpoint: getCurrentBreakpoint()
  };

  componentDidMount() {
    if (window.Stripe) {
      this.setState({ stripe: window.Stripe(Meteor.settings.public.stripe.pk) });
    } else {
      Scriptly.loadJavascript('https://js.stripe.com/v3/')
        .then(() => {
          const stripe = window.Stripe(Meteor.settings.public.stripe.pk);
          this.setState({ stripe });
        }, () => {
          // throw new Error('Failed to load Stripe library')
          console.log('Failed to load Stripe library');
        });
    }
    window.addEventListener('resize', () => {
      this.setState({ currentBreakpoint: getCurrentBreakpoint() });
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize');
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <Router history={history}>
          <LastLocationProvider>
            <ThemeProvider theme={theme}>
              <Provider store={store}>
                <StripeProvider stripe={this.state.stripe}>
                  <Query query={CURRENT_USER}>
                    {({ data, loading, error }) => {
                      if (data.currentUser && !window.userIdentified) {
                        window.analytics.identify(data.currentUser._id);
                        window.userIdentified = true;
                      }
                      if (error) return <ErrorOccured error={error} />;
                      return (
                        <AccountProvider
                          value={{
                            currentUser: data.currentUser,
                            userLoading: loading
                          }}
                        >
                          <ResponsiveProvider
                            value={{
                              breakpoint: this.state.currentBreakpoint,
                              isMobile: ['sm', 'xs'].includes(this.state.currentBreakpoint)
                            }}
                          >
                            <Switch>
                              {combinedRoutes.map(routeData => <GenericRoute key={routeData.path} {...routeData} />)}
                              <Route component={NotFound} />
                            </Switch>
                            <GlobalStyles />
                          </ResponsiveProvider>
                        </AccountProvider>
                      )
                    }}
                  </Query>
                </StripeProvider>
              </Provider>
            </ThemeProvider>
          </LastLocationProvider>
        </Router>
      </ApolloProvider>
    );
  }
}

export default AppRoot;
