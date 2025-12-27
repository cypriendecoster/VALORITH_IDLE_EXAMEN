import pool from '../config/db.js';

export async function getPlayerResources(userId) {
  const [rows] = await pool.query(
    `SELECT id, user_id, resource_id, amount, amount_carry, lifetime_amount, updated_at
     FROM player_resources
     WHERE user_id = ?
     ORDER BY resource_id`,
    [userId]
  );
  return rows;
}
