import { Router } from 'express';
import { createSupportTicketController } from '../controllers/supportTicketController.js';

// Limitation simple du nombre de tickets par IP
const router = Router();

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const rateBucket = new Map();

function rateLimitSupport(req, res, next) {
  const now = Date.now();
  const ip =
    req.headers['x-forwarded-for']?.toString().split(',')[0]?.trim() ||
    req.socket?.remoteAddress ||
    'unknown';
  const entry = rateBucket.get(ip);
  if (!entry || now - entry.start > RATE_WINDOW_MS) {
    rateBucket.set(ip, { start: now, count: 1 });
    return next();
  }
  if (entry.count >= RATE_MAX) {
    return res.status(429).json({
      message: 'Trop de requêtes, réessaie plus tard.',
      code: 'SUPPORT_RATE_LIMITED'
    });
  }
  entry.count += 1;
  return next();
}

router.post('/', rateLimitSupport, createSupportTicketController);

export default router;
