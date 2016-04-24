var crypto = require('crypto');
var User = require('../model/user');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('login', {title: 'login', user: req.session.user});
});

router.post('/', function(req, res, next) {
  var name = req.body.name;
  var password = req.body.pwd;

  var md5 = crypto.createHash('md5'),
  password_hex = md5.update(password).digest('hex');

  var newUser = new User ({
    na: name,
    password: password_hex,
    email: ""
  });

  User.getByName(name, function(err, user) {
    if (!user) {
      res.redirect('/login');
    }
    if (password_hex != user.password) {
      res.redirect("./login");
    }
    req.session.user = user;
    res.redirect("/");
  });
});

module.exports = router;
