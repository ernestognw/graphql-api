import { User } from '@db/models';
import resolveUser from '@graphql/resolvers/user';

const userQueries = {
  users: async (_, { params = { page: 1, pageSize: 100 } }, { loaders }) => {
    const query = { deleted: false };
    const { page, pageSize } = params;

    const [results, count] = await Promise.all([
      User.find(query)
        .skip(pageSize * (page - 1))
        .limit(pageSize),
      User.countDocuments(query),
    ]);

    return {
      results: resolveUser.many(results, loaders),
      count,
      params,
    };
  },
  user: async (_, { id }, { loaders }) => {
    const user = await User.findOne({ _id: id });

    return resolveUser.one(user, loaders);
  },
};

export default userQueries;
