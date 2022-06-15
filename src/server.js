/*
  We have added the .env file where we keep the
  relative environment variables and the path where it is located.
*/
require('dotenv').config('../.env');
// We defined the database file and started it as a constructor.

const express = require('express');
const app = express();
const cors = require('cors');

require('../config/prod')(app);
require('../config/db')();

const bodyParser = require('body-parser');
const passport = require('passport');

// Routers
const authRouter = require('./api/routers/authRouter');
const studentRouter = require('./api/routers/studentRouter');
const internRouter = require('./api/routers/internRouter');

// Middlewares
const permission = require('../src/api/middlewares/permission');

// Passport config
require('./api/middlewares/passport')(passport);
// Use Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

app.get('/', (req, res) => res.send('Hello Express!'));

// Use Routes
app.use('/api/auth', authRouter);
app.use('/api/student', passport.authenticate('jwt', { session: false }), permission(['ADMIN']), studentRouter);
app.use('/api/intern', passport.authenticate('jwt', { session: false }), internRouter);

app.listen(process.env.PORT, () => {
  console.log('listening on port: ' + process.env.PORT);
});
