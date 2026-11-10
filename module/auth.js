import db from '../config/db.js';

export async function createAccount(name, email, passwordHash, role) {
    const [result] = await db.execute(
        "INSERT INTO s_users (name, email, password, role) VALUES (?, ?, ?, ?)",
        [name, email, passwordHash, role]
    );
    return result.insertId;
}

export async function findByEmail(email) {
    const [rows] = await db.execute("SELECT * FROM s_users WHERE email = ?", [email]);
    return rows[0];
}

export async function saveSession(token, userId) {
    await db.execute("INSERT INTO sessions (token, user_id) VALUES (?, ?)", [token, userId]);
}

export async function findSession(token) {
    const [rows] = await db.execute("SELECT user_id FROM sessions WHERE token = ?", [token]);
    return rows[0];
}

export async function deleteSession(token) {
    await db.execute("DELETE FROM sessions WHERE token = ?", [token]);
}