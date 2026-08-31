import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Sparkles, 
  Target, 
  ShieldCheck, 
  TrendingUp, 
  Award, 
  ArrowRight, 
  Calendar, 
  Flame, 
  CheckCircle2, 
  Quote,
  Building,
  HeartHandshake,
  Compass,
  Zap,
  Layers,
  Check
} from 'lucide-react';
import CaseStudies from '../components/CaseStudies';

const metrics = [
  {
    value: '127+',
    label: 'Businesses Scaled',
    desc: 'High-ticket coaching & B2B founders scaled with custom acquisition architecture.',
    color: 'text-emerald-400',
    border: 'border-emerald-500/30'
  },
  {
    value: '$4.2M+',
    label: 'Revenue Generated',
    desc: 'Total client revenue generated through our diagnostic funnels and CRM pipelines.',
    color: 'text-cyan-400',
    border: 'border-cyan-500/30'
  },
  {
    value: '94%',
    label: 'Client Retention Rate',
    desc: 'Founders who continue optimizing and expanding their acquisition infrastructure.',
    color: 'text-purple-400',
    border: 'border-purple-500/30'
  },
  {
    value: '88.5%',
    label: 'Avg. Show-Up Rate',
    desc: 'Achieved via our automated multi-channel SMS & email indoctrination engine.',
    color: 'text-amber-400',
    border: 'border-amber-500/30'
  }
];

const problemPatterns = [
  {
    title: 'Pattern 01: Unpredictable Pipeline',
    subtitle: 'The Feast-or-Famine Trap',
    desc: 'Relying purely on inconsistent word-of-mouth or sporadic social media posts. Some months bring 5 clients, other months bring zero, creating revenue anxiety.',
    solution: 'We install automated inbound diagnostic scorecards that capture qualified leads 24/7.'
  },
  {
    title: 'Pattern 02: Manual DM & Messaging Burnout',
    subtitle: 'Spending Hours Replying to Ghosters',
    desc: 'Coaches spending 3–4 hours every day typing manual DMs on Instagram and LinkedIn, only for 80% of prospects to disappear before scheduling a call.',
    solution: 'We install 2-step qualification calendars and automated SMS reminder cadences.'
  },
  {
    title: 'Pattern 03: Broken Funnel Architecture',
    subtitle: 'Attention Without Conversion',
    desc: 'Driving valuable traffic to static Linktree links or generic websites where there is no pre-call indoctrination, causing 40%+ no-show rates on sales calls.',
    solution: 'We install Day 0–7 nurture sequences and high-converting VSL diagnostic assets.'
  }
];

