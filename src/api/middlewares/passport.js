const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/User');

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, function (jwtPayload, done) {
      User.findOne({ id: jwtPayload._id }, function (err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user.hidePassword());
        } else {
          return done(null, false);
          // or you could create a new account
        }
      });
    })
  );
};
