/*
  We have added the .env file where we keep the
  relative environment variables and the path where it is located.
*/
require('dotenv').config('../.env');
// We defined the database file and started it as a constructor.

const express = require('express');
const app = express();

require('./config/cors')(app);
require('./config/prod')(app);
require('./config/db')();

const bodyParser = require('body-parser');
const passport = require('passport');

// Passport config
require('./api/middlewares/passport')(passport);

// Routers
const userRouter = require('./api/routers/userRouter');

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Use Middlewares
app.use(passport.initialize());

// Use Routes
app.use('/api/auth', userRouter);

app.listen(process.env.PORT, () => {
  console.log('listening on port: ' + process.env.PORT);
});
