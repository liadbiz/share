var express = require('express');
var router = express.Router();
var login = require('./login');
var signup = require('./signup');
var logout = require('./logout');
var post = require('./post');


module.exports = function(app) {
    app.get('/', function(req, res, next) {
      res.render('index', {
        title: 'world' ,
        user: req.session.user
      });
    });

    app.use('/signup', signup);
    app.use('/login', login);
    app.use('/logout', logout);
    app.use('/post', post);
};
