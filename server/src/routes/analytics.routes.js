import express from 'express';
import { getAnalyticsOverview } from '../controllers/analytics.controller.js';

const router = express.Router();

router.get('/overview', getAnalyticsOverview);

export default router;
