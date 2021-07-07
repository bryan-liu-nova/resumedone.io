import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';

export const Suggestions = new Mongo.Collection('suggestions');

const suggestionsSchema = new SimpleSchema({
  text: String,
  type: {
    type: String,
    allowedValues: ['skill', 'experience', 'education', 'summary'],
  },
  job: String,
});

if (Meteor.isServer) {
  Suggestions._ensureIndex({
    type: 1
  });
  Suggestions._ensureIndex({
    type: 1,
    job: 1
  });
}

Suggestions.attachSchema(suggestionsSchema);
