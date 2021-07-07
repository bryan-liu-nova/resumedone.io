import { Accounts } from 'meteor/accounts-base';

Accounts.oauth.registerService('linkedin');

Accounts.addAutopublishFields({
  forLoggedInUser: ['services.linkedin'],
});
