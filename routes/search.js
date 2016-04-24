var express = require('express');
var router = express.Router();
var Post  = require('../model/post');

router.get('/', function(req, res) {
  // var page = req.query.p ? parseInt(req.query.p) : 1;
  Post.search(req.query.search_keyword, function(err, posts, total) {
    if (err) {
      return req.redirect('/');
    }
    res.render('search', {
      posts: posts,
      // total: total,
      // page: page,
      // isFirstPage: (page - 1)  == 0,
      // isLastPage: ((page -1) * 10 + posts.length) == total,
      user: req.session.user,
      title: "search: " + req.query.search_keyword,
    });
  });
});

module.exports = router;
