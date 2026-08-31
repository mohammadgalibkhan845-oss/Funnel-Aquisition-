import { dbStore } from '../config/db.js';

export const getLeads = (req, res) => {
  try {
    const { stage, niche, country, search, sortBy = 'updatedAt', order = 'desc' } = req.query;
    let leads = [...dbStore.get('leads')];

    if (stage && stage !== 'all') {
      leads = leads.filter(l => l.stage === stage);
    }
    if (niche && niche !== 'all') {
      leads = leads.filter(l => l.niche.toLowerCase().includes(niche.toLowerCase()));
    }
    if (country && country !== 'all') {
      leads = leads.filter(l => l.country.toLowerCase().includes(country.toLowerCase()));
    }
    if (search) {
      const q = search.toLowerCase();
      leads = leads.filter(l =>
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.niche.toLowerCase().includes(q) ||
        (l.painPoint && l.painPoint.toLowerCase().includes(q))
      );
    }

    leads.sort((a, b) => {
      const valA = a[sortBy] || '';
      const valB = b[sortBy] || '';
      if (order === 'asc') return valA > valB ? 1 : -1;
      return valA < valB ? 1 : -1;
    });

    return res.json({ count: leads.length, leads });
  } catch (err) {
    console.error('Error fetching leads:', err);
    return res.status(500).json({ error: 'Failed to fetch leads' });
  }
};

export const getLeadById = (req, res) => {
  try {
    const { id } = req.params;
    const lead = dbStore.findById('leads', id);
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    const interactions = dbStore.find('interactions', { leadId: id });
    return res.json({ lead, interactions });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch lead details' });
  }
};

export const createLead = (req, res) => {
  try {
    const data = req.body;
    if (!data.name || !data.email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const newLead = dbStore.create('leads', {
      name: data.name,
      email: data.email.toLowerCase().trim(),
      phone: data.phone || '',
      niche: data.niche || 'Business Coach',
      country: data.country || 'United States',
      website: data.website || '',
      socialProfile: data.socialProfile || '',
      offer: data.offer || 'Coaching Program',
      offerPrice: Number(data.offerPrice) || 3000,
      dealValue: Number(data.offerPrice) || 3000,
      monthlyLeads: Number(data.monthlyLeads) || 20,
      monthlyBookedCalls: Number(data.monthlyBookedCalls) || 2,
      leadSource: data.leadSource || 'Organic Social',
      cta: data.cta || 'DM or link in bio',
      funnel: data.funnel || 'Direct DMs',
      bookingSystem: data.bookingSystem || 'Manual',
      leadMagnet: data.leadMagnet || 'None',
      followUp: data.followUp || 'Manual',
      painPoint: data.painPoint || 'Lacks a scalable acquisition system',
      opportunity: data.opportunity || 'Install automated quiz funnel + nurture sequence',
      stage: data.stage || 'Prospect Researched',
      auditScore: data.auditScore || 45,
      assignedTo: data.assignedTo || 'user-setter',
      lastContactDate: new Date().toISOString(),
      notes: data.notes || '',
      tags: data.tags || ['New Prospect']
    });

    dbStore.create('interactions', {
      leadId: newLead.id,
      type: 'LEAD_CREATED',
      title: 'Prospect Added to Pipeline',
      details: `Prospect added under stage "${newLead.stage}" with estimated deal value of $${newLead.dealValue}.`,
      timestamp: new Date().toISOString()
    });

    return res.status(201).json({ success: true, lead: newLead });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to create lead' });
  }
};

export const updateLead = (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = req.body;
    const updated = dbStore.update('leads', id, updateFields);
    if (!updated) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    return res.json({ success: true, lead: updated });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to update lead' });
  }
};

export const updateLeadStage = (req, res) => {
  try {
    const { id } = req.params;
    const { stage, notes } = req.body;
    if (!stage) {
      return res.status(400).json({ error: 'Stage is required' });
    }

    const lead = dbStore.findById('leads', id);
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    const oldStage = lead.stage;
    const updated = dbStore.update('leads', id, {
      stage,
      lastContactDate: new Date().toISOString(),
      ...(notes ? { notes } : {})
    });

    dbStore.create('interactions', {
      leadId: id,
      type: 'STAGE_CHANGED',
      title: `Moved from "${oldStage}" to "${stage}"`,
      details: notes || `Lead progression stage updated to ${stage}.`,
      timestamp: new Date().toISOString()
    });

    return res.json({ success: true, lead: updated, oldStage, newStage: stage });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to update stage' });
  }
};

export const addInteraction = (req, res) => {
  try {
    const { id } = req.params;
    const { type = 'NOTE', title, details } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required for interaction' });
    }

    const lead = dbStore.findById('leads', id);
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    const interaction = dbStore.create('interactions', {
      leadId: id,
      type,
      title,
      details: details || '',
      timestamp: new Date().toISOString()
    });

    dbStore.update('leads', id, { lastContactDate: new Date().toISOString() });

    return res.status(201).json({ success: true, interaction });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to log interaction' });
  }
};

export const deleteLead = (req, res) => {
  try {
    const { id } = req.params;
    const deleted = dbStore.delete('leads', id);
    if (!deleted) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    return res.json({ success: true, message: 'Lead deleted' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to delete lead' });
  }
};

export const resetSeedData = (req, res) => {
  try {
    dbStore.resetToSeed();
    return res.json({ success: true, message: 'Pipeline reset to initial high-ticket seed data' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to reset seed data' });
  }
};
