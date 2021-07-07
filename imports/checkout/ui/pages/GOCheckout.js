import React, { PureComponent } from 'react';
import { Switch } from 'react-router-dom';
import Experiment from 'react-ab-test/lib/Experiment';
import Variant from 'react-ab-test/lib/Variant';
import emitter from 'react-ab-test/lib/emitter';

import GenericRoute from '/imports/core/ui/components/GenericRoute';
import CheckoutOne from './CheckoutOne';
import PaymentOne from './PaymentOne';
import CheckoutTwo from './CheckoutTwo';
import PaymentTwo from './PaymentTwo';
import CheckoutThree from './CheckoutThree';
import PaymentThree from './PaymentThree';

import { withLastLocation } from 'react-router-last-location';
import { Analytics } from '/imports/core/api/analytics';
import last from 'lodash/last';

const routesOne = [
  {
    component: CheckoutOne,
    path: '/checkout',
    exact: true
  },
  {
    component: PaymentOne,
    path: '/checkout/payment',
    exact: true
  }
];
const routesTwo = [
  {
    component: CheckoutTwo,
    path: '/checkout',
    exact: true
  },
  {
    component: PaymentTwo,
    path: '/checkout/payment',
    exact: true
  }
];
const routesThree = [
  {
    component: CheckoutThree,
    path: '/checkout',
    exact: true
  },
  {
    component: PaymentThree,
    path: '/checkout/payment',
    exact: true
  }
];

@withLastLocation
class Checkout extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      plan: null
    };

    this.variantComputing('checkout_experiment');
  }

  selectPlan = plan => {
    this.setState({ plan });
  };

  componentDidMount() {
    localStorage.setItem('resumedone:checkout-seen', 'true');
    Analytics.track('subscription_view', {
      origin: this.props.lastLocation
        ? last(this.props.lastLocation.pathname.split('/'))
        : 'direct',
      variant: emitter.getActiveVariant('checkout_experiment')
    });
  }

  variantComputing = experiment => {
    const local_storage_exp = localStorage.getItem(`PUSHTELL-${experiment}`);
    const parsed_exp = parseInt(local_storage_exp);
    if (local_storage_exp !== null) {
      if (!(parsed_exp >= 0) || parsed_exp == 0) {
        localStorage.removeItem(`PUSHTELL-${experiment}`);
      }
    }
  };

  render() {
    return (
      <Experiment name="checkout_experiment">
        <Variant name="1">
          <Switch>
            {routesTwo.map(routeData => (
              <GenericRoute
                key={routeData.path}
                {...routeData}
                plan={this.state.plan}
                selectPlan={this.selectPlan}
              />
            ))}
          </Switch>
        </Variant>
        <Variant name="2">
          <Switch>
            {routesThree.map(routeData => (
              <GenericRoute
                key={routeData.path}
                {...routeData}
                plan={this.state.plan}
                selectPlan={this.selectPlan}
              />
            ))}
          </Switch>
        </Variant>
      </Experiment>
    );
  }
}

export default Checkout;
