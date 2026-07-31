import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldAlert, Terminal, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const location = useLocation();

  return (
    <div className="space-y-6 text-center py-4 sm:py-8">
      {/* Terminal Alert Icon */}
      <div className="flex justify-center">
        <div className="relative p-4 rounded-full bg-cg-red/10 border border-cg-red/30 shadow-[0_0_20px_rgba(255,77,77,0.2)]">
          <ShieldAlert className="w-12 h-12 text-cg-red animate-pulse" />
        </div>
      </div>

      {/* Terminal Error Code & Prompt */}
      <div className="space-y-2">
        <div className="text-xs uppercase tracking-widest text-cg-red font-mono font-bold flex items-center justify-center gap-1.5">
          <span>[ERR_404: PATH_NOT_FOUND]</span>
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide text-cg-text">
          Access Restricted / Page Not Found
        </h2>
      </div>

      {/* Terminal Log Block */}
      <div className="bg-cg-bg border border-cg-red/30 rounded-lg p-3 sm:p-4 text-left font-mono text-xs text-cg-dim space-y-1.5 max-w-lg mx-auto">
        <div className="text-cg-red/90 font-bold">$ sys_diag --verify-route</div>
        <div>
          Target Path: <span className="text-cg-text font-bold">{location.pathname}</span>
        </div>
        <div>Status Code: <span className="text-cg-red font-bold">404 NOT FOUND</span></div>
        <div className="text-[11px] text-cg-dim/80">
          Reason: The specified console path does not exist or has been relocated by security protocol.
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          to="/check"
          className="w-full sm:w-auto bg-cg-green text-cg-bg font-display font-bold uppercase tracking-wide rounded-lg px-6 py-3 text-xs flex items-center justify-center gap-2 shadow-[0_0_12px_rgba(57,255,136,0.25)] hover:bg-cg-green/90 transition-all"
        >
          <Terminal className="w-4 h-4" />
          <span>RETURN TO CHECK</span>
        </Link>

        <Link
          to="/generate"
          className="w-full sm:w-auto bg-cg-panel border border-cg-line text-cg-text hover:border-cg-green hover:text-cg-green font-display font-semibold uppercase tracking-wide rounded-lg px-6 py-3 text-xs flex items-center justify-center gap-2 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>GO TO GENERATOR</span>
        </Link>
      </div>
    </div>
  );
}
