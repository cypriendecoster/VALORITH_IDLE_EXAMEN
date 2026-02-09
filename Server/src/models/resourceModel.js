import pool from '../config/db.js';

// Récupère la liste complète des ressources du jeu
export async function getAllResources() {
  const [rows] = await pool.query(
    `SELECT id, code, name, description
     FROM resources
     ORDER BY id`
  );
  return rows;
}
