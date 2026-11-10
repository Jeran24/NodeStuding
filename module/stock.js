import db from '../config/db.js';

export async function getUserRole(userId) {
    const [rows] = await db.execute("SELECT role FROM s_users WHERE id = ?", [userId]);
    if (rows.length === 0) return null;
    return rows[0].role;
}

export async function addItem(name, quantity) {
    const [result] = await db.execute("INSERT INTO stock (name, quantity) VALUES (?, ?)", [name, quantity]);
    return result.insertId;
}

export async function getAllItems() {
    const [rows] = await db.execute("SELECT * FROM stock");
    return rows;
}

export async function getItemById(id) {
    const [rows] = await db.execute("SELECT * FROM stock WHERE id = ?", [id]);
    return rows[0];
}

export async function setQuantity(id, quantity, status) {
    await db.execute("UPDATE stock SET quantity = ?, status = ? WHERE id = ?", [quantity, status, id]);
}

export async function deleteItemById(id) {
    await db.execute("DELETE FROM stock WHERE id = ?", [id]);
}