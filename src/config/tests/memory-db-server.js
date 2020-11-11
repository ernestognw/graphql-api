/*
  MongoDB Memory Server handler.
  Used to create and destroy memory DB connection for backend tests.
  No need to change.
*/
import Mongoose from 'mongoose';

// Import runtime to avoid Reference Error: regeneratorRuntime is not defined
// eslint-disable-next-line import/no-extraneous-dependencies
import 'regenerator-runtime/runtime';

// Should disable eslint for MongoMemoryServer import, to allow it to be in dev-dependencies.
// eslint-disable-next-line import/no-extraneous-dependencies
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongoServer = new MongoMemoryServer();

const createDBConnection = async () => {
  const mongoUri = await mongoServer.getUri();

  await Mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
};

const stopDBConnection = async () => {
  await Mongoose.connection.close();
  return mongoServer.stop();
};

export { createDBConnection, stopDBConnection };
