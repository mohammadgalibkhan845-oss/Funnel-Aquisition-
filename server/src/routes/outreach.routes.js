import express from 'express';
import {
  getOutreachTemplates,
  generateOutreach
} from '../controllers/outreach.controller.js';

const router = express.Router();

router.get('/templates', getOutreachTemplates);
router.post('/generate', generateOutreach);

export default router;
