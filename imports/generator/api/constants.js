export const TEMPLATES = [
  {
    name: 'Riga',
    id: 'riga',
    defaultColor: 'black',
    colors: ['black', 'rigaGold'],
  },
  {
    name: 'New York',
    id: 'newyork',
    accentsHidden: true,
    colors: ['black', 'violet', 'blue', 'green', 'red'],
  },
  {
    name: 'Chicago',
    id: 'chicago',
    accentsHidden: true,
    noUserPic: true,
    colors: ['black', 'violet', 'blue', 'green', 'red'],
  },
  {
    name: 'Paris',
    id: 'paris',
    defaultColor: 'blue',
    colors: ['green', 'blue', 'red', 'violet', 'black'],
  },
  {
    name: 'Amsterdam',
    id: 'amsterdam',
    accentsHidden: true,
    noUserPic: true,
    colors: ['black', 'violet', 'blue', 'green', 'red'],
  },
  {
    name: 'Rome',
    id: 'london',
    accentsHidden: true,
    noUserPic: true,
    colors: ['black', 'violet', 'blue', 'green', 'red'],
  },
  {
    name: 'Stockholm',
    id: 'stockholm',
    defaultColor: 'blue',
    colors: ['black', 'violet', 'blue', 'green', 'red'],
  },
  {
    name: 'Santiago',
    id: 'santiago',
    accentsHidden: true,
    noUserPic: true,
    colors: ['black', 'violet', 'blue', 'green', 'red']
  },
  {
    name: 'Barcelona',
    id: 'barcelona',
    defaultColor: 'blue',
    colors: ['green', 'blue', 'red', 'violet', 'black'],
  },
  {
    name: 'Vancouver',
    id: 'vancouver',
    accentsHidden: true,
    colors: ['black', 'violet', 'blue', 'green', 'red'],
  },
  {
    name: 'Milan',
    id: 'milan',
    defaultColor: 'blue',
    colors: ['gold', 'green', 'blue', 'red', 'black'],
  },
  {
    name: 'Moscow',
    id: 'moscow',
    defaultColor: 'blue',
    colors: ['green', 'blue', 'red', 'violet', 'black'],
  },
  {
    name: 'Singapore',
    id: 'singapore',
    accentsHidden: true,
    noUserPic: true,
    colors: ['black', 'violet', 'blue', 'green', 'red'],
  },
  {
    name: 'Berlin',
    id: 'berlin',
    accentsHidden: true,
    noUserPic: true,
    colors: ['black', 'violet', 'blue', 'green', 'red'],
  },
  {
    name: 'Sydney',
    id: 'sydney',
    noUserPic: true,
    accentsHidden: true,
    colors: ['black', 'violet', 'blue', 'green', 'red'],
  },
  {
    name: 'Prague',
    id: 'prague',
    accentsHidden: true,
    noUserPic: true,
    colors: ['black', 'violet', 'blue', 'green', 'red'],
  },
  {
    name: 'Budapest',
    id: 'budapest',
    defaultColor: 'black',
    colors: ['black', 'budapestViolet', 'budapestBlue', 'budapestGreen', 'budapestRed'],
  },
];

export const FAKE_TEMPLATES = [
  {
    name: 'Rio',
    id: 'stockholm',
    image: 'rio',
    colors: ['black', 'violet', 'blue', 'green', 'red'],
  },
  {
    name: 'Monte-Carlo',
    id: 'stockholm',
    image: 'montecarlo',
    colors: ['black', 'violet', 'blue', 'green', 'red'],
  },
  {
    name: 'Beirut',
    id: 'stockholm',
    image: 'beirut',
    colors: ['black', 'violet', 'blue', 'green', 'red'],
  },
  {
    name: 'Kiev',
    id: 'stockholm',
    image: 'kiev',
    colors: ['black', 'violet', 'blue', 'green', 'red'],
  },
  {
    name: 'San Francisco',
    id: 'stockholm',
    image: 'sanfrancisco',
    colors: ['black', 'violet', 'blue', 'green', 'red'],
  },
];

export const FEATURED_TEMPLATES = {
  riga: 'New',
  budapest: 'Most Selected',
  newyork: 'Recommended',
};

