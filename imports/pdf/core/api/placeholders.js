// disactivate placeholders
export const DEFAULT_DETAILS = {
  firstName: '',
  lastName: '',
  title: '',
  phone: '',
  email: '',
  address: '',
  addressOneLine: '',
  professionalSummary: '',
  detailsData: [],
};

// export const DEFAULT_DETAILS = {
//   firstName: 'First Name',
//   lastName: 'Last Name',
//   title: 'Job title',
//   phone: '123-456-7890',
//   email: 'you@example.com',
//   address: 'Your address, city,\nZip code',
//   addressOneLine: 'Your address, city, Zip code',
//   professionalSummary: 'Proin a metus eu quam mollis gravida ut a elit. Vestibulum eget hendrerit felis. Phasellus non velit a dui ultricies posuere id in ante. Integer tristique ut metu.',
//   detailsData: [
//     {
//       title: 'Date of birth',
//       value: 'Date of birth'
//     },
//     {
//       title: 'Place of birth',
//       value: 'Place of birth'
//     },
//     {
//       title: 'Nationality',
//       value: 'Nationality'
//     },
//     {
//       title: 'Driving license',
//       value: 'Driving license'
//     }
//   ],
// };

export const DEFAULT_BLOCKS = [
  {
    _id: 'Bwp5SrZnmhhvyuyMyYWe',
    type: 'SKILLS',
    title: 'Skills',
    order: 3,
    animationKey: 'x7JJsfihhoih2YFui7QL',
    fixedOrder: null,
    required: true,
    items: [{
      _id: 'CDofDb6hlkhCK4GbTG',
      order: 0,
      animationKey: '7oWKprlhgphqCtwWtP',
      fields: {
        skill: 'Skills 1',
        skillLevel: 'EXPERT',
        __typename: 'BlockFields'
      },
      __typename: 'BlockItem'
    }, {
      _id: 'sY9dfhPCtXR6yakim',
      order: 0,
      animationKey: 'AF6zfghY3WetPw3ou',
      fields: {
        skill: 'Skills 2',
        skillLevel: 'EXPERIENCED',
        __typename: 'BlockFields'
      },
      __typename: 'BlockItem'
    }, {
      _id: 'Ph7GDdghghmZunmYgYe',
      order: 0,
      animationKey: 'jPRChghgPvTRfqx3Jr',
      fields: {
        skill: 'Skills 3',
        skillLevel: 'EXPERIENCED',
        __typename: 'BlockFields'
      },
      __typename: 'BlockItem'
    }, {
      _id: 'Ph7GDdgiiomZunmYgYe',
      order: 0,
      animationKey: 'jPRChghgPvTRfqx3Jr',
      fields: {
        skill: 'Skills 4',
        skillLevel: 'SKILLFUL',
        __typename: 'BlockFields'
      },
      __typename: 'BlockItem'
    }, {
      _id: 'Ph7GDppppghmZunmYgYe',
      order: 0,
      animationKey: 'jPRChghgPvTRfqx3Jr',
      fields: {
        skill: 'Skills 5',
        skillLevel: 'SKILLFUL',
        __typename: 'BlockFields'
      },
      __typename: 'BlockItem'
    }],
    hideLevel: false,
    isPlaceholder: true,
    __typename: 'Block'
  }, {
    _id: '9y3vWsdfnHGwjQsPaL',
    type: 'EDUCATION',
    title: 'Education',
    order: 2,
    animationKey: 'zaP6GsdffgfT4nJAje',
    required: true,
    isPlaceholder: true,
    items: [{
      _id: '8wdhZ4onMAsde26Xr',
      order: 0,
      animationKey: 'RBhasdgsg6cSq9zcc2S',
      fields: {
        city: 'City',
        startDate: '2010-12-31T17:30:17.000Z',
        endDate: '2014-04-21T17:30:17.899Z',
        school: 'University name 2',
        degree: 'Degree',
        description: '{"blocks":[{"key":"6r4tb","text":"Praesent luctus gravida turpis a egestas","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cbjmk","text":"Vestibulum condimentum neque ac aliquet pretium. Duis et felis leo.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        __typename: 'BlockFields'
      },
      __typename: 'BlockItem'
    }, {
      _id: '8wdhZ2onMAsde26Xr',
      order: 0,
      animationKey: 'RBhaddgsg6cSq9zcc2S',
      fields: {
        city: 'City',
        startDate: '2010-12-31T17:30:17.000Z',
        endDate: '2014-04-21T17:30:17.899Z',
        school: 'University name 1',
        degree: 'Degree',
        description: '{"blocks":[{"key":"6r4tb","text":"Suspendisse semper sapien nibh, sit amet rhoncus libero porttitor sed.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        __typename: 'BlockFields'
      },
      __typename: 'BlockItem'
    }],
    __typename: 'Block'
  }, {
    _id: 'baQBBhhh9N334Lu82',
    type: 'EMPLOYMENT',
    title: 'Employment history',
    order: 1,
    animationKey: 'JDEHidfghtj6os4t4p',
    required: true,
    isPlaceholder: true,
    items: [{
      _id: 'yLw268qdfghApQMtgQS',
      order: 0,
      animationKey: 'Tfqdfgh9KnctcTuWwnL',
      fields: {
        title: 'Job Title',
        employer: 'Company 3',
        city: 'City',
        startDate: '2017-01-21T17:34:12.118Z',
        endDate: '2019-04-21T17:34:12.118Z',
        description: '{"blocks":[{"key":"6r4tb","text":"Duis et felis leo. Suspendisse tempus velit tortor, eu fermentum tellus lobortis vitae.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"csgn9","text":"Nulla eu congue odio, vitae hendrerit turpis. Donec varius volutpat metus sagittis pulvinar. Aliquam sed sapien vel mauris sodales porttitor","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"794gn","text":"Curabitur consequat viverra tellus ut vulputate. Phasellus eu lorem diam.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        __typename: 'BlockFields'
      },
      __typename: 'BlockItem'
    }, {
      _id: 'yLwfdghhdfghApQMtgQS',
      order: 0,
      animationKey: 'Tfqfdghdf9KnctcTuWwnL',
      fields: {
        title: 'Job Title',
        employer: 'Company 2',
        city: 'City',
        startDate: '2016-01-21T17:34:12.118Z',
        endDate: '2017-01-21T17:34:12.118Z',
        description: '{"blocks":[{"key":"6r4tb","text":"Pellentesque non nibh id neque euismod porttitor in in neque.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"9uulu","text":"Suspendisse facilisis iaculis nisl sit amet venenatis facilisis vestibulum.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        __typename: 'BlockFields'
      },
      __typename: 'BlockItem'
    }, {
      _id: 'yLwfdghdfgjdfgjhApQMdfgjgQS',
      order: 0,
      animationKey: 'Tfdfgjfdgjf9KncdfgjcTuWwnL',
      fields: {
        title: 'Job Title',
        employer: 'Company 1',
        city: 'City',
        startDate: '2014-01-21T17:34:12.118Z',
        endDate: '2016-01-21T17:34:12.118Z',
        description: '{"blocks":[{"key":"6r4tb","text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"8m1uq","text":"Maecenas at elit ac nisl ornare iaculis. Etiam congue imperdiet urna in dapibus. ","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        __typename: 'BlockFields'
      },
      __typename: 'BlockItem'
    }],
    __typename: 'Block'
  }, {
    _id: 'w3ceaGqiAmm2dYf8H',
    type: 'LANGUAGES',
    title: 'Languages',
    order: 4,
    animationKey: 'hzbqKHgoFq5ZEzzTE',
    fixedOrder: null,
    required: null,
    items: [{
      _id: 'TvHPnTL5gqLcr5dpb',
      order: 0,
      animationKey: 'zPEWgAhAirpmLKG6f',
      fields: {
        language: 'Language 1',
        languageLevel: 'PROFICIENT',
        __typename: 'BlockFields'
      },
      __typename: 'BlockItem'
    }, {
      _id: 'sjExfnYMRc5ax964D',
      order: 1,
      animationKey: 'XxfRbAzQDqPFhptu8',
      fields: {
        language: 'Language 2',
        languageLevel: 'VERY_GOOD',
        __typename: 'BlockFields'
      },
      __typename: 'BlockItem'
    }],
    hideLevel: null,
    isPlaceholder: true,
    __typename: 'Block'
  },
];
