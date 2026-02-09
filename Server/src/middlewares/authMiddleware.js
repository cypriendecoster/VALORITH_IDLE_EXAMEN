import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization || '';
        const token = authHeader.startsWith('Bearer ') ? authHeader.slice (7) : null;

        if (!token) {
            return res.status(401).json({
                message: 'Non autorisé.',
                code: 'AUTH_UNAUTHORIZED'
            });
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: payload.id, role: payload.role };

        return next();
    } catch (error) {
        return res.status(401).json({
            message: 'Token invalide.',
            code: 'AUTH_INVALID_TOKEN'
        });
    }
}
