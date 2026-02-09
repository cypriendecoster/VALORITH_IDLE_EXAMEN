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
