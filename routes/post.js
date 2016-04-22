var Post = require('../model/post');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res){
  res.render('post', {title: 'post page'});
});

router.post('/', function(req, res){

  var currentUser = req.session.user,
      post = new Post({
        title: req.body.title,
        author: currentUser.name,
        content: req.body.content,
      });
  post.save(function(err) {
    if (err) {
      return res.redirect("/");
    }
    return res.redirect("/");
  });
});

module.exports = router;
