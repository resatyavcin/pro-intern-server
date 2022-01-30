//We have added the .env file where we keep the relative environment variables and the path where it is located.
require('dotenv').config('/.env');
// We defined the database file and started it as a constructor.

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const passport = require('passport');

require("./src/helper/cors")(app);
require("./src/helper/prod")(app);
require('./src/helper/db')();

const user_router = require('./src/router/user_router');

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(passport.initialize());

app.use('/api/user', user_router);

// Passport config
require('./src/middleware/passport')(passport);

app.listen(process.env.PORT, () => {
  console.log('listening on port: ' + process.env.PORT);
});
