import { createSupportTicket } from '../models/supportTicketModel.js';

export async function createSupportTicketController(req, res) {
  try {
    const {
      user_id,
      email,
      username,
      category,
      subject,
      message,
      page_url,
      client_time_iso,
      client_meta
    } = req.body || {};

    if (!category || !message) {
      return res.status(400).json({ message: 'category and message are required' });
    }
    if (!user_id) {
      if (!email) {
        return res.status(400).json({ message: 'email is required when not logged in' });
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ message: 'email format is invalid' });
      }
    }

    const ip_address =
      req.headers['x-forwarded-for']?.toString().split(',')[0]?.trim() ||
      req.socket?.remoteAddress ||
      null;

    const user_agent = req.get('user-agent') || null;

    const insertId = await createSupportTicket({
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
      status: 'OPEN'
    });

    return res.status(201).json({ id: insertId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message || 'Create support ticket failed' });
  }
}
