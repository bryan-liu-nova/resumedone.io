import { Meteor } from 'meteor/meteor';

const users = [
  {
    createdAt: Date.now(),
    emails: [
      { address: 'admin@admin.com', verified: true },
    ],
    personalData: {
      firstName: 'Admin',
      lastName: 'Admin',
    },
    serviceData: {
      onboard: 'name',
    }
  },
];

// Meteor.users.remove({});
users.forEach((u) => {
  const user = Meteor.users.findOne({ 'emails.address': u.emails[0].address });
  if (!user) {
    const userId = Meteor.users.insert(u);
    Accounts.setPassword(userId, '12345678');
  } else {
    // Meteor.users.update(user._id, { $set: u });
  }
});
