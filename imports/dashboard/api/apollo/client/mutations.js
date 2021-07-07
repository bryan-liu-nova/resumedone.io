import gql from 'graphql-tag';
import { resumeFull } from '/imports/generator/api/apollo/client/fragments';

export const CREATE_RESUME = gql`
  mutation CreateResume($template: String) {
    createResume(template: $template) {
      ...ResumeFull
    }
  }
  ${resumeFull}
`;

export const REMOVE_RESUME = gql`
  mutation RemoveResume($resumeId: ID!) {
    removeResume(resumeId: $resumeId) {
      ...ResumeFull
    }
  }
  ${resumeFull}
`;

export const DUPLICATE_RESUME = gql`
  mutation DuplicateResume($resumeId: ID!) {
    duplicateResume(resumeId: $resumeId) {
      ...ResumeFull
    }
  }
  ${resumeFull}
`;

export const SET_USER_INFO = gql`
  mutation SetUserInfo($firstName: String!, $lastName: String, $email: String!) {
    setUserInfo(firstName: $firstName, lastName: $lastName, email: $email)
  }
`;

export const DELETE_ACCOUNT = gql`
  mutation DeleteAccount {
    deleteAccount {
      _id
    }
  }
`;
