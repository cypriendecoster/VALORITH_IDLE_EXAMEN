import {
  getTableColumns,
  listRows,
  getRowById,
  insertRow,
  updateRow,
  deleteRow
} from '../models/adminModel.js';

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

function getTableConfig(tableName) {
  return ADMIN_TABLES[tableName] || null;
}

function sanitizeData(data, columns) {
  const allowed = new Set(columns.map((c) => c.COLUMN_NAME));
  const sanitized = {};
  for (const [key, value] of Object.entries(data || {})) {
    if (allowed.has(key)) {
      sanitized[key] = value;
    }
  }
  return sanitized;
}

export async function getAdminTables() {
  return Object.keys(ADMIN_TABLES);
}

export async function getAdminTableSchema(tableName) {
  try {
    const config = getTableConfig(tableName);
    if (!config) {
      throw new Error('Table not allowed');
    }
    const columns = await getTableColumns(tableName);
    return { table: tableName, pk: config.pk, columns };
  } catch (error) {
    console.error(error);
    throw new Error(error.message || 'Schema fetch failed');
  }
}

export async function listAdminRows(tableName, limit, offset) {
  try {
    const config = getTableConfig(tableName);
    if (!config) {
      throw new Error('Table not allowed');
    }
    const rows = await listRows(tableName, limit, offset);
    return rows;
  } catch (error) {
    console.error(error);
    throw new Error(error.message || 'List rows failed');
  }
}

export async function getAdminRow(tableName, id) {
  try {
    const config = getTableConfig(tableName);
    if (!config) {
      throw new Error('Table not allowed');
    }
    const row = await getRowById(tableName, config.pk, id);
    return row;
  } catch (error) {
    console.error(error);
    throw new Error(error.message || 'Get row failed');
  }
}

export async function createAdminRow(tableName, data) {
  try {
    const config = getTableConfig(tableName);
    if (!config) {
      throw new Error('Table not allowed');
    }
    const columns = await getTableColumns(tableName);
    const sanitized = sanitizeData(data, columns);
    const insertId = await insertRow(tableName, sanitized);
    return { id: insertId };
  } catch (error) {
    console.error(error);
    throw new Error(error.message || 'Create row failed');
  }
}

export async function updateAdminRow(tableName, id, data) {
  try {
    const config = getTableConfig(tableName);
    if (!config) {
      throw new Error('Table not allowed');
    }
    const columns = await getTableColumns(tableName);
    const sanitized = sanitizeData(data, columns);
    if (sanitized[config.pk] !== undefined) {
      delete sanitized[config.pk];
    }
    await updateRow(tableName, config.pk, id, sanitized);
    return { status: 'ok' };
  } catch (error) {
    console.error(error);
    throw new Error(error.message || 'Update row failed');
  }
}

export async function deleteAdminRow(tableName, id) {
  try {
    const config = getTableConfig(tableName);
    if (!config) {
      throw new Error('Table not allowed');
    }
    await deleteRow(tableName, config.pk, id);
    return { status: 'ok' };
  } catch (error) {
    console.error(error);
    throw new Error(error.message || 'Delete row failed');
  }
}
