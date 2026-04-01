import pool from './db.js';

async function testDb() {
  try {
    const [rows] = await pool.query('SELECT 1 AS ok');
    console.log('Connexion OK :', rows);
  } catch (error) {
    console.error('Erreur connexion BDD :', error.message);
  } finally {
    await pool.end();
  }
}

testDb();