import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Flame, ShieldCheck, Mail, Phone, Globe, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-slate-800/80 text-slate-400 text-sm">
      {/* Top Banner: Core Agency Principle */}
      <div className="border-b border-slate-800/60 bg-gradient-to-r from-emerald-950/40 via-navy-900/60 to-cyan-950/40 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            The NexLeads Core Philosophy
          </span>
          <p className="text-base sm:text-lg text-slate-200 font-semibold max-w-3xl mx-auto italic">
            “Don’t sell funnels. Sell client acquisition systems. Don’t sell automation. Sell consistent follow-up. Don’t sell websites. Sell conversion. Sell the business outcome.”
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Col 1: Brand & Positioning */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-navy-950">
                <Sparkles className="w-5 h-5 fill-current" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                NEX<span className="text-emerald-400">LEADS</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              We help high-ticket coaches build predictable client acquisition infrastructure. Turning existing attention, reels, and posts into \$1,000–\$10,000+ qualified client conversations.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                <ShieldCheck className="w-4 h-4" />
                <span>MERN Full-Stack Infrastructure</span>
              </div>
            </div>
          </div>

          {/* Col 2: Services & Agency */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              NexLeads Agency
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/services" className="hover:text-emerald-400 transition-colors">
                  Our Services (DFY / DWY / DIY)
                </Link>
              </li>
              <li>
                <Link to="/who-we-are" className="hover:text-emerald-400 transition-colors">
                  Who We Are & Mission
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="hover:text-emerald-400 transition-colors">
                  The 90-Day Roadmap
                </Link>
              </li>
              <li>
                <Link to="/solutions#tiers" className="hover:text-emerald-400 transition-colors">
                  Offer Architecture
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Funnels & CRM */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Acquisition Tools
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/audit" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>Free Funnel Audit</span>
                </Link>
              </li>
              <li>
                <Link to="/book" className="hover:text-emerald-400 transition-colors">
                  Strategy Call Booking
                </Link>
              </li>
              <li>
                <Link to="/crm" className="hover:text-emerald-400 transition-colors">
                  Kanban Prospect CRM
                </Link>
              </li>
              <li>
                <Link to="/outreach" className="hover:text-emerald-400 transition-colors">
                  4-Part Outreach Studio
                </Link>
              </li>
              <li>
                <Link to="/analytics" className="hover:text-emerald-400 transition-colors">
                  Conversion Analytics
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Coaching Niches */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Supported Niches
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>• Executive & Leadership</li>
              <li>• B2B Sales Coaches</li>
              <li>• Health & Wellness</li>
              <li>• Mindset & Transformation</li>
              <li>• High-Ticket Business</li>
              <li>• Relationship & Life</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} NexLeads Acquisition Systems. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/solutions" className="hover:text-slate-300">Privacy Policy</Link>
            <Link to="/solutions" className="hover:text-slate-300">Terms of Service</Link>
            <Link to="/book" className="hover:text-emerald-400 font-medium">Schedule Demo</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
