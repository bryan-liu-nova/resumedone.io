import gql from 'graphql-tag';

export const CREATE_SUBSCRIPTION = gql`
  mutation CreateSubscription($token: String, $email: String, $plan: String) {
    createSubscription(token: $token, email: $email, plan: $plan) {
      success
      error
    }
  }
`;