export const REQUIRED_BLOCKS = [
  'EDUCATION',
  'SKILLS',
  'EMPLOYMENT',
  'SOCIAL_LINKS'
];

export const LANGUAGE_LEVEL_OPTIONS = [
  { title: 'Select level', value: '' },
  { title: 'Native speaker', value: 'NATIVE' },
  { title: 'Highly proficient', value: 'PROFICIENT' },
  { title: 'Very good command', value: 'VERY_GOOD' },
  { title: 'Good working knowledge', value: 'GOOD' },
  { title: 'Working knowledge', value: 'WORKING' },
  { title: 'C2', value: 'C2' },
  { title: 'C1', value: 'C1' },
  { title: 'B2', value: 'B2' },
  { title: 'B1', value: 'B1' },
  { title: 'A2', value: 'A2' },
  { title: 'A1', value: 'A1' },
];

export const BLOCK_NAMES = {
  CUSTOM: 'Custom section',
  COURSES: 'Courses',
  EXTRA_CURRICULAR: 'Extra-curricular Activities',
  INTERNSHIPS: 'Internships',
  HOBBIES: 'Hobbies',
  LANGUAGES: 'Languages',
  REFERENCES: 'References',
  EMPLOYMENT: 'Employment history',
  SKILLS: 'Skills',
  EDUCATION: 'Education',
  SOCIAL_LINKS: 'Social links'
};

export const PERCENTAGE_IMPACT = {
  professionalSummary: 10,
  title: 8,
  blocks: {
    REFERENCES: [7, 0],
    EMPLOYMENT: [7, 4, 3, 2, 1],
    EDUCATION: [7, 4, 3, 2, 1],
    SKILLS: [6, 3, 2, 1],
    COURSES: [4, 2, 1],
    EXTRA_CURRICULAR: [4, 2, 1],
    LANGUAGES: [4, 4, 3, 2, 1],
  }
};

export const A4_RATIO = 1.4142;

export const A4_FACTOR = 0.71;

export const PDF_LOADER = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHdpZHRoPSI1NzIiIGhlaWdodD0iNzg2IiB2aWV3Qm94PSIwIDAgNTcyIDc4NiI+PHBhdGggZmlsbD0iI0ZGRiIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNNiAwaDU2MGE2IDYgMCAwIDEgNiA2djc3NGE2IDYgMCAwIDEtNiA2SDZhNiA2IDAgMCAxLTYtNlY2YTYgNiAwIDAgMSA2LTZ6bTU4IDI3NHYxNGg0NDR2LTE0SDY0em0wIDMwdjE0aDQ0NHYtMTRINjR6bTAgMzB2MTRoNDQ0di0xNEg2NHptMCAzMHYxNGgyMDR2LTE0SDY0em0wLTIyNnYxNGg0NDR2LTE0SDY0em0wIDMwdjE0aDQ0NHYtMTRINjR6bTAgMzB2MTRoNDQ0di0xNEg2NHptMCAzMHYxNGg0NDR2LTE0SDY0ek0yMzYgODZ2MTJoMTAwVjg2SDIzNnptLTUwLTM2djI0aDIwMFY1MEgxODZ6Ii8+PC9zdmc+Cg==';

