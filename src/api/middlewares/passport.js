const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const Student = require('../models/Student');
const Admin = require('../models/Admin');

opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;
opts.passReqToCallback = true

module.exports = (passport) => {
    passport.use(
        new JwtStrategy(opts, async function (req, jwtPayload, done) {
            if (jwtPayload.role === 'admin') {
                Admin.findOne({ id: jwtPayload._id }, function (err, user) {
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
                })
            }

            if (jwtPayload.role === 'student') {
                Student.findOne({ id: jwtPayload._id }, function (err, user) {
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
                })
            }

        })
    );
};
