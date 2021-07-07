import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Schools = new Mongo.Collection('schools');

const schoolSchema = new SimpleSchema({
  name: String,
  city: String
});

Schools.attachSchema(schoolSchema);
