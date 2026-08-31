import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Mail, Lock, ArrowRight, UserCheck, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loginWithDemo, loading, isAuthenticated, user } = useAuth();

  const [email, setEmail] = useState('admin@apexacquisition.com');
  const [password, setPassword] = useState('demo123');
  const [error, setError] = useState('');

  const handleManualLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/crm');
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  const handleDemo = async (role) => {
    setError('');
    try {
      await loginWithDemo(role);
      navigate('/crm');
    } catch (err) {
      setError('Demo login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-24 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-500 p-0.5 mx-auto shadow-lg shadow-emerald-500/20">
          <div className="w-full h-full bg-navy-950 rounded-[14px] flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-emerald-400" />
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Agency Portal Access</h1>
        <p className="text-xs text-slate-400">
          Sign in to access your coach acquisition pipeline, sequences, and analytics.
        </p>
      </div>

      {isAuthenticated ? (
        <div className="glass-panel p-6 rounded-3xl border border-emerald-500/40 text-center space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">Currently Logged In</h3>
            <p className="text-xs text-slate-300">
              {user?.name} (<span className="text-emerald-400 capitalize">{user?.role}</span>)
            </p>
          </div>
          <Link
            to="/crm"
            className="w-full py-3 rounded-xl bg-emerald-500 text-navy-950 font-bold text-xs flex items-center justify-center gap-2"
          >
            <span>Go to CRM Pipeline</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 shadow-2xl">
          
          {/* Quick Demo Login Preset Buttons */}
          <div className="space-y-2.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              ⚡ 1-Click Instant Demo Login:
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleDemo('admin')}
                disabled={loading}
                className="py-2.5 px-2 bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-slate-700/80 rounded-xl text-xs font-bold text-center transition-colors"
              >
                Founder (Admin)
              </button>
              <button
                type="button"
                onClick={() => handleDemo('closer')}
                disabled={loading}
                className="py-2.5 px-2 bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-700/80 rounded-xl text-xs font-bold text-center transition-colors"
              >
                Senior Closer
              </button>
              <button
                type="button"
                onClick={() => handleDemo('setter')}
                disabled={loading}
                className="py-2.5 px-2 bg-slate-900 hover:bg-slate-800 text-purple-300 border border-slate-700/80 rounded-xl text-xs font-bold text-center transition-colors"
              >
                SDR / Setter
              </button>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-800 w-full" />
            <span className="bg-slate-900 px-3 text-[10px] text-slate-500 uppercase font-bold absolute">
              Or Sign In With Password
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleManualLogin} className="space-y-4">
            {error && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300 text-center">
                {error}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-navy-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 disabled:opacity-50"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{loading ? 'Authenticating...' : 'Sign In to Agency OS'}</span>
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
