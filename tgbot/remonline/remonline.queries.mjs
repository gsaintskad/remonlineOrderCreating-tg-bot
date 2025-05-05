import sqlite3 from 'sqlite3';
import { open } from 'sqlite'

const db = await open({
    filename: process.env.DEV_DB,
    driver: sqlite3.Database
})

export async function saveRemonlineToken({ token, validTo }) {//
    const sql = `INSERT INTO remonline_tokens(token, valid_to) VALUES(?,?)`
    await db.run(
        sql,
        token,
        validTo
    )
}

export async function getRemonlineToken({ now }) {
    const sql = `SELECT token FROM remonline_tokens WHERE valid_to > ? ORDER BY created_at DESC LIMIT 1 `
    return await db.get(sql, now)
}

export async function saveOrder({
    orderId,
    orderLable,
    createdBy,
    plateNumber,
    malfunction
}) {
    const sql = `INSERT INTO orders(order_id,order_lable,created_by, plate_number,malfunction) VALUES(?,?,?,?,?)`
    await db.run(
        sql,
        orderId,
        orderLable,
        createdBy,
        plateNumber,
        malfunction
    )
}


export async function getBranchManager(branch_id) {
    return await db.get(`SELECT manager_id FROM branches where id = ?`, branch_id)
}