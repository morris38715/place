const JwtStrategy = require('passport-jwt').Strategy;

// Get user model
const User = require('../models/user');
const config = require('../config/database');

module.exports = function(passport) {
    var opts = {};
    console.log(config.secret);
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        User.findOne({id: jwt_payload.id}, function(err, user) {
            if (err) return done(err, false);
            if (user) return done(null, user);
            else {
                done(null, false);
            }
        });
    }));
}