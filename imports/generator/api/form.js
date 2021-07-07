import capitalize from 'lodash/capitalize';

import {
  InputAutosave,
  SuggestionInputAutosave,
  SelectAutosave,
  DateRangeAutosave,
  DatepickerAutosave,
  InputGoogleAutocompleteAutosave,
  TextareaEditorAutosave,
  SkillLevelAutosave,
  DropdownAutosave,
  ControlledInputAutosave,
  TextareaAutosave,
  YearPickerAutosave,
  SimpleYearPickerAutosave
} from '/imports/core/ui/atoms';
import {
  CustomIcon,
  EducationIcon,
  ExtraCurricularIcon,
  HobbyIcon,
  InternshipsIcon,
  LanguagesIcon,
  ReferencesIcon,
  SuggestionInputWithData,
  TextareaEditorWithData,
  AutocompleteInputWithData,
  GeneratorInput,
} from '/imports/generator/ui/atoms';
import UploadPhoto from '/imports/generator/ui/components/UploadPhoto';
import { LANGUAGE_LEVEL_OPTIONS } from '/imports/generator/api/constants';
import { displayTitle, displayDateRange, displayDate } from '/imports/generator/api/helpers';
import { WIZARD_HELP_PHRASES } from '/imports/generator/api/constants';
import { ERROR_MESSAGES } from '/imports/core/api/constants';

const degreeOptions = [
  'High school diploma',
  'GED',
  'Associate of Arts',
  'Associate of Science',
  'Associate of Applied Science',
  'Bachelor of Arts',
  'Bachelor of Science',
  'BBA',
  'Master of Arts',
  'Master of Science',
  'MBA',
  'J.D.',
  'LL.B',
  'LL.M',
  'M.D.',
  'Ph.D.',
  "Bachelor of Technology",
  "Master's Degree",
  "MPhil",
  "MLitt",
  "EdD",
  "MBBS",
  "Bachelor",
  'Higher National Diploma',
  'Higher National Certificate',
  'Undergraduate',
  'Some College (no degree)',
].map(v => ({ title: v, value: v }));

export const EXPOSED_DETAILS_MAP = [
  {
    label: 'Job title',
    name: 'title',
    tip: 'Add a title like \'Senior Marketer\' or \'Sales Executive\' that quickly describes your overall experience or the type of role you\'re applying to',
    component: GeneratorInput,
    props: {
      placeholder: 'e.g. Teacher',
      data: [],
      type: 'text',
      validators: ['required'],
      errorMessages: [ERROR_MESSAGES.requiredJob],
      instantValidate: false
    },
  },
  {
    name: 'userPic',
    component: UploadPhoto,
  },
  {
    label: 'First name',
    name: 'firstName',
    component: InputAutosave,
  },
  {
    label: 'Last name',
    name: 'lastName',
    component: InputAutosave,
  },
  {
    label: 'Email',
    name: 'email',
    component: GeneratorInput,
    props: {
      type: 'email',
      placeholder: 'e.g. mail@example.com',
      validators: ['required', 'isEmail'],
      errorMessages: [ERROR_MESSAGES.requiredEmail, ERROR_MESSAGES.email],
      instantValidate: false
    },
  },
  {
    label: 'Phone',
    name: 'phone',
    component: InputAutosave,
  },
];

export const HIDDEN_DETAILS_MAP = [
  {
    label: 'Country',
    name: 'country',
    component: InputAutosave,
  },
  {
    label: 'City',
    name: 'city',
    component: InputAutosave,
  },
  {
    label: 'Address',
    name: 'address',
    component: InputAutosave,
  },
  {
    label: 'Postal Code',
    name: 'postalCode',
    component: InputAutosave,
  },
  {
    label: 'Driving License',
    tip: 'Include this section if your profession requires a certain type of license. If not, leave it blank',
    name: 'driversLicence',
    component: InputAutosave,
  },
  {
    label: 'Nationality',
    tip: 'Include your nationality only if it is relevant to your position. In most cases, leave this blank.',
    name: 'nationality',
    component: InputAutosave,
  },
  {
    label: 'Place Of Birth',
    name: 'placeOfBirth',
    component: InputAutosave,
  },
  {
    label: 'Date Of Birth',
    tip: 'Include your date of birth only if it is a relevant requirement to your position. In most cases, leave this blank.',
    name: 'dateOfBirth',
    component: InputAutosave,
  },
];

