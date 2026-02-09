import pool from '../config/db.js';

// Récupère toutes les usines possédées par un joueur
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

// Récupère les usines actives d’un joueur pour le calcul de production idle
export async function getPlayerFactoriesForIdle(userId) {
  const [rows] = await pool.query(
    `SELECT pf.factory_id, pf.level, f.resource_id, f.base_production, f.realm_id
     FROM player_factories pf
     JOIN factories f ON f.id = pf.factory_id
     WHERE pf.user_id = ? AND pf.level > 0`,
    [userId]
  );
  return rows;
}

// Récupère une usine précise d’un joueur
export async function getPlayerFactory(userId, factoryId) {
  const [rows] = await pool.query(
    `SELECT id, level
    FROM player_factories
    WHERE user_id = ? AND factory_id = ?
    LIMIT 1`,
    [userId, factoryId]
  );
  return rows[0] || null;
}

// Ajoute une usine à un joueur avec un niveau initial
export async function insertPlayerFactory(userId, factoryId, level) {
  await pool.query(
    `INSERT INTO player_factories (user_id, factory_id, level, created_at, updated_at)
    VALUES (?, ?, ?, NOW(), NOW())`,
    [userId, factoryId, level]
  );
}

// Met à jour le niveau d’une usine appartenant à un joueur
export async function updatePlayerFactoryLevel(userId, factoryId, level) {
  await pool.query(
    `UPDATE player_factories
    SET level = ?, updated_at = NOW()
    WHERE user_id = ? AND factory_id = ?`,
    [level, userId, factoryId]
  );
}
