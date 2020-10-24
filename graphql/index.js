import { ApolloServer } from 'apollo-server-express';
import { env } from '@config/environment';
import schema from '@graphql/schema';

const playgroundSettings = {
  settings: {
    'editor.theme': 'dark',
  },
};

const apolloServer = new ApolloServer({
  schema,
  playground: env.development ? playgroundSettings : false,
});

export default apolloServer;
