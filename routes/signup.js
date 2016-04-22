var crypto = require('crypto');
var User = require('../model/user');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('signup', {title: 'signup'});
});

router.post('/' ,function(req, res, next) {
  var name = req.body.name,
      password = req.body.pwd,
      password_re = req.body.pwd_re;
      email = req.body.email;

  if (password != password_re) {
    req.flash('error', "two passsword is different");
    return res.redirect('/signup');
  }
  var md5 = crypto.createHash('md5'), password_hex = md5.update(password).digest('hex');
  var newUser = new User ({ na: name, password: password_hex, email: email });
  console.dir(newUser);
  User.getByName(name, function(err, user) {
    if (err) { req.flash('error', err);
    return res.redirect('/');
    }
    if (user) {

      req.flash('error', "user has already exist");
      return res.redirect('/login');
    }
    newUser.save(function(err, user) {
      if (err) {
        return res.redirect('/');
      }
      req.session.user = user;

      return res.redirect('/');
    });

  });
});

module.exports = router;
