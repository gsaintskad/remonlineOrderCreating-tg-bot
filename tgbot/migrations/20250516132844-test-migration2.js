'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  const sql = `CREATE TABLE orders3 (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, 
    order_id STRING,
    order_lable STRING,
    created_by STRING,
    plate_number STRING,
    malfunction STRING
    );`
  db.runSql(sql, function (err) {
    if (err) return console.log(err);
    callback();
  });
};

exports.down = function (db, callback) {
  const data = `DROP TABLE orders3`
  db.runSql(data, function (err) {
    if (err) return console.log(err);
    callback();
  });
};
exports._meta = {
  "version": 1
};
