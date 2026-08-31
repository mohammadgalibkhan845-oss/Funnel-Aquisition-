import { calculateAuditScore } from '../src/services/auditScoringEngine.js';

console.log('🧪 Testing Coach Funnel Diagnostic Engine...');

// Test 1: Low-ticket/Broken Funnel Coach
const leakyCoach = {
  name: 'Sam Coach',
  email: 'sam@test.com',
  niche: 'Fitness Coach',
  offer: '1:1 Coaching',
  offerPrice: 1500,
  monthlyLeads: 40,
  monthlyBookedCalls: 2,
  leadSource: 'Social Media DMs',
  leadCaptureMethod: 'Direct DM / Link in Bio',
  bookingSystem: 'Manual Messaging',
  nurtureMethod: 'None / Manual',
  followUpCadence: 'Single follow up or none',
  biggestChallenge: 'People ghost after asking for price in DMs'
};

const leakyResult = calculateAuditScore(leakyCoach);
console.log('1. Leaky Funnel Score:', leakyResult.score, '| Grade:', leakyResult.grade);
console.log('   Estimated Monthly Lost Revenue: $' + leakyResult.economics.estimatedMonthlyLostRevenue.toLocaleString());
console.log('   Leaks Detected:', leakyResult.leaks.length);

if (leakyResult.score < 50 && leakyResult.leaks.length >= 3) {
  console.log('✅ Test 1 Passed: Identified leaky funnel correctly.');
} else {
  console.error('❌ Test 1 Failed:', leakyResult);
  process.exit(1);
}

// Test 2: High-Performing System
const highPerfCoach = {
  name: 'Victoria Vance',
  email: 'victoria@test.com',
  niche: 'Executive & Leadership Coach',
  offer: 'Enterprise Leadership Accelerator',
  offerPrice: 10000,
  monthlyLeads: 90,
  monthlyBookedCalls: 18,
  leadSource: 'Organic Social (LinkedIn/IG)',
  leadCaptureMethod: 'Diagnostic Quiz / Scorecard Funnel',
  bookingSystem: 'Cal.com/Calendly with 2-Step Qualification + SMS',
  nurtureMethod: 'Automated Day 0-7 Sequence + Multi-channel',
  followUpCadence: 'Multi-channel (Email + SMS + CRM Pipeline)',
  biggestChallenge: 'Scaling capacity'
};

const highPerfResult = calculateAuditScore(highPerfCoach);
console.log('2. High-Performance Score:', highPerfResult.score, '| Grade:', highPerfResult.grade);
if (highPerfResult.score >= 85) {
  console.log('✅ Test 2 Passed: High performance funnel recognized.');
} else {
  console.error('❌ Test 2 Failed:', highPerfResult);
  process.exit(1);
}

console.log('🎉 All Scoring Engine tests passed!');
