import pool from '../config/db.js';

// Récupère le classement de fin de jeu
export async function getEndgameRanking(limit = 50) {
  const [rows] = await pool.query(
    `SELECT
       ub.user_id,
       u.username,
       u.created_at,
       ub.obtained_at,
       TIMESTAMPDIFF(SECOND, u.created_at, ub.obtained_at) AS duration_seconds
     FROM user_badges ub
     JOIN badges b ON b.id = ub.badge_id
     JOIN users u ON u.id = ub.user_id
     WHERE b.code = 'MONSTRE_DU_IDLE'
     ORDER BY duration_seconds ASC, ub.obtained_at ASC
     LIMIT ?`,
    [limit]
  );
  return rows;
}

// Récupère le classement des joueurs selon les ressources cumulées
export async function getResourceRanking(limit = 50) {
  const [rows] = await pool.query(
    `SELECT pr.user_id, u.username, SUM(pr.lifetime_amount) AS total_lifetime
     FROM player_resources pr
     JOIN users u ON u.id = pr.user_id
     GROUP BY pr.user_id, u.username
     ORDER BY total_lifetime DESC
     LIMIT ?`,
    [limit]
  );
  return rows;
}
