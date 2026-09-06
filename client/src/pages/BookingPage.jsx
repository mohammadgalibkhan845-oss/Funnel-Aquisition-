import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  Globe, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  ExternalLink,
  Flame,
  Award,
  Video
} from 'lucide-react';

const CALENDLY_URL = 'https://calendly.com/muhammadarish/free-funnel-client-acquisition-audit';

export default function BookingPage() {
  const [searchParams] = useSearchParams();
  const userName = searchParams.get('name') || '';
  const userEmail = searchParams.get('email') || '';

  // Ensure Calendly widget script is loaded
  useEffect(() => {
    const head = document.querySelector('head');
    const script = document.createElement('script');
    script.setAttribute('src', 'https://assets.calendly.com/assets/external/widget.js');
    script.async = true;
    head.appendChild(script);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FF4468]/10 border border-[#FF4468]/20 text-[#FF4468] text-xs font-bold uppercase tracking-wider">
          <Calendar className="w-4 h-4" />
          <span>Free 1-on-1 Strategy Architecture Call</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Let’s Build Your <span className="gradient-text">Client Acquisition System</span>
        </h1>
        <p className="text-[#B8ADC9] text-sm sm:text-base">
          30 Minutes · Zero Pressure · We will review your current offer, lead generation, funnel leaks, and map out your custom 90-day acquisition architecture.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: What to Expect & Agenda */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 space-y-5 shadow-xl">
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FFA23D]" />
              <span>Call Agenda & Deliverables</span>
            </h3>

            <ul className="space-y-4 text-xs text-[#FAF6EF]">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-[#FF4468]/20 text-[#FF4468] flex items-center justify-center font-bold shrink-0 mt-0.5 font-mono">
                  1
                </div>
                <div>
                  <strong className="text-white block text-[13px] mb-0.5">Current Funnel Audit:</strong>
                  Review where your coaching leads drop off across the 5 core pillars.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-[#FFA23D]/20 text-[#FFA23D] flex items-center justify-center font-bold shrink-0 mt-0.5 font-mono">
                  2
                </div>
                <div>
                  <strong className="text-white block text-[13px] mb-0.5">Bottleneck Pinpointing:</strong>
                  Identify why profile attention is not converting into pre-sold, qualified strategy calls.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-[#D4FF3D]/20 text-[#D4FF3D] flex items-center justify-center font-bold shrink-0 mt-0.5 font-mono">
                  3
                </div>
                <div>
                  <strong className="text-white block text-[13px] mb-0.5">Custom System Architecture:</strong>
                  Map out your diagnostic scorecard, Day 0–7 nurture sequence, and CRM workflows.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-white/20 text-white flex items-center justify-center font-bold shrink-0 mt-0.5 font-mono">
                  4
                </div>
                <div>
                  <strong className="text-white block text-[13px] mb-0.5">DFY / DWY Implementation:</strong>
                  If there is a mutual fit, explore how we build and install the entire machine for you.
                </div>
              </li>
            </ul>

            <div className="p-4 rounded-2xl bg-[#160D24] border border-white/10 text-xs text-[#B8ADC9] space-y-2">
              <div className="flex items-center gap-2 text-[#D4FF3D] font-bold">
                <Video className="w-4 h-4" />
                <span>Format: Google Meet (Video Call)</span>
              </div>
              <div>
                Hosted by <strong>Mohammad Galib Khan</strong> & Senior Acquisition Strategists.
              </div>
            </div>

            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary w-full text-center flex items-center justify-center gap-2 text-sm"
            >
              <span>Open in New Tab</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Right: Embedded Calendly Widget */}
        <div className="lg:col-span-8 glass-panel p-2 sm:p-4 rounded-3xl border border-white/10 shadow-2xl overflow-hidden min-h-[680px]">
          <div 
            className="calendly-inline-widget w-full rounded-2xl overflow-hidden" 
            data-url={`${CALENDLY_URL}?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=0a0710&text_color=faf6ef&primary_color=ff4468${userEmail ? `&email=${encodeURIComponent(userEmail)}` : ''}${userName ? `&name=${encodeURIComponent(userName)}` : ''}`}
            style={{ minWidth: '320px', height: '700px' }}
          />
        </div>

      </div>

    </div>
  );
}
