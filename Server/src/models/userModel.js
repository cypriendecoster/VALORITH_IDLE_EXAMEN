import pool from '../config/db.js';

export async function findByEmail(email) {
    const [rows] = await pool.query(
        `SELECT id, email, password_hash, username, role FROM users WHERE email = ? LIMIT 1`,
        [email]
    );
    return rows[0] || null;
}

export async function findByUsername(username) {
    const [rows] = await pool.query(
        `SELECT id, email, password_hash, username, role FROM users WHERE username = ? LIMIT 1`,
        [username]
    );
    return rows[0] || null;
}

export async function createUser({ email, username, passwordHash, role}) {
    const [result] = await pool.query(
        `INSERT INTO users (email, username, password_hash, role, created_at) VALUES (?, ?, ?, ?, NOW())`,
        [email, username,passwordHash, role]
    );
    return result.insertId;
}

export async function updateLastLogin(userId) {
    await pool.query(
        `UPDATE users SET last_login_at = NOW() WHERE id = ?`,
        [userId]
    );
}

export async function findById(userId) {
    const [rows] = await pool.query(
        `SELECT id, email, username, role, created_at, last_login_at FROM users WHERE id = ? LIMIT 1`,
        [userId]
    );
    return rows[0] || null;
}