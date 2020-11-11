// It's required to fill seeders to be able to run tests

/*
  Test file for one resolver.
  Should include tests for any resolvers with related to a specific collection,
  specially if they are complicated queries.

  If a resolver has queries related to two or more collections,
  its test should be related to the main collection involved.

  The name of the file should be collectionName.test.js

  If there are new queries or mutations in an existent resolver,
  the tests should be added to its already defined test file
  to avoid redundancy.
*/

// Import Apollo Server Test client
import { createTestClient } from 'apollo-server-testing';

// Import MongoDB memory server handler
import { createDBConnection, stopDBConnection } from '@config/tests/memory-db-server';

// Import relevant models
import { User } from '@db/models';

// Import relevant seeders
import users from '@db/seeds/users.json';

// Import apollo server
import apolloServer from '@graphql';

// Import relevant queries and mutations
import { GET_USERS, GET_USER } from './queries';
import { CREATE_USER, UPDATE_USER } from './mutations';

const { query, mutate } = createTestClient(apolloServer);

describe('Testing user queries', () => {
  // Actions to take before all tests
  // No need to change it
  beforeAll(async () => {
    await createDBConnection();
  });

  // Actions to take before each test
  beforeEach(async () => {
    await User.insertMany(users);
  });

  // Actions to take after each test
  afterEach(async () => {
    await User.deleteMany({});
  });

  // Actions to take after all tests
  // No need to change it
  afterAll(async () => {
    await stopDBConnection();
  });

  describe('Query users', () => {
    it('should return users', async () => {
      const {
        data: {
          users: { info, results },
        },
      } = await query({ query: GET_USERS });

      expect(info.count).toEqual(users.length);

      results.forEach((result, index) => {
        expect(result.id.toString()).toEqual(users[index]._id);
      });
    });
  });

  describe('Query user', () => {
    it('should return existent user', async () => {
      const userIndex = 2;
      const id = users[userIndex]._id;

      const {
        data: { user },
      } = await query({ query: GET_USER, variables: { id } });
      expect(user.id.toString()).toEqual(id);
    });

    it('should return null when queried an non-existent user', async () => {
      const id = '000000000000000000000000';

      const {
        data: { user },
      } = await query({ query: GET_USER, variables: { id } });

      expect(user).toEqual(null);
    });
  });
});

describe('Testing user mutations', () => {
  // Actions to take before all tests
  // No need to change it
  beforeAll(async () => {
    await createDBConnection();
  });

  // Actions to take before each test
  beforeEach(async () => {
    await User.insertMany(users);
  });

  // Actions to take after each test
  afterEach(async () => {
    await User.deleteMany({});
  });

  // Actions to take after all tests
  // No need to change it
  afterAll(async () => {
    await stopDBConnection();
  });

  describe('Mutation createUser', () => {
    it('should create an user', async () => {
      const newUser = {
        firstName: 'testFirstName',
        lastName: 'testLastName',
        email: 'testEmail',
        profileImg: 'testProfileImg',
      };

      const {
        data: { createUser: user },
      } = await mutate({
        mutation: CREATE_USER,
        variables: { user: newUser },
      });

      Object.keys(newUser).forEach((key) => {
        expect(newUser[key]).toEqual(user[key]);
      });

      expect(user.createdAt).toEqual(user.updatedAt);
    });
  });

  describe('Mutation updateUser', () => {
    it('should update existing user', async () => {
      const userIndex = 1;
      const originalUser = users[userIndex];
      const id = originalUser._id;

      const updatedUser = {
        firstName: 'testFirstName',
        lastName: 'testLastName',
      };

      const {
        data: { updateUser: user },
      } = await mutate({
        mutation: UPDATE_USER,
        variables: { id, user: updatedUser },
      });

      Object.keys(updatedUser).forEach((key) => {
        expect(updatedUser[key]).toEqual(user[key]);
      });

      expect(user.email).toEqual(originalUser.email);
    });

    it('should return null for a non-existing user', async () => {
      const id = '000000000000000000000000';

      const updatedUser = {
        firstName: 'testFirstName',
        lastName: 'testLastName',
      };

      const {
        data: { updateUser: user },
      } = await mutate({
        mutation: UPDATE_USER,
        variables: { id, user: updatedUser },
      });

      expect(user).toEqual(null);
    });
  });
});
