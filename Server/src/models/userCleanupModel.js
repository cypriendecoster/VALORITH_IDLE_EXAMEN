import pool from '../config/db.js';

export async function deletePlayerResources(userId) {
  await pool.query(`DELETE FROM player_resources WHERE user_id = ?`, [userId]);
}

export async function deletePlayerFactories(userId) {
  await pool.query(`DELETE FROM player_factories WHERE user_id = ?`, [userId]);
}

export async function deletePlayerRealms(userId) {
  await pool.query(`DELETE FROM player_realms WHERE user_id = ?`, [userId]);
}

export async function deletePlayerSkills(userId) {
  await pool.query(`DELETE FROM player_skills WHERE user_id = ?`, [userId]);
}

export async function deletePlayerState(userId) {
  await pool.query(`DELETE FROM player_state WHERE user_id = ?`, [userId]);
}

export async function deletePlayerStats(userId) {
  await pool.query(`DELETE FROM player_stats WHERE user_id = ?`, [userId]);
}

export async function deletePlayerSessions(userId) {
  await pool.query(`DELETE FROM player_session WHERE user_id = ?`, [userId]);
}
