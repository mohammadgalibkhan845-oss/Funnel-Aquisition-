import React, { useState } from 'react';
import { 
  Share2, 
  HelpCircle, 
  Users, 
  Mail, 
  Calendar, 
  BellRing, 
  PhoneCall, 
  Rocket, 
  Award, 
  ArrowDown, 
  Check, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

const steps = [
  {
    step: 1,
    title: 'Content / Outreach / Ads',
    subtitle: 'Traffic Generation',
    description: 'Instagram reels, LinkedIn authority posts, YouTube, and targeted cold outreach that diagnose pain points instead of pitching blindly.',
    icon: Share2,
    color: 'from-blue-500 to-indigo-500'
  },
  {
    step: 2,
    title: 'Free Diagnostic Quiz / Audit',
    subtitle: 'Lead Capture & Magnet',
    description: 'Interactive 5-pillar scorecard that delivers instant diagnostic feedback and identifies the exact leaks in the coach’s funnel.',
    icon: HelpCircle,
    color: 'from-emerald-500 to-teal-500'
  },
  {
    step: 3,
    title: 'CRM + Lead Qualification',
    subtitle: 'Pipeline Intelligence',
    description: 'Automated filtering by ticket size ($1k-$10k+), revenue tier, and challenge. Low-fit leads filtered out; high-value prospects highlighted.',
    icon: Users,
    color: 'from-cyan-500 to-blue-500'
  },
  {
    step: 4,
    title: 'Email + SMS Nurture (Day 0–7)',
    subtitle: 'Automated Indoctrination',
    description: 'Automated 5-touch sequence addressing why coaches lose leads, funnel anatomy, and unit economics before they even step on a call.',
    icon: Mail,
    color: 'from-amber-500 to-orange-500'
  },
  {
    step: 5,
    title: 'Frictionless Booking System',
    subtitle: 'Discovery Scheduling',
    description: 'Integrated Cal.com/Calendly engine with timezone adaptation, calendar sync (.ics + Google), and pre-call qualification survey.',
    icon: Calendar,
    color: 'from-violet-500 to-purple-500'
  },
  {
    step: 6,
    title: 'Automated Reminders',
    subtitle: 'Show-Up Rate Protection',
    description: 'Multi-touch SMS + email reminders 24h, 2h, and 10min prior, boosting show-up rates from 55% to 88-92%.',
    icon: BellRing,
    color: 'from-pink-500 to-rose-500'
  },
  {
    step: 7,
    title: 'Sales Call & Outcome Closing',
    subtitle: 'Economic Conversion',
    description: 'Structure the conversation around Current State vs Desired Outcome. Sell the acquisition machine, not tools.',
    icon: PhoneCall,
    color: 'from-emerald-400 to-green-500'
  },
  {
    step: 8,
    title: 'Client Onboarding & Scale',
    subtitle: 'Delivery & Referrals',
    description: 'Standardized onboarding portal, weekly funnel optimization sprints, generating rapid case studies and recurring client referrals.',
    icon: Rocket,
    color: 'from-cyan-400 to-emerald-500'
  }
];

export default function CompleteMachineDiagram() {
  const [selectedStep, setSelectedStep] = useState(1);
  const activeStep = steps.find(s => s.step === selectedStep) || steps[0];

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The 8-Stage Architecture</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          The Complete <span className="gradient-text">Client Acquisition Machine</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          From cold attention to signed high-ticket clients. Here is the exact end-to-end infrastructure we install in your business.
        </p>
      </div>

      {/* Grid of Stages for Mobile & Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((item) => {
          const Icon = item.icon;
          const isSelected = selectedStep === item.step;
          return (
            <div
              key={item.step}
              onClick={() => setSelectedStep(item.step)}
              className={`p-5 rounded-2xl cursor-pointer transition-all duration-200 border ${
                isSelected
                  ? 'bg-slate-900 border-emerald-500/60 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-400'
                  : 'glass-card border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isSelected ? 'bg-emerald-500 text-navy-950' : 'bg-slate-800 text-slate-400'}`}>
                  Stage 0{item.step}
                </span>
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-sm`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <h4 className="text-base font-bold text-white mb-1 leading-snug">{item.title}</h4>
              <p className="text-xs font-medium text-emerald-400 mb-2">{item.subtitle}</p>
              <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">{item.description}</p>
            </div>
          );
        })}
      </div>

      {/* Active Step Deep-Dive Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-navy-900 to-slate-900 border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-left">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
            Deep Dive: Stage 0{activeStep.step} — {activeStep.subtitle}
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            {activeStep.title}
          </h3>
          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            {activeStep.description}
          </p>
        </div>
        <button
          onClick={() => setSelectedStep(selectedStep === 8 ? 1 : selectedStep + 1)}
          className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-2 whitespace-nowrap"
        >
          <span>Next Stage</span>
          <ChevronRight className="w-4 h-4 text-emerald-400" />
        </button>
      </div>

    </div>
  );
}
