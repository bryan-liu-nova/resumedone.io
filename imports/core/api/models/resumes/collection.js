import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Resumes = new Mongo.Collection('resumes');

// TODO I kept that separate schemas as a reference for now, as it is not critical, but in future better use conditional schema for the blocks

const ReferenceSchema = new SimpleSchema({
  fullName: {
    type: String,
    optional: true
  },
  company: {
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

const CustomActivitySchema = new SimpleSchema({
  name: {
    type: String,
    optional: true
  },
  city: {
    type: String,
    optional: true
  },
  startDate: {
    type: Date,
    optional: true
  },
  endDate: {
    type: Date,
    optional: true
  },
  description: {
    type: String,
    optional: true
  }
});

const CourseSchema = new SimpleSchema({
  course: {
    type: String,
    optional: true
  },
  institution: {
    type: String,
    optional: true
  },
  startDate: {
    type: Date,
    optional: true
  },
  endDate: {
    type: Date,
    optional: true
  }
});

const LanguageSchema = new SimpleSchema({
  language: {
    type: String,
    optional: true
  },
  languageLevel: {
    type: String,
    optional: true,
    allowedValues: [
      'NATIVE',
      'PROFICIENT',
      'VERY_GOOD',
      'GOOD',
      'WORKING',
      'C2',
      'C1',
      'B2',
      'B1',
      'A2',
      'A1'
    ]
  }
});

const InternshipSchema = new SimpleSchema({
  title: {
    type: String,
    optional: true
  },
  employer: {
    type: String,
    optional: true
  },
  startDate: {
    type: Date,
    optional: true
  },
  endDate: {
    type: Date,
    optional: true
  },
  city: {
    type: String,
    optional: true
  },
  description: {
    type: String,
    optional: true
  }
});

const HobbiesSchema = new SimpleSchema({
  hobbies: String
});

const ExtraCurricularSchema = new SimpleSchema({
  title: {
    type: String,
    optional: true
  },
  employer: {
    type: String,
    optional: true
  },
  startDate: {
    type: Date,
    optional: true
  },
  endDate: {
    type: Date,
    optional: true
  },
  city: {
    type: String,
    optional: true
  },
  description: {
    type: String,
    optional: true
  }
});

const EducationSchema = new SimpleSchema({
  school: {
    type: String,
    optional: true
  },
  degree: {
    type: String,
    optional: true
  },
  startDate: {
    type: Number,
    optional: true
  },
  endDate: {
    type: Number,
    optional: true
  },
  city: {
    type: String,
    optional: true
  },
  description: {
    type: String,
    optional: true
  }
});

const SkillSchema = new SimpleSchema({
  skill: {
    type: String,
    optional: true
  },
  skillLevel: {
    type: String,
    allowedValues: [
      'NOVICE',
      'BEGINNER',
      'SKILLFULL',
      'EXPERIENCED',
      'EXPERT'
    ]
  }
});

const EmploymentHistorySchema = new SimpleSchema({
  title: {
    type: String,
    optional: true
  },
  employer: {
    type: String,
    optional: true
  },
  startDate: {
    type: Date,
    optional: true
  },
  endDate: {
    type: Date,
    optional: true
  },
  current: {
    type: Boolean,
    optional: true
  },
  city: {
    type: String,
    optional: true
  },
  description: {
    type: String,
    optional: true
  }
});

const SocialLinkSchema = new SimpleSchema({
  label: {
    type: String,
    optional: true
  },
  url: {
    type: String,
    optional: true
  },
});

const BlockItemSchema = new SimpleSchema({
  _id: {
    type: String
  },
  order: {
    type: Number
  },
  fields: { // TODO should be changed to either conditional schema or just list all possible fields as optional
    type: Object,
    blackbox: true,
    optional: true
  },
  // Used for animations to work with optimistic UI
  animationKey: {
    type: String
  }
});

const BlockSchema = new SimpleSchema({
  _id: {
    type: String
  },
  type: {
    type: String,
    allowedValues: [
      'CUSTOM',
      'COURSES',
      'EXTRA_CURRICULAR',
      'INTERNSHIPS',
      'HOBBIES',
      'LANGUAGES',
      'REFERENCES',
      'EMPLOYMENT',
      'SKILLS',
      'EDUCATION',
      'SOCIAL_LINKS'
    ]
  },
  title: {
    type: String,
    optional: true
  },
  order: {
    type: Number,
    optional: true
  },
  fixedOrder: {
    type: Number,
    optional: true
  },
  items: {
    type: Array,
    optional: true
  },
  'items.$': {
    type: BlockItemSchema
  },
  hideLevel: {
    type: Boolean,
    optional: true
  },
  hideReferences: {
    type: Boolean,
    optional: true
  },
  required: {
    type: Boolean,
    optional: true
  },
  // Used for animations to work with optimistic UI
  animationKey: {
    type: String
  }
});

const ResumeSettings = new SimpleSchema({
  template: {
    type: String,
    optional: true
  },
  color: {
    type: String,
    defaultValue: 'black'
  },
  status: {
    type: String,
    defaultValue: 'start'
  }
});

const ResumeDetailsSchema = new SimpleSchema({
  title: {
    type: String,
    optional: true
  },
  firstName: {
    type: String,
    optional: true
  },
  lastName: {
    type: String,
    optional: true
  },
  email: {
    type: String,
    optional: true
  },
  phone: {
    type: String,
    optional: true
  },
  userPic: {
    type: String,
    optional: true
  },
  country: {
    type: String,
    optional: true
  },
  city: {
    type: String,
    optional: true
  },
  address: {
    type: String,
    optional: true
  },
  postalCode: {
    type: String,
    optional: true
  },
  driversLicence: {
    type: String,
    optional: true
  },
  nationality: {
    type: String,
    optional: true
  },
  placeOfBirth: {
    type: String,
    optional: true
  },
  dateOfBirth: {
    type: String,
    optional: true
  },
  professionalSummary: {
    type: String,
    optional: true
  }
});

const resumeSchema = new SimpleSchema({
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
    autoValue() {
      return new Date();
    }
  },
  // We use this to simplify resume update function
  updatesCount: {
    type: Number
  },
  // We use this to differentiate content updates and structure updates
  restructureCount: {
    type: Number
  },
  steps: {
    type: Array
  },
  'steps.$': {
    type: String
  },
  currentStep: {
    type: String,
    defaultValue: 'start'
  },
  author: {
    type: String,
  },
  name: {
    type: String,
  },
  details: {
    type: ResumeDetailsSchema
  },
  settings: {
    type: ResumeSettings
  },
  blocks: {
    type: Array
  },
  'blocks.$': {
    type: BlockSchema,
    optional: true
  }
});

Resumes.attachSchema(resumeSchema);
