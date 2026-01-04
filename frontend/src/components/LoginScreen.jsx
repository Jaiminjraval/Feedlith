import React, { useState } from 'react';
import { ShieldCheck, Database, Hexagon, User, Lock, RefreshCw, ChevronRight } from 'lucide-react';

export default function LoginScreen({ onLogin }) {
  const [role, setRole] = useState('student');
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      onLogin(role, id);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex overflow-hidden relative font-sans text-slate-100">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] animate-float"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/20 rounded-full blur-[120px] animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto flex items-center justify-center relative z-10 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-5xl items-center">
          
          {/* Left Side: Branding */}
          <div className="hidden lg:block space-y-8">
            <div className="inline-flex items-center space-x-3 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700 backdrop-blur-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-400 text-sm font-medium tracking-wide">Blockchain Mainnet Live</span>
            </div>
            
            <h1 className="text-6xl font-extrabold text-white leading-tight">
              Feedback that <br/>
              <span className="text-gradient">Cannot be Deleted.</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-md leading-relaxed">
              A decentralized student feedback system powered by Ethereum smart contracts. Anonymous. Immutable. Transparent.
            </p>

            <div className="flex space-x-4">
              <div className="flex flex-col p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                <ShieldCheck className="w-8 h-8 text-indigo-400 mb-2" />
                <span className="text-slate-200 font-bold">Anonymous</span>
                <span className="text-xs text-slate-500">Zero-Knowledge Proofs</span>
              </div>
              <div className="flex flex-col p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                <Database className="w-8 h-8 text-emerald-400 mb-2" />
                <span className="text-slate-200 font-bold">Immutable</span>
                <span className="text-xs text-slate-500">Permanent Ledger</span>
              </div>
            </div>
          </div>

          {/* Right Side: Login Form */}
          <div className="glass p-8 rounded-3xl w-full border border-slate-700/50 bg-[#1e293b]/60">
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg mb-4 transform rotate-3">
                <Hexagon className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
              <p className="text-slate-400">Sign in to access the DApp</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-900/50 rounded-xl border border-slate-700/50">
                {['student', 'admin'].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`py-2.5 rounded-lg text-sm font-bold capitalize transition-all duration-300 ${
                      role === r 
                        ? 'bg-slate-700 text-white shadow-lg' 
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <div className="relative group">
                  <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                  <input 
                    type="text" 
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    placeholder={role === 'student' ? "Enter Student ID" : "Enter Admin Key"}
                    required
                  />
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                  <input 
                    type="password" 
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-white font-bold text-lg shadow-lg hover:shadow-indigo-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <><span>Connect Wallet</span><ChevronRight className="w-5 h-5" /></>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

