import jwt from 'jsonwebtoken';
import { dbStore } from '../config/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'apex_coach_secret_jwt_key_2026';

export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required. No token provided.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = dbStore.findById('users', decoded.id);
    if (!user) {
      return res.status(401).json({ error: 'User account not found.' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired authentication token.' });
  }
};

export const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = dbStore.findById('users', decoded.id);
      if (user) {
        req.user = user;
      }
    } catch (e) {
      // Ignored for optional auth
    }
  }
  next();
};
