import { calculateAuditScore } from '../services/auditScoringEngine.js';
import { dbStore } from '../config/db.js';

export const submitAudit = (req, res) => {
  try {
    const formData = req.body;
    if (!formData || !formData.email || !formData.name) {
      return res.status(400).json({ error: 'Name and email are required to generate an audit report.' });
    }

    const evaluation = calculateAuditScore(formData);
    const auditRecord = dbStore.create('audits', {
      ...formData,
      evaluation,
      score: evaluation.score,
      createdAt: new Date().toISOString()
    });

    // Check if lead already exists in CRM, update or create
    let existingLead = dbStore.findOne('leads', { email: formData.email.toLowerCase().trim() });
    if (existingLead) {
      existingLead = dbStore.update('leads', existingLead.id, {
        auditScore: evaluation.score,
        stage: existingLead.stage === 'Prospect Researched' || existingLead.stage === 'Outreach Sent' ? 'Audit Completed' : existingLead.stage,
        offerPrice: formData.offerPrice || existingLead.offerPrice,
        dealValue: formData.offerPrice || existingLead.dealValue,
        niche: formData.niche || existingLead.niche,
        website: formData.website || existingLead.website,
        painPoint: formData.biggestChallenge || existingLead.painPoint,
        latestAuditId: auditRecord.id,
        lastContactDate: new Date().toISOString()
      });
    } else {
      existingLead = dbStore.create('leads', {
        name: formData.name,
        email: formData.email.toLowerCase().trim(),
        phone: formData.phone || '',
        niche: formData.niche || 'Business Coach',
        country: formData.country || 'United States',
        website: formData.website || '',
        socialProfile: formData.socialProfile || '',
        offer: formData.offer || '1:1 Coaching',
        offerPrice: Number(formData.offerPrice) || 3000,
        dealValue: Number(formData.offerPrice) || 3000,
        monthlyLeads: Number(formData.monthlyLeads) || 20,
        monthlyBookedCalls: Number(formData.monthlyBookedCalls) || 3,
        leadSource: formData.leadSource || 'Organic Social',
        cta: formData.cta || 'DM or Link in bio',
        funnel: formData.leadCaptureMethod || 'Direct DMs',
        bookingSystem: formData.bookingSystem || 'Manual',
        leadMagnet: formData.leadMagnet || 'None',
        followUp: formData.followUpCadence || 'None',
        painPoint: formData.biggestChallenge || 'Losing leads before they book',
        opportunity: `Fix ${evaluation.leaks[0]?.title || 'Lead Capture'} to recover ~$${evaluation.economics.estimatedMonthlyLostRevenue.toLocaleString()}/mo.`,
        stage: 'Audit Completed',
        auditScore: evaluation.score,
        latestAuditId: auditRecord.id,
        assignedTo: 'user-setter',
        lastContactDate: new Date().toISOString(),
        tags: ['Inbound Audit', formData.niche || 'Coach']
      });
    }

    // Auto-record interaction log
    dbStore.create('interactions', {
      leadId: existingLead.id,
      type: 'AUDIT_COMPLETED',
      title: `Completed Funnel Diagnostic (Score: ${evaluation.score}/100)`,
      details: evaluation.summary,
      timestamp: new Date().toISOString()
    });

    return res.status(201).json({
      success: true,
      message: 'Audit evaluated successfully',
      auditId: auditRecord.id,
      leadId: existingLead.id,
      evaluation
    });
  } catch (err) {
    console.error('Error submitting audit:', err);
    return res.status(500).json({ error: 'Failed to process audit report' });
  }
};

export const getAuditById = (req, res) => {
  try {
    const { id } = req.params;
    const audit = dbStore.findById('audits', id);
    if (!audit) {
      return res.status(404).json({ error: 'Audit record not found' });
    }
    return res.json({ audit });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch audit' });
  }
};

export const getAllAudits = (req, res) => {
  try {
    const audits = dbStore.get('audits');
    return res.json({ count: audits.length, audits });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch audits' });
  }
};
