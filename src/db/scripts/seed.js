import { connection } from 'mongoose';
import users from '@db/seeds/users.json';
import { User } from '@db/models';
import { connectDB } from '@db/scripts';
import { db } from '@config/loggers';

const seed = async () => {
  await connectDB();

  // Seed users
  db.await('🌱  Seeding users');
  await User.insertMany(users);

  connection.close();
  db.success('🤟  Database seeded!');
};

seed();
