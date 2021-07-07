import { Meteor } from 'meteor/meteor';

export const queryText = `
  currentUser: User
`;

export const queries = {
  async currentUser(root, args, { user }) {
    if (user) {
      return await Meteor.users.findOne({ _id: user._id });
    }
    return null;
  }
};
