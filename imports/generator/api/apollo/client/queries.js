import gql from 'graphql-tag';

import { resumeFull } from '/imports/generator/api/apollo/client/fragments';

export const GET_RESUME = gql`
  query($resumeId: ID!) {
    getResume(resumeId: $resumeId) {
      ...ResumeFull
    }
  }
  ${resumeFull}
`;

export const GET_JOBS = gql`
  query($search: String!) {
    getJobs(search: $search) {
      title
    }
  }
`;

export const GET_SUGGESTIONS = gql`
  query($job: String!, $type: String!) {
    getSuggestions(job: $job, type: $type) {
      _id
      text
    }
  }
`;

export const GET_SCHOOLS = gql`
  query($search: String!) {
    getSchools(search: $search) {
      name
      city
    }
  }
`;
