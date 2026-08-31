import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  RotateCcw, 
  LayoutGrid, 
  Table as TableIcon, 
  DollarSign, 
  Sparkles, 
  TrendingUp, 
  Send, 
  Mail, 
  Flame, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { api } from '../services/api';
import KanbanBoard from '../components/KanbanBoard';
import LeadDetailModal from '../components/LeadDetailModal';
import SequenceSimulatorModal from '../components/SequenceSimulatorModal';
import OutreachScriptDrawer from '../components/OutreachScriptDrawer';

export default function CRMPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' | 'table'
  
  // Filters & Search
  const [search, setSearch] = useState('');
  const [nicheFilter, setNicheFilter] = useState('all');
  const [stageFilter, setStageFilter] = useState('all');

  // Modals state
  const [selectedLead, setSelectedLead] = useState(null);
  const [sequenceLead, setSequenceLead] = useState(null);
  const [outreachLead, setOutreachLead] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newLeadInitialStage, setNewLeadInitialStage] = useState('Prospect Researched');

  const [newLeadForm, setNewLeadForm] = useState({
    name: '',
    email: '',
    phone: '',
    niche: 'Executive & Leadership Coach',
    country: 'United States',
    website: '',
    socialProfile: '',
    offer: 'Executive Growth Sprint',
    offerPrice: 5000,
    monthlyLeads: 30,
    monthlyBookedCalls: 4,
    leadSource: 'Organic Social (LinkedIn/IG)',
    funnel: 'Direct DMs',
    bookingSystem: 'Manual Messaging',
    leadMagnet: 'None',
    followUp: 'Manual',
    painPoint: 'High qualified attention, but leads drop off in DMs',
    opportunity: 'Install automated 5-pillar scorecard funnel'
  });

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await api.getLeads({
        search,
        niche: nicheFilter,
        stage: stageFilter
      });
      setLeads(res.leads || []);
    } catch (err) {
      console.error('Failed to load leads:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [search, nicheFilter, stageFilter]);

  const handleUpdateStage = async (id, stage) => {
    try {
      const res = await api.updateLeadStage(id, stage, `Moved to stage ${stage}`);
      setLeads(prev => prev.map(l => l.id === id ? res.lead : l));
      if (selectedLead?.id === id) setSelectedLead(res.lead);
    } catch (err) {
      alert('Failed to update stage');
    }
  };

  const handleResetData = async () => {
    if (confirm('Reset CRM to initial demo high-ticket coaching leads?')) {
      try {
        await api.resetSeedData();
        fetchLeads();
      } catch (err) {
        alert('Failed to reset');
      }
    }
  };

  const handleCreateLead = async (e) => {
    e.preventDefault();
    if (!newLeadForm.name || !newLeadForm.email) {
      alert('Name and email are required');
      return;
    }
    try {
      const res = await api.createLead({
        ...newLeadForm,
        stage: newLeadInitialStage,
        dealValue: Number(newLeadForm.offerPrice) || 3000
      });
      setLeads(prev => [res.lead, ...prev]);
      setAddModalOpen(false);
      setNewLeadForm({
        name: '',
        email: '',
        phone: '',
        niche: 'Executive & Leadership Coach',
        country: 'United States',
        website: '',
        socialProfile: '',
        offer: 'Executive Growth Sprint',
        offerPrice: 5000,
        monthlyLeads: 30,
        monthlyBookedCalls: 4,
        leadSource: 'Organic Social (LinkedIn/IG)',
        funnel: 'Direct DMs',
        bookingSystem: 'Manual Messaging',
        leadMagnet: 'None',
        followUp: 'Manual',
        painPoint: 'High qualified attention, but leads drop off in DMs',
        opportunity: 'Install automated 5-pillar scorecard funnel'
      });
    } catch (err) {
      alert('Failed to create prospect: ' + err.message);
    }
  };

  // KPIs
  const totalPipelineValue = leads.reduce((acc, l) => acc + (Number(l.dealValue) || Number(l.offerPrice) || 0), 0);
  const totalWon = leads.filter(l => l.stage.includes('Closed Won')).reduce((acc, l) => acc + (Number(l.dealValue) || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header & Metrics */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Section 5 & 16: Agency Prospecting Machine
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Coach Acquisition <span className="gradient-text">CRM & Pipeline</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Track, audit, nurture, and close high-ticket coaching clients with structured 8-stage pipeline management.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => {
              setNewLeadInitialStage('Prospect Researched');
              setAddModalOpen(true);
            }}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-navy-950 font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 hover:opacity-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add Prospect</span>
          </button>

          <button
            onClick={handleResetData}
            title="Reset to initial seed dataset"
            className="px-3 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-semibold flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Seed</span>
          </button>

          {/* View Toggle */}
          <div className="flex bg-slate-900 border border-slate-800 rounded-xl p-0.5">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-2 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors ${
                viewMode === 'kanban' ? 'bg-emerald-500 text-navy-950 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Kanban</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors ${
                viewMode === 'table' ? 'bg-emerald-500 text-navy-950 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Table</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Pipeline Value</span>
          <div className="text-xl sm:text-2xl font-black text-white font-mono">${totalPipelineValue.toLocaleString()}</div>
          <div className="text-[11px] text-emerald-400 font-semibold">{leads.length} active prospects</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Closed Won Revenue</span>
          <div className="text-xl sm:text-2xl font-black text-emerald-300 font-mono">${totalWon.toLocaleString()}</div>
          <div className="text-[11px] text-slate-400">Signed coaching clients</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Avg. Ticket Size</span>
          <div className="text-xl sm:text-2xl font-black text-cyan-400 font-mono">
            ${leads.length ? Math.round(totalPipelineValue / leads.length).toLocaleString() : 0}
          </div>
          <div className="text-[11px] text-slate-400">High-ticket benchmark</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Follow-Up Engine</span>
          <div className="text-xl sm:text-2xl font-black text-purple-400 font-mono">5 Steps</div>
          <div className="text-[11px] text-slate-400">Day 0 to Day 7 Sequence</div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
        
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search coach, niche, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400"
          />
        </div>

        {/* Niche Filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <select
            value={nicheFilter}
            onChange={(e) => setNicheFilter(e.target.value)}
            className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-emerald-400 w-full sm:w-auto"
          >
            <option value="all">All Coaching Niches</option>
            <option value="Executive">Executive & Leadership</option>
            <option value="Transformation">High-Ticket Transformation</option>
            <option value="Sales">B2B Sales Coaches</option>
            <option value="Fitness">Health & Fitness</option>
            <option value="Business">Business & Agency</option>
            <option value="Relationship">Relationship & Life</option>
          </select>

          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-emerald-400 w-full sm:w-auto"
          >
            <option value="all">All Stages</option>
            <option value="Prospect Researched">Researched</option>
            <option value="Outreach Sent">Outreach Sent</option>
            <option value="Audit Completed">Audit Completed</option>
            <option value="Call Booked">Call Booked</option>
            <option value="Proposal Sent">Proposal Sent</option>
            <option value="Closed Won / Onboarding">Closed Won</option>
          </select>
        </div>

      </div>

      {/* Main Content: Kanban or Table */}
      {viewMode === 'kanban' ? (
        <KanbanBoard
          leads={leads}
          onSelectLead={(lead) => setSelectedLead(lead)}
          onUpdateStage={handleUpdateStage}
          onOpenOutreach={(lead) => setOutreachLead(lead)}
          onOpenSequence={(lead) => setSequenceLead(lead)}
          onAddNew={(stage) => {
            setNewLeadInitialStage(stage);
            setAddModalOpen(true);
          }}
        />
      ) : (
        /* Table View */
        <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 text-slate-400 uppercase font-bold border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3">Coach Name</th>
                  <th className="px-4 py-3">Niche & Offer</th>
                  <th className="px-4 py-3">Deal Value</th>
                  <th className="px-4 py-3">Funnel & Booking</th>
                  <th className="px-4 py-3">Audit Score</th>
                  <th className="px-4 py-3">Stage</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {leads.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className="hover:bg-slate-900/60 cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-3 font-semibold text-white">
                      <div>{lead.name}</div>
                      <div className="text-[11px] text-slate-400 font-normal">{lead.email}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-slate-200 font-medium">{lead.niche}</div>
                      <div className="text-[10px] text-emerald-400">{lead.offer}</div>
                    </td>
                    <td className="px-4 py-3 font-mono font-bold text-cyan-400">
                      ${(lead.dealValue || lead.offerPrice || 3000).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <div>{lead.funnel || 'DMs'}</div>
                      <div className="text-[10px] text-slate-400">{lead.bookingSystem || 'Manual'}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 font-bold">
                        {lead.auditScore || 'N/A'}/100
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200">
                        {lead.stage}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right space-x-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setOutreachLead(lead)}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px]"
                      >
                        Outreach
                      </button>
                      <button
                        onClick={() => setSequenceLead(lead)}
                        className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 text-[11px]"
                      >
                        Sequence
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* LEAD DETAIL MODAL */}
      {selectedLead && (
        <LeadDetailModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onUpdate={(updated) => {
            setLeads(prev => prev.map(l => l.id === updated.id ? updated : l));
            setSelectedLead(updated);
          }}
          onTriggerSequence={(l, seqId) => {
            setSequenceLead(l);
          }}
          onOpenOutreach={(l) => {
            setOutreachLead(l);
          }}
        />
      )}

      {/* SEQUENCE SIMULATOR MODAL */}
      {sequenceLead && (
        <SequenceSimulatorModal
          lead={sequenceLead}
          onClose={() => setSequenceLead(null)}
          onDispatched={() => fetchLeads()}
        />
      )}

      {/* OUTREACH STUDIO MODAL */}
      {outreachLead && (
        <OutreachScriptDrawer
          targetLead={outreachLead}
          onClose={() => setOutreachLead(null)}
        />
      )}

      {/* ADD NEW PROSPECT MODAL */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden my-8 p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-400" />
                <span>Add New Coach Prospect (Section 5)</span>
              </h3>
              <button onClick={() => setAddModalOpen(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Coach Name *</label>
                  <input
                    type="text"
                    required
                    value={newLeadForm.name}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={newLeadForm.email}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                    placeholder="alex@coaching.com"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Coaching Niche</label>
                  <select
                    value={newLeadForm.niche}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, niche: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-400"
                  >
                    <option value="Executive & Leadership Coach">Executive & Leadership Coach</option>
                    <option value="B2B High-Ticket Sales Coach">B2B High-Ticket Sales Coach</option>
                    <option value="Health & Wellness Coach">Health & Wellness Coach</option>
                    <option value="Fitness & Body Transformation Coach">Fitness & Body Transformation Coach</option>
                    <option value="Business & Agency Coach">Business & Agency Coach</option>
                    <option value="Relationship & Dating Coach">Relationship & Dating Coach</option>
                    <option value="Life & Mindset Coach">Life & Mindset Coach</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Average Offer Price ($)</label>
                  <input
                    type="number"
                    value={newLeadForm.offerPrice}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, offerPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Social Profile / Website</label>
                  <input
                    type="text"
                    value={newLeadForm.socialProfile}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, socialProfile: e.target.value })}
                    placeholder="https://instagram.com/alex"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Pipeline Stage</label>
                  <select
                    value={newLeadInitialStage}
                    onChange={(e) => setNewLeadInitialStage(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-400"
                  >
                    <option value="Prospect Researched">Prospect Researched</option>
                    <option value="Outreach Sent">Outreach Sent</option>
                    <option value="Audit Completed">Audit Completed</option>
                    <option value="Call Booked">Call Booked</option>
                    <option value="Proposal Sent">Proposal Sent</option>
                    <option value="Closed Won / Onboarding">Closed Won / Onboarding</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Identified Pain Point</label>
                <input
                  type="text"
                  value={newLeadForm.painPoint}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, painPoint: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-500 text-navy-950 font-bold text-xs"
                >
                  Add to CRM Pipeline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
