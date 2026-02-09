import pool from '../config/db.js';

// Récupère les prérequis de fin de jeu depuis la base de données
export async function getAllEndgameRequirements() {
  const [rows] = await pool.query(
    `SELECT id, resource_id, amount
     FROM endgame_requirements
     ORDER BY id`
  );
  return rows;
}
