import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sparkles, 
  Flame, 
  Menu, 
  X, 
  Users, 
  Send, 
  Mail, 
  ShieldCheck,
  Calendar,
  Layers,
  BarChart3,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout, loginWithDemo } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', path: '/services' },
    { name: 'Who We Are', path: '/who-we-are' },
    { name: 'Funnel Audit', path: '/audit', highlight: true },
    { name: 'Book Call', path: '/book' },
    { name: 'CRM Pipeline', path: '/crm', badge: 'Live' },
    { name: 'Outreach AI', path: '/outreach' },
    { name: 'Analytics', path: '/analytics' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-2.5 sm:pt-4 px-2 sm:px-6 pointer-events-none transition-all duration-300">
      <div className="max-w-7xl mx-auto pointer-events-auto">
        
        {/* Floating Glassmorphic Navigation Pill */}
        <div 
          className={`rounded-full px-3.5 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between border transition-all duration-300 ${
            scrolled 
              ? 'bg-[#070b14]/90 backdrop-blur-xl border-emerald-500/20 shadow-2xl shadow-black/60' 
              : 'bg-[#0b0f19]/80 backdrop-blur-lg border-white/10 shadow-xl shadow-black/40'
          }`}
        >
          
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-400 via-teal-500 to-cyan-400 p-[1.5px] shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#070b14] rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
            <div className="flex items-center">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-white font-sans">
                NEX<span className="text-emerald-400">LEADS</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Typography-Focused, Reference Style) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    active
                      ? 'bg-emerald-500/15 text-emerald-300 font-semibold border border-emerald-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.highlight && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="text-[9px] font-bold bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded-full border border-emerald-500/30">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* Demo / Auth Button */}
            {isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-3 py-1 rounded-full text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-semibold text-slate-200">{user?.name?.split(' ')[0]}</span>
                <button
                  onClick={logout}
                  className="text-[10px] text-slate-400 hover:text-rose-400 ml-1 transition-colors"
                >
                  Exit
                </button>
              </div>
            ) : (
              <button
                onClick={() => loginWithDemo('admin')}
                className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Demo Login</span>
              </button>
            )}

            {/* Primary Action Button (Reference Pill Style) */}
            <Link
              to="/audit"
              className="relative inline-flex items-center justify-center rounded-full bg-emerald-500 hover:bg-emerald-400 text-navy-950 font-extrabold text-xs px-4 sm:px-5 py-2 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 active:scale-95 transition-all duration-200 gap-1.5"
            >
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>Get Free Audit</span>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-full text-slate-300 hover:text-white bg-slate-900/80 border border-slate-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 p-4 rounded-3xl bg-[#070b14]/95 backdrop-blur-2xl border border-white/10 shadow-2xl space-y-3 animate-fadeIn pointer-events-auto">
            <div className="grid grid-cols-1 gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                      active
                        ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                        : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {link.highlight && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                      <span>{link.name}</span>
                    </div>
                    {link.badge && (
                      <span className="text-[9px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.2 rounded-full border border-emerald-500/30">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
              {!isAuthenticated ? (
                <button
                  onClick={() => {
                    loginWithDemo('admin');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Demo Login (Admin)</span>
                </button>
              ) : (
                <div className="flex items-center justify-between bg-slate-900 p-2.5 rounded-xl text-xs">
                  <span className="text-slate-300">{user?.name}</span>
                  <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="text-rose-400">
                    Logout
                  </button>
                </div>
              )}

              <Link
                to="/book"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-navy-950 font-bold text-xs text-center flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Strategy Call</span>
              </Link>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
