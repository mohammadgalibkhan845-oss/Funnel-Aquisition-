import { dbStore } from '../config/db.js';

export const getAvailableSlots = (req, res) => {
  try {
    const { date, timezone = 'UTC' } = req.query;
    // Generate realistic slots for selected or next 14 days
    const targetDate = date ? new Date(date) : new Date();
    
    // Slot hours (9:00 AM to 5:00 PM)
    const baseHours = ['09:00', '10:00', '11:30', '13:00', '14:30', '16:00', '17:30'];
    const booked = dbStore.find('bookings');

    const slots = baseHours.map(timeStr => {
      const isBooked = booked.some(b => b.date === targetDate.toISOString().split('T')[0] && b.time === timeStr);
      return {
        time: timeStr,
        available: !isBooked,
        timezone,
        durationMinutes: 45
      };
    });

    return res.json({
      date: targetDate.toISOString().split('T')[0],
      timezone,
      slots
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch slots' });
  }
};

export const bookCall = (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      website,
      niche = 'Business Coach',
      offer = 'High-Ticket Program',
      offerPrice = 3000,
      monthlyRevenue = '$10,000 - $25,000',
      biggestBottleneck = 'Lost leads & manual follow-up',
      date,
      time,
      timezone = 'EST',
      notes = ''
    } = req.body;

    if (!name || !email || !date || !time) {
      return res.status(400).json({ error: 'Name, email, date, and time are required to book a strategy session.' });
    }

    const bookingDateTime = `${date}T${time}:00`;
    const booking = dbStore.create('bookings', {
      name,
      email: email.toLowerCase().trim(),
      phone: phone || '',
      website: website || '',
      niche,
      offer,
      offerPrice: Number(offerPrice) || 3000,
      monthlyRevenue,
      biggestBottleneck,
      date,
      time,
      timezone,
      bookingDateTime,
      status: 'confirmed',
      notes,
      createdAt: new Date().toISOString()
    });

    // Sync or update CRM Lead
    let lead = dbStore.findOne('leads', { email: email.toLowerCase().trim() });
    if (lead) {
      lead = dbStore.update('leads', lead.id, {
        stage: 'Call Booked',
        bookedCallDate: bookingDateTime,
        dealValue: Number(offerPrice) || lead.dealValue,
        lastContactDate: new Date().toISOString()
      });
    } else {
      lead = dbStore.create('leads', {
        name,
        email: email.toLowerCase().trim(),
        phone: phone || '',
        niche,
        country: 'United States',
        website: website || '',
        offer,
        offerPrice: Number(offerPrice) || 3000,
        dealValue: Number(offerPrice) || 3000,
        monthlyLeads: 25,
        monthlyBookedCalls: 4,
        leadSource: 'Booking Funnel',
        cta: 'Book Discovery Call',
        funnel: 'Cal.com Strategy Booking',
        bookingSystem: 'Automated 2-Step Calendar',
        leadMagnet: 'Funnel Audit',
        followUp: 'Automated SMS + Email Reminders',
        painPoint: biggestBottleneck,
        opportunity: '1-on-1 Client Acquisition Architecture Blueprint',
        stage: 'Call Booked',
        auditScore: 75,
        assignedTo: 'user-closer',
        bookedCallDate: bookingDateTime,
        lastContactDate: new Date().toISOString(),
        tags: ['Call Booked', 'Strategy Session']
      });
    }

    // Generate Calendar Sync URLs
    const startTimeFormatted = date.replace(/-/g, '') + 'T' + time.replace(':', '') + '00Z';
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`Client Acquisition Strategy Session with ${name}`)}&dates=${startTimeFormatted}/${startTimeFormatted}&details=${encodeURIComponent(`Strategy Session for ${name} (${niche}) - Reviewing Client Acquisition Architecture.`)}&location=Google+Meet`;

    // Log Interaction
    dbStore.create('interactions', {
      leadId: lead.id,
      type: 'CALL_BOOKED',
      title: `Booked Strategy Session for ${date} at ${time} (${timezone})`,
      details: `Pre-call survey: Offer $${offerPrice}, Revenue: ${monthlyRevenue}, Bottleneck: ${biggestBottleneck}`,
      timestamp: new Date().toISOString()
    });

    return res.status(201).json({
      success: true,
      message: 'Strategy Call booked successfully!',
      booking,
      leadId: lead.id,
      calendarUrls: {
        google: googleCalUrl
      }
    });
  } catch (err) {
    console.error('Error booking call:', err);
    return res.status(500).json({ error: 'Failed to process booking' });
  }
};

export const getBookings = (req, res) => {
  try {
    const bookings = dbStore.get('bookings');
    return res.json({ count: bookings.length, bookings });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

export const updateBookingStatus = (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = dbStore.update('bookings', id, { status });
    if (!updated) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    return res.json({ success: true, booking: updated });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to update booking status' });
  }
};
