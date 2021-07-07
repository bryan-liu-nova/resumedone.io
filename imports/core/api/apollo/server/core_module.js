import { queryText, queries } from './queries';
import { mutationText, mutations } from './mutations';
import { resolvers } from './resolvers';
import schema from './schema.graphql';

export default {
  name: 'core',
  queryText,
  queries,
  mutationText,
  mutations,
  resolvers,
  schema
};