export const START_FORM_MAP = [
  {
    label: 'First name',
    name: 'firstName',
    component: InputAutosave,
    props: {
      placeholder: 'Name',
      // validators: ['required'],
      // errorMessages: [ERROR_MESSAGES.required],
    },
  },
  {
    label: 'Last name',
    name: 'lastName',
    component: InputAutosave,
    props: {
      placeholder: 'Johnson',
      // validators: ['required'],
      // errorMessages: [ERROR_MESSAGES.required],
    },
  },
  {
    label: 'Address',
    name: 'address',
    component: InputGoogleAutocompleteAutosave,
    fullWidth: true,
  },
  {
    label: 'City',
    name: 'city',
    component: InputAutosave,
    props: {
      placeholder: 'San Francisco',
      isCity: true
    },
  },
  {
    label: 'Postal Code',
    name: 'postalCode',
    component: InputAutosave,
    props: {
      placeholder: '94120',
    },
  },
  {
    label: 'Phone',
    name: 'phone',
    component: InputAutosave,
    props: {
      placeholder: '305-123-44444',
    },
  },
  {
    label: 'Email',
    name: 'email',
    component: GeneratorInput,
    props: {
      type: 'email',
      placeholder: 'e.g. mail@example.com',
      validators: ['required', 'isEmail'],
      errorMessages: [ERROR_MESSAGES.requiredEmail, ERROR_MESSAGES.email],
      instantValidate: false
    },
  },
];

export const START_FORM_MAP_2 = [
  {
    label: 'Full name',
    name: 'firstName',
    component: InputAutosave,
    fullWidth: true,
    props: {
      placeholder: 'Full Name',
    },
  },
  {
    label: 'City',
    name: 'city',
    component: InputAutosave,
    fullWidth: true,
    props: {
      placeholder: 'San Francisco',
      isCity: true,
    },
  },
  {
    label: 'Email',
    name: 'email',
    component: GeneratorInput,
    fullWidth: true,
    props: {
      type: 'email',
      placeholder: 'e.g. mail@example.com',
      validators: ['required', 'isEmail'],
      errorMessages: [ERROR_MESSAGES.requiredEmail, ERROR_MESSAGES.email],
      instantValidate: false
    },
  }
  // {
  //   label: 'State/Province',
  //   name: 'postalCode',
  //   component: InputAutosave,
  //   props: {
  //     placeholder: 'State/Province',
  //     isState: true,
  //   },
  // },
];

