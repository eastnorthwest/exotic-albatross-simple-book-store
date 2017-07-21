const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// https://scotch.io/tutorials/easy-node-authentication-setup-and-local
// https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
// http://toon.io/understanding-passportjs-authentication-flow/

const Admin = require('../models/admin');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    Admin.getById(id, (err, user) => {
        done(err, user);
    })
})

passport.use('login', new LocalStrategy({
    usernameField: 'username', 
    passwordField: 'password', 
    passReqToCallback : true 
}, function(req, username, password, done) {
    var message = 'Admin login error.';
    Admin.findById(username).then((err, result) => {
        if (result && bcrypt.compareSync(password, result.password)) {
            // success in login
            return done(null, result);
        } else {
            message = 'Invalid password';
        }
        if (err) {
            message = err.message;
        }
        return done(null, false, req.flash('loginMessage', message));            
    }).catch((err) => {
        
        if (err) {
            message = err.message;
        }
        return done(null, false,  req.flash('loginMessage', message));
    });
}
))

module.exports = passport;
