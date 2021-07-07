import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { AuthenticationError } from 'apollo-server-express';
import { Accounts } from 'meteor/accounts-base';

import { analyticsServer } from '/imports/core/api/analytics_server';

export const mutationText = `
  setFirstName(firstName: String!): OnboardResponse
`;

export const mutations = {
  async setFirstName(root, { firstName }, { user }) {
    if (!user) {
      throw new AuthenticationError('need-authentication');
    }
    await Meteor.users.update({ _id: user._id }, { $set: { 'personalData.firstName': firstName } });
    analyticsServer.identify({
      userId: user._id,
      traits: {
        firstName
      }
    });
    return {
      success: true,
      next: 'contacts'
    };
  },
};
