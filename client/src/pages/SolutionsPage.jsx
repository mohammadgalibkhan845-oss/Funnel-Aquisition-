import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Layers, 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  DollarSign, 
  TrendingUp, 
  ShieldCheck, 
  Rocket, 
  Target, 
  Flame,
  Check
} from 'lucide-react';
import OfferTiers from '../components/OfferTiers';

const roadmapSteps = [
  {
    days: 'Days 1–7',
    title: 'Positioning, ICP & Economic Validation',
    subtitle: 'Laying the High-Ticket Foundation',
    tasks: [
      'Define precise coaching niche & ICP (Business, Executive, Fitness, Mindset, etc.)',
      'Engineer high-ticket offer ($1,000–$10,000+) and economic value thesis',
      'Audit current traffic bottlenecks and DM drop-off leaks',
      'Formulate unique 5-pillar diagnostic assessment framework'
    ]
  },
  {
    days: 'Days 8–14',
    title: 'Acquisition Infrastructure Installation',
    subtitle: 'Building the Funnel Machine',
    tasks: [
      'Build custom 2-step Quiz Funnel & Scorecard diagnostic page',
      'Deploy Cal.com / Calendly 2-step qualification booking system',
      'Set up full Agency CRM pipeline with 8 Kanban stages',
      'Configure automated Day 0, 1, 3, 5, 7 email and SMS nurture sequences',
      'Install pre-call qualification survey & automated reminder triggers'
    ]
  },
  {
    days: 'Days 15–30',
    title: 'Targeted Outreach & Lead Magnet Launch',
    subtitle: 'Generating High-Fit Prospect Inquiries',
    tasks: [
      'Deploy the 4-part Outreach Formula (Observation → Problem → Opportunity → CTA)',
      'Launch diagnostic lead magnet across Instagram, LinkedIn, and YouTube',
      'Audit 20–50 prospects per day using Section 5 prospecting methodology',
      'Collect baseline conversion data on show-up and application completion rates'
    ]
  },
  {
    days: 'Days 31–60',
    title: 'Sales Calls, Conversions & Rapid Delivery',
    subtitle: 'Closing High-Ticket Clients',
    tasks: [
      'Conduct structured Strategy Calls using Section 12 Framework (Current State → Gap → Solution)',
      'Close first cohort of high-ticket coaching clients',
      'Streamline client onboarding portal and kickoff systems',
      'Document early client wins and package them into verified case studies'
    ]
  },
  {
    days: 'Days 61–90',
    title: 'Optimization, Scale & Referral Architecture',
    subtitle: 'Turning Into a Compounding Machine',
    tasks: [
      'A/B test quiz hooks, VSL scripts, and email subject lines',
      'Introduce automated client referral and retention engines',
      'Scale prospecting volume and automate recurring performance reports',
      'Achieve predictable $30,000–$100,000+ monthly client acquisition'
    ]
  }
];

export default function SolutionsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Rocket className="w-4 h-4" />
          <span>Section 16: The 90-Day Operating System</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          How We Build Your <span className="gradient-text">Client Acquisition Machine</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          From Day 1 positioning to Day 90 scalable operations. Here is the step-by-step roadmap to install predictable high-ticket client acquisition in your coaching business.
        </p>
      </div>

      {/* Core Philosophy Banner (Section 13) */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/30 grid grid-cols-1 md:grid-cols-2 gap-6 items-center shadow-xl">
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400">The Wrong Pitch:</span>
          <p className="text-sm text-slate-300 italic bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
            "We build websites, set up GoHighLevel automations, and run ads."
          </p>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block pt-1">The NexLeads Pitch:</span>
          <p className="text-sm text-white font-semibold bg-emerald-950/30 p-3.5 rounded-xl border border-emerald-500/30">
            "We turn your existing attention and followers into predictable, qualified $1,000–$10,000+ client conversations and closed deals."
          </p>
        </div>

        <div className="space-y-3 md:border-l md:border-slate-800 md:pl-6">
          <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Section 13: Economic Reality</div>
          <div className="text-2xl font-black text-white font-mono">
            3 Extra Clients = +$9,000 to +$30,000 / mo
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            If your average coaching package is $3,000 to $10,000, you don't need millions of views. You just need an airtight funnel that doesn't leak interested prospects.
          </p>
        </div>
      </div>

      {/* The 90-Day Roadmap Timeline */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">The 90-Day Implementation Timeline</h2>
          <p className="text-xs sm:text-sm text-slate-400">Exact milestones we execute together during our partnership.</p>
        </div>

        <div className="space-y-4">
          {roadmapSteps.map((step, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col md:flex-row gap-6 items-start justify-between"
            >
              <div className="space-y-1 md:w-1/3">
                <span className="text-xs font-extrabold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  {step.days}
                </span>
                <h3 className="text-lg font-bold text-white pt-2">{step.title}</h3>
                <p className="text-xs text-slate-400">{step.subtitle}</p>
              </div>

              <div className="md:w-2/3 space-y-2">
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                  {step.tasks.map((task, tIdx) => (
                    <li key={tIdx} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Offer Tiers Section */}
      <OfferTiers />

      {/* Bottom CTA */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 border border-emerald-500/30 text-center space-y-4 shadow-2xl">
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Ready to Install This System in Your Business?
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Start with a 1-on-1 strategy session. We’ll audit your current lead flow and map out the exact 90-day architecture.
        </p>
        <Link
          to="/book"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-navy-950 font-black text-sm shadow-lg shadow-emerald-500/20 hover:opacity-95"
        >
          <Calendar className="w-4 h-4" />
          <span>Book Strategy Session Now</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
