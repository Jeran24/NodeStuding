import { findSession } from '../module/auth.js';
import { getUserRole } from '../module/stock.js';

export async function requireLogin(req, res, next) {
    const header = req.headers.authorization;

    if (!header || !header.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Please login" });
    }

    const token = header.slice(7);
    const session = await findSession(token);
    if (!session) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }

    req.token = token;
    req.userId = session.user_id;
    req.role = await getUserRole(session.user_id);
    next();
}