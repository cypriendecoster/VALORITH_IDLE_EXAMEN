import pool from '../config/db.js';

export async function getPlayerSessions(userId) {
  const [rows] = await pool.query(
    `SELECT id, user_id, login_at, logout_at, ip_address, user_agent
     FROM player_session
     WHERE user_id = ?
     ORDER BY login_at DESC`,
    [userId]
  );
  return rows;
}
