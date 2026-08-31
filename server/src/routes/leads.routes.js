import express from 'express';
import {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  updateLeadStage,
  addInteraction,
  deleteLead,
  resetSeedData
} from '../controllers/leads.controller.js';

const router = express.Router();

router.get('/', getLeads);
router.get('/:id', getLeadById);
router.post('/', createLead);
router.put('/:id', updateLead);
router.patch('/:id/stage', updateLeadStage);
router.post('/:id/interactions', addInteraction);
router.delete('/:id', deleteLead);
router.post('/reset-seed', resetSeedData);

export default router;
