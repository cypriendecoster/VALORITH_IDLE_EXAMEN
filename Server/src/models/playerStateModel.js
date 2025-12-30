import pool from '../config/db.js';

export async function getPlayerState(userId) {
  const [rows] = await pool.query(
    `SELECT user_id, last_idle_update
     FROM player_state
     WHERE user_id = ?
     LIMIT 1`,
    [userId]
  );
  return rows[0] || null;
}

export async function upsertPlayerState(userId, lastIdleUpdate) {
  await pool.query(
    `INSERT INTO player_state (user_id, last_idle_update)
     VALUES (?, ?)
     ON DUPLICATE KEY UPDATE last_idle_update = VALUES(last_idle_update)`,
    [userId, lastIdleUpdate]
  );
}
