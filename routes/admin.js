const express = require('express');
const router = express.Router();

module.exports = (passport) => {

    router.post('/login', passport.authenticate('login', {
        failureRedirect: '/admin/login',
        failureFlash: true
    }), (req, res, next) => {
        console.log('ALL OK');
        res.redirect('/admin');
    });

    router.get('/login', (req, res) => {
        console.log('show admin/login')
        res.render('admin/login', 
            {'loginMessage' : req.flash('loginMessage')}
        );
    });

    router.get('/logout', (req, res) => {
        console.log('show admin/logout');
        req.logout();
        res.redirect('/admin/login');
    });

    router.get('/', (req, res) => {
        if (!req.isAuthenticated()) {
            req.logout();
            req.flash('loginMessage', 'Session invalid.  Please login.');
            res.redirect('/admin/login');
        } else {
            res.render('admin/index');
        }
    })
    
    return router;
}