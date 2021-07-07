import { AuthenticationError } from 'apollo-server-express';
import { Meteor } from 'meteor/meteor';
import Stripe from 'stripe';
import {
  CURRENCY,
  ONE_MONTH,
  PLAN_AMOUNT,
  THREE_MONTH,
  TWO_MONTH
} from '/imports/checkout/api/constants';
import { analyticsServer } from '/imports/core/api/analytics_server';

const stripe = Stripe(Meteor.settings.private.stripe.sk);

// Converts plan name into Stripe plan ID.
function _resolveStripePlanId(plan) {
  switch (plan) {
    case TWO_MONTH:
      return Meteor.settings.private.stripe.yearlyReducedPlanId;
    case ONE_MONTH:
    case THREE_MONTH:
      return Meteor.settings.private.stripe.yearlyPlanId;
    default:
      return Meteor.settings.private.stripe.monthlyPlanId;
  }
}

export const mutationText = `
  createSubscription(token: String, email: String, plan: String): CreateSubscriptionResponse
`;

export const mutations = {
  async createSubscription(root, { token, email, plan }, { user }) {
    if (!user) {
      throw new AuthenticationError('need-authentication');
    }
    if (!plan || !PLAN_AMOUNT[plan]) {
      throw new AuthenticationError('bad-plan');
    }
    try {
      // Create a customer.
      const customer = await stripe.customers.create({
        email,
        source: token
      });
      // Immediately charge customer for the introductory price.
      await stripe.charges.create({
        amount: PLAN_AMOUNT[plan],
        currency: CURRENCY,
        description: 'Initial charge for the introductory period',
        customer: customer.id
      });
      // Subscribe customer to the recurring plan.
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ plan: _resolveStripePlanId(plan) }],
        // Create a trial period using the plan's default trial period.
        trial_from_plan: true
      });
      await Meteor.users.update(
        { _id: user._id },
        { $set: { 'serviceData.subscriptionId': subscription.id } }
      );
      analyticsServer.identify({
        userId: user._id,
        traits: {
          is_subscribed: true,
          plan
        }
      });
      return {
        success: true
      };
    } catch (error) {
      return {
        success: false,
        error
      };
    }
  }
};
