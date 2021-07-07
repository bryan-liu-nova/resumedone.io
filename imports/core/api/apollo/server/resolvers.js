import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

export const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value; // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value); // ast value is always in string format
      }
      return null;
    }
  }),
  Value: new GraphQLScalarType({
    name: 'Value',
    description: 'Used to update for ex. form fields. Can be String, Int or Boolean',
    parseValue(value) {
      return value;
    },
    serialize(value) {
      return value;
    },
    parseLiteral(ast) {
      if (ast.kind === ast.kind) {
        return ast.value; // ast value is always in string format
      }
      return null;
    }
  })
};
