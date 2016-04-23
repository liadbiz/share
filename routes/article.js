var Post = require('../model/post');
var express = require('express');
var User = require('../model/user');
var router = express.Router();

router.get('/:name/:title/:time', function(req, res) {
  User.getByName(req.params.name, function(err, user) {
    console.log(req.params.name);
    if (!user) {
      console.log('no user');
      return;
      // return res.redirect('/');
    }

    Post.getOne(req.params.name, req.params.title, req.params.time, function(err, post) {
      if (err) {
        req.flash('error', err);
      }
      res.render('article', {
        author: user.name,
        user: req.session.user,
        post: post,
      });
    });
  });
});

module.exports = router;
