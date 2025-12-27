import pool from '../config/db.js';

export async function getAllRealmUnlockCosts() {
  const [rows] = await pool.query(
    `SELECT id, target_realm_id, resource_id, amount
     FROM realm_unlock_costs
     ORDER BY target_realm_id, resource_id`
  );
  return rows;
}

export async function getRealmUnlockCostsByRealm(targetRealmId) {
  const [rows] = await pool.query(
    `SELECT id, target_realm_id, resource_id, amount
     FROM realm_unlock_costs
     WHERE target_realm_id = ?
     ORDER BY resource_id`,
    [targetRealmId]
  );
  return rows;
}
