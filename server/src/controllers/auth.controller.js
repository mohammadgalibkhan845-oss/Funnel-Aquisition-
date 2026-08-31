import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { dbStore } from '../config/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'apex_coach_secret_jwt_key_2026';

export const login = (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = dbStore.findOne('users', { email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check password (or demo bypass)
    const isMatch = password === 'demo123' || (user.passwordHash && bcrypt.compareSync(password, user.passwordHash));
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Internal server error during login' });
  }
};

export const demoLogin = (req, res) => {
  try {
    const { role = 'admin' } = req.body;
    let user = dbStore.findOne('users', { role });
    if (!user) {
      const users = dbStore.get('users');
      user = users[0];
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      message: `Logged in as demo ${user.role}`,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    });
  } catch (err) {
    return res.status(500).json({ error: 'Demo login failed' });
  }
};

export const getMe = (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = dbStore.findById('users', decoded.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    });
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};
