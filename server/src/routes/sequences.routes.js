import express from 'express';
import {
  getSequences,
  triggerSequenceForLead,
  updateSequence
} from '../controllers/sequences.controller.js';

const router = express.Router();

router.get('/', getSequences);
router.post('/trigger', triggerSequenceForLead);
router.put('/:id', updateSequence);

export default router;
