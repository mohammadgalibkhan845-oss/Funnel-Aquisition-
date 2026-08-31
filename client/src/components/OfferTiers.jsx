import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Flame, Zap, Crown, ArrowRight } from 'lucide-react';

const tiers = [
  {
    name: 'Foundation',
    tagline: 'Ideal for coaches ready to replace messy DMs with an automated funnel',
    price: '$3,500',
    type: 'One-Time Setup',
    icon: Zap,
    popular: false,
    color: 'border-slate-800 hover:border-slate-700',
    badge: 'Core Funnel Setup',
    features: [
      'High-Ticket Offer & Positioning Workshop',
      'Custom 2-Step Lead Magnet / VSL Landing Page',
      'Automated Diagnostic Quiz (5-Pillar Scorecard)',
      'Cal.com / Calendly 2-Step Booking Flow',
      'Basic Day 0 Email & SMS Confirmation Workflows',
      'Pre-Call Qualification Gate Setup',
      '14-Day Post-Launch Support'
    ],
    cta: 'Get Foundation System',
    target: 'Coaches doing $5k–$15k/mo'
  },
  {
    name: 'Growth',
    tagline: 'Our flagship Done-For-You client acquisition infrastructure',
    price: '$6,500',
    type: 'Full DFY Implementation',
    icon: Flame,
    popular: true,
    color: 'border-emerald-500/60 shadow-xl shadow-emerald-500/10 ring-1 ring-emerald-400',
    badge: 'Most Popular for High-Ticket',
    features: [
      'Everything in Foundation PLUS:',
      'Full Agency Kanban CRM & Lead Qualification Engine',
      'Automated Day 0, 1, 3, 5, 7 Indoctrination Email Sequence',
      'Automated Multi-Touch SMS Reminder Engine (Boosts show-ups to 90%)',
      'No-Show Recovery & Long-Term Re-engagement Sequences',
      'Custom Outreach Copy Scripts (IG / LinkedIn / YouTube)',
      'Sales Call Conversion Framework & Objection Handling Playbook',
      '60-Day Funnel Split-Testing & Conversion Optimization'
    ],
    cta: 'Install Growth System',
    target: 'Coaches doing $15k–$40k/mo'
  },
  {
    name: 'Scale',
    tagline: 'Complete acquisition machine, ongoing pipeline management & revenue optimization',
    price: '$10,000',
    type: 'Enterprise + Monthly Sprint',
    icon: Crown,
    popular: false,
    color: 'border-cyan-500/50 hover:border-cyan-400',
    badge: 'Full Scale & Optimization',
    features: [
      'Everything in Growth PLUS:',
      'Dedicated Appointment Setter Training & Playbooks',
      'Multi-Channel Traffic Retargeting Funnel Architecture',
      'Advanced Funnel Analytics & Conversion Tracking Dashboard',
      'Bi-Weekly Strategy & Conversion Review Calls',
      'A/B Headline, VSL, and Application Split-Testing',
      'Client Referral Engine & VIP Onboarding Portal',
      'Priority 24/7 Slack Access with Agency Founders'
    ],
    cta: 'Apply for Scale Engine',
    target: 'Coaches aiming for $50k–$100k+/mo'
  }
];

export default function OfferTiers() {
  return (
    <div id="tiers" className="space-y-10">
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Flame className="w-3.5 h-3.5" />
          <span>Section 14: Offer Architecture</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Tailored For Your <span className="gradient-text">Coaching Stage</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          Choose the acquisition tier that matches your current revenue and growth targets. We handle the entire tech, copy, and automation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {tiers.map((tier) => {
          const Icon = tier.icon;
          return (
            <div
              key={tier.name}
              className={`p-6 sm:p-8 rounded-3xl bg-slate-900/90 border flex flex-col justify-between transition-all duration-300 ${tier.color} relative`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 text-navy-950 font-extrabold text-xs uppercase tracking-wide shadow-md">
                  {tier.badge}
                </div>
              )}

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-black text-white">{tier.name}</h3>
                    <p className="text-xs text-slate-400 mt-1">{tier.tagline}</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-400 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="pt-2 pb-4 border-b border-slate-800">
                  <div className="text-3xl sm:text-4xl font-black text-white font-mono">
                    {tier.price}
                  </div>
                  <div className="text-xs text-emerald-400 font-semibold mt-1">
                    {tier.type} • <span className="text-slate-400">{tier.target}</span>
                  </div>
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <Link
                  to="/book"
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm text-center flex items-center justify-center gap-2 transition-all ${
                    tier.popular
                      ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-navy-950 shadow-lg shadow-emerald-500/25 hover:opacity-95'
                      : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                  }`}
                >
                  <span>{tier.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
