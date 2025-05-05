'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  const data = `CREATE TABLE telegram_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, 
    telegram_id STRING,
    first_name STRING,
    last_name STRING,
    username STRING
    )`
  
  db.runSql(data, function (err) {
    if (err) return console.log(err);
    callback()
  });
};

exports.down = function (db, callback) {
  const data = `DROP TABLE telegram_users`
  db.runSql(data, function (err) {
    if (err) return console.log(err);
    callback()
  });
};

exports._meta = {
  "version": 1
};
