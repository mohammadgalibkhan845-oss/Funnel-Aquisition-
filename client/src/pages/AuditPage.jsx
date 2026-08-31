import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Flame, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  ArrowLeft, 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  Layers, 
  ShieldCheck,
  Target,
  BarChart,
  HelpCircle
} from 'lucide-react';
import { api } from '../services/api';
import { useFunnel } from '../context/FunnelContext';

export default function AuditPage() {
  const navigate = useNavigate();
  const { saveAuditResult, latestAudit } = useFunnel();

  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    socialProfile: '',
    niche: 'Business & Agency Coach',
    offer: '90-Day High-Ticket Accelerator',
    offerPrice: 4000,
    monthlyLeads: 35,
    monthlyBookedCalls: 5,
    leadSource: 'Organic Social (LinkedIn/IG)',
    leadCaptureMethod: 'Direct DM / Link in Bio',
    bookingSystem: 'Manual Messaging / DM Links',
    nurtureMethod: 'None / Manual Follow-up',
    followUpCadence: 'Single follow up or none',
    biggestChallenge: 'Leads disappear in DMs and do not show up to calls'
  });

  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(latestAudit?.evaluation || null);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('Please enter your name and email to generate your diagnostic report.');
      return;
    }

    try {
      setLoading(true);
      const res = await api.submitAudit(formData);
      saveAuditResult(res);
      setReport(res.evaluation);
    } catch (err) {
      alert('Failed to calculate audit score: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Flame className="w-4 h-4" />
          <span>Section 9: Coach Acquisition Scorecard</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Is Your Coaching Funnel <span className="gradient-text">Losing Clients</span> Before They Book?
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
          Get a free 5-pillar breakdown of your client acquisition engine. Discover where you are losing qualified $1k–$10k+ sales calls.
        </p>
      </div>

      {!report ? (
        /* MULTI-STEP DIAGNOSTIC FORM */
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl space-y-8 relative overflow-hidden">
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-wider">
              <span>Step {step} of {totalSteps}</span>
              <span>{Math.round((step / totalSteps) * 100)}% Complete</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-300"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Step 1: Niche & Offer */}
            {step === 1 && (
              <div className="space-y-5 animate-fadeIn">
                <h3 className="text-lg font-bold text-white">Step 1: Your Coaching Niche & Core Offer</h3>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase block">Select Your Coaching Niche:</label>
                  <select
                    value={formData.niche}
                    onChange={(e) => handleChange('niche', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-400"
                  >
                    <option value="Business & Agency Coach">Business & Agency Coach</option>
                    <option value="Executive & Leadership Coach">Executive & Leadership Coach</option>
                    <option value="Health & Wellness Coach">Health & Wellness Coach</option>
                    <option value="Fitness & Body Transformation Coach">Fitness & Body Transformation Coach</option>
                    <option value="Relationship & Dating Coach">Relationship & Dating Coach</option>
                    <option value="Career & Executive Transition Coach">Career & Executive Transition Coach</option>
                    <option value="Life & Mindset Transformation Coach">Life & Mindset Transformation Coach</option>
                    <option value="B2B High-Ticket Sales Coach">B2B High-Ticket Sales Coach</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase block">What is your primary high-ticket offer called?</label>
                  <input
                    type="text"
                    value={formData.offer}
                    onChange={(e) => handleChange('offer', e.target.value)}
                    placeholder="e.g. 90-Day Executive Accelerator"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Economics */}
            {step === 2 && (
              <div className="space-y-5 animate-fadeIn">
                <h3 className="text-lg font-bold text-white">Step 2: Offer Economics & Lead Flow</h3>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-300 uppercase">
                    <span>What is your average offer price per client?</span>
                    <span className="text-emerald-400 font-mono text-base font-bold">${formData.offerPrice.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="15000"
                    step="500"
                    value={formData.offerPrice}
                    onChange={(e) => handleChange('offerPrice', Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 uppercase block">Monthly Inquiries / Leads:</label>
                    <input
                      type="number"
                      value={formData.monthlyLeads}
                      onChange={(e) => handleChange('monthlyLeads', Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 uppercase block">Monthly Booked Strategy Calls:</label>
                    <input
                      type="number"
                      value={formData.monthlyBookedCalls}
                      onChange={(e) => handleChange('monthlyBookedCalls', Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Traffic & Lead Capture */}
            {step === 3 && (
              <div className="space-y-5 animate-fadeIn">
                <h3 className="text-lg font-bold text-white">Step 3: Traffic Source & Lead Capture Mechanism</h3>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase block">Where do most of your prospective clients discover you?</label>
                  <select
                    value={formData.leadSource}
                    onChange={(e) => handleChange('leadSource', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-400"
                  >
                    <option value="Organic Social (LinkedIn/IG)">Organic Social (LinkedIn / Instagram)</option>
                    <option value="YouTube / Podcast">YouTube / Podcast / Long-form</option>
                    <option value="Paid Meta/Google Ads">Paid Meta / Google Ads</option>
                    <option value="Referrals & Word of Mouth">Referrals & Word of Mouth</option>
                    <option value="Social Media DMs">Cold DMs & Manual Outreach</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase block">What happens when someone becomes interested?</label>
                  <select
                    value={formData.leadCaptureMethod}
                    onChange={(e) => handleChange('leadCaptureMethod', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-400"
                  >
                    <option value="Direct DM / Link in Bio">Traffic goes directly to Instagram/LinkedIn DMs</option>
                    <option value="Linktree / Multi-link list">Linktree with 4+ links</option>
                    <option value="Standard Landing Page">Basic landing page with generic form</option>
                    <option value="High Value Lead Magnet / VSL">High-value lead magnet / VSL page</option>
                    <option value="Diagnostic Quiz / Scorecard Funnel">Interactive Diagnostic Scorecard Funnel</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 4: Booking & Nurture */}
            {step === 4 && (
              <div className="space-y-5 animate-fadeIn">
                <h3 className="text-lg font-bold text-white">Step 4: Booking Flow & Automated Follow-Up</h3>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase block">How do prospects book a sales/strategy call?</label>
                  <select
                    value={formData.bookingSystem}
                    onChange={(e) => handleChange('bookingSystem', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-400"
                  >
                    <option value="Manual Messaging / DM Links">Manual messaging / back-and-forth time coordination</option>
                    <option value="Google Doc / Form">Google Form / Typeform (No automated calendar)</option>
                    <option value="Standard Calendly / Acuity (No SMS)">Standard Calendly / Acuity link (No SMS reminders)</option>
                    <option value="Cal.com/Calendly with 2-Step Qualification + SMS">2-Step Qualification Calendar with SMS confirmation</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase block">What happens to people who are interested but not ready to buy today?</label>
                  <select
                    value={formData.nurtureMethod}
                    onChange={(e) => handleChange('nurtureMethod', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-400"
                  >
                    <option value="None / Manual Follow-up">No automated nurture (leads disappear)</option>
                    <option value="Occasional Manual Follow-up">Occasional manual follow-up messages</option>
                    <option value="Weekly Newsletter / Broadcast">Weekly newsletter broadcast</option>
                    <option value="Automated Day 0-7 Sequence + Multi-channel">Automated Day 0–7 indoctrination email + SMS sequence</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 5: Contact & Submit */}
            {step === 5 && (
              <div className="space-y-5 animate-fadeIn">
                <h3 className="text-lg font-bold text-white">Step 5: Where should we send your full Scorecard?</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 uppercase block">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 uppercase block">Your Business Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="sarah@coaching.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 uppercase block">Phone / WhatsApp (For SMS reminders)</label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 uppercase block">Website or Social Profile</label>
                    <input
                      type="text"
                      value={formData.website}
                      onChange={(e) => handleChange('website', e.target.value)}
                      placeholder="https://instagram.com/mycoaching"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase block">What is your biggest acquisition challenge right now?</label>
                  <textarea
                    rows={2}
                    value={formData.biggestChallenge}
                    onChange={(e) => handleChange('biggestChallenge', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-800">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
              ) : <div />}

              {step < totalSteps ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-navy-950 text-xs font-extrabold flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-navy-950 text-sm font-black flex items-center gap-2 shadow-xl shadow-emerald-500/25 disabled:opacity-50"
                >
                  <Flame className="w-4 h-4" />
                  <span>{loading ? 'Evaluating 5 Pillars...' : 'Generate My Scorecard & Action Plan'}</span>
                </button>
              )}
            </div>

          </form>
        </div>
      ) : (
        /* REPORT CARD SCREEN */
        <div className="space-y-8 animate-fadeIn">
          
          {/* Top Score Banner */}
          <div className="p-6 sm:p-10 rounded-3xl bg-slate-900 border border-emerald-500/40 shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-4 text-center md:border-r md:border-slate-800 md:pr-6 space-y-2">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-bold">Overall Funnel Health</span>
              <div className="text-6xl sm:text-7xl font-black text-emerald-400 font-mono tracking-tight">
                {report.score}<span className="text-2xl text-slate-500">/100</span>
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                {report.grade}
              </div>
            </div>

            <div className="md:col-span-8 space-y-4 text-left">
              <h2 className="text-2xl font-extrabold text-white">
                Diagnostic Analysis for {formData.name}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {report.summary}
              </p>
              
              <div className="p-3.5 rounded-2xl bg-rose-950/30 border border-rose-500/30 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-rose-300 font-bold uppercase block">Estimated Revenue Leaked Monthly:</span>
                  <span className="text-xl font-extrabold text-rose-400 font-mono">
                    -${report.economics.estimatedMonthlyLostRevenue.toLocaleString()} / mo
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-400 font-medium block">Recommended Tier:</span>
                  <span className="text-sm font-bold text-emerald-300 uppercase">{report.tierRecommendation} System</span>
                </div>
              </div>
            </div>

          </div>

          {/* 5 Pillars Breakdown */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
            <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
              <BarChart className="w-5 h-5 text-emerald-400" />
              <span>The 5 Core Acquisition Pillars</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
              {Object.entries(report.pillars).map(([key, data]) => (
                <div key={key} className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-slate-300 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                  <div className="text-2xl font-black text-white font-mono">{data.score}/20</div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${data.percentage >= 70 ? 'bg-emerald-400' : data.percentage >= 50 ? 'bg-amber-400' : 'bg-rose-500'}`}
                      style={{ width: `${data.percentage}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-slate-400 font-semibold">{data.percentage}% efficiency</div>
                </div>
              ))}
            </div>
          </div>

          {/* Critical Leaks & Action Items */}
          {report.leaks.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <span>Identified Funnel Leaks & Prescribed Fixes</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {report.leaks.map((leak, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">{leak.pillar} Leak</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300">
                        {leak.severity} Severity
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-white">{leak.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{leak.description}</p>
                    <div className="text-xs text-emerald-300 bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20 font-medium">
                      🛠️ <strong>Prescription:</strong> {leak.fix}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Direct CTA: Book Call */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-950/50 via-slate-900 to-cyan-950/50 border border-emerald-500/40 text-center space-y-5 shadow-2xl">
            <h3 className="text-2xl font-extrabold text-white">
              Ready to Plug These Leaks and Add +${report.economics.projected3ClientGain.toLocaleString()}/mo?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
              Book a 1-on-1 Strategy Session with our acquisition architects. We will walk through your custom roadmap and show you how we build this entire system for you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to={`/book?name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}&price=${formData.offerPrice}&niche=${encodeURIComponent(formData.niche)}`}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-navy-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25"
              >
                <Calendar className="w-4 h-4" />
                <span>Book 1-on-1 Roadmap Session</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setReport(null)}
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
              >
                Re-take Diagnostic
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
