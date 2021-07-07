import { Meteor } from 'meteor/meteor';

import client from './apollo/client/init';
import history from './history';
import { CURRENT_USER } from '/imports/core/api/apollo/client/queries';

export const loginWithPassword = (email, password) => {
  return new Promise((res, rej) => {
    Meteor.loginWithPassword(email, password, (error) => {
      if (error) {
        window.analytics.track('login_fail');
        rej(error);
      } else {
        window.analytics.track('login');
        client.resetStore().then(() => {
          client.query({ query: CURRENT_USER }).then(d => {
            history.push('/resumes');
          });
        });
      }
    });
  });
};

export const logout = () => {
  window.analytics.track('logout');
  window.userIdentified = false;
  Meteor.logout(() => {
    client.resetStore();
    history.push('/');
  });
};
