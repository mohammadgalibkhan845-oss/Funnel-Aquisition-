import express from 'express';
import { submitAudit, getAuditById, getAllAudits } from '../controllers/audit.controller.js';

const router = express.Router();

router.post('/submit', submitAudit);
router.get('/all', getAllAudits);
router.get('/:id', getAuditById);

export default router;
