import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Flame, ShieldCheck, Mail, Calendar, ExternalLink } from 'lucide-react';

const CALENDLY_URL = 'https://calendly.com/muhammadarish/free-funnel-client-acquisition-audit';

export default function Footer() {
  return (
    <footer className="bg-[#0A0710] border-t border-white/10 text-[#B8ADC9] text-sm relative z-10">
      
      {/* Top Banner: Core Agency Principle */}
      <div className="border-b border-white/10 bg-gradient-to-r from-[#160D24] via-[#2A1338] to-[#160D24] py-8 px-4">
        <div className="max-w-6xl mx-auto text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF4468] bg-[#FF4468]/10 px-3 py-1 rounded-full border border-[#FF4468]/20">
            The NexLeads Core Philosophy
          </span>
          <p className="text-base sm:text-lg text-[#FAF6EF] font-semibold max-w-3xl mx-auto italic font-['Bricolage_Grotesque']">
            “Don’t sell funnels. Sell client acquisition systems. Don’t sell automation. Sell consistent follow-up. Don’t sell websites. Sell conversion. Sell the business outcome.”
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Col 1: Brand & Positioning */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#FF4468] to-[#FFA23D] flex items-center justify-center text-[#0A0710]">
                <Flame className="w-5 h-5 fill-current" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white font-['Bricolage_Grotesque']">
                NEX<span className="text-[#FF4468]">LEADS</span>
              </span>
            </Link>
            <p className="text-[#B8ADC9] text-sm leading-relaxed max-w-sm">
              We help high-ticket coaches build predictable client acquisition infrastructure. Turning existing attention, reels, and posts into $1,000–$10,000+ qualified client conversations.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 text-xs text-[#D4FF3D] bg-[#D4FF3D]/10 px-2.5 py-1 rounded-lg border border-[#D4FF3D]/20">
                <ShieldCheck className="w-4 h-4" />
                <span>Client Acquisition Operating System</span>
              </div>
            </div>
          </div>

          {/* Col 2: Services & Agency */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 font-['Bricolage_Grotesque']">
              NexLeads Agency
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/services" className="hover:text-[#FFA23D] transition-colors">
                  Our Services (DFY / DWY / DIY)
                </Link>
              </li>
              <li>
                <Link to="/who-we-are" className="hover:text-[#FFA23D] transition-colors">
                  Who We Are & Mission
                </Link>
              </li>
              <li>
                <a 
                  href={CALENDLY_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#FF4468] transition-colors flex items-center gap-1.5 text-[#FF4468]"
                >
                  <span>Book Free Strategy Call</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <Link to="/audit" className="hover:text-[#FFA23D] transition-colors">
                  5-Pillar Funnel Audit
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Platform Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 font-['Bricolage_Grotesque']">
              Acquisition Tools
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/crm" className="hover:text-[#FFA23D] transition-colors">
                  Agency Kanban CRM
                </Link>
              </li>
              <li>
                <Link to="/outreach" className="hover:text-[#FFA23D] transition-colors">
                  4-Part Cold Outreach AI
                </Link>
              </li>
              <li>
                <Link to="/analytics" className="hover:text-[#FFA23D] transition-colors">
                  Funnel & Revenue Analytics
                </Link>
              </li>
              <li>
                <Link to="/sequences" className="hover:text-[#FFA23D] transition-colors">
                  Day 0–7 Multi-Touch Sequences
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Founder Spotlight */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 font-['Bricolage_Grotesque']">
              Founder Spotlight
            </h4>
            <div className="space-y-2 text-xs">
              <p className="text-white font-bold">Mohammad Galib Khan</p>
              <p className="text-[#B8ADC9]">Founder & Lead Acquisition Strategist</p>
              <p className="text-[#B8ADC9] pt-1">
                Engineering client acquisition infrastructure for B2B coaches scaling past $20k–$50k/mo.
              </p>
              <div className="pt-2">
                <Link to="/who-we-are" className="text-[#FFA23D] hover:underline inline-flex items-center gap-1 font-semibold">
                  <span>View Founder Bio</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#B8ADC9]">
          <div>
            © {new Date().getFullYear()} NexLeads. All rights reserved. Client Acquisition Infrastructure Built to Scale.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/services" className="hover:text-white transition-colors">Services</Link>
            <Link to="/who-we-are" className="hover:text-white transition-colors">Who We Are</Link>
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="text-[#FF4468] hover:underline flex items-center gap-1">
              <span>Calendly Call</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
