// Express stuff
import express from 'express';
import cookieParser from 'cookie-parser';

// Graphql stuff
import server from './graphql';

const app = express();

// Static

// Middlewares
app.use(express.json(), cookieParser());

server.applyMiddleware({
  app,
  cors: {
    credentials: true,
    origin: true,
  },
});

// Routes

export default app;
