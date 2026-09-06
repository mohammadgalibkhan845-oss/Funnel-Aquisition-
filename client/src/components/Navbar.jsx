import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Calendar } from 'lucide-react';

const CALENDLY_URL = 'https://calendly.com/muhammadarish/free-funnel-client-acquisition-audit';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-3 sm:pt-4 px-3 sm:px-8 pointer-events-none transition-all duration-300">
      <div className="max-w-[1100px] mx-auto pointer-events-auto">
        
        {/* Clean Glassmorphic Header Pill: Brand Logo Left, Book Call Right */}
        <div 
          className={`rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between border transition-all duration-300 ${
            scrolled 
              ? 'bg-[#0A0710]/95 backdrop-blur-xl border-[#FF4468]/20 shadow-2xl shadow-black/80' 
              : 'bg-[#160D24]/85 backdrop-blur-lg border-white/10 shadow-xl shadow-black/50'
          }`}
        >
          
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FF4468] via-[#FFA23D] to-[#D4FF3D] p-[1.5px] shadow-md shadow-[#FF4468]/30 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#0A0710] rounded-full flex items-center justify-center">
                <Flame className="w-4 h-4 text-[#FF4468] fill-current" />
              </div>
            </div>
            <div className="flex items-center">
              <span className="font-extrabold text-base tracking-tight text-white font-['Bricolage_Grotesque']">
                NEX<span className="text-[#FF4468]">LEADS</span>
              </span>
            </div>
          </Link>

          {/* Right Action: Book Call */}
          <div className="flex items-center gap-3">
            <a
              href={CALENDLY_URL}
              className="relative inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#FF4468] to-[#FFA23D] hover:opacity-95 text-[#0A0710] font-extrabold text-xs sm:text-sm px-5 sm:px-6 py-2 shadow-lg shadow-[#FF4468]/30 active:scale-95 transition-all duration-200 gap-2 font-['Bricolage_Grotesque']"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Call</span>
            </a>
          </div>

        </div>

      </div>
    </header>
  );
}
