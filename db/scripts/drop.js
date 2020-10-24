import { connection } from 'mongoose';
import { connectDB } from '@db/scripts';
import { db } from '@config/loggers';

const drop = async () => {
  await connectDB();

  await connection.dropDatabase();

  await connection.close();

  db.success('✅  Database clean!');
};

drop();
