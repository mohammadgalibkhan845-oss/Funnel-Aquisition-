import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sparkles, 
  Flame, 
  Menu, 
  X, 
  Users, 
  ShieldCheck,
  Calendar,
  Layers,
  BarChart3,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const CALENDLY_URL = 'https://calendly.com/muhammadarish/free-funnel-client-acquisition-audit';

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
              ? 'bg-[#0A0710]/95 backdrop-blur-xl border-[#FF4468]/20 shadow-2xl shadow-black/80' 
              : 'bg-[#160D24]/85 backdrop-blur-lg border-white/10 shadow-xl shadow-black/50'
          }`}
        >
          
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FF4468] via-[#FFA23D] to-[#D4FF3D] p-[1.5px] shadow-md shadow-[#FF4468]/30 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#0A0710] rounded-full flex items-center justify-center">
                <Flame className="w-4 h-4 text-[#FF4468] fill-current" />
              </div>
            </div>
            <div className="flex items-center">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-white font-['Bricolage_Grotesque']">
                NEX<span className="text-[#FF4468]">LEADS</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    active
                      ? 'bg-[#FF4468]/15 text-[#FFA23D] font-semibold border border-[#FF4468]/30 shadow-sm'
                      : 'text-[#B8ADC9] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.highlight && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF4468] animate-pulse" />
                  )}
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="text-[9px] font-bold bg-[#D4FF3D]/20 text-[#D4FF3D] px-1.5 py-0.2 rounded-full border border-[#D4FF3D]/30">
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
              <div className="hidden sm:flex items-center gap-2 bg-[#160D24] border border-white/10 px-3 py-1 rounded-full text-xs">
                <span className="w-2 h-2 rounded-full bg-[#D4FF3D]" />
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
                <ShieldCheck className="w-3.5 h-3.5 text-[#FFA23D]" />
                <span>Demo Login</span>
              </button>
            )}

            {/* Primary Action Button */}
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#FF4468] to-[#FFA23D] hover:opacity-95 text-[#0A0710] font-extrabold text-xs px-4 sm:px-5 py-2 shadow-lg shadow-[#FF4468]/30 active:scale-95 transition-all duration-200 gap-1.5 font-['Bricolage_Grotesque']"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Call</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-full text-slate-300 hover:text-white bg-[#160D24] border border-white/10 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 p-4 rounded-3xl bg-[#0A0710]/95 backdrop-blur-2xl border border-white/10 shadow-2xl space-y-3 animate-fadeIn pointer-events-auto">
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
                        ? 'bg-[#FF4468]/15 text-[#FFA23D] border border-[#FF4468]/30'
                        : 'text-[#B8ADC9] hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {link.highlight && <span className="w-1.5 h-1.5 rounded-full bg-[#FF4468]" />}
                      <span>{link.name}</span>
                    </div>
                    {link.badge && (
                      <span className="text-[9px] font-bold bg-[#D4FF3D]/20 text-[#D4FF3D] px-2 py-0.2 rounded-full border border-[#D4FF3D]/30">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              {!isAuthenticated ? (
                <button
                  onClick={() => {
                    loginWithDemo('admin');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-[#160D24] border border-white/10 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FFA23D]" />
                  <span>Demo Login (Admin)</span>
                </button>
              ) : (
                <div className="flex items-center justify-between bg-[#160D24] p-2.5 rounded-xl text-xs">
                  <span className="text-slate-300">{user?.name}</span>
                  <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="text-rose-400">
                    Logout
                  </button>
                </div>
              )}

              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#FF4468] to-[#FFA23D] text-[#0A0710] font-bold text-xs text-center flex items-center justify-center gap-1.5 shadow-md shadow-[#FF4468]/25 font-['Bricolage_Grotesque']"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Free Strategy Call</span>
              </a>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
