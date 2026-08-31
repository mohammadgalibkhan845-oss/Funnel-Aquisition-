import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Send, Sparkles, Instagram, Linkedin, Youtube, Mail, Volume2 } from 'lucide-react';
import { api } from '../services/api';

export default function OutreachScriptDrawer({ targetLead, onClose }) {
  const [platform, setPlatform] = useState('Instagram DM');
  const [coachName, setCoachName] = useState(targetLead?.name || 'Sarah');
  const [niche, setNiche] = useState(targetLead?.niche || 'Executive Leadership');
  const [offerName, setOfferName] = useState(targetLead?.offer || '1:1 Transformation Mastermind');
  const [offerPrice, setOfferPrice] = useState(targetLead?.offerPrice || 5000);
  const [observation, setObservation] = useState(targetLead?.funnel ? `sending traffic to ${targetLead.funnel}` : 'sending Instagram traffic directly toward DMs');
  const [problem, setProblem] = useState(targetLead?.painPoint || 'no automated lead capture or nurture sequence');
  const [opportunity, setOpportunity] = useState('turn warm followers into qualified calls with a 2-step diagnostic quiz');
  
  const [generated, setGenerated] = useState(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

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
      alert('Failed to generate outreach');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGenerate();
  }, [platform]);

  const copyToClipboard = () => {
    if (!generated?.fullMessage) return;
    navigator.clipboard.writeText(generated.fullMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden my-8 flex flex-col">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-navy-900 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 p-0.5">
              <div className="w-full h-full bg-navy-950 rounded-[10px] flex items-center justify-center">
                <Send className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">4-Part Outreach Script Studio</h3>
              <p className="text-xs text-slate-400">Section 17 Framework: Observation → Problem → Opportunity → CTA</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          
          {/* Platform Selector */}
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
              Select Outreach Channel:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { name: 'Instagram DM', icon: Instagram, color: 'text-pink-400' },
                { name: 'LinkedIn InMail', icon: Linkedin, color: 'text-blue-400' },
                { name: 'YouTube / Cold Email', icon: Youtube, color: 'text-rose-400' },
                { name: 'Direct Email', icon: Mail, color: 'text-emerald-400' }
              ].map((p) => {
                const Icon = p.icon;
                const isSelected = platform === p.name;
                return (
                  <button
                    key={p.name}
                    onClick={() => setPlatform(p.name)}
                    className={`p-3 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all ${
                      isSelected
                        ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300 shadow-sm'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${p.color}`} />
                    <span className="truncate">{p.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Input Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">Target Coach Name:</label>
              <input
                type="text"
                value={coachName}
                onChange={(e) => setCoachName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">Coaching Niche:</label>
              <input
                type="text"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">Observed Bottleneck / Setup:</label>
              <input
                type="text"
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Regenerate 4-Part Script</span>
          </button>

          {/* Generated Message Display */}
          {generated && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <span>Customized Pitch Copy</span>
                  <span className="text-[10px] text-slate-500 font-normal">({platform})</span>
                </span>
                <button
                  onClick={copyToClipboard}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 text-navy-950 font-bold text-xs flex items-center gap-1.5 hover:bg-emerald-400 transition-colors shadow-sm"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy Script'}</span>
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-3 font-sans text-xs sm:text-sm text-slate-200 whitespace-pre-line leading-relaxed">
                {generated.fullMessage}
              </div>

              {/* 4-Step Breakdown Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="font-bold text-blue-400 block">1. Observation</span>
                  <span className="text-slate-400 text-[10px]">Specific diagnostic</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="font-bold text-rose-400 block">2. Problem</span>
                  <span className="text-slate-400 text-[10px]">The costly leak</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="font-bold text-amber-400 block">3. Opportunity</span>
                  <span className="text-slate-400 text-[10px]">The 90-day machine</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="font-bold text-emerald-400 block">4. Low-Friction CTA</span>
                  <span className="text-slate-400 text-[10px]">Send 2-min video</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-navy-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
