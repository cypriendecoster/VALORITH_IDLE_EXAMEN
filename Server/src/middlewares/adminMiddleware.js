export function adminMiddleware(req, res, next) {
  if (!req.user || req.user.role !== 'ADMIN') {
    return res.status(403).json({
      message: 'Accès interdit.',
      code: 'ADMIN_FORBIDDEN'
    });
  }
  return next();
}
