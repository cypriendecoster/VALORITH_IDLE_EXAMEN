import pool from '../config/db.js';

export async function getPlayerSkills(userId) {
  const [rows] = await pool.query(
    `SELECT id, user_id, skill_id, level, unlocked_at, updated_at
     FROM player_skills
     WHERE user_id = ?
     ORDER BY skill_id`,
    [userId]
  );
  return rows;
}
