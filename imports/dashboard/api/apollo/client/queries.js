import gql from 'graphql-tag';

export const LIST_RESUMES = gql`
  {
    listResumes {
      _id
      updatedAt
      createdAt
      name
      currentStep
      details {
        title
      }
      settings {
        template
        color
      }
    }
  }
`;
