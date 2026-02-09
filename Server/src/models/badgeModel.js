import pool from '../config/db.js';

// Récupère tous les badges
export async function getAllBadges() {
  const [rows] = await pool.query(
    `SELECT id, code, name, description, icon
     FROM badges
     ORDER BY id`
  );
  return rows;
}
