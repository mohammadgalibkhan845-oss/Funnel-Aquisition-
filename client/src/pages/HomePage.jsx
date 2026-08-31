import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Flame, 
  ArrowRight, 
  Calendar, 
  CheckCircle2, 
  Play, 
  Users, 
  ShieldCheck, 
  DollarSign, 
  BarChart3, 
  TrendingUp, 
  MessageSquare, 
  Clock, 
  Zap, 
  Target,
  ChevronDown,
  Layers
} from 'lucide-react';
import LostRevenueCalculator from '../components/LostRevenueCalculator';
import CompleteMachineDiagram from '../components/CompleteMachineDiagram';
import OfferTiers from '../components/OfferTiers';
import CaseStudies from '../components/CaseStudies';

const niches = [
  { name: 'Executive & Leadership Coaches', avgPrice: '$5,000–$15,000', pain: 'High authority on LinkedIn, but manual messaging causes leads to bounce before booking.' },
  { name: 'B2B Sales & Growth Coaches', avgPrice: '$4,000–$12,000', pain: '45-day sales cycles and 40% no-show rates without pre-call indoctrination.' },
  { name: 'Health, Wellness & Fitness Coaches', avgPrice: '$2,500–$6,000', pain: '3+ hours daily replying to unstructured Instagram DMs with 80% ghosting.' },
  { name: 'Mindset & Transformation Coaches', avgPrice: '$3,000–$8,000', pain: 'Linktree links with zero automated qualification or Day 0-7 nurture sequences.' },
  { name: 'Business & Agency Coaches', avgPrice: '$6,000–$20,000', pain: 'Strong YouTube content, but missing multi-channel retargeting and CRM pipeline.' },
  { name: 'Relationship & Life Coaches', avgPrice: '$2,500–$5,000', pain: 'Warm followers vanish because no automated quiz or scorecard captures their details.' },
];

