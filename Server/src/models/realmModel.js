import pool from '../config/db.js';

// Récupère la liste complète des royaumes disponibles dans le jeu
export async function getAllRealms() {
  const [rows] = await pool.query(
    `SELECT id, code, name, description, is_default_unlocked, cost_multiplier, production_multiplier
     FROM realms
     ORDER BY id`
  );
  return rows;
}
