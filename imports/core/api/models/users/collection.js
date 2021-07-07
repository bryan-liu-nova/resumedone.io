import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

// Here we put all the user personal data, like name, location etc.
const personalDataSchema = new SimpleSchema({
  firstName: {
    type: String,
    optional: true
  },
  lastName: {
    type: String,
    optional: true
  },
  phone: {
    type: String,
    optional: true
  },
  email: {
    type: String,
    optional: true
  }
});

// Data that is not directly exposed to the user, but used for the business logic
const serviceDataSchema = new SimpleSchema({
  onboard: {
    type: String,   // This is the onboard step. If removed, means a user is onboarded
    optional: true
  },
  template: {
    type: String,
    optional: true
  },
  subscriptionId: {
    type: String,
    optional: true
  },
  downloadKey: {
    type: String,
    optional: true
  },
  resumeId: {
    type: String,
    optional: true
  }
});

// Used for accounts password
const emailSchema = new SimpleSchema({
  address: {
    type: String,
  },
  verified: {
    type: Boolean,
  },
});

// Generate overall schema
const usersSchema = new SimpleSchema({
  personalData: {
    type: personalDataSchema
  },
  serviceData: {
    type: serviceDataSchema
  },
  createdAt: {
    type: Date
  },
  services: {
    type: Object,
    blackbox: true,
    optional: true
  },
  emails: {
    type: Array,
    optional: true
  },
  'emails.$': {
    type: emailSchema,
    optional: true
  },
});

Meteor.users.attachSchema(usersSchema);
