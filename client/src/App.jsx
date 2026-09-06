import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import AuditPage from './pages/AuditPage';
import BookingPage from './pages/BookingPage';
import CRMPage from './pages/CRMPage';
import SequencesPage from './pages/SequencesPage';
import OutreachPage from './pages/OutreachPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import AIChatWidget from './components/AIChatWidget';

export default function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0710] text-[#FAF6EF] selection:bg-[#FF4468] selection:text-[#0A0710]">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/who-we-are" element={<AboutPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/audit" element={<AuditPage />} />
          <Route path="/book" element={<BookingPage />} />
          <Route path="/crm" element={<CRMPage />} />
          <Route path="/sequences" element={<SequencesPage />} />
          <Route path="/outreach" element={<OutreachPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!isHomePage && <Footer />}
      <AIChatWidget />
    </div>
  );
}
