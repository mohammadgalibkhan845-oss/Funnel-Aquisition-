import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Phone, 
  Globe, 
  ExternalLink, 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  Tag, 
  Clock, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  Flame,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { api } from '../services/api';

const PIPELINE_STAGES = [
  'Prospect Researched',
  'Outreach Sent',
  'Audit Completed',
  'Call Booked',
  'Call Completed',
  'Proposal Sent',
  'Closed Won / Onboarding',
  'Follow-up / Lost'
];

export default function LeadDetailModal({ lead, onClose, onUpdate, onTriggerSequence, onOpenOutreach }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'interactions' | 'actions'
  const [newNote, setNewNote] = useState('');
  const [loadingAction, setLoadingAction] = useState(false);
  const [currentStage, setCurrentStage] = useState(lead.stage);

  if (!lead) return null;

  const handleStageChange = async (newStage) => {
    try {
      setLoadingAction(true);
      const res = await api.updateLeadStage(lead.id, newStage, `Stage updated to ${newStage}`);
      setCurrentStage(newStage);
      onUpdate(res.lead);
    } catch (err) {
      alert('Failed to update stage: ' + err.message);
    } finally {
      setLoadingAction(false);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    try {
      setLoadingAction(true);
      await api.addInteraction(lead.id, {
        type: 'NOTE',
        title: 'Team Note Added',
        details: newNote.trim()
      });
      setNewNote('');
      // refresh
      const refreshed = await api.getLeadById(lead.id);
      onUpdate(refreshed.lead);
    } catch (err) {
      alert('Failed to add note');
    } finally {
      setLoadingAction(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-navy-900 to-slate-900 border-b border-slate-800 flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-extrabold text-white">{lead.name}</h2>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Score: {lead.auditScore || 'N/A'}/100
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                ${(lead.dealValue || lead.offerPrice || 3000).toLocaleString()} Deal
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {lead.niche} • {lead.country || 'Global'} • Lead ID: <code className="text-slate-500">{lead.id}</code>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Stage Selector Bar */}
        <div className="bg-navy-950 px-6 py-3 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-2">
            Pipeline Stage:
          </span>
          {PIPELINE_STAGES.map((st) => (
            <button
              key={st}
              onClick={() => handleStageChange(st)}
              disabled={loadingAction}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                currentStage === st
                  ? 'bg-emerald-500 text-navy-950 shadow-md font-bold'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 px-6 bg-slate-900/50">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Section 5 Prospect Dossier</span>
          </button>
          <button
            onClick={() => setActiveTab('actions')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'actions'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Quick Sequences & Outreach</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Grid of Section 5 Prospecting Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Coaching Offer</span>
                  <div className="text-sm font-semibold text-white">{lead.offer || '1:1 Coaching'}</div>
                  <div className="text-xs text-emerald-400 font-mono">${(lead.offerPrice || 3000).toLocaleString()} per client</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Traffic & Lead Source</span>
                  <div className="text-sm font-semibold text-white">{lead.leadSource || 'Organic Social'}</div>
                  <div className="text-xs text-slate-400">~{lead.monthlyLeads || 25} leads/mo ({lead.monthlyBookedCalls || 3} booked)</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Current Funnel & CTA</span>
                  <div className="text-sm font-semibold text-white">{lead.funnel || 'Direct DMs'}</div>
                  <div className="text-xs text-cyan-400">{lead.cta || 'DM or link in bio'}</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Booking System</span>
                  <div className="text-sm font-semibold text-white">{lead.bookingSystem || 'Manual Calendar'}</div>
                  <div className="text-xs text-slate-400">Lead Magnet: {lead.leadMagnet || 'None'}</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Follow-Up Cadence</span>
                  <div className="text-sm font-semibold text-amber-300">{lead.followUp || 'Manual / Inconsistent'}</div>
                  <div className="text-xs text-slate-400">Bottleneck identified</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Contact & Social Link</span>
                  <div className="text-xs text-slate-300 truncate">{lead.email}</div>
                  {lead.socialProfile && (
                    <a
                      href={lead.socialProfile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-emerald-400 flex items-center gap-1 hover:underline truncate"
                    >
                      <Globe className="w-3 h-3 shrink-0" />
                      <span>{lead.socialProfile}</span>
                    </a>
                  )}
                </div>

              </div>

              {/* Identified Pain Point & Growth Opportunity */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-950/30 to-amber-950/30 border border-rose-500/20 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-400">
                  <AlertCircle className="w-4 h-4" />
                  <span>Section 6 & 7: Pain Point Diagnosis</span>
                </div>
                <p className="text-sm text-slate-200 font-medium">
                  {lead.painPoint || 'Lacks an automated nurture and qualification system, losing high-ticket inquiries before the call.'}
                </p>
                <div className="text-xs text-emerald-300 font-semibold pt-1">
                  💡 Opportunity: {lead.opportunity || 'Install automated 5-pillar scorecard funnel + Day 0-7 indoctrination sequence.'}
                </div>
              </div>

              {/* Notes Form */}
              <form onSubmit={handleAddNote} className="space-y-3">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Add Pipeline Note / Interaction Record:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g., Prospect responded to IG pitch, interested in 90-day growth package..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-400"
                  />
                  <button
                    type="submit"
                    disabled={loadingAction || !newNote.trim()}
                    className="px-4 py-2.5 rounded-xl bg-emerald-500 text-navy-950 font-bold text-xs hover:bg-emerald-400 disabled:opacity-50 flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Save Note</span>
                  </button>
                </div>
              </form>

            </div>
          )}

          {activeTab === 'actions' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
                <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                  <Flame className="w-4 h-4 text-emerald-400" />
                  <span>Execute Automated Follow-Up Sequences</span>
                </h4>
                <p className="text-xs text-slate-400">
                  Trigger pre-configured Day 0 to Day 7 sequence steps specifically rendered with {lead.name}'s metrics and niche.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => onTriggerSequence(lead, 'seq-day-0')}
                    className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-left space-y-1 transition-colors"
                  >
                    <div className="text-xs font-bold text-emerald-400">Day 0: Deliver Audit Scorecard</div>
                    <div className="text-[11px] text-slate-400">Sends email + SMS with customized leak breakdown.</div>
                  </button>

                  <button
                    onClick={() => onTriggerSequence(lead, 'seq-day-1')}
                    className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-left space-y-1 transition-colors"
                  >
                    <div className="text-xs font-bold text-cyan-400">Day 1: Why Coaches Lose Leads</div>
                    <div className="text-[11px] text-slate-400">Addresses the 95% unready traffic bottleneck.</div>
                  </button>

                  <button
                    onClick={() => onTriggerSequence(lead, 'seq-day-3')}
                    className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-left space-y-1 transition-colors"
                  >
                    <div className="text-xs font-bold text-amber-400">Day 3: Automated Nurture Case Study</div>
                    <div className="text-[11px] text-slate-400">Julian Bennett +$30k/mo breakdown.</div>
                  </button>

                  <button
                    onClick={() => onTriggerSequence(lead, 'seq-day-5')}
                    className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-left space-y-1 transition-colors"
                  >
                    <div className="text-xs font-bold text-purple-400">Day 5: Unit Economics Breakdown</div>
                    <div className="text-[11px] text-slate-400">Calculates exact revenue of 3 extra clients.</div>
                  </button>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
                <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                  <Send className="w-4 h-4 text-cyan-400" />
                  <span>Section 17: Personalized Cold Outreach</span>
                </h4>
                <p className="text-xs text-slate-400">
                  Generate customized 4-step outreach copy (*Observation → Problem → Opportunity → CTA*) ready to send on Instagram, LinkedIn, or Email.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onOpenOutreach(lead);
                  }}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-navy-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                  <Send className="w-4 h-4" />
                  <span>Open 4-Part Outreach Studio for {lead.name}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Last Updated: {new Date(lead.updatedAt || Date.now()).toLocaleDateString()}
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold"
          >
            Close Dossier
          </button>
        </div>

      </div>
    </div>
  );
}