export const FORM_LOADER = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHdpZHRoPSI3MjAiIGhlaWdodD0iMTA0NCIgdmlld0JveD0iMCAwIDcyMCAxMDQ0Ij48cGF0aCBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zODAgMTk5djEyaDgwdi0xMmgtODB6TTAgMGg3MjB2MTA0NEgwVjB6bTUyIDg0M2EyIDIgMCAwIDAtMiAydjE0NmEyIDIgMCAwIDAgMiAyaDYxNmEyIDIgMCAwIDAgMi0yVjg0NWEyIDIgMCAwIDAtMi0ySDUyem0tMi0yMHYxMmg4MHYtMTJINTB6bTAtMzZ2MjBoMTYwdi0yMEg1MHptMC02MnYxMmg4MHYtMTJINTB6bTItMjYyYTIgMiAwIDAgMC0yIDJ2NDJhMiAyIDAgMCAwIDIgMmgyODZhMiAyIDAgMCAwIDItMnYtNDJhMiAyIDAgMCAwLTItMkg1MnptLTItMjB2MTJoODB2LTEySDUwem0yIDExNmEyIDIgMCAwIDAtMiAydjQyYTIgMiAwIDAgMCAyIDJoMjg2YTIgMiAwIDAgMCAyLTJ2LTQyYTIgMiAwIDAgMC0yLTJINTJ6bS0yLTIwdjEyaDgwdi0xMkg1MHptMiAxMTZhMiAyIDAgMCAwLTIgMnY0MmEyIDIgMCAwIDAgMiAyaDI4NmEyIDIgMCAwIDAgMi0ydi00MmEyIDIgMCAwIDAtMi0ySDUyem0tMi0yMHYxMmg4MHYtMTJINTB6bTMzMi0xNzJhMiAyIDAgMCAwLTIgMnY0MmEyIDIgMCAwIDAgMiAyaDI4NmEyIDIgMCAwIDAgMi0ydi00MmEyIDIgMCAwIDAtMi0ySDM4MnptLTItMjB2MTJoODB2LTEyaC04MHptMiAxMTZhMiAyIDAgMCAwLTIgMnY0MmEyIDIgMCAwIDAgMiAyaDI4NmEyIDIgMCAwIDAgMi0ydi00MmEyIDIgMCAwIDAtMi0ySDM4MnptLTItMjB2MTJoODB2LTEyaC04MHptMiAxMTZhMiAyIDAgMCAwLTIgMnY0MmEyIDIgMCAwIDAgMiAyaDI4NmEyIDIgMCAwIDAgMi0ydi00MmEyIDIgMCAwIDAtMi0ySDM4MnptLTItMjB2MTJoODB2LTEyaC04MHpNNTAgNDA1djIwaDE2MHYtMjBINTB6bTItMTg2YTIgMiAwIDAgMC0yIDJ2NDJhMiAyIDAgMCAwIDIgMmgyODZhMiAyIDAgMCAwIDItMnYtNDJhMiAyIDAgMCAwLTItMkg1MnptLTItMjB2MTJoODB2LTEySDUwem0zMzIgMjBhMiAyIDAgMCAwLTIgMnY0MmEyIDIgMCAwIDAgMiAyaDI4NmEyIDIgMCAwIDAgMi0ydi00MmEyIDIgMCAwIDAtMi0ySDM4MnpNNTIgMzE1YTIgMiAwIDAgMC0yIDJ2NDJhMiAyIDAgMCAwIDIgMmgyODZhMiAyIDAgMCAwIDItMnYtNDJhMiAyIDAgMCAwLTItMkg1MnptLTItMjB2MTJoODB2LTEySDUwem0zMzIgMjBhMiAyIDAgMCAwLTIgMnY0MmEyIDIgMCAwIDAgMiAyaDI4NmEyIDIgMCAwIDAgMi0ydi00MmEyIDIgMCAwIDAtMi0ySDM4MnptLTItMjB2MTJoODB2LTEyaC04MHpNNTAgMTI4djI0aDYyMHYtMjRINTB6bTI2MC00NHYxMmgxMDBWODRIMzEwem0tNTAtMzZ2MjRoMjAwVjQ4SDI2MHoiLz48L3N2Zz4K';

export const SYNCING_URL = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUxLjIgKDU3NTE5KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5zeW5jaW5nPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9InN5bmNpbmciIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxwYXRoIGQ9Ik0xNywxMiBDMTcsOS4yMzg1NzYyNSAxNC43NjE0MjM3LDcgMTIsNyBDOS4yMzg1NzYyNSw3IDcsOS4yMzg1NzYyNSA3LDEyIEM3LDE0Ljc2MTQyMzcgOS4yMzg1NzYyNSwxNyAxMiwxNyBDMTIuNTUyMjg0NywxNyAxMywxNy40NDc3MTUzIDEzLDE4IEMxMywxOC41NTIyODQ3IDEyLjU1MjI4NDcsMTkgMTIsMTkgQzguMTM0MDA2NzUsMTkgNSwxNS44NjU5OTMyIDUsMTIgQzUsOC4xMzQwMDY3NSA4LjEzNDAwNjc1LDUgMTIsNSBDMTUuODY1OTkzMiw1IDE5LDguMTM0MDA2NzUgMTksMTIgQzE5LDEyLjU1MjI4NDcgMTguNTUyMjg0NywxMyAxOCwxMyBDMTcuNDQ3NzE1MywxMyAxNywxMi41NTIyODQ3IDE3LDEyIFoiIGlkPSJDb21iaW5lZC1TaGFwZSIgZmlsbD0iI0ZGRkZGRiIgZmlsbC1ydWxlPSJub256ZXJvIj48L3BhdGg+CiAgICA8L2c+Cjwvc3ZnPg==';

