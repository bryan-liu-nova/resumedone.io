import gql from 'graphql-tag';

export const SET_FIRST_NAME = gql`
  mutation SetFirstName($firstName: String!) {
    setFirstName(firstName: $firstName) {
      success
    }
  }
`;
