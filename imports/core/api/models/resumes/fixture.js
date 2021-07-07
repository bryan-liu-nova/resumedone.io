import { Meteor } from 'meteor/meteor';

import { Resumes } from './collection';

Meteor.startup(() => {
  // Resumes.remove({});

  const user = Meteor.users.findOne({ 'emails.address': 'admin@admin.com' });
  const resume = {
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'Untitled',
    author: user._id,
    updatesCount: 0,
    details: {
      firstName: 'Альберт',
      lastName: 'Кайгородов',
      email: 'albertkai@me.com',
      color: 'black',
    },
    settings: {
      template: 'moscow',
      color: 'black',
      status: 'start'
    },
    blocks: [
      {
        _id: '8yhRFaQjgaMmoDo3R',
        animationKey: Math.random().toString(),
        type: 'SOCIAL_LINKS',
        title: 'Websites & Social Links',
        fixedOrder: 0,
        required: true
      },
      {
        _id: '8yhRFaQjksdfgmoDo3R',
        animationKey: Math.random().toString(),
        type: 'SKILLS',
        title: 'Skills',
        order: 0,
        required: true
      },
      {
        _id: '8yhRFaQjkNMmoDdfg3R',
        animationKey: Math.random().toString(),
        type: 'EDUCATION',
        title: 'Education',
        order: 1,
        required: true
      },
      {
        _id: '8yhRFaQjkNMmoDo3R',
        animationKey: Math.random().toString(),
        type: 'EMPLOYMENT',
        title: 'Employment history',
        order: 2,
        required: true
      }
    ]
  };
  if (Resumes.find().count() === 0) {
    // console.log(Resumes.insert(resume));
  }
});
