import { Meteor } from 'meteor/meteor';
import { AuthenticationError } from 'apollo-server-express';

import { Resumes } from '/imports/core/api/models/resumes/collection';
import { Jobs } from '/imports/core/api/models/jobs/collection';
import { Suggestions } from '/imports/core/api/models/suggestions/collection';
import { Schools } from '/imports/core/api/models/schools/collection';

export const queryText = `
  getResume(resumeId: ID!): Resume
  getJobs(search: String!): [Job]
  getSuggestions(job: String!, type: String!): [Suggestion]
  getSchools(search: String!): [School]
`;

export const queries = {
  async getResume(root, { resumeId: _id }, { user }) {
    if (!user) {
      throw new AuthenticationError('need-authentication');
    }
    if (_id) {
      return await Resumes.findOne({ _id, author: user._id });
    }
    return null;
  },
  async getJobs(root, { search }, { user }) {
    if (!user) {
      throw new AuthenticationError('need-authentication');
    }
    const jobs = await Jobs.find({ title: { $regex: search || '', $options: '-i' } }, { limit: 50 }).fetch();
    return jobs || [];
  },
  async getSuggestions(root, { job, type }, { user }) {
    if (!user) {
      throw new AuthenticationError('need-authentication');
    }
    let suggestions = [];
    if(!job || job === '') {
      suggestions = await Suggestions.find({ type }, { limit: 100 }).fetch();
    } else {
      suggestions = await Suggestions.find({ job, type }).fetch();
    }
    return suggestions;
  },
  async getSchools(root, { search }, { user }) {
    if (!user) {
      throw new AuthenticationError('need-authentication');
    }
    const schools = await Schools.find({ name: { $regex: search || '', $options: '-i' } }, { limit: 100 }).fetch();
    return schools || [];
  },
};
