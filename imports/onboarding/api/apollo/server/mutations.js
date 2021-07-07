import { Meteor } from 'meteor/meteor';
import { AuthenticationError } from 'apollo-server-express';

export const mutationText = `
  setEmailAndName(firstName: String, lastName: String, email: String!, phone: String): OnboardResponse
  goBackToName: OnboardResponse
`;

export const mutations = {

  async setEmailAndName(root, { firstName, lastName, email, phone }, { user }) {
    if (!user) {
      throw new AuthenticationError('need-authentication');
    }
    const currentUser = await Meteor.users.findOne({ _id: user._id });
    const emailExists = !!Meteor.users.findOne({ 'emails.address': email });
    const $set = {
      'personalData.phone': phone,
      'personalData.firstName': firstName,
      'personalData.lastName': lastName,
    };
    if(!emailExists) {
      $set['personalData.email'] = email;
    }
    const { emails } = currentUser;
    if (emails) {
      emails[0].address = email;
      $set.emails = emails;
    }
    await Meteor.users.update(
      { _id: user._id },
      {
        $set,
        $unset: {
          'serviceData.onboard': '',
        },
      },
    );
    return {
      success: true,
      next: 'contact',
      user: await Meteor.users.findOne({ _id: user._id }),
      finished: true,
    };
  },

  async goBackToName(root, {}, { user }) {
    if (!user) {
      throw new AuthenticationError('need-authentication');
    }
    await Meteor.users.update(
      { _id: user._id },
      {
        $set: { 'serviceData.onboard': 'name' },
      },
    );
    return {
      success: true,
      next: 'name',
      user: await Meteor.users.findOne({ _id: user._id }),
    };
  },

};
