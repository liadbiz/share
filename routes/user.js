var Post = require('../model/post');
var User = require('../model/user');
var express = require('express');
var router = express.Router();

router.get('/:name', function(req, res) {
  User.getByName(req.params.name, function(err, user) {
    if (!user) {
      return res.redirect('/');
    }
    Post.getAll(req.params.name, function(err, posts) {
      res.render('user', {
        title: "user all post",
        user: req.session.user,
        posts: posts,
      });
    });
  });
});

module.exports = router;
