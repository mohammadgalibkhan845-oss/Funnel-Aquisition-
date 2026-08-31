import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, DollarSign, TrendingUp, AlertTriangle, ArrowRight, Flame, CheckCircle2 } from 'lucide-react';

export default function LostRevenueCalculator() {
  const [monthlyLeads, setMonthlyLeads] = useState(45);
  const [offerPrice, setOfferPrice] = useState(4000);
  const [leakRate, setLeakRate] = useState(75); // % of leads lost due to no nurture/manual DMs

  // Economics Math
  const lostLeads = Math.round(monthlyLeads * (leakRate / 100));
  // Conservative estimate: recovering even 5-8% of lost leads into clients
  const recoveredClients = Math.max(1, Math.round(lostLeads * 0.07));
  const monthlyRecovered = recoveredClients * offerPrice;
  const yearlyRecovered = monthlyRecovered * 12;
  const threeClientsGain = offerPrice * 3;

  return (
    <div className="glass-panel p-6 sm:p-8 lg:p-10 rounded-3xl border border-emerald-500/20 shadow-2xl relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left: Interactive Controls */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Calculator className="w-3.5 h-3.5" />
              <span>Section 13: Economic Value Calculator</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Calculate Your Monthly <span className="gradient-text">Revenue Leaks</span>
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              Find out how much high-ticket coaching revenue slips through the cracks when leads aren't captured and nurtured automatically.
            </p>
          </div>

          {/* Control 1: Monthly Leads / Inquiries */}
          <div className="space-y-2 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-slate-300">Monthly Inquiries / Profile Visitors:</span>
              <span className="text-emerald-400 font-mono text-base font-bold">{monthlyLeads} leads/mo</span>
            </div>
            <input
              type="range"
              min="10"
              max="300"
              step="5"
              value={monthlyLeads}
              onChange={(e) => setMonthlyLeads(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>10 leads</span>
              <span>150 leads</span>
              <span>300+ leads</span>
            </div>
          </div>

          {/* Control 2: Average Offer Price */}
          <div className="space-y-2 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-slate-300">Your Average High-Ticket Price:</span>
              <span className="text-cyan-400 font-mono text-base font-bold">${offerPrice.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="1000"
              max="15000"
              step="500"
              value={offerPrice}
              onChange={(e) => setOfferPrice(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>$1,000 (Foundation)</span>
              <span>$5,000 (Growth)</span>
              <span>$15,000+ (Scale)</span>
            </div>
          </div>

          {/* Control 3: Drop-Off Rate */}
          <div className="space-y-2 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-slate-300">Estimated DM / Un-nurtured Drop-off:</span>
              <span className="text-amber-400 font-mono text-base font-bold">{leakRate}%</span>
            </div>
            <input
              type="range"
              min="40"
              max="95"
              step="5"
              value={leakRate}
              onChange={(e) => setLeakRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <p className="text-[11px] text-slate-400">
              Without an automated quiz & Day 0-7 nurture sequence, standard drop-off is 75–85%.
            </p>
          </div>
        </div>

        {/* Right: Real-time Calculated Revenue Potential */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-900/90 to-navy-950 p-6 sm:p-8 rounded-2xl border border-emerald-500/30 text-center space-y-6 shadow-xl">
          
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest text-slate-400 font-bold">
              Estimated Monthly Revenue Leak
            </span>
            <div className="text-4xl sm:text-5xl font-black text-rose-400 tracking-tight font-mono">
              -${monthlyRecovered.toLocaleString()}
              <span className="text-xs text-rose-300 font-normal block mt-1">
                (~{recoveredClients} lost high-ticket clients every single month)
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-left space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-300">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>With NexLeads Installed:</span>
            </div>
            <div className="text-2xl font-extrabold text-white font-mono">
              +${monthlyRecovered.toLocaleString()}<span className="text-sm font-normal text-emerald-400"> / month</span>
            </div>
            <div className="text-xs text-slate-300">
              Annualized Revenue Recovery: <strong className="text-emerald-300">+${yearlyRecovered.toLocaleString()}/yr</strong>
            </div>
          </div>

          <div className="text-left space-y-1.5 text-xs text-slate-300 bg-slate-900/70 p-3.5 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span><strong>3 extra clients/mo</strong> = +${threeClientsGain.toLocaleString()} gross profit</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Automated 5-pillar qualification eliminates time wasters</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Show-up rate boosted from 50% to 88%+ via SMS engine</span>
            </div>
          </div>

          <Link
            to="/audit"
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-navy-950 font-extrabold text-sm flex items-center justify-center gap-2 hover:opacity-95 shadow-lg shadow-emerald-500/20 active:scale-98 transition-all"
          >
            <Flame className="w-4 h-4 text-navy-950" />
            <span>Audit My Acquisition System Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
