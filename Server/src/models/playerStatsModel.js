import pool from '../config/db.js';

function toNonNegativeInt(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return 0;
  return Math.max(0, Math.floor(num));
}

// Recupere les statistiques globales d'un joueur.
export async function getPlayerStats(userId) {
  const [rows] = await pool.query(
    `SELECT user_id, total_play_time_seconds, total_logins, max_realm_unlocked_id,
            max_factory_level_reached, created_at, updated_at
     FROM player_stats
     WHERE user_id = ?
     LIMIT 1`,
    [userId]
  );
  return rows[0] || null;
}

// Cree la ligne de stats si absente et pose une baseline de progression.
export async function upsertPlayerStatsBaseline(
  userId,
  { maxRealmUnlockedId = 0, maxFactoryLevelReached = 0 } = {}
) {
  const safeRealmId = toNonNegativeInt(maxRealmUnlockedId);
  const safeFactoryLevel = toNonNegativeInt(maxFactoryLevelReached);

  await pool.query(
    `INSERT INTO player_stats (
      user_id, total_play_time_seconds, total_logins,
      max_realm_unlocked_id, max_factory_level_reached, created_at, updated_at
    )
     VALUES (?, 0, 0, ?, ?, NOW(), NOW())
     ON DUPLICATE KEY UPDATE
      max_realm_unlocked_id = GREATEST(COALESCE(max_realm_unlocked_id, 0), ?),
      max_factory_level_reached = GREATEST(COALESCE(max_factory_level_reached, 0), ?),
      updated_at = NOW()`,
    [userId, safeRealmId, safeFactoryLevel, safeRealmId, safeFactoryLevel]
  );
}

// Incremente le nombre total de connexions.
export async function incrementPlayerLogins(userId, amount = 1) {
  const safeAmount = toNonNegativeInt(amount);
  if (safeAmount <= 0) return;

  await pool.query(
    `INSERT INTO player_stats (
      user_id, total_play_time_seconds, total_logins,
      max_realm_unlocked_id, max_factory_level_reached, created_at, updated_at
    )
     VALUES (?, 0, ?, 0, 0, NOW(), NOW())
     ON DUPLICATE KEY UPDATE
      total_logins = total_logins + ?,
      updated_at = NOW()`,
    [userId, safeAmount, safeAmount]
  );
}

// Ajoute du temps de jeu cumule.
export async function addPlayerPlayTime(userId, seconds) {
  const safeSeconds = toNonNegativeInt(seconds);
  if (safeSeconds <= 0) return;

  await pool.query(
    `INSERT INTO player_stats (
      user_id, total_play_time_seconds, total_logins,
      max_realm_unlocked_id, max_factory_level_reached, created_at, updated_at
    )
     VALUES (?, ?, 0, 0, 0, NOW(), NOW())
     ON DUPLICATE KEY UPDATE
      total_play_time_seconds = total_play_time_seconds + ?,
      updated_at = NOW()`,
    [userId, safeSeconds, safeSeconds]
  );
}

// Met a jour le royaume maximum debloque (valeur max conservee).
export async function setMaxRealmUnlocked(userId, realmId) {
  const safeRealmId = toNonNegativeInt(realmId);
  if (safeRealmId <= 0) return;

  await pool.query(
    `INSERT INTO player_stats (
      user_id, total_play_time_seconds, total_logins,
      max_realm_unlocked_id, max_factory_level_reached, created_at, updated_at
    )
     VALUES (?, 0, 0, ?, 0, NOW(), NOW())
     ON DUPLICATE KEY UPDATE
      max_realm_unlocked_id = GREATEST(COALESCE(max_realm_unlocked_id, 0), ?),
      updated_at = NOW()`,
    [userId, safeRealmId, safeRealmId]
  );
}

// Met a jour le niveau d'usine max atteint (valeur max conservee).
export async function setMaxFactoryLevelReached(userId, level) {
  const safeLevel = toNonNegativeInt(level);
  if (safeLevel <= 0) return;

  await pool.query(
    `INSERT INTO player_stats (
      user_id, total_play_time_seconds, total_logins,
      max_realm_unlocked_id, max_factory_level_reached, created_at, updated_at
    )
     VALUES (?, 0, 0, 0, ?, NOW(), NOW())
     ON DUPLICATE KEY UPDATE
      max_factory_level_reached = GREATEST(COALESCE(max_factory_level_reached, 0), ?),
      updated_at = NOW()`,
    [userId, safeLevel, safeLevel]
  );
}
