import React, { useState } from 'react';
import { 
  Users, 
  DollarSign, 
  Flame, 
  Calendar, 
  ChevronRight, 
  ChevronLeft, 
  Send, 
  Mail, 
  Clock, 
  CheckCircle2, 
  Globe, 
  ExternalLink,
  Plus
} from 'lucide-react';

const PIPELINE_COLUMNS = [
  { id: 'Prospect Researched', label: '1. Researched', color: 'border-slate-700' },
  { id: 'Outreach Sent', label: '2. Outreach Sent', color: 'border-blue-500/40' },
  { id: 'Audit Completed', label: '3. Audit Done', color: 'border-emerald-500/40' },
  { id: 'Call Booked', label: '4. Call Booked', color: 'border-cyan-500/40' },
  { id: 'Call Completed', label: '5. Call Done', color: 'border-indigo-500/40' },
  { id: 'Proposal Sent', label: '6. Proposal Sent', color: 'border-amber-500/40' },
  { id: 'Closed Won / Onboarding', label: '7. Closed Won', color: 'border-emerald-400' },
  { id: 'Follow-up / Lost', label: '8. Follow-Up', color: 'border-rose-500/30' },
];

export default function KanbanBoard({ leads, onSelectLead, onUpdateStage, onOpenOutreach, onOpenSequence, onAddNew }) {
  const [selectedMobileColumn, setSelectedMobileColumn] = useState('Prospect Researched');

  const getLeadsByStage = (stage) => leads.filter(l => l.stage === stage);

  const handleNextStage = (e, lead) => {
    e.stopPropagation();
    const currentIdx = PIPELINE_COLUMNS.findIndex(c => c.id === lead.stage);
    if (currentIdx !== -1 && currentIdx < PIPELINE_COLUMNS.length - 1) {
      onUpdateStage(lead.id, PIPELINE_COLUMNS[currentIdx + 1].id);
    }
  };

  const handlePrevStage = (e, lead) => {
    e.stopPropagation();
    const currentIdx = PIPELINE_COLUMNS.findIndex(c => c.id === lead.stage);
    if (currentIdx > 0) {
      onUpdateStage(lead.id, PIPELINE_COLUMNS[currentIdx - 1].id);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Mobile Column Switcher (for small screens) */}
      <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-2">
        {PIPELINE_COLUMNS.map((col) => {
          const count = getLeadsByStage(col.id).length;
          const active = selectedMobileColumn === col.id;
          return (
            <button
              key={col.id}
              onClick={() => setSelectedMobileColumn(col.id)}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                active
                  ? 'bg-emerald-500 text-navy-950 shadow-md'
                  : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              <span>{col.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${active ? 'bg-navy-950/20 text-navy-950 font-extrabold' : 'bg-slate-800 text-slate-300'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Desktop / Tablet Kanban Columns Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-3 overflow-x-auto min-w-[1200px] lg:min-w-0">
        {PIPELINE_COLUMNS.map((column) => {
          const colLeads = getLeadsByStage(column.id);
          const colTotalValue = colLeads.reduce((acc, l) => acc + (Number(l.dealValue) || 0), 0);

          return (
            <div
              key={column.id}
              className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-3 flex flex-col min-h-[500px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                <div className="space-y-0.5">
                  <div className="text-xs font-extrabold text-white truncate">{column.label}</div>
                  <div className="text-[10px] text-emerald-400 font-mono font-semibold">
                    ${colTotalValue.toLocaleString()}
                  </div>
                </div>
                <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                  {colLeads.length}
                </span>
              </div>

              {/* Cards Container */}
              <div className="space-y-2.5 flex-1 overflow-y-auto pr-1">
                {colLeads.length === 0 ? (
                  <div className="h-32 flex items-center justify-center text-[11px] text-slate-600 border border-dashed border-slate-800 rounded-xl">
                    No leads here
                  </div>
                ) : (
                  colLeads.map((lead) => (
                    <div
                      key={lead.id}
                      onClick={() => onSelectLead(lead)}
                      className="p-3 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800/90 hover:border-emerald-500/40 transition-all cursor-pointer shadow-sm group space-y-2 relative"
                    >
                      {/* Card Header */}
                      <div className="flex items-start justify-between gap-1">
                        <div className="truncate">
                          <h4 className="text-xs font-extrabold text-white truncate group-hover:text-emerald-400 transition-colors">
                            {lead.name}
                          </h4>
                          <p className="text-[10px] text-slate-400 truncate">{lead.niche}</p>
                        </div>
                        {lead.auditScore && (
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            lead.auditScore >= 75 ? 'bg-emerald-500/20 text-emerald-300' : lead.auditScore >= 50 ? 'bg-amber-500/20 text-amber-300' : 'bg-rose-500/20 text-rose-300'
                          }`}>
                            {lead.auditScore}
                          </span>
                        )}
                      </div>

                      {/* Offer & Deal Value */}
                      <div className="flex items-center justify-between text-[11px] pt-1">
                        <span className="text-cyan-400 font-mono font-bold">
                          ${(lead.dealValue || lead.offerPrice || 3000).toLocaleString()}
                        </span>
                        <span className="text-[10px] text-slate-500 truncate max-w-[80px]">
                          {lead.leadSource?.split(' ')[0] || 'Social'}
                        </span>
                      </div>

                      {/* Action Triggers */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-900 text-[11px]">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenOutreach(lead);
                            }}
                            title="Generate 4-Part Outreach Script"
                            className="p-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-emerald-400"
                          >
                            <Send className="w-3 h-3" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenSequence(lead);
                            }}
                            title="Trigger Nurture Sequence"
                            className="p-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-400"
                          >
                            <Mail className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Move stage buttons */}
                        <div className="flex items-center gap-0.5">
                          <button
                            onClick={(e) => handlePrevStage(e, lead)}
                            title="Move back"
                            className="p-1 rounded hover:bg-slate-800 text-slate-500 hover:text-white"
                          >
                            <ChevronLeft className="w-3 h-3" />
                          </button>
                          <button
                            onClick={(e) => handleNextStage(e, lead)}
                            title="Advance stage"
                            className="p-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300 font-bold"
                          >
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Add Prospect Quick Button */}
              <button
                onClick={() => onAddNew(column.id)}
                className="mt-2 w-full py-1.5 rounded-lg border border-dashed border-slate-800 text-[11px] font-semibold text-slate-400 hover:text-slate-200 hover:border-slate-700 flex items-center justify-center gap-1 transition-colors"
              >
                <Plus className="w-3 h-3" />
                <span>Add</span>
              </button>
            </div>
          );
        })}
      </div>

    </div>
  );
}
