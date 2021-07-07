import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {
  process.env.MAIL_URL = `smtp://${Meteor.settings.private.smtp.username}:${Meteor.settings.private.smtp.password}@${Meteor.settings.private.smtp.host}`;
});

Accounts.emailTemplates.siteName = 'Resumedone.io';
Accounts.emailTemplates.from = 'noreply@resumedone.io';
Accounts.urls.resetPassword = token => Meteor.absoluteUrl(`set-password/${token}`);
Accounts.emailTemplates.resetPassword.subject = () => 'Resumedone.io - password reset';
Accounts.emailTemplates.resetPassword.html = (user, url) => {
  return `
    <h4>Here is the password reset link</h4>
    <a href="${url}">${url}</a>
    <p><small>Please follow the link to reset the password</small></p>
  `;
};
