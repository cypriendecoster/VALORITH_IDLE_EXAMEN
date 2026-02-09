import pool from '../config/db.js';

// Récupère un utilisateur à partir de son adresse email
export async function findByEmail(email) {
    const [rows] = await pool.query(
        `SELECT id, email, password_hash, username, role FROM users WHERE email = ? LIMIT 1`,
        [email]
    );
    return rows[0] || null;
}

// Récupère un utilisateur à partir de son nom d’utilisateur
export async function findByUsername(username) {
    const [rows] = await pool.query(
        `SELECT id, email, password_hash, username, role FROM users WHERE username = ? LIMIT 1`,
        [username]
    );
    return rows[0] || null;
}

// Crée un nouvel utilisateur
export async function createUser({ email, username, passwordHash, role}) {
    const [result] = await pool.query(
        `INSERT INTO users (email, username, password_hash, role, created_at) VALUES (?, ?, ?, ?, NOW())`,
        [email, username,passwordHash, role]
    );
    return result.insertId;
}

// Met à jour la date de dernière connexion d’un utilisateur
export async function updateLastLogin(userId) {
    await pool.query(
        `UPDATE users SET last_login_at = NOW() WHERE id = ?`,
        [userId]
    );
}

// Récupère un utilisateur par son identifiant (sans le mot de passe)
export async function findById(userId) {
    const [rows] = await pool.query(
        `SELECT id, email, username, role, created_at, last_login_at FROM users WHERE id = ? LIMIT 1`,
        [userId]
    );
    return rows[0] || null;
}

// Récupère un utilisateur avec son hash de mot de passe
export async function findByIdWithPassword(userId) {
    const [rows] = await pool.query(
        `SELECT id, email, username, role, password_hash FROM users WHERE id = ? LIMIT 1`,
        [userId]
    );
    return rows[0] || null;
}

// Met à jour le mot de passe d’un utilisateur
export async function updateUserPassword(userId, passwordHash) {
    await pool.query(
        `UPDATE users SET password_hash = ? WHERE id = ?`,
        [passwordHash, userId]
    );
}

// Supprime un utilisateur
export async function deleteUser(userId) {
    await pool.query(
        `DELETE FROM users WHERE id = ?`,
        [userId]
    );
}