const operatingPrinciples = [
  {
    title: 'Sell Outcomes, Not Tools',
    desc: 'We never sell software or standalone landing pages. We build complete client acquisition infrastructure that generates booked calls and signed high-ticket clients.',
    icon: Target
  },
  {
    title: 'Economics Over Vanity Metrics',
    desc: 'You do not need 100,000 followers. If your coaching package is $3,000–$10,000, recovering just 3 extra clients per month adds $9,000–$30,000 in monthly gross revenue.',
    icon: TrendingUp
  },
  {
    title: 'Knowledge Transfer While Building',
    desc: 'We work closely with you and your team to build the system together. We transfer the blueprints, scripts, and SOPs so you own your client acquisition asset forever.',
    icon: ShieldCheck
  },
  {
    title: 'Results Are Guaranteed',
    desc: 'We define clear acquisition benchmarks for your pipeline. If we don’t hit your qualification and show-up metrics, we work for free until you do.',
    icon: Award
  }
];

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-20">
      
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Users className="w-4 h-4" />
          <span>Who We Are • NexLeads Acquisition</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          Client Acquisition Infrastructure <span className="gradient-text">Built to Scale</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Predictable high-ticket clients. Scalable systems. Guaranteed results. Founded by <strong>Mohammad Galib Khan</strong> to help coaches and B2B founders build sustainable acquisition machines.
        </p>
      </div>

      {/* Verified Reference Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((item, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-3xl bg-slate-900/90 border ${item.border} space-y-2 shadow-xl hover:scale-105 transition-transform duration-300`}
          >
            <div className={`text-3xl sm:text-4xl font-black font-mono ${item.color}`}>
              {item.value}
            </div>
            <div className="text-sm font-bold text-white uppercase tracking-wider">
              {item.label}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed pt-1">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Founder Story & Manifesto */}
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-emerald-500/30 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center shadow-2xl">
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-widest">
            <Sparkles className="w-4 h-4" />
            <span>The Founder's Story & Mission</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
            "Most founders are stuck guessing. We build the <span className="gradient-text">predictable engine</span> that gets you there."
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Every day, serious coaches and B2B founders produce transformative client outcomes. Yet when it comes to acquiring new clients, they are trapped in manual outreach, low show-up rates, and unpredictable revenue.
          </p>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            At NexLeads, we work closely with you to install a complete client-acquisition infrastructure for your business. Transferring the knowledge while building it together.
          </p>

          <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-2">
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">The Core Guarantee</div>
            <p className="text-xs text-slate-200">
              Guaranteed minimums on every NexLeads acquisition metric. We don't just build pages; we engineer closed high-ticket deals.
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 via-navy-950 to-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-5 text-center shadow-2xl">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-400 p-[2px] mx-auto">
            <div className="w-full h-full bg-[#070b14] rounded-full flex items-center justify-center">
              <Quote className="w-8 h-8 text-emerald-400" />
            </div>
          </div>
          
          <div className="space-y-1">
            <h3 className="text-lg font-black text-white">Mohammad Galib Khan</h3>
            <p className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">
              Founder & Lead Acquisition Strategist
            </p>
          </div>

          <p className="text-xs text-slate-300 italic leading-relaxed bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
            “Don’t sell funnels. Sell client acquisition systems. Don’t sell automation. Sell consistent follow-up. Don’t sell websites. Sell conversion. Sell the business outcome.”
          </p>

          <div className="text-[11px] text-slate-400">
            Client Acquisition Infrastructure Built to Scale
          </div>
        </div>
      </div>

      {/* The 3 Problem Patterns (From Reference Website) */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Most Founders Are Stuck in One of These Patterns
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Why brilliant coaches fail to achieve consistent $30,000–$100,000+ months.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {problemPatterns.map((pat, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-rose-500/40 transition-colors space-y-4 shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  {pat.subtitle}
                </span>
                <h3 className="text-lg font-black text-white">{pat.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{pat.desc}</p>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-1">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">The NexLeads Fix:</span>
                <p className="text-xs text-slate-300 font-medium">{pat.solution}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Core Operating Principles */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Our Operating Principles</h2>
          <p className="text-xs sm:text-sm text-slate-400">The foundational values that guide our client acquisition partnerships.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {operatingPrinciples.map((v, idx) => {
            const Icon = v.icon;
            return (
              <div key={idx} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 hover:border-emerald-500/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-extrabold text-white text-base">{v.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Case Studies Section */}
      <CaseStudies />

      {/* Direct CTA */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-emerald-950/50 via-slate-900 to-cyan-950/50 border border-emerald-500/30 text-center space-y-6 shadow-2xl">
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Ready to Build Your Client Acquisition Machine?
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Book a 1-on-1 Strategy Call directly with <strong>Mohammad Galib Khan</strong> and our lead strategists to review your numbers and map your 90-day acquisition roadmap.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/book"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-navy-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:opacity-95"
          >
            <Calendar className="w-4 h-4" />
            <span>Book 1-on-1 Strategy Call</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/audit"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 border border-slate-700"
          >
            <Flame className="w-4 h-4 text-emerald-400" />
            <span>Get Free Funnel Audit</span>
          </Link>
        </div>
      </div>

    </div>
  );
}