export const BLOCKS_MAP = {
  'CUSTOM': {
    getItemTitle(item) {
      const {
        title,
        city,
        startDate,
        endDate,
      } = item.fields || {};
      let res = displayTitle(title, city, ', ');
      res += `, ${displayDateRange(startDate, endDate)}`;
      return res;
    },
    icon: CustomIcon,
    items: [
      {
        label: 'Activity name, job title, book title etc.',
        name: 'title',
        component: InputAutosave,
      },
      {
        label: 'City',
        name: 'city',
        component: InputAutosave,
      },
      {
        label: 'Start & End Date',
        name: ['startDate', 'endDate'],
        component: DateRangeAutosave,
        isRange: true,
      },
      {
        label: 'Description',
        name: 'description',
        component: TextareaEditorAutosave,
        props: {
          rows: 5,
          help: WIZARD_HELP_PHRASES.custom,
          simpleSearch: true,
          hideSearch: true,
        },
        fullWidth: true,
      },
    ],
  },
  'COURSES': {
    getItemTitle(item) {
      const {
        course,
        institution,
        startDate,
        endDate,
      } = item.fields || {};
      let res = displayTitle(course, institution, ' at ');
      res += `, ${displayDateRange(startDate, endDate)}`;
      return res;
    },
    icon: EducationIcon,
    items: [
      {
        label: 'Course',
        name: 'course',
        component: InputAutosave,
      },
      {
        label: 'Institution',
        name: 'institution',
        component: InputAutosave,
      },
      {
        label: 'Start & End Date',
        name: ['startDate', 'endDate', 'current'],
        component: DateRangeAutosave,
        isRange: true,
        props: {
          showCheckbox: true,
        },
        needUpdate: true,
      },
    ],
  },
  'EXTRA_CURRICULAR': {
    getItemTitle(item) {
      const {
        title,
        employer,
        startDate,
        endDate,
      } = item.fields || {};
      let res = displayTitle(title, employer, ' at ');
      res += `, ${displayDateRange(startDate, endDate)}`;
      return res;
    },
    icon: ExtraCurricularIcon,
    items: [
      {
        label: 'Function Title',
        name: 'title',
        component: InputAutosave,
      },
      {
        label: 'Employer',
        name: 'employer',
        component: InputAutosave,
      },
      {
        label: 'Start & End Date',
        name: ['startDate', 'endDate'],
        component: DateRangeAutosave,
        isRange: true,
      },
      {
        label: 'City',
        name: 'city',
        component: InputAutosave,
      },
      {
        label: 'Description',
        name: 'description',
        component: TextareaEditorWithData,
        props: {
          rows: 5,
          searchType: 'experience',
        },
        fullWidth: true,
      },
    ],
  },
  'INTERNSHIPS': {
    getItemTitle(item) {
      const {
        title,
        employer,
        startDate,
        endDate,
      } = item.fields || {};
      let res = displayTitle(title, employer, ' at ');
      res += `, ${displayDateRange(startDate, endDate)}`;
      return res;
    },
    icon: InternshipsIcon,
    items: [
      {
        label: 'Job title',
        name: 'title',
        component: InputAutosave,
      },
      {
        label: 'Employer',
        name: 'employer',
        component: InputAutosave,
      },
      {
        label: 'Start & End Date',
        name: ['startDate', 'endDate', 'current'],
        component: DateRangeAutosave,
        isRange: true,
        props: {
          showCheckbox: true,
        },
        needUpdate: true,
      },
      {
        label: 'City',
        name: 'city',
        component: InputAutosave,
      },
      {
        label: 'Description',
        name: 'description',
        component: TextareaEditorWithData,
        props: {
          rows: 5,
          searchType: 'experience',
        },
        fullWidth: true,
      },
    ],
  },
  'HOBBIES': {
    icon: HobbyIcon,
    fields: [
      {
        label: 'What do you like?',
        name: 'description',
        component: TextareaAutosave,
        props: {
          rows: 3,
          placeholder: 'e.g. Skiing, Skydiving, Painting',
          help: WIZARD_HELP_PHRASES.hobbies,
        },
      },
    ],
  },
  'LANGUAGES': {
    getItemTitle(item) {
      const {
        language,
        languageLevel,
      } = item.fields || {};
      let res = `${language || '(Not specified)'}`;
      if (languageLevel) {
        res += `, ${LANGUAGE_LEVEL_OPTIONS.find(l => l.value === languageLevel).title}`;
      }
      return res;
    },
    icon: LanguagesIcon,
    items: [
      {
        label: 'Language',
        name: 'language',
        component: InputAutosave,
      },
      {
        label: 'Level',
        name: 'languageLevel',
        component: DropdownAutosave,
        props: {
          options: LANGUAGE_LEVEL_OPTIONS,
        },
      },
    ],
  },
  'REFERENCES': {
    getItemTitle(item) {
      const {
        fullName,
        company,
      } = item.fields || {};
      return displayTitle(fullName, company, ' from ');
    },
    icon: ReferencesIcon,
    items: [
      {
        label: 'Referent\'s Full Name',
        name: 'fullName',
        component: InputAutosave,
      },
      {
        label: 'Company',
        name: 'company',
        component: InputAutosave,
      },
      {
        label: 'Phone',
        name: 'phone',
        component: InputAutosave,
      },
      {
        label: 'Email',
        name: 'email',
        component: InputAutosave,
      },
    ],
    additionalFlags: [
      {
        name: 'hideReferences',
        label: 'I\'d like to hide references and make them available only upon request',
      },
    ],
  },
  'EMPLOYMENT': {
    getItemTitle(item) {
      const {
        title,
        employer,
        startDate,
        endDate,
        current
      } = item.fields || {};
      let res = displayTitle(title, employer, ' from ');
      res += `, ${displayDateRange(startDate, endDate, current)}`;
      return res;
    },
    afterText: 'Include your last 10 years of relevant experience and dates in this section. List your most recent position first.',
    items: [
      {
        label: 'Job title',
        name: 'title',
        component: AutocompleteInputWithData,
        props: {
          placeholder: 'CEO',
          validators: ['required'],
          errorMessages: [ERROR_MESSAGES.jobRequired],
          withRequiredValidator: true,
          validated: true,
          type: 'jobs'
        },
        parentRef: true,
        needUpdate: true,
      },
      {
        label: 'Employer',
        name: 'employer',
        component: GeneratorInput,
        props: {
          placeholder: 'Google',
          validators: ['required'],
          errorMessages: [ERROR_MESSAGES.employerRequired],
          withRequiredValidator: true,
        },
      },
      {
        label: 'Start & End Date',
        name: ['startDate', 'endDate', 'current'],
        component: DateRangeAutosave,
        isRange: true,
        props: {
          showCheckbox: true,
        },
        needUpdate: true,
      },
      {
        label: 'City',
        name: 'city',
        component: InputAutosave,
        props: {
          placeholder: 'San Francisco',
        },
      },
      {
        label: 'Description',
        name: 'description',
        component: TextareaEditorWithData,
        props: {
          rows: 5,
          placeholder: 'Write your work experience',
          searchType: 'experience',
        },
        fullWidth: true,
        childRef: true
      },
    ],
  },
  'SKILLS': {
    getItemTitle(item) {
      const {
        skill,
        skillLevel,
      } = item.fields || {};
      let res = capitalize(skillLevel);
      if (skill) {
        res = `${skill}, ${res}`;
      }
      return res;
    },
    items: [
      {
        label: 'Skill',
        name: 'skill',
        component: SuggestionInputWithData,
        props: {
          searchType: 'skill',
        },
      },
      {
        name: 'skillLevel',
        component: SkillLevelAutosave,
      },
    ],
    additionalFlags: [
      {
        name: 'hideLevel',
        label: 'Don\'t show experience level',
      },
    ],
  },
  'EDUCATION': {
    getItemTitle(item) {
      const {
        school,
        degree,
        endDate,
      } = item.fields || {};
      let res = displayTitle(degree, school, ' at ');
      res += `, ${displayDate(endDate, 'yyyy')}`;
      return res;
    },
    afterText: 'If relevant, include your most recent educational achievements and the dates here',
    items: [
      {
        label: 'School',
        name: 'school',
        component: InputGoogleAutocompleteAutosave,
        props: {
          placeholder: 'Harvard',
          validated: true,
          validators: ['required'],
          errorMessages: [ERROR_MESSAGES.schoolRequired],
          withRequiredValidator: true,
          types: ['establishment'],
          isSchool: true
        },
      },
      {
        label: 'Degree',
        name: 'degree',
        component: DropdownAutosave,
        props: {
          placeholder: 'Select degree',
          options: degreeOptions,
        },
      },
      {
        label: 'Graduation date',
        name: 'endDate',
        component: SimpleYearPickerAutosave,
        props: {
          placeholder: 'Select date'
        }
      },
      {
        label: 'City',
        name: 'city',
        component: ControlledInputAutosave,
        props: {
          placeholder: 'San Francisco',
        },
      },
      {
        label: 'Description',
        name: 'description',
        component: TextareaEditorWithData,
        props: {
          rows: 5,
          placeholder: 'Write your educational experience',
          searchType: 'education',
          hideSearchBar: true,
        },
        fullWidth: true,
      },
    ],
  },
  'SOCIAL_LINKS': {
    getItemTitle(item) {
      const fields = item.fields || {};
      return fields.label || '(Not specified)';
    },
    afterText: 'You can add links to websites you want hiring managers to see! Perhaps It will be a link to your portfolio, LinkedIn profile, or personal website',
    items: [
      {
        label: 'Label',
        name: 'label',
        component: InputAutosave,
      },
      {
        label: 'Link',
        name: 'url',
        component: InputAutosave,
      },
    ],
  },
};
