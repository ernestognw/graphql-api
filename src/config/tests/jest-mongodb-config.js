/*
  File to config MongoDB Memory Server.

  No need to change it.
*/

module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: 'jest'
    },
    binary: {
      skipMD5: true
    },
    autoStart: false
  }
};
