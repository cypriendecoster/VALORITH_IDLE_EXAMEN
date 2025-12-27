import pool from '../config/db.js';

export async function getPlayerStats(userId) {
  const [rows] = await pool.query(
    `SELECT user_id, total_play_time_seconds, total_logins, max_realm_unlocked_id,
            max_factory_level_reached, created_at, updated_at
     FROM player_stats
     WHERE user_id = ?
     LIMIT 1`,
    [userId]
  );
  return rows[0] || null;
}
