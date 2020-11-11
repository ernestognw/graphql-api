import DataLoader from 'dataloader';
import { User } from '@db/models';
import resolveUser from '@graphql/resolvers/user';

const createLoader = (Model, resolve) => {
  const loader = new DataLoader(async (ids) => Model.find({ _id: { $in: ids } }));

  return {
    one: async (id, loaders) => {
      const development = await loader.load(id.toString());
      return resolve.one(development, loaders);
    },
    many: async (ids, loaders) => {
      const developments = await loader.loadMany(ids.map((id) => id.toString()));
      return resolve.many(developments, loaders);
    },
  };
};

const context = async () => {
  const loaders = {
    user: createLoader(User, resolveUser),
  };

  return { loaders };
};

export default context;
