import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Jobs = new Mongo.Collection('jobs');

const jobSchema = new SimpleSchema({
  title: String,
});

Jobs.attachSchema(jobSchema);
