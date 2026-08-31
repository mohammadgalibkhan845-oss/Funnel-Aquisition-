import React from 'react';
import { TrendingUp, Users, Calendar, Award, Star, Quote, ArrowUpRight } from 'lucide-react';

const cases = [
  {
    name: 'Julian Bennett',
    niche: 'B2B Enterprise Sales Coach',
    location: 'London, UK',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    before: {
      monthlyRevenue: '$14,000/mo',
      showUpRate: '54%',
      bottleneck: 'Manual LinkedIn messages, 45-day sales cycle, unqualified no-shows.'
    },
    after: {
      monthlyRevenue: '$48,000/mo',
      showUpRate: '91%',
      gain: '+$34,000 / month',
      system: 'Installed 5-pillar diagnostic scorecard + Day 0-7 pre-call indoctrination sequence.'
    },
    testimonial: 'NexLeads transformed my chaotic calendar into a predictable high-ticket pipeline. My show-up rate nearly doubled in 30 days.'
  },
  {
    name: 'Chloe Tremblay',
    niche: 'Executive Metabolic & Fitness Coach',
    location: 'Montreal, Canada',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    before: {
      monthlyRevenue: '$8,500/mo',
      showUpRate: '48%',
      bottleneck: 'Spent 4 hours a day answering Instagram DMs manually, 70% ghosting rate.'
    },
    after: {
      monthlyRevenue: '$29,000/mo',
      showUpRate: '89%',
      gain: '+$20,500 / month',
      system: 'Automated IG Quiz funnel + 2-step qualification gate + SMS reminder flow.'
    },
    testimonial: 'I went from answering DMs until midnight to having qualified female executives book and pay $3.5k without haggling.'
  },
  {
    name: 'Marcus Sterling',
    niche: 'C-Suite Executive Leadership Coach',
    location: 'Austin, TX',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    before: {
      monthlyRevenue: '$22,000/mo',
      showUpRate: '60%',
      bottleneck: 'Static landing page, no nurture sequence, valuable leads lost after 1 touch.'
    },
    after: {
      monthlyRevenue: '$67,500/mo',
      showUpRate: '94%',
      gain: '+$45,500 / month',
      system: 'Installed Executive Diagnostic Funnel + full Kanban CRM with automated no-show recovery.'
    },
    testimonial: 'The ROI was obvious on week two. If you charge more than $3,000 for coaching, you cannot afford to run manual follow-ups.'
  }
];

export default function CaseStudies() {
  return (
    <div className="space-y-10">
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <Award className="w-3.5 h-3.5" />
          <span>Section 15: Verified Case Studies</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Real Numbers. <span className="gradient-text">Predictable Outcomes.</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          See how high-ticket coaches transitioned from manual DMs and low show-up rates into automated 6-figure client acquisition machines.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {cases.map((item, idx) => (
          <div
            key={idx}
            className="glass-card p-6 sm:p-7 rounded-3xl border border-slate-800 flex flex-col justify-between space-y-6 hover:border-emerald-500/40 transition-all duration-300"
          >
            <div className="space-y-5">
              {/* Header */}
              <div className="flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-2xl object-cover border border-emerald-400/30"
                />
                <div>
                  <h4 className="font-extrabold text-base text-white">{item.name}</h4>
                  <p className="text-xs text-emerald-400 font-medium">{item.niche}</p>
                  <p className="text-[11px] text-slate-500">{item.location}</p>
                </div>
              </div>

              {/* Before vs After Metric Grid */}
              <div className="grid grid-cols-2 gap-3 bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-rose-400 tracking-wider">Before</span>
                  <div className="text-sm font-bold text-slate-300 font-mono">{item.before.monthlyRevenue}</div>
                  <div className="text-[11px] text-slate-400">Show-up: {item.before.showUpRate}</div>
                </div>
                <div className="space-y-1 border-l border-slate-800 pl-3">
                  <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">After NexLeads</span>
                  <div className="text-sm font-bold text-emerald-300 font-mono">{item.after.monthlyRevenue}</div>
                  <div className="text-[11px] text-emerald-400 font-semibold">Show-up: {item.after.showUpRate}</div>
                </div>
              </div>

              {/* Gain Highlight */}
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                <span className="text-xs text-slate-300 font-medium">Monthly Revenue Jump: </span>
                <strong className="text-sm font-bold text-emerald-300 font-mono">{item.after.gain}</strong>
              </div>

              {/* Testimonial Quote */}
              <div className="text-xs text-slate-300 italic relative pl-4 border-l-2 border-emerald-400/50 leading-relaxed">
                "{item.testimonial}"
              </div>
            </div>

            <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-800/80">
              <strong className="text-slate-300">Installed System:</strong> {item.after.system}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
