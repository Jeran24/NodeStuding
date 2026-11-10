import db from '../config/db.js';

export async function addUser(name, email) {
    const [result] = await db.execute("INSERT INTO inv(name, email) VALUES (?, ?)", [name, email]);
    return result.insertId;
}

export async function getAllUsers() {
    const [rows] = await db.execute("SELECT * FROM inv");
    return rows;
}

export async function updateUserById(id, name, email) {
    await db.execute("UPDATE inv SET name = ?, email = ? WHERE id = ?", [name, email, id]);
}

export async function deleteUserById(id) {
    await db.execute("DELETE FROM inv WHERE id = ?", [id]);
}