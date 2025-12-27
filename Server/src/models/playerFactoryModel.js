import pool from '../config/db.js';

export async function getPlayerFactories(userId) {
  const [rows] = await pool.query(
    `SELECT id, user_id, factory_id, level, created_at, updated_at
     FROM player_factories
     WHERE user_id = ?
     ORDER BY factory_id`,
    [userId]
  );
  return rows;
}
