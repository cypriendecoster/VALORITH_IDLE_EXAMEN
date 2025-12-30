import pool from '../config/db.js';

export async function getPlayerSkills(userId) {
  const [rows] = await pool.query(
    `SELECT id, user_id, skill_id, level, unlocked_at, updated_at
     FROM player_skills
     WHERE user_id = ?
     ORDER BY skill_id`,
    [userId]
  );
  return rows;
}

export async function getPlayerSkill(userId, skillId) {
  const [rows] = await pool.query(
    `SELECT id, level
     FROM player_skills
     WHERE user_id = ? AND skill_id = ?
     LIMIT 1`,
    [userId, skillId]
  );
  return rows[0] || null;
}

export async function insertPlayerSkill(userId, skillId, level) {
  await pool.query(
    `INSERT INTO player_skills (user_id, skill_id, level, unlocked_at, updated_at)
     VALUES (?, ?, ?, NOW(), NOW())`,
    [userId, skillId, level]
  );
}

export async function updatePlayerSkillLevel(userId, skillId, level) {
  await pool.query(
    `UPDATE player_skills
     SET level = ?, updated_at = NOW()
     WHERE user_id = ? AND skill_id = ?`,
    [level, userId, skillId]
  );
}
