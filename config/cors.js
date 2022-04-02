const cors = require('cors');

module.exports = function (app) {
  app.use(
    cors({
      origin: [`https://${process.env.DEV_HOST}`, `http://${process.env.DEV_HOST}`, `${process.env.DEV_HOST}`],
      methods: ['GET', 'POST', 'PUT', 'PATCH'],
      credentials: true
    })
  );
};
