import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { ServiceConfiguration } from 'meteor/service-configuration';

Accounts.validateNewUser((user) => {
  const email = (() => {
    if (user.services.facebook) return user.services.facebook.email;
    else if (user.services.password) return user.emails[0].address;
  })();
  if (email) {
    const existingUser = Meteor.users.findOne({ 'personalData.email': email });
    if (existingUser) {
      const service = Object.keys(existingUser.services)[0];
      throw new Meteor.Error(403, 'Email already registered', { service, email });
    }
    return true;
  }
  return true;
});

Accounts.onCreateUser((options, user) => {
  const newUser = { ...user };
  newUser.serviceData = {
    onboard: 'name',
    template: options.profile.template,
  };
  newUser.createdAt = new Date();
  if (user.services.facebook) {
    console.log(user.services.facebook);
    const {
      first_name,
      last_name,
      email
    } = user.services.facebook;
    newUser.personalData = {
      firstName: first_name,
      lastName: last_name,
      email
    };
  }
  if (user.services.password) {
    newUser.personalData = {
      firstName: '',
      lastName: '',
    };
  }
  delete newUser.profile;
  return newUser;
});

Meteor.startup(() => {
  ServiceConfiguration.configurations.upsert(
    { service: 'facebook' },
    {
      $set: {
        appId: Meteor.settings.private.facebook.appId,
        secret: Meteor.settings.private.facebook.secret,
      },
    },
  );
  ServiceConfiguration.configurations.upsert(
    { service: 'linkedin' },
    {
      $set: {
        appId: Meteor.settings.private.linkedin.appId,
        secret: Meteor.settings.private.linkedin.secret,
      },
    },
  );
});
