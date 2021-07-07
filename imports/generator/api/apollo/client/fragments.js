import gql from 'graphql-tag';
import { allBlockFields, fullDetails } from '/imports/core/api/apollo/client/fragments';

export const resumeFull = gql`
  fragment ResumeFull on Resume {
    _id
    createdAt
    updatedAt
    updatesCount
    restructureCount
    author
    name
    steps
    currentStep
    details {
      ...FullDetails
    }
    settings {
      color
      template
      status
    }
    blocks {
      _id
      type
      title
      order
      animationKey
      fixedOrder
      required
      items {
        _id
        order
        animationKey
        fields {
          ...AllBlockFields
        }
      }
      hideLevel
      hideReferences
      required
    }
  }
  ${allBlockFields}
  ${fullDetails}
`;
