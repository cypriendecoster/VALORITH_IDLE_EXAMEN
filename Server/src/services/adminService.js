import {
  getTableColumns,
  listRows,
  getRowById,
  insertRow,
  updateRow,
  deleteRow
} from '../models/adminModel.js';
import { createError } from '../utils/errors.js';

// Liste blanche des tables accessibles en admin
const ADMIN_TABLES = {
  users: { pk: 'id' },
  skills: { pk: 'id' },
  realms: { pk: 'id' },
  factories: { pk: 'id' },
  resources: { pk: 'id' },
  endgame_requirements: { pk: 'id' },
  badges: { pk: 'id' },
  system_settings: { pk: 'id' },
  support_tickets: { pk: 'id' },
  player_realms: { pk: 'id' },
  player_resources: { pk: 'id' },
  player_factories: { pk: 'id' },
  player_skills: { pk: 'id' },
  player_state: { pk: 'user_id' },
  player_stats: { pk: 'user_id' },
  player_session: { pk: 'id' },
  endgame_rankings: { pk: 'id' }
};

// Vérifie qu’une table est autorisée en administration.
function assertTable(tableName) {
  const config = ADMIN_TABLES[tableName];
  if (!config) {
    throw createError({
      code: 'ADMIN_TABLE_NOT_ALLOWED',
      message: 'Table non autorisee.',
      status: 400
    });
  }
  return config;
}

//  Nettoie les données envoyées par le client.
function sanitize(data, columns) {
  const allowed = new Set(columns.map((c) => c.COLUMN_NAME));
  const result = {};
  for (const [key, value] of Object.entries(data || {})) {
    if (allowed.has(key)) {
      result[key] = value;
    }
  }
  return result;
}

//  Retourne la liste des tables accessibles en administration.
export function getAdminTables() {
  return Object.keys(ADMIN_TABLES);
}

// Retourne le schéma d’une table (colonnes + clé primaire).
export async function getAdminTableSchema(tableName) {
  const config = assertTable(tableName);
  const columns = await getTableColumns(tableName);
  return { table: tableName, pk: config.pk, columns };
}

//  Retourne la liste des enregistrements d’une table admin.
export async function listAdminRows(tableName) {
  assertTable(tableName);
  return listRows(tableName);
}

//  Retourne un enregistrement précis par identifiant.
export async function getAdminRow(tableName, id) {
  const config = assertTable(tableName);
  return getRowById(tableName, config.pk, id);
}

//  Crée un nouvel enregistrement dans une table admin.
export async function createAdminRow(tableName, data) {
  assertTable(tableName);
  const columns = await getTableColumns(tableName);
  const sanitized = sanitize(data, columns);
  const insertId = await insertRow(tableName, sanitized);
  return { id: insertId };
}

//  Met à jour un enregistrement existant.
export async function updateAdminRow(tableName, id, data) {
  const config = assertTable(tableName);
  const columns = await getTableColumns(tableName);
  const sanitized = sanitize(data, columns);
  delete sanitized[config.pk];
  await updateRow(tableName, config.pk, id, sanitized);
  return { status: 'ok' };
}

//  Supprime un enregistrement dans une table admin.
export async function deleteAdminRow(tableName, id) {
  const config = assertTable(tableName);
  await deleteRow(tableName, config.pk, id);
  return { status: 'ok' };
}
