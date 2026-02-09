import { createSupportTicket } from '../models/supportTicketModel.js';
import { toResponseError } from '../utils/errors.js';

// Crée un ticket de support
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

      // Vérification des champs obligatoires
    if (!category || !message) {
      return res.status(400).json({
        message: 'Catégorie et message requis.',
        code: 'SUPPORT_FIELDS_MISSING'
      });
    }
      // Si l’utilisateur n’est pas connecté, un email valide est requis
    if (!user_id) {
      if (!email) {
        return res.status(400).json({
          message: 'Email requis si vous n’êtes pas connecté.',
          code: 'SUPPORT_EMAIL_MISSING'
        });
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({
          message: 'Format email invalide.',
          code: 'SUPPORT_EMAIL_INVALID'
        });
      }
    }
     // Récupération des informations techniques (IP, navigateur)
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
    const { status, message, code } = toResponseError(
      error,
      'Impossible d’envoyer la demande de support.',
      'SUPPORT_TICKET_CREATE_FAILED'
    );
    return res.status(status).json({ message, code });
  }
}
