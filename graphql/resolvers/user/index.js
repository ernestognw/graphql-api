import userQueries from './queries';
import userMutations from './mutations';

const resolveUser = {
  /**
   * The idea is to use loaders to dynamically
   * create relations in the future
   *
   * Remove the eslint bypass when that happens
   */

  // eslint-disable-next-line no-unused-vars
  one: (user, loaders) => ({
    ...user._doc,
    id: user._doc._id,
  }),
  many: (users, loaders) => users.map((user) => resolveUser.one(user, loaders)),
};

export { userQueries };
export { userMutations };
export default resolveUser;
