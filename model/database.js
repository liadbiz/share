var mongoDb = require('mongodb').MongoClient;

var dbState = {
    db: null
};

exports.connect = function(url, callback) {
    if (dbState.db) return callback();
    mongoDb.connect(url, function(err, db) {
        if(err) return callback(err);
        dbState.db = db;
        return callback();
    });
};


exports.get = function() {
   return dbState.db;
};

exports.close = function(callback) {
    if(dbState.db){
        dbState.db.close(function(err, result) {
          if(err) callback(err);
          dbState.db = null;
        });

    }
};
