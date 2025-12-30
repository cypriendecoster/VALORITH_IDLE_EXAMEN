import pool from '../config/db.js';

export async function getAllFactories() {
    const [rows] = await pool.query(
        `SELECT id, realm_id, resource_id, code, name, description, base_production, base_cost, unlock_order, is_active
        FROM factories
        ORDER BY realm_id, unlock_order`
    );
    return rows;
}

export async function getFactoriesByRealm(realmId) {
    const [rows] = await pool.query(
        `SELECT id, realm_id, resource_id, code, name, description, base_production, base_cost, unlock_order, is_active
        FROM factories
        WHERE realm_id = ?
        ORDER BY unlock_order`,
        [realmId]
    );
    return rows;
}

export async function getFactoryById(factoryId) {
    const [rows] = await pool.query(
        `SELECT id, realm_id, resource_id, base_cost, base_production
        FROM factories
        WHERE id = ?
        LIMIT 1`,
        [factoryId]
    );
    return rows[0] || null;
}
