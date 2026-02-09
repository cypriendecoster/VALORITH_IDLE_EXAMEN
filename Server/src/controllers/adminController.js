import {
  getAdminTables,
  getAdminTableSchema,
  listAdminRows,
  getAdminRow,
  createAdminRow,
  updateAdminRow,
  deleteAdminRow
} from '../services/adminService.js';
import { toResponseError } from '../utils/errors.js';

// Récupère la liste des tables accessibles depuis l’interface d’administration
export async function getAdminTablesController(req, res) {
  try {
    const tables = await getAdminTables();
    return res.status(200).json(tables);
  } catch (error) {
    console.error(error);
    const { status, message, code } = toResponseError(error, 'Erreur admin.', 'ADMIN_ERROR');
    return res.status(status).json({ message, code });
  }
}

// Récupère la structure d’une table pour l’affichage dynamique
export async function getAdminTableSchemaController(req, res) {
  try {
    const { table } = req.params;
    const schema = await getAdminTableSchema(table);
    return res.status(200).json(schema);
  } catch (error) {
    console.error(error);
    const { status, message, code } = toResponseError(error, 'Erreur admin.', 'ADMIN_SCHEMA_FETCH_FAILED');
    return res.status(status).json({ message, code });
  }
}

// Liste les lignes d’une table avec pagination
export async function listAdminRowsController(req, res) {
  try {
    const { table } = req.params;
    const limit = Number(req.query.limit) || 50;
    const offset = Number(req.query.offset) || 0;
    const rows = await listAdminRows(table, limit, offset);
    return res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    const { status, message, code } = toResponseError(error, 'Erreur admin.', 'ADMIN_LIST_ROWS_FAILED');
    return res.status(status).json({ message, code });
  }
}

// Récupère une ligne précise d’une table
export async function getAdminRowController(req, res) {
  try {
    const { table, id } = req.params;
    const row = await getAdminRow(table, id);
    return res.status(200).json(row);
  } catch (error) {
    console.error(error);
    const { status, message, code } = toResponseError(error, 'Erreur admin.', 'ADMIN_GET_ROW_FAILED');
    return res.status(status).json({ message, code });
  }
}

// Crée une nouvelle entrée via l’interface d’administration
export async function createAdminRowController(req, res) {
  try {
    const { table } = req.params;
    const result = await createAdminRow(table, req.body || {});
    return res.status(201).json(result);
  } catch (error) {
    console.error(error);
    const { status, message, code } = toResponseError(error, 'Erreur admin.', 'ADMIN_CREATE_ROW_FAILED');
    return res.status(status).json({ message, code });
  }
}

// Met à jour une entrée existante
export async function updateAdminRowController(req, res) {
  try {
    const { table, id } = req.params;
    const result = await updateAdminRow(table, id, req.body || {});
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    const { status, message, code } = toResponseError(error, 'Erreur admin.', 'ADMIN_UPDATE_ROW_FAILED');
    return res.status(status).json({ message, code });
  }
}

// Supprime une entrée via l’interface d’administration
export async function deleteAdminRowController(req, res) {
  try {
    const { table, id } = req.params;
    const result = await deleteAdminRow(table, id);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    const { status, message, code } = toResponseError(error, 'Erreur admin.', 'ADMIN_DELETE_ROW_FAILED');
    return res.status(status).json({ message, code });
  }
}
