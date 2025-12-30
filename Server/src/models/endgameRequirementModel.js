import pool from '../config/db.js';

export async function getAllEndgameRequirements() {
  const [rows] = await pool.query(
    `SELECT id, resource_id, amount
     FROM endgame_requirements
     ORDER BY id`
  );
  return rows;
}
