import { connection } from 'mongoose';
import taks from '@db/seeds/tasks.json';
import { Task } from '@db/models';
import { connectDB } from '@db/scripts';
import { db } from '@config/loggers';

const seed = async () => {
  await connectDB();

  // Seed users
  db.await('🌱  Seeding users');
  await Task.insertMany(taks);

  connection.close();
  db.success('🤟  Database seeded!');
};

seed();
