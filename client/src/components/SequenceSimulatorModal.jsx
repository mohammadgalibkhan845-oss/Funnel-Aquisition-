import React, { useState } from 'react';
import { X, Mail, MessageSquare, Send, CheckCircle2, Sparkles, Smartphone } from 'lucide-react';
import { api } from '../services/api';

export default function SequenceSimulatorModal({ lead, sequenceId = 'seq-day-0', onClose, onDispatched }) {
  const [selectedSeq, setSelectedSeq] = useState(sequenceId);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const sequencesList = [
    { id: 'seq-day-0', day: 0, title: 'Day 0: Audit Delivery & Scorecard' },
    { id: 'seq-day-1', day: 1, title: 'Day 1: Why 95% of Leads Drop Off' },
    { id: 'seq-day-3', day: 3, title: 'Day 3: Julian Bennett +$30k Case Study' },
    { id: 'seq-day-5', day: 5, title: 'Day 5: Unit Economics of 3 Extra Clients' },
    { id: 'seq-day-7', day: 7, title: 'Day 7: Final Strategy Call Invitation' }
  ];

  const handleDispatch = async () => {
    try {
      setLoading(true);
      const res = await api.triggerSequence(lead.id, selectedSeq);
      setResult(res);
      if (onDispatched) onDispatched(res);
    } catch (err) {
      alert('Failed to dispatch sequence: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden my-8 flex flex-col">
        
        {/* Header */}
        <div className="p-6 bg-navy-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Automated Nurture Sequence Simulator</h3>
              <p className="text-xs text-slate-400">Testing follow-up delivery for <strong>{lead.name}</strong> ({lead.niche})</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sequence Selector */}
        <div className="p-6 space-y-5 flex-1 overflow-y-auto">
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
              Select Sequence Step:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {sequencesList.map((seq) => (
                <button
                  key={seq.id}
                  onClick={() => {
                    setSelectedSeq(seq.id);
                    setResult(null);
                  }}
                  className={`p-3 rounded-xl text-left text-xs font-semibold border transition-all ${
                    selectedSeq === seq.id
                      ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300 shadow-sm'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                  }`}
                >
                  {seq.title}
                </button>
              ))}
            </div>
          </div>

          {/* Action Trigger */}
          <button
            onClick={handleDispatch}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-navy-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>{loading ? 'Rendering & Dispatching...' : 'Render & Dispatch Sequence Now'}</span>
          </button>

          {/* Rendered Result Preview */}
          {result && (
            <div className="space-y-4 pt-4 border-t border-slate-800 animate-fadeIn">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Successfully Dispatched & Logged to CRM!</span>
              </div>

              {/* Email Preview */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase">
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Email Channel Preview</span>
                </div>
                <div className="text-xs font-bold text-white bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  Subject: {result.dispatched.renderedEmail.subject}
                </div>
                <div className="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-lg border border-slate-800/80 whitespace-pre-line leading-relaxed font-sans">
                  {result.dispatched.renderedEmail.body}
                </div>
              </div>

              {/* SMS Preview if present */}
              {result.dispatched.renderedSms && (
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase">
                    <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
                    <span>SMS / WhatsApp Preview (Twilio)</span>
                  </div>
                  <div className="text-xs text-slate-200 bg-slate-900/80 p-3 rounded-lg border border-slate-800 font-mono">
                    {result.dispatched.renderedSms.body}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-navy-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold"
          >
            Close Simulator
          </button>
        </div>

      </div>
    </div>
  );
}
