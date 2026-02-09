import pool from '../config/db.js';

// Enregistre un token de réinitialisation de mot de passe pour un utilisateur
export async function insertPasswordResetToken({ userId, tokenHash, expiresAt }) {
  await pool.query(
    `INSERT INTO password_reset_tokens (user_id, token_hash, expires_at, created_at)
     VALUES (?, ?, ?, NOW())`,
    [userId, tokenHash, expiresAt]
  );
}

// Récupère un token de réinitialisation à partir de son hash
export async function getPasswordResetToken(tokenHash) {
  const [rows] = await pool.query(
    `SELECT id, user_id, token_hash, expires_at, used_at
     FROM password_reset_tokens
     WHERE token_hash = ?
     LIMIT 1`,
    [tokenHash]
  );
  return rows[0] || null;
}

// Marque un token comme utilisé afin d’empêcher sa réutilisation
export async function markPasswordResetTokenUsed(tokenId) {
  await pool.query(
    `UPDATE password_reset_tokens
     SET used_at = NOW()
     WHERE id = ?`,
    [tokenId]
  );
}

// Supprime tous les tokens de réinitialisation associés à un utilisateur
export async function deletePasswordResetTokensByUser(userId) {
  await pool.query(
    `DELETE FROM password_reset_tokens
     WHERE user_id = ?`,
    [userId]
  );
}
