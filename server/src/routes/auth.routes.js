import express from 'express';
import { login, demoLogin, getMe } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/login', login);
router.post('/demo-login', demoLogin);
router.get('/me', getMe);

export default router;
