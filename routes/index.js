var Post = require('../model/post');
var express = require('express');
var router = express.Router();
var login = require('./login');
var signup = require('./signup');
var logout = require('./logout');
var post = require('./post');
var article = require('./article');
var comment = require('./comment');

module.exports = function(app) {
    app.get('/', function(req, res, next) {
      Post.getAll(null, function(err, posts, total) {
        if (err){
          posts = [];
        }
        res.render('index', {
          title: 'main page',
          user: req.session.user,
          posts: posts,
          total: total,
          // page: page,
          // isFirstPage: (page - 1)  == 0,
          // isLastPage: ((page -1) * 10 + posts.length) == total,
        });
      });
    });

    app.use('/signup', signup);
    app.use('/login', login);
    app.use('/logout', logout);
    app.use('/post', post);
    app.use('/u', article);
    app.use('/comment', comment);
};
