import pool from '../config/db.js';

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
