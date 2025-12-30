import pool from '../config/db.js';

export async function getUserBadges(userId) {
  const [rows] = await pool.query(
    `SELECT id, user_id, badge_id, obtained_at
     FROM user_badges
     WHERE user_id = ?
     ORDER BY obtained_at`,
    [userId]
  );
  return rows;
}

export async function insertUserBadge(userId, badgeId) {
  await pool.query(
    `INSERT INTO user_badges (user_id, badge_id, obtained_at)
     VALUES (?, ?, NOW())`,
    [userId, badgeId]
  );
}

export async function deleteUserBadges(userId) {
  await pool.query(
    `DELETE FROM user_badges
     WHERE user_id = ?`,
    [userId]
  );
}
