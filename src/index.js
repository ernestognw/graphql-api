import { db, api } from '@config/loggers';
import { port, env } from '@config/environment';
import { connectDB } from '@db/scripts';
import app from './app';

const start = async () => {
  db.await('Connecting to database');
  try {
    await connectDB();
    db.success('🔥  Connected to DB');

    if (env.production) {
      await app.listen(443);
    }

    await app.listen(env.production ? 80 : port);
    api.success(`🚀  GraphQL server running at port: ${port}`);
  } catch {
    db.error('Failed to connect to DB');
    api.error('Not able to run GraphQL server');
  }
};

start();
