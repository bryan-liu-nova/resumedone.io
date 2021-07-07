import { Random } from 'meteor/random';
import { TEMPLATES } from '/imports/generator/api/constants';

export const getBasicResume = (user, template) => {
  const { defaultColor } = TEMPLATES.find(t => t.id === (template || user.serviceData.template)) || {};
  return {
    _id: Random.id(),
    createdAt: new Date(),
    name: 'Untitled',
    author: user._id,
    updatedAt: new Date(),
    updatesCount: 0,
    restructureCount: 0,
    steps: ['start'],
    currentStep: 'start',
    details: {
      title: '',
      firstName: user.personalData.firstName || '',
      lastName: user.personalData.lastName || '',
      email: user.personalData.email || '',
      phone: user.personalData.phone || '',
    },
    settings: {
      template: template || user.serviceData.template || 'newyork',
      color: defaultColor || 'blue',
    },
    blocks: [
      {
        _id: Random.id(),
        animationKey: Random.id(),
        type: 'SOCIAL_LINKS',
        title: 'Websites & Social Links',
        fixedOrder: 0,
        required: true,
      },
      {
        _id: Random.id(),
        animationKey: Random.id(),
        type: 'SKILLS',
        title: 'Skills',
        order: 2,
        required: true,
      },
      {
        _id: Random.id(),
        animationKey: Random.id(),
        type: 'EMPLOYMENT',
        title: 'Employment history',
        order: 0,
        required: true,
      },
      {
        _id: Random.id(),
        animationKey: Random.id(),
        type: 'EDUCATION',
        title: 'Education',
        order: 1,
        required: true,
      },
    ],
  };
};

