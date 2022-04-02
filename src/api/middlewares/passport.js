const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/User');

opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;
opts.passReqToCallback = true;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, function (req, jwtPayload, done) {
      User.findOne({ _id: jwtPayload._id }, function (err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          req['user'] = user;

          return done(null, user);
        } else {
          return done(null, false);
          // or you could create a new account
        }
      });
    })
  );
};
