import { userQueries, userMutations } from './user';

const resolvers = {
  Query: {
    ...userQueries,
    serverDate: () => new Date().toISOString(),
  },
  Mutation: {
    ...userMutations,
  },
};

export default resolvers;
