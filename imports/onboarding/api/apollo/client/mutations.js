import gql from 'graphql-tag';

import { userFull } from '/imports/core/api/apollo/client/fragments';

export const SET_EMAIL_AND_NAME = gql`
  mutation SetEmailAndName($firstName: String, $lastName: String, $email: String!, $phone: String) {
    setEmailAndName(firstName: $firstName, lastName: $lastName, email: $email, phone: $phone) {
      success
      next
      user {
        ...UserFull
      }
    }
  }
  ${userFull}
`;

export const GO_BACK_TO_NAME = gql`
  mutation GoBackToName {
    goBackToName {
      success
      user {
        ...UserFull
      }
      error
      next
      finished
    }
  }
  ${userFull}
`;
