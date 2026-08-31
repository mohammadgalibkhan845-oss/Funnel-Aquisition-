import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Layers, 
  Sparkles, 
  Check, 
  ArrowRight, 
  Calendar, 
  Flame, 
  Zap, 
  Crown, 
  ShieldCheck, 
  Target, 
  TrendingUp, 
  Users, 
  Settings,
  MessageSquare,
  BarChart3,
  CheckCircle2
} from 'lucide-react';
import OfferTiers from '../components/OfferTiers';

const coreServices = [
  {
    category: 'Model 01',
    title: 'Done-For-You (DFY) Acquisition Infrastructure',
    badge: 'Full White-Glove Installation',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    description: 'We build, configure, test, and install your entire client acquisition machine from scratch. Zero technical headaches for you or your team.',
    deliverables: [
      'Custom 2-Step Diagnostic Funnel & 5-Pillar Scorecard Lead Magnet',
      'Frictionless 2-Step Qualification Calendar (Cal.com / Calendly)',
      'Full Agency Kanban CRM with 8-Stage Prospect Pipeline',
      'Automated Multi-Touch SMS & Email Reminders (88.5% show-up rate)',
      'Custom 4-Part Outreach Scripts for Instagram, LinkedIn, & YouTube',
      'Sales Call Conversion Framework & Objection Handling Playbooks',
      'Continuous Split-Testing, Headline Refinement & Conversion Optimization'
    ],
    idealFor: 'High-ticket coaches ($15k–$50k+/mo) who want a turnkey acquisition machine without managing complex tech.'
  },
  {
    category: 'Model 02',
    title: 'Done-With-You (DWY) System Installation',
    badge: 'Collaborative Sprint + Advisory',
    badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    description: 'We work side-by-side with you and your team over intensive implementation sprints to install, test, and master our proven acquisition operating system.',
    deliverables: [
      'High-Ticket Offer Positioning & Economic Value Validation',
      'Funnel Architecture Blueprints & Diagnostic Quiz Templates',
      'Step-by-Step CRM & Automated Workflow Setup Guidance',
      'Appointment Setter Playbooks & Outreach Script Customization',
      'Weekly 1-on-1 Pipeline Review & Conversion Optimization Calls',
      'Direct Loom / Slack Access for Rapid Funnel Feedback'
    ],
    idealFor: 'Growing coaches ($8k–$25k/mo) with team members ready to install and own their acquisition systems.'
  },
  {
    category: 'Model 03',
    title: 'Do-It-Yourself (DIY) Operating Playbooks',
    badge: 'Frameworks & Operating Systems',
    badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    description: 'Access the exact blueprints, SOPs, script formulas, and funnel scorecard templates we use to scale high-ticket coaching programs to 6-figure months.',
    deliverables: [
      'The 90-Day Coach Client Acquisition Operating Manual',
      '5-Pillar Diagnostic Quiz Copy & Structure Templates',
      'The 4-Part Cold Outreach Formula (Observation → Problem → Opportunity → CTA)',
      'Sales Call Qualification Scripts & Price Presentation Matrix',
      'Pre-Call Indoctrination Email Sequence Swipe Files'
    ],
    idealFor: 'Emerging coaches ($3k–$10k/mo) looking for the exact roadmap and frameworks to install independently.'
  }
];

const capabilities = [
  {
    title: '1. High-Ticket Offer Engineering',
    desc: 'Structure irresistible $1,000–$10,000+ coaching offers with clear economic ROI that make booking calls a no-brainer.',
    icon: Target
  },
  {
    title: '2. Diagnostic Scorecard Funnels',
    desc: 'Replace chaotic DMs with custom 5-pillar assessment quizzes that qualify leads and pinpoint their exact bottlenecks.',
    icon: Flame
  },
  {
    title: '3. Qualification & Booking Engines',
    desc: '2-step calendar workflows that filter out low-budget inquiries and ensure only qualified buyers schedule calls.',
    icon: Calendar
  },
  {
    title: '4. Multi-Channel Show-Up Automation',
    desc: 'Automated SMS and email reminder sequences that double your show-up rate from 50% to 88-92%.',
    icon: MessageSquare
  },
  {
    title: '5. Kanban CRM & Prospect Pipeline',
    desc: 'Visual 8-stage pipeline management to track, research, audit, and close high-ticket coaching prospects effortlessly.',
    icon: Users
  },
  {
    title: '6. Conversion Intelligence & Analytics',
    desc: 'Real-time funnel drop-off tracking and unit economics monitoring to continuously optimize client acquisition.',
    icon: BarChart3
  }
];

export default function ServicesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-20">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Layers className="w-4 h-4" />
          <span>Our Core Service Capabilities</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          Client Acquisition Infrastructure <span className="gradient-text">Built to Scale</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          We install end-to-end client acquisition machines for high-ticket coaches. Whether you need full white-glove DFY execution, collaborative installation, or operating frameworks.
        </p>
      </div>

      {/* 3 Core Delivery Models (DFY, DWY, DIY) */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">The 3 Engagement Models</h2>
          <p className="text-xs sm:text-sm text-slate-400">Tailored implementation models designed for your coaching business stage.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {coreServices.map((service, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-6 shadow-xl"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-500 uppercase tracking-widest">{service.category}</span>
                  <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full border ${service.badgeColor}`}>
                    {service.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-white">{service.title}</h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">{service.description}</p>
                </div>

                <div className="space-y-3 pt-2">
                  <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">Key Deliverables:</span>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {service.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3" />
                        </div>
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-4">
                <div className="text-[11px] text-slate-400">
                  <strong className="text-slate-300">Best For:</strong> {service.idealFor}
                </div>

                <Link
                  to="/book"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-navy-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 hover:opacity-95"
                >
                  <span>Explore {service.category} Model</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6 Capabilities Grid */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">What We Build & Optimize</h2>
          <p className="text-xs sm:text-sm text-slate-400">Every component of your high-ticket acquisition machine engineered for maximum conversion.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <div key={i} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-colors space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-extrabold text-white text-base">{cap.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{cap.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Offer Tiers Comparison */}
      <OfferTiers />

      {/* Direct CTA */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-navy-950 border border-emerald-500/30 text-center space-y-6 shadow-2xl">
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Ready to Discuss the Right Service Model for Your Coaching Business?
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Book a 1-on-1 Strategy Session with our acquisition strategists. We will evaluate your current numbers and propose the optimal system.
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
