import coreSchema from './schema.graphql';
/**
 *
 * @param modules
 * @returns {{typeDefs: string[], resolvers: {RootQuery: {}, RootMutation: {}}}}
 */
export const loadModules = modules => {
  let queries = '';
  let mutations = '';
  const resolvers = {
    RootQuery: {},
    RootMutation: {}
  };

  modules.forEach(module => {
    if (module.resolvers) Object.assign(resolvers, module.resolvers);
    if (module.queries) Object.assign(resolvers.RootQuery, module.queries);
    if (module.mutations) Object.assign(resolvers.RootMutation, module.mutations);
    if (module.queryText) queries += module.queryText;
    if (module.mutationText) mutations += module.mutationText;
  });

  const schema = `
    type RootQuery {
      ${queries}
    }
    type RootMutation {
      ${mutations}
    }
    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `;

  const typeDefs = [schema].concat(modules.map(m => m.schema || '')).concat(coreSchema);

  return { typeDefs, resolvers };
};
