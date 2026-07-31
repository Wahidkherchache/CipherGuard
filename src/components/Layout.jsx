import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Shield, Terminal, Lock } from 'lucide-react';

export default function Layout() {
  const location = useLocation();

  // Check if current route is the default check view
  const isCheckActive = location.pathname === '/' || location.pathname === '/check';
  const isGenerateActive = location.pathname === '/generate';

  return (
    <div className="min-h-screen bg-cg-bg text-cg-text font-mono flex flex-col selection:bg-cg-green selection:text-cg-bg">
      {/* Top Banner / System Bar */}
      <header className="border-b border-cg-line bg-cg-panel/90 backdrop-blur sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3.5 flex items-center justify-between gap-2">
          {/* Brand Logo */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-cg-green animate-pulse" />
            <h1 className="font-display font-bold uppercase tracking-wide text-lg sm:text-xl flex items-center gap-0.5">
              <span className="text-cg-green-dim">[</span>
              <span className="text-cg-text">Cipher</span>
              <span className="text-cg-green">Guard</span>
              <span className="text-cg-green-dim">]</span>
            </h1>
          </div>

          {/* Security Badge - Responsive on mobile */}
          <div className="flex items-center gap-1.5 text-[10px] sm:text-xs border border-cg-green-dim rounded px-2 sm:px-2.5 py-0.5 sm:py-1 text-cg-green bg-cg-green/5 flex-shrink-0">
            <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cg-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-cg-green"></span>
            </span>
            <span className="tracking-wider uppercase font-mono whitespace-nowrap">
              <span className="hidden sm:inline">LOCAL ONLY — NO NETWORK</span>
              <span className="sm:hidden">LOCAL ONLY</span>
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-3 sm:px-4 py-6 sm:py-10">
        {/* Route Navigation Tabs */}
        <nav className="flex gap-1.5 sm:gap-2 p-1 sm:p-1.5 bg-cg-panel border border-cg-line rounded-lg mb-6 sm:mb-8" aria-label="Console Mode Navigation">
          <NavLink
            to="/check"
            className={`flex-1 text-center py-2 sm:py-2.5 px-3 sm:px-4 font-mono text-[11px] sm:text-xs uppercase tracking-widest transition-all rounded flex items-center justify-center gap-1.5 sm:gap-2 ${
              isCheckActive
                ? 'bg-cg-green text-cg-bg font-bold border border-cg-green shadow-[0_0_12px_rgba(57,255,136,0.25)]'
                : 'text-cg-dim border border-transparent hover:text-cg-text hover:bg-cg-bg/50'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>CHECK</span>
          </NavLink>

          <NavLink
            to="/generate"
            className={`flex-1 text-center py-2 sm:py-2.5 px-3 sm:px-4 font-mono text-[11px] sm:text-xs uppercase tracking-widest transition-all rounded flex items-center justify-center gap-2 ${
              isGenerateActive
                ? 'bg-cg-green text-cg-bg font-bold border border-cg-green shadow-[0_0_12px_rgba(57,255,136,0.25)]'
                : 'text-cg-dim border border-transparent hover:text-cg-text hover:bg-cg-bg/50'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>GENERATE</span>
          </NavLink>
        </nav>

        {/* Page Content Outlet */}
        <div className="bg-cg-panel border border-cg-line rounded-xl p-4 sm:p-6 md:p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle top panel accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cg-green/40 to-transparent" />
          <Outlet />
        </div>
      </main>

      {/* Terminal Footer */}
      <footer className="border-t border-cg-line/60 py-3 sm:py-4 text-center text-xs text-cg-dim">
        <div className="max-w-2xl mx-auto px-3 sm:px-4 flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-2 text-[10px] sm:text-[11px]">
          <span className="font-mono">SYS_VER: 2.0.4-SEC // ENCRYPTION: CLIENT_SIDE_ONLY</span>
          <span className="text-cg-green-dim">ZERO DATA RETENTION</span>
        </div>
      </footer>
    </div>
  );
}
