import { dbStore } from '../config/db.js';
import { initialAgencyPitch } from '../data/seedData.js';

export const getOutreachTemplates = (req, res) => {
  try {
    const templates = dbStore.get('outreachTemplates');
    return res.json({ templates, pitch: initialAgencyPitch });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch templates' });
  }
};

export const generateOutreach = (req, res) => {
  try {
    const {
      coachName = 'Coach',
      niche = 'Executive Coach',
      platform = 'Instagram DM',
      currentObservation = 'sending Instagram traffic directly toward DMs',
      identifiedProblem = 'no automated lead capture or nurture sequence',
      offerName = 'High-Ticket Mastermind',
      offerPrice = 5000,
      customOpportunity = 'turn warm followers into qualified calls with a 2-step diagnostic quiz'
    } = req.body;

    let observationText = '';
    let problemText = '';
    let opportunityText = '';
    let ctaText = '';

    if (platform === 'Instagram DM') {
      observationText = `Hey ${coachName}, I came across your coaching page and noticed you're ${currentObservation}.`;
      problemText = `Your offer (${offerName}) looks super strong, but since there is ${identifiedProblem}, you're likely losing 70%+ of interested prospects who aren't ready to buy on day 1.`;
      opportunityText = `I recorded a 2-minute video breakdown showing how we install a custom Client Acquisition System to ${customOpportunity}.`;
      ctaText = `Want me to send the video breakdown over?`;
    } else if (platform === 'LinkedIn InMail') {
      observationText = `Hi ${coachName},\n\nEnjoyed your recent content on ${niche} leadership. Noticed you're actively generating inquiries, but ${currentObservation}.`;
      problemText = `For high-ticket offers at ~$${Number(offerPrice).toLocaleString()}, ${identifiedProblem} usually causes high no-show rates and lost deals.`;
      opportunityText = `We created a custom Funnel Audit Blueprint showing how to ${customOpportunity}.`;
      ctaText = `Would you be open to reviewing the 1-page map?`;
    } else if (platform === 'YouTube / Cold Email') {
      observationText = `Hey ${coachName},\n\nHuge fan of your YouTube content. The depth you bring to ${niche} is top tier.`;
      problemText = `I noticed your video descriptions currently link directly to a single form without an automated lead capture or nurture sequence (${identifiedProblem}).`;
      opportunityText = `With your viewership, installing an acquisition engine could easily ${customOpportunity}.`;
      ctaText = `I mapped out a quick blueprint for your business. Mind if I share the link?`;
    } else {
      observationText = `Hey ${coachName}, checked out your ${niche} coaching system.`;
      problemText = `Identified a major leak where ${identifiedProblem}.`;
      opportunityText = `We can easily ${customOpportunity}.`;
      ctaText = `Mind if I send over a quick 2-minute walkthrough?`;
    }

    const fullMessage = `${observationText}\n\n${problemText}\n\n${opportunityText}\n\n${ctaText}`;

    return res.json({
      framework: 'Observation → Problem → Opportunity → CTA',
      platform,
      coachName,
      components: {
        observation: observationText,
        problem: problemText,
        opportunity: opportunityText,
        cta: ctaText
      },
      fullMessage
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to generate outreach' });
  }
};
