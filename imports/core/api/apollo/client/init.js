import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { MeteorAccountsLink } from 'meteor/apollo';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client'
import DebounceLink from 'apollo-link-debounce';

const cache = new InMemoryCache();

const sendToLoggingService = errors => console.log(errors);

export const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        sendToLoggingService(graphQLErrors);
      }
      if (networkError) {
        // logoutUser();
      }
    }),
    new DebounceLink(1000),
    new MeteorAccountsLink(),
    new createUploadLink({
      uri: '/graphql',
      credentials: 'same-origin'
    }),
  ]),
  cache,
});

export default client;
