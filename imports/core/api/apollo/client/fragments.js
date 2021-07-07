import gql from 'graphql-tag';

export const allBlockFields = gql`
  fragment AllBlockFields on BlockFields {
    title
    employer
    city
    startDate
    endDate
    current
    description
    skill
    skillLevel
    label
    url
    school
    degree
    hobbies
    language
    languageLevel
    course
    institution
    fullName
    company
    phone
    email
  }
`;

export const fullDetails = gql`
  fragment FullDetails on ResumeDetails {
    title
    firstName
    lastName
    email
    phone
    userPic
    country
    city
    address
    postalCode
    driversLicence
    nationality
    placeOfBirth
    dateOfBirth
    professionalSummary
    socialLinks {
      label
      url
    }
  }
`;

export const userFull = gql`
  fragment UserFull on User {
    _id
    createdAt
    personalData {
      firstName
      lastName
      email
      phone
    }
    serviceData {
      onboard
      template
      subscriptionId
    }
  }
`;
