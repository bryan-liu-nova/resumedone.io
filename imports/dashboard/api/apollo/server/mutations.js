import { Meteor } from 'meteor/meteor';
import { AuthenticationError } from 'apollo-server-express';

import { Resumes } from '/imports/core/api/models/resumes/collection';
import { getBasicResume } from '/imports/core/api/models/resumes/utils';

export const mutationText = `
  createResume(template: String): Resume
  duplicateResume(resumeId: ID!): Resume
  removeResume(resumeId: ID!): Resume
  setUserInfo(firstName: String!, lastName: String, email: String!): Boolean
  deleteAccount: User
`;

export const mutations = {
  async createResume(root, { template }, { user }) {
    if (!user) {
      throw new AuthenticationError('need-authentication');
    }
    const resume = getBasicResume(user, template);
    try {
      await Resumes.insert(resume);
      return resume;
    } catch(e) {
      console.log(e);
      return null;
    }
  },

  async duplicateResume(root, { resumeId: _id }, { user }) {
    if (!user) {
      throw new AuthenticationError('need-authentication');
    }
    const resume = await Resumes.findOne({ _id });
    if (resume.author !== user._id) {
      throw new AuthenticationError('access-denied');
    }
    resume._id = Random.id();
    resume.blocks = resume.blocks.map(b => ({
      ...b,
      _id: Random.id(),
      items: b.items ? b.items.map(i => ({ ...i, _id: Random.id() })) : [],
    }));
    await Resumes.insert(resume);
    return resume;
  },

  async removeResume(root, { resumeId: _id }, { user }) {
    if (!user) {
      throw new AuthenticationError('need-authentication');
    }
    const resume = await Resumes.findOne({ _id });
    if (resume.author !== user._id) {
      throw new AuthenticationError('access-denied');
    }
    const removedResume = await Resumes.remove({ _id });
    return resume;
  },

  async setUserInfo(root, { firstName, lastName, email }, { user }) {
    if (!user) {
      throw new AuthenticationError('need-authentication');
    }
    try {
      await Meteor.users.update({ _id: user._id }, {
        $set: {
          'personalData.firstName': firstName,
          'personalData.lastName': lastName,
          'emails.0.address': email,
        },
      });
    } catch (e) {
      console.log(e);
    }
    return true;
  },

  async deleteAccount(root, {}, { user }) {
    if (!user) {
      throw new AuthenticationError('need-authentication');
    }
    await Meteor.users.remove({ _id: user._id });
    return null;
  },
};
