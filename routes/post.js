var Post = require('../model/post');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res){
  res.render('post', {title: 'post page'});
});

router.post('/', function(req, res){
  var tags = [];
  if (typeof( req.body.tags ) == 'string') {
    tags.push(req.body.tags);
  }else if (typeof(req.body.tags) == 'object') {
    req.body.tags.forEach(function(tag, index) {
      tags.push(tag);
    });
  }

  var currentUser = req.session.user,
      post = new Post({
        title: req.body.title,
        author: currentUser.name,
        content: req.body.content,
        tags: tags

      });
  post.save(function(err) {
    if (err) {
      return res.redirect("/");
    }
    return res.redirect("/");
  });
});

module.exports = router;
