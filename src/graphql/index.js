import { ApolloServer } from 'apollo-server-express';
import { env } from '@config/environment';
import schema from '@graphql/schema';
import context from '@graphql/context';

const playgroundSettings = {
  settings: {
    'editor.theme': 'dark',
  },
};

const apolloServer = new ApolloServer({
  schema,
  playground: env.development ? playgroundSettings : false,
  context,
});

export default apolloServer;
