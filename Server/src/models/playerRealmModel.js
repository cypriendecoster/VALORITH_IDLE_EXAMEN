import pool from '../config/db.js';

// Récupère tous les royaumes débloqués par un joueur
export async function getPlayerRealms(userId) {
  const [rows] = await pool.query(
    `SELECT id, user_id, realm_id, unlocked_at, is_active
     FROM player_realms
     WHERE user_id = ?
     ORDER BY realm_id`,
    [userId]
  );
  return rows;
}

// Récupère un royaume précis d’un joueur
export async function getPlayerRealm(userId, realmId) {
  const [rows] = await pool.query(
    `SELECT id, is_active
     FROM player_realms
     WHERE user_id = ? AND realm_id = ?
     LIMIT 1`,
    [userId, realmId]
  );
  return rows[0] || null;
}

// Débloque un nouveau royaume pour un joueur
export async function insertPlayerRealm(userId, realmId) {
  await pool.query(
    `INSERT INTO player_realms (user_id, realm_id, unlocked_at, is_active)
     VALUES (?, ?, NOW(), 0)`,
    [userId, realmId]
  );
}

// Définit le royaume actif d’un joueur
export async function setActiveRealm(userId, realmId) {
  await pool.query(
    `UPDATE player_realms
     SET is_active = CASE WHEN realm_id = ? THEN 1 ELSE 0 END
     WHERE user_id = ?`,
    [realmId, userId]
  );
}
