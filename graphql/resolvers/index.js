// Task
import taskQueries from './task/queries';
import taskMutations from './task/mutations';

const resolvers = {
  Query: {
    ...taskQueries,
    serverDate: () => new Date().toISOString(),
  },
  Mutation: {
    ...taskMutations,
  },
};

export default resolvers;
