import { Meteor } from 'meteor/meteor';
import { AuthenticationError } from 'apollo-server-express';

import { Resumes } from '/imports/core/api/models/resumes/collection';

export const queryText = `
  listResumes: [Resume]
  userInfo: User
`;

export const queries = {
  async listResumes(root, args, { user }) {
    if (!user) {
      throw new AuthenticationError('need-authentication');
    }
    return await Resumes.find({ author: user._id }, { sort: { updatedAt: -1 } }).fetch();
  },

  async userInfo(root, args, { user }) {
    if (!user) {
      throw new AuthenticationError('need-authentication');
    }
    const { personalData, emails, createdAt } = await Meteor.users.findOne({ _id: user._id });
    return {
      _id: user._id,
      createdAt,
      personalData,
      email: emails[0].address,
    };
  },
};
