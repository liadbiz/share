var db = require('./database');

function Post (post) {
  if (post) {
    this.title = post.title;
    this.author = post.author;
    this.content = post.content;
    this.tags = post.tags;
  }
}

module.exports = Post;


Post.prototype.save = function(callback) {
  var date = new Date();
  var time = {
    date:  date,
    till_year: date.getFullYear(),
    till_month: date.getFullYear() + '-' + (date.getMonth() + 1),
    till_day:  date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
    till_minute: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getHours() + ':' +
    (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes() )
  };

  var post = {
    title: this.title,
    author: this.author,
    content: this.content,
    time: time,
    comments: [],
    tags: this.tags
  };

  // console.dir(post);
  db.get().collection('posts', function(err, collection) {
    if (err) {
      mongodb.close();
      return callback(err);
    }

    collection.insert(post, {safe: true}, function(err) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      return callback(null);
    });

  });


};

Post.getOne = function(author, title, time, callback) {

    db.get().collection('posts', function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }

      var doc = {
        "author": author,
        "title": title,
        "time.till_minute":  time,

      };

      collection.findOne(doc, function(err, post) {
        if (err) {
          mongodb.close();
          return callback(err);
        }
        return callback(null, post);
      });

  });
};

Post.getAll = function(name, callback) {
    db.get().collection('posts', function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }

      var doc = {};
      if (name) {
        doc.author = name;
      }

      collection.find(doc).sort({time: -1}).toArray(function(err, posts) {
        if (err) {
          mongodb.close();
          return callback(err);
        }
        return callback(null, posts);
      });


  });

};

Post.update = function(author, title, time, content, callback) {
    db.get().collection('posts', function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      collection.update({
        'author': author,
        'title': title,
        'time.till_minute': time
      }, {
        $set: {'content': content}
      },function(err, post) {
        if (err) {
          mongodb.close();
          return callback(err);
        }
        callback(null);
      });
    });
};

Post.remove = function(author, title, time, callback) {
    db.get().collection('posts', function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      collection.remove({
        'author': author,
        'title': title,
        'time.till_minute': time
      }, {
        w: 1  //不是很懂
      },function(err, post) {
        if (err) {
          mongodb.close();
          return callback(err);
        }
        callback(null);
      });
    });
};

Post.getTen = function(name, page, callback) {
    db.get().collection('posts', function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      var doc = {};
      if (name) {
        doc.author = name;
      }
      collection.count(doc, function(err, total) {
        collection.find(doc, {
          skip: (page - 1) * 10,
          limit: 10
        }).sort({time: -1}).toArray(function(err, posts) {
            if (err) {
              mongodb.close();
              return callback(err);
            }
            return callback(null, posts, total);
        });
      });


  });

};


Post.search = function(keyword,   callback) {
    db.get().collection('posts', function(err, collection) {
      if (err) {
        return  callback(err);
      }
      var pattern = new RegExp(keyword, "i");
      collection.count({"title": pattern}, function(err, total) {
        collection.find(
          {"title": pattern}
        ).sort({time: -1}).toArray(function(err, posts) {
          if (err) {
            mongodb.close();
            return callback(err);
          }
          callback(err, posts, total);
        });
      });
    });
};
