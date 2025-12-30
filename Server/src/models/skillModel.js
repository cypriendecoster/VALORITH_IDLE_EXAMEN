import pool from '../config/db.js';

export async function getAllSkills() {
  const [rows] = await pool.query(
    `SELECT id, realm_id, code, name, description, effect_type, effect_value, max_level,
            base_cost_resource_id, base_cost_amount, cost_growth_factor, unlock_order
     FROM skills
     ORDER BY realm_id, unlock_order`
  );
  return rows;
}

export async function getSkillsByRealm(realmId) {
  const [rows] = await pool.query(
    `SELECT id, realm_id, code, name, description, effect_type, effect_value, max_level,
            base_cost_resource_id, base_cost_amount, cost_growth_factor, unlock_order
     FROM skills
     WHERE realm_id = ?
     ORDER BY unlock_order`,
    [realmId]
  );
  return rows;
}

export async function getSkillById(skillId) {
  const [rows] = await pool.query(
    `SELECT id, realm_id, code, name, description, effect_type, effect_value, max_level,
            base_cost_resource_id, base_cost_amount, cost_growth_factor, unlock_order
     FROM skills
     WHERE id = ?
     LIMIT 1`,
    [skillId]
  );
  return rows[0] || null;
}
