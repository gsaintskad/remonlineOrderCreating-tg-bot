"use strict";

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
  const data = `CREATE TABLE clients_to_assets (
    client_id INTEGER NOT NULL,
    asset_id INTEGER NOT NULL
    );`;
  db.runSql(data, function (err) {
    if (err) return console.log(err);
    callback();
  });
};

exports.down = function (db, callback) {
  const data = `DROP TABLE clients_to_assets`;
  db.runSql(data, function (err) {
    if (err) return console.log(err);
    callback();
  });
};

exports._meta = {
  version: 1,
};
