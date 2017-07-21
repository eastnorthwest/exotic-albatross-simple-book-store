const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// https://scotch.io/tutorials/easy-node-authentication-setup-and-local
// https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
// http://toon.io/understanding-passportjs-authentication-flow/

const admin = require('../models/admin');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    admin.getById(id, (err, user) => {
        done(err, user);
    });
})

passport.use('login', new LocalStrategy({
    usernameField: 'username', 
    passwordField: 'password', 
    passReqToCallback : true 
}, function(req, username, password, done) {
    var message = 'Admin login error.';
    admin.getById(username).then((result) => {
        if (result && bcrypt.compareSync(password, result.passwordHash)) {
            // success in login
            console.log('okLogin', result)
            return done(null, result);
        } else {
            message = 'Invalid password';
        }
        return done(null, false, req.flash('loginMessage', message));            
    }).catch((err) => {
        if (err) {
            message = err;
        }
        return done(null, false,  req.flash('loginMessage', message));
    });
}
))

module.exports = passport;
