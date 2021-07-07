import gql from 'graphql-tag';

import { userFull } from './fragments';

export const CURRENT_USER = gql`
  query {
    currentUser {
      ...UserFull
    }
  }
  ${userFull}
`;
