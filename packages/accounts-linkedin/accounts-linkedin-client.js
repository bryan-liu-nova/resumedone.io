import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { LinkedIn } from './linkedin-client';

Accounts.oauth.registerService('linkedin');

const loginWithLinkedIn = (options, callback) => {
  // support a callback without options
  if (!callback && typeof options === 'function') {
    callback = options;
    options = null;
  }

  const credentialRequestCompleteCB = Accounts.oauth.credentialRequestCompleteHandler(callback);
  LinkedIn.requestCredential(options, credentialRequestCompleteCB);
};

Accounts.registerClientLoginFunction('linkedin', loginWithLinkedIn);

Meteor.loginWithLinkedIn = (...args) => Accounts.applyLoginFunction('linkedin', args);
