import { User } from '@db/models';
import { hashSync } from 'bcryptjs';
import { generate } from 'generate-password';
import resolveUser from '@graphql/resolvers/user';

const userMutations = {
  createUser: async (_, { user }, { loaders }) => {
    const password = generate();

    const newUser = new User({
      ...user,
      password: hashSync(password),
    });
    const savedUser = await newUser.save();

    return resolveUser.one(savedUser, loaders);
  },
  updateUser: async (_, { id, user }, { loaders }) => {
    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { $set: { ...user } },
      { new: true }
    );

    return resolveUser.one(updatedUser, loaders);
  },
};

export default userMutations;
