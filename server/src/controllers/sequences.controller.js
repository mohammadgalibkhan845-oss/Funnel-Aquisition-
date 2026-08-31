import { dbStore } from '../config/db.js';

export const getSequences = (req, res) => {
  try {
    const sequences = dbStore.get('sequences');
    return res.json({ count: sequences.length, sequences });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch sequences' });
  }
};

export const triggerSequenceForLead = (req, res) => {
  try {
    const { leadId, sequenceId } = req.body;
    const lead = dbStore.findById('leads', leadId);
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    const sequence = dbStore.findById('sequences', sequenceId);
    if (!sequence) {
      return res.status(404).json({ error: 'Sequence not found' });
    }

    // Dynamic tag replacement
    const score = lead.auditScore || 65;
    const offerPrice = lead.offerPrice || 3000;
    const lostRev = (offerPrice * 3).toLocaleString();
    const tripleRev = (offerPrice * 3).toLocaleString();
    const yearlyRev = (offerPrice * 3 * 12).toLocaleString();

    const replaceTags = (text) => {
      if (!text) return '';
      return text
        .replace(/{{name}}/g, lead.name)
        .replace(/{{score}}/g, score)
        .replace(/{{niche}}/g, lead.niche || 'Coaching')
        .replace(/{{offer}}/g, lead.offer || 'High-Ticket Program')
        .replace(/{{offerPrice}}/g, `$${offerPrice.toLocaleString()}`)
        .replace(/{{primaryBottleneck}}/g, lead.painPoint || 'Lead Capture & Manual Follow-up')
        .replace(/{{lostRevenue}}/g, lostRev)
        .replace(/{{tripleClientRevenue}}/g, tripleRev)
        .replace(/{{yearlyClientRevenue}}/g, yearlyRev)
        .replace(/{{diagnosticUrl}}/g, `https://apexacquisition.com/audit/report?id=${lead.id}`)
        .replace(/{{bookingUrl}}/g, `https://apexacquisition.com/book?leadId=${lead.id}`);
    };

    const renderedEmailSubject = replaceTags(sequence.emailSubject);
    const renderedEmailBody = replaceTags(sequence.emailBody);
    const renderedSmsBody = replaceTags(sequence.smsBody);

    // Record interaction log
    dbStore.create('interactions', {
      leadId: lead.id,
      type: 'SEQUENCE_DISPATCHED',
      title: `Dispatched Sequence Day ${sequence.day}: "${sequence.title}"`,
      details: `Subject: ${renderedEmailSubject}\nChannel: ${sequence.channel}`,
      timestamp: new Date().toISOString()
    });

    dbStore.update('leads', lead.id, {
      lastContactDate: new Date().toISOString()
    });

    return res.json({
      success: true,
      message: `Sequence (Day ${sequence.day}) triggered for ${lead.name}`,
      lead: { id: lead.id, name: lead.name, email: lead.email },
      dispatched: {
        sequenceId: sequence.id,
        day: sequence.day,
        title: sequence.title,
        channel: sequence.channel,
        renderedEmail: {
          subject: renderedEmailSubject,
          body: renderedEmailBody
        },
        renderedSms: renderedSmsBody ? { body: renderedSmsBody } : null
      }
    });
  } catch (err) {
    console.error('Error triggering sequence:', err);
    return res.status(500).json({ error: 'Failed to trigger sequence' });
  }
};

export const updateSequence = (req, res) => {
  try {
    const { id } = req.params;
    const updated = dbStore.update('sequences', id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Sequence not found' });
    }
    return res.json({ success: true, sequence: updated });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to update sequence' });
  }
};
