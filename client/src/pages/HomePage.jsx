import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Flame, ArrowRight, Calendar, ExternalLink } from 'lucide-react';
import { api } from '../services/api';

const CALENDLY_URL = 'https://calendly.com/muhammadarish/free-funnel-client-acquisition-audit';

export default function HomePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    site: '',
    leads: '',
    source: '',
    challenge: ''
  });

  const [formState, setFormState] = useState('idle'); // 'idle' | 'scanning' | 'results'
  const [scores, setScores] = useState({
    traffic: 0,
    capture: 0,
    nurture: 0,
    booking: 0,
    followup: 0
  });
  const [displayedOverall, setDisplayedOverall] = useState(0);
  const [weakestPillar, setWeakestPillar] = useState('');
  const auditRef = useRef(null);

  const handleAuditSubmit = async (e) => {
    e.preventDefault();
    setFormState('scanning');

    // Calculate score logic directly from uploaded specification
    const leadsScoreMap = { low: 38, mid: 58, high: 78, top: 94 };
    const captureScoreMap = { dm: 42, form: 76, referral: 82, ads: 64, mixed: 70 };
    
    const trafficScore = leadsScoreMap[formData.leads] || 50;
    const captureScore = captureScoreMap[formData.source] || 55;
    let nurtureScore = 82;
    let bookingScore = 80;
    let followupScore = 80;

    if (formData.challenge === 'cold') {
      nurtureScore = 35;
      followupScore = 45;
    } else if (formData.challenge === 'booking') {
      bookingScore = 32;
    } else if (formData.challenge === 'close') {
      followupScore = 40;
      bookingScore = 60;
    } else if (formData.challenge === 'notenough') {
      nurtureScore = 65;
    }

    const calculatedScores = {
      traffic: trafficScore,
      capture: captureScore,
      nurture: nurtureScore,
      booking: bookingScore,
      followup: followupScore
    };

    const overall = Math.round(
      Object.values(calculatedScores).reduce((a, b) => a + b, 0) / 5
    );

    const labels = {
      traffic: 'Traffic',
      capture: 'Lead Capture',
      nurture: 'Nurturing',
      booking: 'Booking',
      followup: 'Follow-Up'
    };

    const lowestKey = Object.keys(calculatedScores).reduce((a, b) =>
      calculatedScores[a] < calculatedScores[b] ? a : b
    );

    // Save lead to backend database in background
    try {
      api.submitAudit({
        name: formData.name,
        email: formData.email,
        website: formData.site,
        monthlyLeads: formData.leads === 'top' ? 60 : formData.leads === 'high' ? 35 : formData.leads === 'mid' ? 18 : 8,
        leadCaptureMethod: formData.source,
        biggestChallenge: formData.challenge,
        calculatedScore: overall
      }).catch(() => {});
    } catch (e) {
      // Ignored for immediate responsive UI
    }

    // Transition after 1600ms scan
    setTimeout(() => {
      setScores(calculatedScores);
      setWeakestPillar(labels[lowestKey]);
      setFormState('results');

      // Count up overall score animation
      let cur = 0;
      const interval = setInterval(() => {
        cur += 2;
        if (cur >= overall) {
          cur = overall;
          clearInterval(interval);
        }
        setDisplayedOverall(cur);
      }, 20);
    }, 1600);
  };

  const getScoreColor = (val) => {
    if (val >= 75) return '#D4FF3D'; // Lime
    if (val >= 50) return '#FFA23D'; // Tangerine
    return '#FF4468'; // Flame
  };

  const scrollToAudit = () => {
    auditRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#0A0710] text-[#FAF6EF]">
      {/* Background Animated Gradient Blobs */}
      <div className="blob blob1" />
      <div className="blob blob2" />
      <div className="blob blob3" />

      {/* 1. TOP MARQUEE (Moving white ticker flush at the very top) */}
      <div className="marquee">
        <div className="marquee-track">
          <span>FREE FUNNEL AUDIT</span>
          <span>90 SECONDS</span>
          <span>NO PITCH</span>
          <span>5 PILLARS SCORED</span>
          <span>FREE FUNNEL AUDIT</span>
          <span>90 SECONDS</span>
          <span>NO PITCH</span>
          <span>5 PILLARS SCORED</span>
        </div>
      </div>

      {/* 2. TOP RIGHT BOOK A CALL BAR (Just below the moving white marquee) */}
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8 pt-6 pb-2 relative z-10 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FF4468] via-[#FFA23D] to-[#D4FF3D] p-[1.5px] shadow-md shadow-[#FF4468]/30 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-[#0A0710] rounded-full flex items-center justify-center">
              <Flame className="w-4 h-4 text-[#FF4468] fill-current" />
            </div>
          </div>
          <div className="flex items-center">
            <span className="font-extrabold text-lg tracking-tight text-white font-['Bricolage_Grotesque']">
              NEX<span className="text-[#FF4468]">LEADS</span>
            </span>
          </div>
        </Link>

        {/* Book a Call Button at Top Right */}
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary text-xs sm:text-sm px-5 sm:px-6 py-2.5 shadow-lg shadow-[#FF4468]/30 font-['Bricolage_Grotesque'] flex items-center gap-2"
        >
          <Calendar className="w-4 h-4" />
          <span>Book a Call</span>
        </a>
      </div>

      <div className="max-w-[1100px] mx-auto px-5 sm:px-8 relative z-10">

        {/* HERO SECTION */}
        <section className="pt-10 sm:pt-16 pb-16">
          <h1 className="text-4xl sm:text-7xl lg:text-[84px] font-black max-w-[920px] mb-8 leading-[0.98] tracking-tight">
            Your funnel has<br />a leak.<br />
            <span className="text-transparent font-black" style={{ WebkitTextStroke: '1.5px var(--dim)', color: 'transparent' }}>
              Let's find it.
            </span>
          </h1>
          
          <p className="text-lg sm:text-[19px] text-[#B8ADC9] max-w-[540px] mb-10 leading-relaxed font-normal">
            Run a live audit across five pillars — traffic, capture, nurturing, booking, follow-up — and see exactly where coaching leads disappear.
          </p>

          <button 
            onClick={scrollToAudit}
            className="btn btn-primary"
          >
            <Flame className="w-5 h-5 fill-current" />
            <span>Run My Free Audit</span>
          </button>

          {/* Bento Grid */}
          <div className="bento">
            <div className="bento-card big">
              <div>
                <h3 className="text-white">Client Acquisition Systems</h3>
                <p className="text-[#B8ADC9]">Funnels, CRM, and automation built specifically for coaches selling $1K–$10K programs.</p>
              </div>
              <div className="bento-num text-transparent bg-clip-text bg-gradient-to-r from-[#FF4468] via-[#FFA23D] to-[#D4FF3D]">
                01→05
              </div>
            </div>

            <div className="bento-card flame">
              <h3>Capture</h3>
              <p>Turn DMs into tracked leads, not vibes.</p>
            </div>

            <div className="bento-card lime">
              <h3>Automate</h3>
              <p>Follow-up that runs while you coach.</p>
            </div>
          </div>
        </section>

        {/* SIGNAL WAVE (THE PROBLEM) */}
        <section className="py-20 border-t border-white/5">
          <div className="text-xs font-bold uppercase tracking-widest text-[#FF4468] mb-4">
            THE PROBLEM
          </div>
          
          <div className="mb-10">
            <h2 className="text-3xl sm:text-5xl font-black text-white max-w-[640px] mb-3">
              Every lead is a signal. Most flatline.
            </h2>
            <p className="text-[#B8ADC9] text-base sm:text-lg max-w-[540px]">
              A DM comes in strong — then hits silence. Here's exactly where that happens.
            </p>
          </div>

          <div className="wave-box">
            <div className="wave-inner">
              <svg className="w-full h-auto block" viewBox="0 0 800 160" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="waveGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#D4FF3D" />
                    <stop offset="35%" stopColor="#D4FF3D" />
                    <stop offset="40%" stopColor="#FF4468" />
                    <stop offset="65%" stopColor="#FF4468" />
                    <stop offset="70%" stopColor="#FFA23D" />
                    <stop offset="100%" stopColor="#FFA23D" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,80 L60,80 L75,30 L90,130 L105,50 L120,80 L280,80 L290,80 L300,80 L440,80 L450,80 L460,80 L620,80 L635,55 L650,105 L665,80 L800,80"
                  fill="none"
                  stroke="url(#waveGrad)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div className="fail-labels">
                <div className="fail-item">
                  <strong>DM spikes, then flat</strong>
                  <span>no system to sort who's serious</span>
                </div>
                <div className="fail-item">
                  <strong>Interest flatlines</strong>
                  <span>no nurture, they go cold</span>
                </div>
                <div className="fail-item">
                  <strong>Ready-to-talk flatlines</strong>
                  <span>no booking flow, no call locked</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AUDIT SECTION */}
        <section id="audit" ref={auditRef} className="py-20 border-t border-white/5">
          <div className="text-center mb-10">
            <div className="text-xs font-bold uppercase tracking-widest text-[#FF4468] mb-3">
              RUN THE AUDIT
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white">
              Five questions. Your real score.
            </h2>
          </div>

          <div className="panel">
            <div className="panel-inner">
              
              {formState === 'idle' && (
                <form onSubmit={handleAuditSubmit} className="space-y-5">
                  <div className="field">
                    <label>NAME</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Coach"
                    />
                  </div>

                  <div className="field-row">
                    <div className="field">
                      <label>EMAIL</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="jane@coaching.com"
                      />
                    </div>
                    <div className="field">
                      <label>INSTAGRAM / WEBSITE</label>
                      <input
                        type="text"
                        required
                        value={formData.site}
                        onChange={(e) => setFormData({ ...formData, site: e.target.value })}
                        placeholder="@janecoaches"
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label>MONTHLY LEADS</label>
                    <select
                      required
                      value={formData.leads}
                      onChange={(e) => setFormData({ ...formData, leads: e.target.value })}
                    >
                      <option value="">Select one</option>
                      <option value="low">0–10</option>
                      <option value="mid">11–25</option>
                      <option value="high">26–50</option>
                      <option value="top">50+</option>
                    </select>
                  </div>

                  <div className="field">
                    <label>WHERE MOST LEADS COME FROM</label>
                    <select
                      required
                      value={formData.source}
                      onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                    >
                      <option value="">Select one</option>
                      <option value="dm">Instagram DMs, no form</option>
                      <option value="form">Website / landing page form</option>
                      <option value="referral">Referrals</option>
                      <option value="ads">Paid ads</option>
                      <option value="mixed">A mix of the above</option>
                    </select>
                  </div>

                  <div className="field">
                    <label>BIGGEST CHALLENGE RIGHT NOW</label>
                    <select
                      required
                      value={formData.challenge}
                      onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                    >
                      <option value="">Select one</option>
                      <option value="notenough">Not enough leads</option>
                      <option value="cold">Leads go cold before booking</option>
                      <option value="booking">Weak booking / low show-up rate</option>
                      <option value="close">Low close rate on calls</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-full mt-2"
                  >
                    <span>Run Diagnostic</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {formState === 'scanning' && (
                <div className="text-center py-16 px-4 space-y-6">
                  <div className="scan-pulse" />
                  <div className="font-bold text-sm text-[#B8ADC9] tracking-wider uppercase">
                    SCANNING FUNNEL...
                  </div>
                </div>
              )}

              {formState === 'results' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="big-score text-center mb-8">
                    <div className="num">{displayedOverall}</div>
                    <div className="lbl text-[#B8ADC9] text-sm mt-1 uppercase font-bold tracking-wider">
                      OVERALL FUNNEL SCORE
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="score-row">
                      <div className="score-label">Traffic</div>
                      <div className="score-track">
                        <div
                          className="score-fill"
                          style={{
                            width: `${scores.traffic}%`,
                            background: getScoreColor(scores.traffic)
                          }}
                        />
                      </div>
                      <div className="score-num" style={{ color: getScoreColor(scores.traffic) }}>
                        {scores.traffic}
                      </div>
                    </div>

                    <div className="score-row">
                      <div className="score-label">Lead Capture</div>
                      <div className="score-track">
                        <div
                          className="score-fill"
                          style={{
                            width: `${scores.capture}%`,
                            background: getScoreColor(scores.capture)
                          }}
                        />
                      </div>
                      <div className="score-num" style={{ color: getScoreColor(scores.capture) }}>
                        {scores.capture}
                      </div>
                    </div>

                    <div className="score-row">
                      <div className="score-label">Nurturing</div>
                      <div className="score-track">
                        <div
                          className="score-fill"
                          style={{
                            width: `${scores.nurture}%`,
                            background: getScoreColor(scores.nurture)
                          }}
                        />
                      </div>
                      <div className="score-num" style={{ color: getScoreColor(scores.nurture) }}>
                        {scores.nurture}
                      </div>
                    </div>

                    <div className="score-row">
                      <div className="score-label">Booking</div>
                      <div className="score-track">
                        <div
                          className="score-fill"
                          style={{
                            width: `${scores.booking}%`,
                            background: getScoreColor(scores.booking)
                          }}
                        />
                      </div>
                      <div className="score-num" style={{ color: getScoreColor(scores.booking) }}>
                        {scores.booking}
                      </div>
                    </div>

                    <div className="score-row">
                      <div className="score-label">Follow-Up</div>
                      <div className="score-track">
                        <div
                          className="score-fill"
                          style={{
                            width: `${scores.followup}%`,
                            background: getScoreColor(scores.followup)
                          }}
                        />
                      </div>
                      <div className="score-num" style={{ color: getScoreColor(scores.followup) }}>
                        {scores.followup}
                      </div>
                    </div>
                  </div>

                  <div className="verdict">
                    <strong>Weakest pillar: {weakestPillar}.</strong>
                    <br />
                    This is usually the fastest fix — and the one costing the most booked calls right now.
                  </div>

                  {/* Calendly Booking CTA */}
                  <div className="pt-2">
                    <a
                      href={CALENDLY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary w-full text-center flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-5 h-5" />
                      <span>Book My Free Strategy Call</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <p className="micro text-center mt-3">
                      30 minutes · No pitch · Just the gap and the fix
                    </p>
                  </div>

                </div>
              )}

            </div>
          </div>
        </section>

      </div>

      {/* Footer Marquee */}
      <footer className="mt-20">
        <div className="marquee">
          <div className="marquee-track">
            <span>@ITARISH.AI</span>
            <span>NEXLEADS</span>
            <span>CLIENT ACQUISITION SYSTEMS</span>
            <span>@ITARISH.AI</span>
            <span>NEXLEADS</span>
            <span>CLIENT ACQUISITION SYSTEMS</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