export const SYNCED_URL = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUxLjIgKDU3NTE5KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5zeW5jZWQ8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0ic3luY2VkIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8cGF0aCBkPSJNNiwxOC45Nzc1Nzg1IEMzLjE5Njc0OTk5LDE4LjcyNDk2NDEgMSwxNi4zNjkwMjEzIDEsMTMuNSBDMSwxMC40NjMwNDYyIDMuNDYxNDQxMjcsOC4wMDA5OTI3MyA2LjQ5ODE2MzIyLDguMDAwMDAwMyBDNy40Nzc3MjI3OCw1LjY1MTA0ODI5IDkuNzk2MDQ5ODksNCAxMi41LDQgQzE1LjkzMDMxNDEsNCAxOC43Mzk5OTc0LDYuNjU3MjM2NDkgMTguOTgyOTUzMSwxMC4wMjU2MTI3IEMyMS4yNDExMjk3LDEwLjI2NjU1OTYgMjMsMTIuMTc3ODc2NyAyMywxNC41IEMyMywxNi44MTYyNzY4IDIxLjI0OTk3NTIsMTguNzIzODEzNSAxOSwxOC45NzI1MzU2IEwxOSwxOSBMNiwxOSBMNiwxOC45Nzc1Nzg1IFoiIGlkPSJDb21iaW5lZC1TaGFwZSIgZmlsbD0iIzBGMTQxRiIgb3BhY2l0eT0iMC4yMzk5OTk5OTUiPjwvcGF0aD4KICAgICAgICA8cG9seWxpbmUgaWQ9IlBhdGgtMyIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHBvaW50cz0iOSAxMS41IDExLjUgMTQgMTUgMTAiPjwvcG9seWxpbmU+CiAgICA8L2c+Cjwvc3ZnPg==';

export const BLOCK_ADD_ITEM_NAMES = {
  CUSTOM: 'item',
  COURSES: 'course',
  EXTRA_CURRICULAR: 'activity',
  INTERNSHIPS: 'internship',
  HOBBIES: 'hobby',
  LANGUAGES: 'language',
  REFERENCES: 'reference',
  EMPLOYMENT: 'employment',
  SKILLS: 'skill',
  EDUCATION: 'education',
  SOCIAL_LINKS: 'link',
};

export const WIZARD_HELP_PHRASES = {
  summary: [
    // 'Provided onsite training.',
    // 'Installed, testes and serviced alarm systems, ensuring that they functioned correctly.',
    // 'Successfully led key projects which resulted in [positive outcome].',
    // 'Delivered an exceptional level of service to each customer by listening to concerns and answering questions.',
  ],
  education: [],
  employment: [],
  hobbies: [],
  internships: [],
  extra: [],
  custom: [],
};

