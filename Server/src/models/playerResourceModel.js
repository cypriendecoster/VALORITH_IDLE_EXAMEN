import pool from '../config/db.js';

// Récupère toutes les ressources d’un joueur
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

// Récupère une ressource précise d’un joueur
export async function getPlayerResource(userId, resourceId) {
  const [rows] = await pool.query(
    `SELECT id, amount, amount_carry
     FROM player_resources
     WHERE user_id = ? AND resource_id = ?
     LIMIT 1`,
    [userId, resourceId]
  );
  return rows[0] || null;
}

// Ajoute une ressource à un joueur avec des valeurs initiales
export async function insertPlayerResource({ userId, resourceId, amount, amountCarry }) {
  await pool.query(
    `INSERT INTO player_resources (user_id, resource_id, amount, amount_carry, lifetime_amount, updated_at)
     VALUES (?, ?, ?, ?, ?, NOW())`,
    [userId, resourceId, amount, amountCarry, amount]
  );
}

// Met à jour les quantités d’une ressource pour un joueur
export async function updatePlayerResource({ userId, resourceId, amount, amountCarry, addLifetime }) {
  await pool.query(
    `UPDATE player_resources
     SET amount = ?, amount_carry = ?, lifetime_amount = lifetime_amount + ?, updated_at = NOW()
     WHERE user_id = ? AND resource_id = ?`,
    [amount, amountCarry, addLifetime, userId, resourceId]
  );
}
