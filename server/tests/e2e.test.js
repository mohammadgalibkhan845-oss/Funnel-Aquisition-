import http from 'http';

const BASE_URL = 'http://127.0.0.1:5000/api';

async function testEndpoint(name, url, options = {}) {
  try {
    const res = await fetch(url, options);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(`Status ${res.status}: ${JSON.stringify(data)}`);
    }
    console.log(`✅ [PASS] ${name}`);
    return data;
  } catch (err) {
    console.error(`❌ [FAIL] ${name}:`, err.message);
    throw err;
  }
}

async function runE2ETests() {
  console.log('🚀 Starting Full Funnel End-to-End API Integration Tests...\n');

  // 1. Health check
  await testEndpoint('1. Health Check', `${BASE_URL}/health`);

  // 2. Demo login (Admin)
  const authData = await testEndpoint('2. Demo Auth Login', `${BASE_URL}/auth/demo-login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role: 'admin' })
  });

  // 3. Submit Funnel Audit Quiz
  const auditResult = await testEndpoint('3. Submit Funnel Diagnostic Quiz', `${BASE_URL}/audit/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Dr. Rebecca Stone',
      email: 'rebecca@stoneexecutive.com',
      phone: '+1 555-444-3322',
      niche: 'Executive & Leadership Coach',
      offer: 'CEO Transition Program',
      offerPrice: 8000,
      monthlyLeads: 50,
      monthlyBookedCalls: 6,
      leadSource: 'Organic Social (LinkedIn/IG)',
      leadCaptureMethod: 'Direct DM / Link in Bio',
      bookingSystem: 'Manual Messaging / DM Links',
      nurtureMethod: 'None / Manual Follow-up',
      followUpCadence: 'Single follow up or none',
      biggestChallenge: 'Losing 70% of leads before they book a call'
    })
  });

  console.log(`   -> Evaluated Score: ${auditResult.evaluation.score}/100 | Grade: ${auditResult.evaluation.grade}`);
  console.log(`   -> Monthly Lost Revenue: $${auditResult.evaluation.economics.estimatedMonthlyLostRevenue.toLocaleString()}`);

  // 4. Verify CRM Lead was created/updated
  const leadsData = await testEndpoint('4. Fetch CRM Leads List', `${BASE_URL}/leads`);
  const createdLead = leadsData.leads.find(l => l.email === 'rebecca@stoneexecutive.com');
  if (!createdLead) throw new Error('Lead was not auto-created in CRM pipeline!');
  console.log(`   -> Found Lead in CRM: ${createdLead.name} (${createdLead.stage}) with Deal Value $${createdLead.dealValue}`);

  // 5. Book Strategy Discovery Call
  const bookingResult = await testEndpoint('5. Book 1-on-1 Strategy Call', `${BASE_URL}/bookings/book`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Dr. Rebecca Stone',
      email: 'rebecca@stoneexecutive.com',
      niche: 'Executive & Leadership Coach',
      offer: 'CEO Transition Program',
      offerPrice: 8000,
      date: '2026-09-03',
      time: '14:30',
      timezone: 'America/New_York (EST)'
    })
  });
  console.log(`   -> Booked Strategy Call ID: ${bookingResult.booking.id} (${bookingResult.booking.status})`);

  // 6. Trigger Follow-Up Sequence (Day 0 & Day 5)
  const seqResult = await testEndpoint('6. Trigger Automated Day 0 Nurture Sequence', `${BASE_URL}/sequences/trigger`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      leadId: createdLead.id,
      sequenceId: 'seq-day-0'
    })
  });
  console.log(`   -> Dispatched Subject: "${seqResult.dispatched.renderedEmail.subject}"`);

  // 7. Generate 4-Part Outreach Script
  const outreachResult = await testEndpoint('7. Generate 4-Part Outreach Script', `${BASE_URL}/outreach/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      coachName: 'Dr. Rebecca Stone',
      niche: 'Executive Coach',
      platform: 'LinkedIn InMail',
      offerPrice: 8000
    })
  });
  console.log(`   -> Generated Framework: ${outreachResult.framework}`);

  // 8. Analytics Verification
  const analyticsData = await testEndpoint('8. Fetch Conversion Analytics', `${BASE_URL}/analytics/overview`);
  console.log(`   -> Pipeline Value: $${analyticsData.kpis.totalPipelineValue.toLocaleString()} | Show-up Rate: ${analyticsData.kpis.showUpRate}%`);

  console.log('\n🎉 ALL FULL-STACK INTEGRATION TESTS PASSED SUCCESSFULLY!\n');
}

runE2ETests().catch(() => process.exit(1));
