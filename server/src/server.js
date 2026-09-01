import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import { securityHeaders, sanitizeInputs, rateLimit } from './middleware/security.js';

import authRoutes from './routes/auth.routes.js';
import auditRoutes from './routes/audit.routes.js';
import leadsRoutes from './routes/leads.routes.js';
import bookingsRoutes from './routes/bookings.routes.js';
import sequencesRoutes from './routes/sequences.routes.js';
import outreachRoutes from './routes/outreach.routes.js';
import analyticsRoutes from './routes/analytics.routes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CLIENT_DIST = path.join(__dirname, '../../client/dist');

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Security Headers (Defensive protection)
app.use(securityHeaders);

// 2. CORS Policy
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 3. Body Parser with Size Limits (Prevents payload flood attacks)
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// 4. Input Sanitization (XSS and prototype pollution protection)
app.use(sanitizeInputs);

// 5. Health & Database Status Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'NexLeads Coach Client Acquisition Agency API',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

app.get('/api/db-status', (req, res) => {
  const leadsCount = dbStore.get('leads').length;
  const auditsCount = dbStore.get('audits').length;
  const bookingsCount = dbStore.get('bookings').length;
  res.json({
    databaseStatus: 'Active & Storing Records',
    totalLeadsInPipeline: leadsCount,
    totalAuditsCompleted: auditsCount,
    totalBookingsMade: bookingsCount,
    timestamp: new Date().toISOString()
  });
});

// 6. Rate-Limited API Routes
app.use('/api/auth', rateLimit({ windowMs: 60 * 1000, maxRequests: 20, message: 'Too many authentication attempts. Please wait a minute.' }), authRoutes);
app.use('/api/audit', rateLimit({ windowMs: 60 * 1000, maxRequests: 30, message: 'Too many audit submissions. Please wait a moment.' }), auditRoutes);
app.use('/api/bookings', rateLimit({ windowMs: 60 * 1000, maxRequests: 25, message: 'Too many booking attempts. Please wait a moment.' }), bookingsRoutes);

// Standard API Routes
app.use('/api/leads', leadsRoutes);
app.use('/api/sequences', sequencesRoutes);
app.use('/api/outreach', outreachRoutes);
app.use('/api/analytics', analyticsRoutes);

// 7. Serve Frontend Static Assets if client/dist exists
if (fs.existsSync(CLIENT_DIST)) {
  app.use(express.static(CLIENT_DIST));
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(CLIENT_DIST, 'index.html'));
    } else {
      res.status(404).json({ error: 'API endpoint not found' });
    }
  });
} else {
  app.get('/', (req, res) => {
    res.json({
      message: 'Welcome to NexLeads Client Acquisition Agency API',
      docs: '/api/health'
    });
  });
}

// 8. Global Error Handler (Prevents stack trace leaks)
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err.message);
  res.status(500).json({
    error: 'An internal server error occurred. Please try again later.'
  });
});

// Start Server
async function startServer() {
  await connectDB();
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 NexLeads Hardened Server running on http://127.0.0.1:${PORT} and http://localhost:${PORT}`);
  });
}

startServer();

export default app;
