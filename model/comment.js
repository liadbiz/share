var mongodb = require('./database');

function Comment(postAuthor, postTitle, postTime, userName, commentContent, replyUserName) {
  this.postAuthor = postAuthor;
  this.postTitle  = postTitle;
  this.postTime = postTime;
  this.userName = userName;
  this.commentContent = commentContent;
  this.replyUserName = replyUserName;
}

module.exports = Comment;

Comment.prototype.save = function(callback) {
  var date = new Date();
  var postDoc = {
    'author': this.postAuthor,
    'title': this.postTitle,
    'time.till_minute': this.postTime
  },
  time = {
    date:  date,
    till_year: date.getFullYear(),
    till_month: date.getFullYear() + '-' + (date.getMonth() + 1),
    till_day:  date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
    till_minute: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getHours() + ':'
    + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes() )
  },
  comment = {
    userName: this.userName,
    commentTime: time.till_day,
    commentContent: this.commentContent,
    replyUserName: this.replyUserName
  };
  console.dir(comment);

    mongodb.get().collection('posts', function(err, collection) {
      if (err) {
        mongodb.close();
        callback(err);
      }
      collection.update(postDoc, {$push: {'comments': comment}}, function(err, post) {
        // console.log(post);
        if (err) {
          mongodb.close();
          return callback(err);
        }
        callback(null);
      });
    });


};
