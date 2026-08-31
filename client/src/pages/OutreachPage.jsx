import React, { useState, useEffect } from 'react';
import { 
  Send, 
  Sparkles, 
  Copy, 
  Check, 
  Instagram, 
  Linkedin, 
  Youtube, 
  Mail, 
  Volume2, 
  ShieldCheck, 
  Target, 
  ArrowRight,
  Flame
} from 'lucide-react';
import { api } from '../services/api';

export default function OutreachPage() {
  const [platform, setPlatform] = useState('Instagram DM');
  const [coachName, setCoachName] = useState('Sarah');
  const [niche, setNiche] = useState('Executive & Leadership Coach');
  const [offerName, setOfferName] = useState('C-Suite Mindset Accelerator');
  const [offerPrice, setOfferPrice] = useState(5000);
  const [observation, setObservation] = useState('sending Instagram traffic directly toward DMs with no automated funnel');
  const [problem, setProblem] = useState('no structured lead capture or automated nurture sequence');
  const [opportunity, setOpportunity] = useState('turn warm followers into qualified calls with a 2-step diagnostic quiz');
  
  const [generated, setGenerated] = useState(null);
  const [pitchData, setPitchData] = useState(null);
  const [copied, setCopied] = useState(false);
  const [copiedPitch, setCopiedPitch] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchPitch = async () => {
    try {
      const res = await api.getOutreachTemplates();
      setPitchData(res.pitch);
    } catch (err) {
      console.error('Failed to load templates:', err);
    }
  };

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const res = await api.generateOutreach({
        coachName,
        niche,
        platform,
        currentObservation: observation,
        identifiedProblem: problem,
        offerName,
        offerPrice,
        customOpportunity: opportunity
      });
      setGenerated(res);
    } catch (err) {
      alert('Failed to generate outreach: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPitch();
    handleGenerate();
  }, [platform]);

  const copyOutreach = () => {
    if (!generated?.fullMessage) return;
    navigator.clipboard.writeText(generated.fullMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const copyPitch = () => {
    if (!pitchData?.script) return;
    navigator.clipboard.writeText(pitchData.script);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Header */}
      <div className="space-y-2 border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <Send className="w-3.5 h-3.5" />
          <span>Section 17 & 18: Cold Outreach & Positioning Engine</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          High-Ticket <span className="gradient-text">Outreach Copy Studio</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-3xl">
          Diagnose first instead of immediately pitching. Generate high-converting 4-part scripts tailored for Instagram DMs, LinkedIn InMail, YouTube, and Cold Email.
        </p>
      </div>

      {/* Grid: 4-Part Generator + 30-Sec Pitch Script */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 7 Cols: Interactive Generator */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 shadow-xl">
            
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Configure Outreach Parameters</span>
            </h3>

            {/* Platform Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase block">Outreach Channel:</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { name: 'Instagram DM', icon: Instagram, color: 'text-pink-400' },
                  { name: 'LinkedIn InMail', icon: Linkedin, color: 'text-blue-400' },
                  { name: 'YouTube / Cold Email', icon: Youtube, color: 'text-rose-400' },
                  { name: 'Direct Email', icon: Mail, color: 'text-emerald-400' }
                ].map((p) => {
                  const Icon = p.icon;
                  const active = platform === p.name;
                  return (
                    <button
                      key={p.name}
                      onClick={() => setPlatform(p.name)}
                      className={`p-3 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all ${
                        active
                          ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300 shadow-sm'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${p.color}`} />
                      <span className="truncate">{p.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Form Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase">Target Coach Name:</label>
                <input
                  type="text"
                  value={coachName}
                  onChange={(e) => setCoachName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-400"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase">Coaching Niche:</label>
                <input
                  type="text"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-400"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase">Offer Name:</label>
                <input
                  type="text"
                  value={offerName}
                  onChange={(e) => setOfferName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-400"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase">Offer Price ($):</label>
                <input
                  type="number"
                  value={offerPrice}
                  onChange={(e) => setOfferPrice(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Step 1: Specific Observation (What you noticed):</label>
              <input
                type="text"
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Step 2: The Bottleneck / Problem Cost:</label>
              <input
                type="text"
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-navy-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>{loading ? 'Generating...' : 'Generate 4-Part Script'}</span>
            </button>

          </div>
        </div>

        {/* Right 5 Cols: Output & The 30-Sec Pitch Script */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* 4-Part Generated Script Card */}
          {generated && (
            <div className="glass-panel p-6 rounded-3xl border border-emerald-500/30 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">
                  Ready-to-Send Script ({platform})
                </span>
                <button
                  onClick={copyOutreach}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 text-navy-950 font-bold text-xs flex items-center gap-1.5 hover:bg-emerald-400"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Script'}</span>
                </button>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs sm:text-sm text-slate-200 whitespace-pre-line leading-relaxed">
                {generated.fullMessage}
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 pt-1">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="font-bold text-blue-400 block">1. Observation</span>
                  <span>Non-sales diagnostic hook</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="font-bold text-rose-400 block">2. Problem</span>
                  <span>Highlight 70%+ lead loss</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="font-bold text-amber-400 block">3. Opportunity</span>
                  <span>2-min video roadmap</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="font-bold text-emerald-400 block">4. Low-Friction CTA</span>
                  <span>"Want me to send it over?"</span>
                </div>
              </div>
            </div>
          )}

          {/* Section 18: The 30-Second Agency Message Script */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Section 18: 30-Sec Elevator Pitch
                </span>
              </div>
              <button
                onClick={copyPitch}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold flex items-center gap-1"
              >
                {copiedPitch ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedPitch ? 'Copied' : 'Copy Pitch'}</span>
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed italic bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
              "{pitchData?.script || `We help coaches build predictable client acquisition systems. Instead of simply building a website or funnel, we look at the entire journey — how prospects discover you, how they are captured, how they are nurtured, how they book a call, and how they are followed up with. We build the funnels, automation, CRM, follow-up, and conversion strategy needed to turn more of your existing attention and leads into qualified sales conversations. Our goal isn't to give you another pretty website. Our goal is to build a system that helps you acquire more clients.`}"
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
