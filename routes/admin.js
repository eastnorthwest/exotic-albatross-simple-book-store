const express = require('express');
const routes = express.Router();

module.exports = (passport) => {
    
    routes.post('/', passport.authenticate('local', {
        successRedirect: '/admin', 
        failureRedirect: '/login',
        failureFlash: true
    }));

    routes.get('/login', (req, res) => {
        res.render('admin/login', 
            {'loginMessage' : req.flash('loginMessage')}
        );
    });

    routes.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/login');
    });

    routes.get('/', (req, res) => {
        if (!req.isAuthenticated()) {
            req.logout();
            req.flash('loginMessage', 'Session invalid.  Please login.');
            res.redirect('/login');
        }
        res.render('admin/index');
        }
    )
    return routes;
}