import express from 'express';
import {
  getAvailableSlots,
  bookCall,
  getBookings,
  updateBookingStatus
} from '../controllers/bookings.controller.js';

const router = express.Router();

router.get('/slots', getAvailableSlots);
router.post('/book', bookCall);
router.get('/', getBookings);
router.patch('/:id/status', updateBookingStatus);

export default router;
