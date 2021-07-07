import { ApolloServer } from 'apollo-server-express';
import { WebApp } from 'meteor/webapp';
import { getUser } from 'meteor/apollo';
import stringify from 'json-stringify-safe';
import get from 'lodash/get';

import { loadModules } from './loadModules';

// Modules
import core from './core_module';
import checkout from '/imports/checkout/api/apollo/server';
import generator from '/imports/generator/api/apollo/server';
import dashboard from '/imports/dashboard/api/apollo/server';
import onboarding from '/imports/onboarding/api/apollo/server';

const { typeDefs, resolvers } = loadModules([
  core,
  checkout,
  generator,
  dashboard,
  onboarding
]);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: res => {
    const errors = get(res, 'errors', []);
    try {
      JSON.stringify(errors);
    } catch (err) {
      res.errors = JSON.parse(stringify(res.errors));
    }
    return res;
  },
  context: async ({ req }) => ({
    user: await getUser(req.headers.authorization)
  })
});

server.applyMiddleware({
  app: WebApp.connectHandlers,
  path: '/graphql',
  bodyParserConfig: {
    limit: '2mb',
  },
});

WebApp.connectHandlers.use('/graphql', (req, res) => {
  if (req.method === 'GET') {
    res.end()
  }
});
