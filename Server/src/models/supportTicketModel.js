import pool from '../config/db.js';

// Crée un ticket de support à partir des informations fournies par l’utilisateur
export async function createSupportTicket(data) {
  const {
    user_id,
    email,
    username,
    category,
    subject,
    message,
    page_url,
    user_agent,
    client_time_iso,
    client_meta,
    ip_address,
    status
  } = data;

  const [result] = await pool.query(
    `INSERT INTO support_tickets
      (user_id, email, username, category, subject, message, page_url, user_agent, client_time_iso, client_meta, ip_address, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      user_id ?? null,
      email ?? null,
      username ?? null,
      category,
      subject ?? null,
      message,
      page_url ?? null,
      user_agent ?? null,
      client_time_iso ?? null,
      client_meta ?? null,
      ip_address ?? null,
      status ?? 'OPEN'
    ]
  );

  return result.insertId;
}