const faqs = [
  {
    q: 'Why not just hire a website designer or buy GoHighLevel templates?',
    a: 'Websites and static templates don’t acquire clients. Most agencies build pretty pages that don’t convert. We build the entire acquisition infrastructure: diagnostic lead magnets, automated qualification gates, multi-channel SMS reminders, Day 0–7 nurture sequences, and CRM pipeline tracking.'
  },
  {
    q: 'How does the Free Coach Funnel Audit work?',
    a: 'You answer 6 diagnostic questions regarding your traffic, lead capture, follow-up cadence, and offer economics. Our engine scores your funnel across 5 pillars (0-100%) and highlights your exact revenue leaks with an estimated monthly loss calculation.'
  },
  {
    q: 'How quickly can the system be installed in my coaching business?',
    a: 'Our 90-Day Roadmap delivers the core funnel, lead quiz, and CRM in Days 8–14. By Days 15–30, we initiate targeted outreach and launch the automated nurture workflows to drive immediate strategy calls.'
  },
  {
    q: 'What coaching ticket sizes is this designed for?',
    a: 'The system is engineered for high-ticket coaches charging roughly $1,000 to $10,000+ per client. At this price point, recovering just 2-3 extra clients per month pays for the entire infrastructure multiple times over.'
  }
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [pitchOpen, setPitchOpen] = useState(false);

  return (
    <div className="space-y-20 sm:space-y-28 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 lg:pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[650px] h-96 sm:h-[650px] bg-gradient-to-tr from-emerald-500/15 to-cyan-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="space-y-6 max-w-4xl mx-auto">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-bold shadow-lg shadow-emerald-500/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Built for High-Ticket Coaches ($1k–$10k+ Offers)</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Turn Your Coaching Expertise Into a <span className="gradient-text">Predictable Client Acquisition Machine</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            Stop losing 80% of your leads in manual DMs. We combine <strong>diagnostic quiz funnels</strong>, <strong>automated nurture</strong>, <strong>SMS reminders</strong>, and <strong>Kanban CRM pipelines</strong> to consistently book qualified high-ticket clients.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/audit"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-navy-950 font-extrabold text-base flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-500/25 hover:opacity-95 active:scale-98 transition-all"
            >
              <Flame className="w-5 h-5 text-navy-950" />
              <span>Get Your Free Funnel Audit</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              to="/book"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-white font-bold text-base border border-slate-700 flex items-center justify-center gap-2 transition-all"
            >
              <Calendar className="w-5 h-5 text-cyan-400" />
              <span>Book Strategy Session</span>
            </Link>
          </div>

          {/* Trust Metrics Bar */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="text-2xl font-black text-white font-mono">88.5%</div>
              <div className="text-xs text-emerald-400 font-semibold">Avg. Show-Up Rate</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="text-2xl font-black text-white font-mono">+$24k/mo</div>
              <div className="text-xs text-cyan-400 font-semibold">Avg. Client Revenue Gain</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="text-2xl font-black text-white font-mono">90 Days</div>
              <div className="text-xs text-purple-400 font-semibold">Full System Installation</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="text-2xl font-black text-white font-mono">0 Manual DMs</div>
              <div className="text-xs text-amber-400 font-semibold">Automated Nurture</div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. THE 30-SECOND AGENCY MESSAGE BANNER */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-navy-950 border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <MessageSquare className="w-4 h-4" />
              <span>Section 18: The 30-Second Positioning</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              "Our goal isn’t to give you another pretty website. Our goal is to help you acquire more clients."
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We look at the entire journey: how prospects discover you, how they are captured, how they are nurtured, how they book, and how they are followed up with.
            </p>
          </div>
          <Link
            to="/solutions"
            className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold whitespace-nowrap border border-slate-700 flex items-center gap-2"
          >
            <span>Read 90-Day Roadmap</span>
            <ArrowRight className="w-4 h-4 text-emerald-400" />
          </Link>
        </div>
      </section>

      {/* 3. INTERACTIVE LOST REVENUE CALCULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LostRevenueCalculator />
      </section>

      {/* 4. THE COMPLETE CLIENT ACQUISITION MACHINE (DIAGRAM) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CompleteMachineDiagram />
      </section>

      {/* 5. SERVICES OVERVIEW (DFY, DWY, DIY) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Our Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Tailored Engagement <span className="gradient-text">Models</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            From complete Done-For-You infrastructure installation to collaborative Done-With-You sprints.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-emerald-500/30 space-y-4 hover:border-emerald-500/60 transition-all shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Model 01</span>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                Done-For-You
              </span>
            </div>
            <h3 className="text-xl font-black text-white">Full DFY Infrastructure</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We design, build, test, and install your entire 5-pillar diagnostic quiz, CRM pipeline, and SMS automations. Zero tech headaches.
            </p>
            <Link to="/services" className="text-xs font-bold text-emerald-400 flex items-center gap-1 hover:underline pt-2">
              <span>Learn about DFY</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 hover:border-cyan-500/40 transition-all shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Model 02</span>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300">
                Done-With-You
              </span>
            </div>
            <h3 className="text-xl font-black text-white">Collaborative Sprints</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Intensive implementation sprints where we guide you and your team through installing and mastering the acquisition machine.
            </p>
            <Link to="/services" className="text-xs font-bold text-cyan-400 flex items-center gap-1 hover:underline pt-2">
              <span>Learn about DWY</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 hover:border-purple-500/40 transition-all shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Model 03</span>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300">
                Do-It-Yourself
              </span>
            </div>
            <h3 className="text-xl font-black text-white">Operating Playbooks</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Step-by-step 90-day operating frameworks, 4-part outreach formulas, and diagnostic quiz templates ready to deploy.
            </p>
            <Link to="/services" className="text-xs font-bold text-purple-400 flex items-center gap-1 hover:underline pt-2">
              <span>Learn about DIY</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. WHO WE ARE HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-500/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-widest">
              <Users className="w-4 h-4" />
              <span>Who We Are • NexLeads</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              We help coaches escape manual DM chaos and install <span className="gradient-text">predictable growth systems</span>.
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Founded on the belief that life-changing coaching deserves a scalable acquisition system. We don’t sell pretty websites—we build conversion engines that predictably turn existing followers into $1,000–$10,000+ client relationships.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                to="/who-we-are"
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2 border border-slate-700"
              >
                <span>Read Our Full Story & Principles</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 bg-slate-950/80 p-6 rounded-2xl border border-slate-800 space-y-3 text-center">
            <div className="text-3xl font-black text-emerald-400 font-mono">88.5%</div>
            <div className="text-xs font-bold text-white uppercase tracking-wider">Average Show-Up Rate</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Powered by our automated multi-touch reminder & pre-call qualification engine.
            </p>
          </div>
        </div>
      </section>

      {/* 5. NICHE SPECIALIZATION (SECTION 1) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Target className="w-3.5 h-3.5" />
            <span>Section 1: Who We Help</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineered For <span className="gradient-text">High-Ticket Coaches</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Already have an offer between $1,000–$10,000+? We install custom acquisition systems tailored to your specific audience dynamics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {niches.map((item, i) => (
            <div key={i} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 hover:border-emerald-500/40 transition-colors">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-white text-base">{item.name}</h4>
                <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                  {item.avgPrice}
                </span>
              </div>
              <p className="text-xs text-rose-300/90 leading-relaxed">
                <strong className="text-rose-400">Bottleneck:</strong> {item.pain}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. VERIFIED CASE STUDIES (SECTION 15) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CaseStudies />
      </section>

      {/* 7. OFFER TIERS (SECTION 14) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <OfferTiers />
      </section>

      {/* 8. FAQS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
          <p className="text-slate-400 text-sm">Everything you need to know about our Client Acquisition System.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 cursor-pointer transition-colors"
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
            >
              <div className="flex items-center justify-between font-bold text-sm text-white">
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-emerald-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
              </div>
              {openFaq === idx && (
                <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 9. BOTTOM FLOATING CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 text-navy-950 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="space-y-2 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Ready to Stop Losing High-Ticket Leads?
            </h2>
            <p className="text-slate-100 text-sm sm:text-base font-medium">
              Get your custom 5-pillar diagnostic scorecard in less than 2 minutes and see exactly where your funnel is leaking revenue.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/audit"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-navy-950 hover:bg-slate-900 text-emerald-400 font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl"
            >
              <Flame className="w-4 h-4" />
              <span>Start Free 5-Pillar Funnel Audit</span>
            </Link>
            <Link
              to="/book"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-bold text-sm backdrop-blur-sm border border-white/30 flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule 1-on-1 Strategy Session</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
