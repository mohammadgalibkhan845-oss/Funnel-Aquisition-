import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  Globe, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  User, 
  Mail, 
  DollarSign, 
  TrendingUp, 
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { api } from '../services/api';

export default function BookingPage() {
  const [searchParams] = useSearchParams();

  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [timezone, setTimezone] = useState('America/New_York (EST)');
  const [selectedTime, setSelectedTime] = useState('11:30');
  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const [formData, setFormData] = useState({
    name: searchParams.get('name') || '',
    email: searchParams.get('email') || '',
    phone: '',
    website: '',
    niche: searchParams.get('niche') || 'Executive & Leadership Coach',
    offer: 'High-Ticket Coaching Program',
    offerPrice: Number(searchParams.get('price')) || 4000,
    monthlyRevenue: '$10,000 - $25,000 / mo',
    biggestBottleneck: 'Losing leads in DMs & poor follow-up after calls',
    notes: ''
  });

  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchSlots = async () => {
      setLoadingSlots(true);
      try {
        const res = await api.getAvailableSlots(date, timezone);
        setSlots(res.slots || []);
      } catch (err) {
        console.error('Failed to fetch slots:', err);
      } finally {
        setLoadingSlots(false);
      }
    };
    fetchSlots();
  }, [date, timezone]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !selectedTime) {
      alert('Please fill in your name, email, and select a time slot.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await api.bookCall({
        ...formData,
        date,
        time: selectedTime,
        timezone
      });
      setBookingSuccess(res);
    } catch (err) {
      alert('Failed to complete booking: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Header (Section 10 Positioning) */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <Calendar className="w-4 h-4" />
          <span>Section 10: 1-on-1 Strategy Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Let’s Build Your <span className="gradient-text">Client Acquisition System</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base">
          This is not a high-pressure sales pitch. We will review your current offer, lead generation, funnel bottlenecks, and map out your custom 90-day acquisition architecture.
        </p>
      </div>

      {!bookingSuccess ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Agenda & What to Expect */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-5">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Call Agenda & Deliverables</span>
              </h3>

              <ul className="space-y-3.5 text-xs text-slate-300">
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <strong className="text-white block">Current Numbers & Funnel Audit:</strong>
                    Review your leads, calls, average ticket size, and where leads drop off.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <strong className="text-white block">Bottleneck Identification:</strong>
                    Pinpoint why traffic isn’t converting into pre-sold, qualified strategy calls.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <strong className="text-white block">Custom System Blueprint:</strong>
                    Map out your 5-pillar scorecard, Day 0-7 nurture sequence, and CRM workflows.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <strong className="text-white block">Fit & Implementation Plan:</strong>
                    If there is mutual fit, explore how we build and manage it all for you.
                  </div>
                </li>
              </ul>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Duration: 45 Minutes via Google Meet</span>
                </div>
                <div>Hosted by Mohammad Galib Khan & Senior Acquisition Strategists.</div>
              </div>
            </div>
          </div>

          {/* Right: Booking Form & Calendar Selector */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/20 shadow-2xl space-y-6">
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Date & Time Selector */}
              <div className="space-y-4 bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  <span>1. Pick Your Date & Time</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Select Date:</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Your Timezone:</label>
                    <select
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-400"
                    >
                      <option value="America/New_York (EST)">Eastern Time (EST)</option>
                      <option value="America/Chicago (CST)">Central Time (CST)</option>
                      <option value="America/Los_Angeles (PST)">Pacific Time (PST)</option>
                      <option value="Europe/London (GMT/BST)">London (GMT/BST)</option>
                      <option value="Asia/Kolkata (IST)">India (IST)</option>
                      <option value="Australia/Sydney (AEST)">Sydney (AEST)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-2">Available 45-Min Slots:</label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {slots.map((slot) => (
                      <button
                        key={slot.time}
                        type="button"
                        onClick={() => setSelectedTime(slot.time)}
                        className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all ${
                          selectedTime === slot.time
                            ? 'bg-emerald-500 text-navy-950 font-bold border-emerald-400 shadow-md'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Qualification Questionnaire */}
              <div className="space-y-4 bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <User className="w-4 h-4 text-cyan-400" />
                  <span>2. Pre-Call Qualification Details</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. David Vance"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Business Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="david@vancecoaching.com"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Current Monthly Revenue:</label>
                    <select
                      value={formData.monthlyRevenue}
                      onChange={(e) => setFormData({ ...formData, monthlyRevenue: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-400"
                    >
                      <option value="Under $5,000 / mo">Under $5,000 / mo</option>
                      <option value="$5,000 - $15,000 / mo">$5,000 - $15,000 / mo</option>
                      <option value="$15,000 - $40,000 / mo">$15,000 - $40,000 / mo</option>
                      <option value="$40,000 - $100,000+ / mo">$40,000 - $100,000+ / mo</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Average Offer Price:</label>
                    <input
                      type="number"
                      value={formData.offerPrice}
                      onChange={(e) => setFormData({ ...formData, offerPrice: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Primary Funnel / Acquisition Bottleneck:</label>
                  <input
                    type="text"
                    value={formData.biggestBottleneck}
                    onChange={(e) => setFormData({ ...formData, biggestBottleneck: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-navy-950 font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20 disabled:opacity-50"
              >
                <Calendar className="w-4 h-4" />
                <span>{submitting ? 'Confirming Strategy Slot...' : `Confirm Strategy Call for ${date} at ${selectedTime}`}</span>
              </button>

            </form>

          </div>

        </div>
      ) : (
        /* CONFIRMATION SCREEN */
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-emerald-500/40 text-center space-y-6 max-w-3xl mx-auto shadow-2xl animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-400/40">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-white">
              Strategy Session Confirmed!
            </h2>
            <p className="text-sm text-slate-300">
              We look forward to meeting with you, <strong>{formData.name}</strong>.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-left space-y-2 text-xs sm:text-sm text-slate-200">
            <div><strong>Date & Time:</strong> {date} at {selectedTime} ({timezone})</div>
            <div><strong>Format:</strong> Google Meet (Link dispatched to {formData.email})</div>
            <div><strong>Agenda:</strong> 90-Day High-Ticket Acquisition Roadmap for {formData.niche}</div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            {bookingSuccess.calendarUrls?.google && (
              <a
                href={bookingSuccess.calendarUrls.google}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 border border-slate-700"
              >
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>Add to Google Calendar</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            )}

            <Link
              to="/crm"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 text-navy-950 font-extrabold text-xs flex items-center justify-center gap-2"
            >
              <span>View Lead in CRM Pipeline</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Section 12 Prep Framework */}
          <div className="pt-6 border-t border-slate-800 text-left text-xs text-slate-400 space-y-2">
            <strong className="text-slate-300 block font-semibold">
              📋 How to prepare for the strategy call (Section 12 Framework):
            </strong>
            <p>
              Please have these 4 numbers handy: (1) Current monthly leads, (2) Strategy calls taken, (3) Average offer price ($), and (4) Close rate percentage.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
