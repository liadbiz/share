var Comment = require('../model/comment');
var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
  var crtUser = req.session.user;
  var comment =  new Comment(req.body.postAuthor, req.body.postTitle, req.body.postTime, crtUser.name, req.body.commentContent, req.body.replyUserName);
  (req.body.replyUserName);
  comment.save(function(err) {
    if (err) {
      res.redirect('back');
    }
    res.redirect('back');
  });
})

module.exports = router;
