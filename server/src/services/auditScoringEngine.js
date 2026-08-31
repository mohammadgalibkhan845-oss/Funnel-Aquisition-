/**
 * Coach Funnel Diagnostic & Audit Scoring Engine
 * Based on Section 9 & Pain Point Framework of the Coach Client Acquisition Roadmap.
 */

export function calculateAuditScore(formData) {
  const {
    name = 'Coach',
    email = '',
    website = '',
    niche = 'Business Coach',
    offer = '1:1 Coaching Program',
    offerPrice = 3000,
    monthlyLeads = 30,
    monthlyBookedCalls = 5,
    leadSource = 'Social Media DMs',
    leadCaptureMethod = 'Direct DM / Link in Bio',
    bookingSystem = 'Manual Messaging',
    nurtureMethod = 'None / Manual',
    followUpCadence = 'Single follow up or none',
    biggestChallenge = 'Inconsistent lead flow & low show-up rate'
  } = formData;

  const numericOfferPrice = Number(offerPrice) || 3000;
  const numericMonthlyLeads = Number(monthlyLeads) || 30;
  const numericBookedCalls = Number(monthlyBookedCalls) || 5;

  // 1. Pillar: Traffic & Quality (Max 20 pts)
  let trafficScore = 12;
  if (['Organic Social (LinkedIn/IG)', 'YouTube / Podcast', 'Paid Meta/Google Ads'].includes(leadSource)) {
    trafficScore += 6;
  } else if (leadSource === 'Referrals & Word of Mouth') {
    trafficScore += 3;
  }
  if (numericMonthlyLeads > 50) trafficScore = Math.min(20, trafficScore + 2);

  // 2. Pillar: Lead Capture & Conversion Friction (Max 20 pts)
  let leadCaptureScore = 6;
  if (leadCaptureMethod.includes('Diagnostic Quiz') || leadCaptureMethod.includes('Scorecard Funnel')) {
    leadCaptureScore = 19;
  } else if (leadCaptureMethod.includes('High Value Lead Magnet / VSL')) {
    leadCaptureScore = 15;
  } else if (leadCaptureMethod.includes('Standard Landing Page')) {
    leadCaptureScore = 11;
  } else {
    // Direct DMs or Linktree
    leadCaptureScore = 5;
  }

  // 3. Pillar: Nurturing & Automated Systems (Max 20 pts)
  let nurtureScore = 4;
  if (nurtureMethod.includes('Automated Day 0-7 Sequence + Multi-channel')) {
    nurtureScore = 20;
  } else if (nurtureMethod.includes('Weekly Newsletter / Broadcast')) {
    nurtureScore = 12;
  } else if (nurtureMethod.includes('Occasional Manual Follow-up')) {
    nurtureScore = 7;
  } else {
    nurtureScore = 3;
  }

  // 4. Pillar: Booking Flow & Qualification Gate (Max 20 pts)
  let bookingScore = 6;
  if (bookingSystem.includes('Cal.com/Calendly with 2-Step Qualification + SMS')) {
    bookingScore = 20;
  } else if (bookingSystem.includes('Standard Calendly / Acuity (No SMS)')) {
    bookingScore = 12;
  } else if (bookingSystem.includes('Google Doc / Form')) {
    bookingScore = 8;
  } else {
    // Manual messaging / DM coordination
    bookingScore = 4;
  }

  // 5. Pillar: Follow-Up Cadence & No-Show Recovery (Max 20 pts)
  let followUpScore = 4;
  if (followUpCadence.includes('Multi-channel (Email + SMS + CRM Pipeline)')) {
    followUpScore = 20;
  } else if (followUpCadence.includes('Automated 3-touch Email Follow-up')) {
    followUpScore = 13;
  } else if (followUpCadence.includes('1-2 Manual Follow-ups')) {
    followUpScore = 7;
  } else {
    followUpScore = 3;
  }

  // Cap each pillar to 20
  trafficScore = Math.min(20, Math.max(2, trafficScore));
  leadCaptureScore = Math.min(20, Math.max(2, leadCaptureScore));
  nurtureScore = Math.min(20, Math.max(2, nurtureScore));
  bookingScore = Math.min(20, Math.max(2, bookingScore));
  followUpScore = Math.min(20, Math.max(2, followUpScore));

  const totalScore = trafficScore + leadCaptureScore + nurtureScore + bookingScore + followUpScore;

  // Identify Leaks
  const leaks = [];
  if (leadCaptureScore < 12) {
    leaks.push({
      pillar: 'Lead Capture',
      severity: 'Critical',
      title: 'Direct-to-DM Traffic Drop-Off',
      description: 'Your traffic is directed to unstructured DMs or static links. Over 80% of interested prospects leave without leaving their contact info.',
      fix: 'Install a dedicated 2-step Quiz Funnel or VSL lead capture engine.'
    });
  }
  if (nurtureScore < 12) {
    leaks.push({
      pillar: 'Lead Nurturing',
      severity: 'High',
      title: 'Zero Automated Nurture Pipeline',
      description: 'Prospects who do not buy immediately on Day 0 are completely lost because there is no automated indoctrination sequence.',
      fix: 'Deploy the 5-touch (Day 0/1/3/5/7) email sequence educating prospects on your framework.'
    });
  }
  if (bookingScore < 12) {
    leaks.push({
      pillar: 'Booking Flow',
      severity: 'Medium',
      title: 'Booking Friction & Missing Qualification',
      description: 'Manual scheduling or unqualified booking links lead to low-ticket time wasters and high no-show rates (35-50%).',
      fix: 'Implement an automated pre-call qualification survey with automated SMS reminders.'
    });
  }
  if (followUpScore < 12) {
    leaks.push({
      pillar: 'Follow-Up',
      severity: 'High',
      title: 'Post-Call Revenue Leak',
      description: 'Valuable prospects who attend sales calls but do not close on the spot are not systematically re-engaged.',
      fix: 'Connect a Kanban CRM with automated no-show and re-engagement workflows.'
    });
  }

  // Economics Calculation (Lost Revenue estimate)
  // E.g., If they have 40 leads/mo at $4,000 ticket, and lack of nurture/followup loses 3 clients/mo
  const potentialAdditionalClients = Math.max(1, Math.min(8, Math.round((numericMonthlyLeads * 0.08))));
  const monthlyLostRevenue = potentialAdditionalClients * numericOfferPrice;
  const yearlyLostRevenue = monthlyLostRevenue * 12;

  // Grade & Recommended Package
  let grade = 'F';
  let tierRecommendation = 'Foundation';
  if (totalScore >= 85) {
    grade = 'A (Elite System)';
    tierRecommendation = 'Scale';
  } else if (totalScore >= 70) {
    grade = 'B (Solid Growth)';
    tierRecommendation = 'Scale';
  } else if (totalScore >= 50) {
    grade = 'C (Leaky Funnel)';
    tierRecommendation = 'Growth';
  } else {
    grade = 'D / Leaking (High Opportunity)';
    tierRecommendation = 'Foundation';
  }

  return {
    score: totalScore,
    grade,
    tierRecommendation,
    pillars: {
      traffic: { score: trafficScore, max: 20, percentage: Math.round((trafficScore / 20) * 100) },
      leadCapture: { score: leadCaptureScore, max: 20, percentage: Math.round((leadCaptureScore / 20) * 100) },
      nurturing: { score: nurtureScore, max: 20, percentage: Math.round((nurtureScore / 20) * 100) },
      booking: { score: bookingScore, max: 20, percentage: Math.round((bookingScore / 20) * 100) },
      followUp: { score: followUpScore, max: 20, percentage: Math.round((followUpScore / 20) * 100) }
    },
    leaks,
    economics: {
      currentPrice: numericOfferPrice,
      estimatedMonthlyLostRevenue: monthlyLostRevenue,
      estimatedYearlyLostRevenue: yearlyLostRevenue,
      potentialExtraClientsPerMonth: potentialAdditionalClients,
      projected3ClientGain: numericOfferPrice * 3
    },
    summary: `Your funnel scored ${totalScore}/100. Your biggest bottleneck is ${leaks[0]?.title || 'Follow-up consistency'}. Fixing your lead capture and automated sequence could add ~$${monthlyLostRevenue.toLocaleString()}/month in recovered high-ticket client revenue.`
  };
}
