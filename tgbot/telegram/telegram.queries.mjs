import sqlite3 from "sqlite3";
import { open } from "sqlite";

const db = await open({
  filename: process.env.DEV_DB,
  driver: sqlite3.Database,
});

export async function isUserSaved({ id }) {
  return await db.get(
    `SELECT telegram_id,remonline_id,first_name,branch_id,branch_public_name FROM telegram_users WHERE telegram_id = ? LIMIT 1`,
    id
  );
}

export async function saveNewUser({ id, first_name, last_name, username }) {
  const sql = `INSERT INTO telegram_users(telegram_id,first_name, last_name, username) VALUES(?,?,?,?)`;
  await db.run(sql, id, first_name, last_name, username);
}

export async function saveRemonlineId({
  telegramId,
  remonlineId,
  branchPublicName,
  branchId,
}) {
  const sql = `UPDATE telegram_users SET remonline_id = ?,branch_public_name = ?,branch_id = ? WHERE telegram_id= ?`;
  await db.run(sql, remonlineId, branchPublicName, branchId, telegramId);
}

export async function resetRemonlineId({ telegramId }) {
  const sql = `UPDATE telegram_users SET remonline_id = ? WHERE telegram_id= ?`;
  await db.run(sql, null, telegramId);
}
export async function getRemonlineIdByTelegramId({ telegramId }) {
  const sql = `SELECT remonline_id from telegram_users WHERE telegram_id= ?`;
  const resp = await db.get(sql,  telegramId);
  // console.log({resp})
  return resp;
}
export async function getBranchList() {
  return await db.all(`SELECT id,public_name FROM branches ORDER BY id asc`);
}

export async function saveNewAsset({ client_id, asset_id,asset_uid }) {
  const sql = `INSERT INTO clients_to_assets (client_id, asset_id, asset_uid) VALUES(?,?,?)`;
  await db.run(sql, client_id, asset_id,asset_uid);
}
export async function getAssetDataByClientId({ clientId }) {
  const sql=`SELECT asset_id, asset_uid FROM clients_to_assets WHERE client_id = ?`;
  return await db.all(sql, clientId);
   
}