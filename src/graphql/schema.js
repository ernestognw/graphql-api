import { join } from 'path';
import { readdirSync, readFileSync } from 'fs';
import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from '@graphql/resolvers';
import { paginate } from '@graphql/directives';

const gqlFiles = readdirSync(join(__dirname, './typedefs'));

let typeDefs = '';

gqlFiles.forEach((file) => {
  typeDefs += readFileSync(join(__dirname, './typedefs', file), { encoding: 'utf8' });
});

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  schemaDirectives: {
    paginate,
  },
});

export default schema;
