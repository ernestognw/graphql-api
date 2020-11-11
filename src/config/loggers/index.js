import { Signale } from 'signale';

const config = {
  displayTimestamp: true,
  displayDate: true,
};

const db = new Signale({
  scope: 'db',
  interactive: true,
  config,
});

const api = new Signale({
  scope: 'api',
  config,
});

export { db, api };
