import pool from '../config/db.js';

export async function getTableColumns(tableName) {
  // Lire les colonnes d'une table
  const [rows] = await pool.query(
    `SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE, COLUMN_KEY, EXTRA, COLUMN_DEFAULT
     FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?
     ORDER BY ORDINAL_POSITION`,
    [tableName]
  );
  return rows;
}

export async function listRows(tableName) {
  // Lire toutes les lignes
  const [rows] = await pool.query(
    `SELECT * FROM \`${tableName}\``
  );
  return rows;
}

export async function getRowById(tableName, pkColumn, id) {
  // Lire une ligne par son id
  const [rows] = await pool.query(
    `SELECT * FROM \`${tableName}\` WHERE \`${pkColumn}\` = ? LIMIT 1`,
    [id]
  );
  return rows[0] || null;
}

export async function insertRow(tableName, data) {
  const columns = Object.keys(data);
  const values = Object.values(data);
  const placeholders = columns.map(() => '?').join(', ');
  const columnList = columns.map((c) => `\`${c}\``).join(', ');

  // Inserer une nouvelle ligne
  const [result] = await pool.query(
    `INSERT INTO \`${tableName}\` (${columnList}) VALUES (${placeholders})`,
    values
  );
  return result.insertId;
}

// Prepare la liste des colonnes a mettre a jour
export async function updateRow(tableName, pkColumn, id, data) {
  const columns = Object.keys(data);
  const values = Object.values(data);
  const setList = columns.map((c) => `\`${c}\` = ?`).join(', ');

  // Mettre a jour une ligne
  await pool.query(
    `UPDATE \`${tableName}\` SET ${setList} WHERE \`${pkColumn}\` = ?`,
    [...values, id]
  );
}

export async function deleteRow(tableName, pkColumn, id) {
  // Supprimer une ligne
  await pool.query(
    `DELETE FROM \`${tableName}\` WHERE \`${pkColumn}\` = ?`,
    [id]
  );
}
