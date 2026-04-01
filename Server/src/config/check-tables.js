import pool from './db.js';

async function checkTables() {
  try {
    const [rows] = await pool.query('SHOW TABLES');
    console.log('Tables trouvées :', rows);
  } catch (error) {
    console.error('Erreur vérification tables :', error.message);
  } finally {
    await pool.end();
  }
}

checkTables();