const helmet = require('helmet');

module.exports = (app) => {
  if (process.env.NODE_ENV == 'production') {
    app.use(helmet());
  }
};
