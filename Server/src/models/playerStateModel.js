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
