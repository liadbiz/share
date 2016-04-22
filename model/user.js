var mongodb = require('./database');
var assert = require('assert');
function User(user) {
  this.na = user.na;
  this.password = user.password;
  this.email= user.email;
}
module.exports = User;

User.prototype.save = function(callback) {
  var user = {
    name: this.na,
    password: this.password,
    email: this.email
  };


  mongodb.get().collection('users', function(err, collection) {
    if (err) {
      mongodb.close();
      return callback(err);
    }
    assert('string', !typeof(user.name), user.name );
    collection.insert(user, function(err, user) {
      if (err) {
        return callback(err);
      }
      assert.equal('object', typeof(user), "can not insert user");
      callback(null, user);
    });
  });
};

User.getByName = function(name, callback) {
  var doc = {
    name: name
  };

  mongodb.get().collection('users', function(err, collection) {
    if(err) {
      mongodb.close();
      return callback(err);
    }
    collection.findOne(doc, function(err, user) {
      if (err) {
        return callback(err);
      }
      callback(null, user);
    });
  });
};
