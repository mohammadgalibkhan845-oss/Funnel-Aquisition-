import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Send, 
  Clock, 
  CheckCircle2, 
  Smartphone, 
  Users, 
  Sparkles, 
  Flame, 
  ArrowRight,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { api } from '../services/api';

export default function SequencesPage() {
  const [sequences, setSequences] = useState([]);
  const [leads, setLeads] = useState([]);
  const [selectedLeadId, setSelectedLeadId] = useState('');
  const [selectedSeqId, setSelectedSeqId] = useState('seq-day-0');
  const [loading, setLoading] = useState(false);
  const [dispatchResult, setDispatchResult] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [seqRes, leadsRes] = await Promise.all([
          api.getSequences(),
          api.getLeads()
        ]);
        setSequences(seqRes.sequences || []);
        const lList = leadsRes.leads || [];
        setLeads(lList);
        if (lList.length > 0) setSelectedLeadId(lList[0].id);
      } catch (err) {
        console.error('Failed to load sequences/leads:', err);
      }
    };
    load();
  }, []);

  const handleTestDispatch = async () => {
    if (!selectedLeadId || !selectedSeqId) {
      alert('Please select a lead and a sequence step.');
      return;
    }
    try {
      setLoading(true);
      const res = await api.triggerSequence(selectedLeadId, selectedSeqId);
      setDispatchResult(res);
    } catch (err) {
      alert('Failed to trigger sequence: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const selectedLead = leads.find(l => l.id === selectedLeadId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="space-y-2 border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Mail className="w-3.5 h-3.5" />
          <span>Section 11: Follow-Up Automation Engine</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Automated Nurture & <span className="gradient-text">Follow-Up Sequences</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-3xl">
          95% of leads are not ready to buy on day 1. This 5-stage automated engine indoctrinates prospects, proves your unit economics, and recovers thousands in leaked revenue on autopilot.
        </p>
      </div>

      {/* Grid: Sequence Flow Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Interactive Workflow Steps */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>The 5-Stage Sequence Workflow</span>
          </h3>

          <div className="space-y-3">
            {sequences.map((seq) => {
              const isSelected = selectedSeqId === seq.id;
              return (
                <div
                  key={seq.id}
                  onClick={() => {
                    setSelectedSeqId(seq.id);
                    setDispatchResult(null);
                  }}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 border-emerald-500/60 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-400'
                      : 'bg-slate-950/70 border-slate-800/90 hover:bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      Day 0{seq.day} • {seq.channel}
                    </span>
                    <span className="text-[11px] text-slate-400 font-semibold">{seq.trigger}</span>
                  </div>
                  <h4 className="text-base font-extrabold text-white mb-1">{seq.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2">{seq.emailSubject}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Live Test Simulator & Rendered Message */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="glass-panel p-6 rounded-3xl border border-emerald-500/30 space-y-5 shadow-2xl">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
              <Send className="w-4 h-4 text-cyan-400" />
              <span>Test Runner & CRM Dispatch</span>
            </h3>

            {/* Select Target Lead */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase block">Select Prospect in CRM:</label>
              <select
                value={selectedLeadId}
                onChange={(e) => {
                  setSelectedLeadId(e.target.value);
                  setDispatchResult(null);
                }}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-400"
              >
                {leads.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name} — {l.niche} (${(l.offerPrice || 3000).toLocaleString()})
                  </option>
                ))}
              </select>
            </div>

            {/* Run Button */}
            <button
              onClick={handleTestDispatch}
              disabled={loading || !selectedLeadId}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-navy-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? 'Rendering Tags & Dispatching...' : `Render & Dispatch Day ${sequences.find(s=>s.id===selectedSeqId)?.day || 0}`}</span>
            </button>

            {/* Rendered Preview */}
            {dispatchResult && (
              <div className="space-y-4 pt-4 border-t border-slate-800 animate-fadeIn text-left">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Rendered with live data for {dispatchResult.lead?.name}:</span>
                </div>

                {/* Email Subject & Body */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase">
                    <Mail className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Email Template</span>
                  </div>
                  <div className="text-xs font-bold text-white bg-slate-900 p-2 rounded-lg border border-slate-800">
                    Subject: {dispatchResult.dispatched.renderedEmail.subject}
                  </div>
                  <div className="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-lg border border-slate-800 whitespace-pre-line leading-relaxed max-h-56 overflow-y-auto">
                    {dispatchResult.dispatched.renderedEmail.body}
                  </div>
                </div>

                {/* SMS if present */}
                {dispatchResult.dispatched.renderedSms && (
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase">
                      <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
                      <span>SMS / WhatsApp (Twilio Hook)</span>
                    </div>
                    <div className="text-xs text-slate-200 bg-slate-900 p-2.5 rounded-lg border border-slate-800 font-mono">
                      {dispatchResult.dispatched.renderedSms.body}
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