export const PARSE_PARAMETERS = {
  stockholm: {
    bold: 'Source Sans Semibold',
    italic: 'Source Sans It',
    boldItalic: 'Source Sans SemiboldIt'
  },
  newyork: {
    bold: 'Source Sans Semibold',
    italic: 'Source Sans It',
    boldItalic: 'Source Sans SemiboldIt'
  },
  amsterdam: {
    bold: 'Montserrat Bold',
    italic: 'Montserrat Italic',
    boldItalic: 'Montserrat BoldItalic'
  },
  barcelona: {
    bold: 'SolomonSans Bold',
    italic: 'SolomonSans Italic',
    boldItalic: 'SolomonSans BoldItalic'
  },
  berlin: {
    bold: 'Montserrat Bold',
    italic: 'Montserrat Italic',
    boldItalic: 'Montserrat BoldItalic'
  },
  london: {
    bold: 'CrimsonText Bold',
    italic: 'CrimsonText Italic',
    boldItalic: 'CrimsonText BoldItalic'
  },
  milan: {
    bold: 'Lato Bold',
    italic: 'Lato Italic',
    boldItalic: 'Lato BoldItalic'
  },
  moscow: {
    bold: 'Roboto Bold',
    italic: 'Roboto Italic',
    boldItalic: 'Roboto BoldItalic'
  },
  paris: {
    bold: 'CrimsonText Bold',
    italic: 'CrimsonText Italic',
    boldItalic: 'CrimsonText BoldItalic'
  },
  santiago: {
    bold: 'CrimsonText Bold',
    italic: 'CrimsonText Italic',
    boldItalic: 'CrimsonText BoldItalic'
  },
  singapore: {
    bold: 'LiberationSans Bold',
    italic: 'LiberationSans Italic',
    boldItalic: 'LiberationSans BoldItalic'
  },
  vancouver: {
    bold: 'SolomonSans Bold',
    italic: 'SolomonSans Italic',
    boldItalic: 'SolomonSans BoldItalic'
  },
  budapest: {
    bold: 'Lato Bold',
    italic: 'Lato Italic',
    boldItalic: 'Lato BoldItalic'
  },
  sydney: {
    bold: 'Raleway Bold',
    italic: 'Raleway Italic',
    boldItalic: 'Raleway BoldItalic'
  },
  chicago: {
    bold: 'Raleway Bold',
    italic: 'Raleway Italic',
    boldItalic: 'Raleway BoldItalic'
  },
  prague: {
    bold: 'Raleway Bold',
    italic: 'Raleway Italic',
    boldItalic: 'Raleway BoldItalic'
  },
  riga: {
    bold: 'CrimsonText Bold',
    italic: 'CrimsonText Italic',
    boldItalic: 'CrimsonText BoldItalic'
  },
};

export const WIZARD_MODAL_DATA = {
  experience: {
    message: 'Looks like you haven’t entered any past work experience. We recommend that you at least enter your past position and company.',
    actionText: 'I don’t have work experience'
  },
  experienceOne: {
    message: 'You’ve only listed one job. Do you want to add another position to your work experience?',
    actionText: 'Continue to Education'
  },
  education: {
    message: 'Looks like you haven’t entered any education information. We recommend that you at least enter your past school and degree.',
    actionText: 'I don’t have any education'
  },
  skills: {
    message: 'Looks like you haven’t entered any skills. We recommend that you at least enter one skill.',
    actionText: 'I don’t have any skills'
  },
  summary: {
    message: 'Looks like you haven’t entered any summary.',
    actionText: 'I don’t want to do it now'
  },
};

export const DEFAULT_ITEMS = {
  'CUSTOM'() {
    return {
      startDate: new Date(),
      endDate: new Date(),
    };
  },
  'COURSES'() {
    return {
      startDate: new Date(),
      endDate: new Date(),
    };
  },
  'EXTRA_CURRICULAR'() {
    return {
      startDate: new Date(),
      endDate: new Date(),
    };
  },
  'INTERNSHIPS'() {
    return {
      startDate: new Date(),
      endDate: new Date(),
    };
  },
  'EMPLOYMENT'() {
    return {
      startDate: null,
      endDate: null
    };
  },
  'EDUCATION'() {
    return {
      startDate: null,
      endDate: null,
    };
  },
  'LANGUAGES'() {
    return {
      languageLevel: 'WORKING',
    };
  },
  'SKILLS'() {
    return {
      skillLevel: 'EXPERT',
    };
  },
};

export const EMPTY_FIELDS = {
  city: null,
  company: null,
  course: null,
  current: null,
  degree: null,
  description: null,
  email: null,
  employer: null,
  endDate: null,
  fullName: null,
  hobbies: null,
  institution: null,
  label: null,
  language: null,
  languageLevel: null,
  phone: null,
  school: null,
  skill: null,
  skillLevel: null,
  startDate: null,
  title: null,
  url: null
};
