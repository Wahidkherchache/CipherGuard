import { useState } from 'react';
import { Eye, EyeOff, Check, X } from 'lucide-react';
import { analyzePassword } from '../utils/passwordStrength';

export default function PasswordChecker() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const analysis = analyzePassword(password);
  const { isEmpty, score, verdictText, verdictColor, barColor, checklist, crackTimeEstimate } = analysis;

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Terminal Prompt Label */}
      <div className="flex flex-wrap items-center justify-between gap-1">
        <label htmlFor="password-input" className="text-[11px] sm:text-xs uppercase tracking-widest font-mono flex items-center gap-1.5">
          <span className="text-cg-green font-bold">$</span>
          <span className="text-cg-dim">analyze_password</span>
        </label>
        {password.length > 0 && (
          <span className="text-[11px] sm:text-xs text-cg-dim font-mono">
            Length: <span className="text-cg-text font-bold">{password.length}</span>
          </span>
        )}
      </div>

      {/* Terminal Input Line */}
      <div className="bg-cg-bg border border-cg-line rounded-lg p-2.5 sm:p-3 flex items-center gap-2 sm:gap-3 transition-colors focus-within:border-cg-green-dim focus-within:ring-1 focus-within:ring-cg-green-dim/50">
        <span className="text-cg-green font-bold text-base sm:text-lg select-none">&gt;</span>
        <input
          id="password-input"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Type password to evaluate..."
          className="bg-transparent border-none outline-none tracking-wider text-cg-text font-mono w-full text-sm sm:text-base placeholder:text-cg-dim/60 placeholder:font-mono placeholder:text-xs sm:placeholder:text-sm"
          autoFocus
          spellCheck="false"
          autoComplete="off"
        />
        {password.length > 0 && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-cg-dim hover:text-cg-green transition-colors p-1 rounded"
            title={showPassword ? 'Hide password' : 'Show password'}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Strength Meter */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between text-xs tracking-wider">
          <span className="text-cg-dim font-mono uppercase text-[10px] sm:text-xs">STRENGTH METER</span>
          <span className={`font-bold font-display uppercase tracking-widest text-xs sm:text-sm ${isEmpty ? 'text-cg-dim' : verdictColor}`}>
            {isEmpty ? '—' : verdictText}
          </span>
        </div>

        {/* 5-Segment Strength Bar */}
        <div className="grid grid-cols-5 gap-1 sm:gap-1.5">
          {[1, 2, 3, 4, 5].map((segment) => {
            const isFilled = !isEmpty && segment <= score;
            return (
              <div
                key={segment}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${isFilled ? barColor : 'bg-cg-line'
                  }`}
              />
            );
          })}
        </div>
      </div>

      {/* Security Criteria Checklist */}
      <div className="pt-1 sm:pt-2">
        <h3 className="text-[10px] sm:text-xs uppercase tracking-widest text-cg-dim font-mono mb-2.5 sm:mb-3">
          SECURITY EVALUATION CRITERIA
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
          {checklist.map((item) => {
            const isPassed = !isEmpty && item.passed;
            return (
              <div
                key={item.id}
                className={`flex items-center gap-2 sm:gap-2.5 p-2 rounded border text-[11px] sm:text-xs font-mono transition-colors ${isEmpty
                    ? 'border-cg-line/40 bg-cg-bg/30 text-cg-dim'
                    : isPassed
                      ? 'border-cg-green-dim/40 bg-cg-green/5 text-cg-text'
                      : 'border-cg-line bg-cg-bg/50 text-cg-dim'
                  }`}
              >
                <div
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded flex items-center justify-center shrink-0 ${isEmpty
                      ? 'bg-cg-line/40 text-cg-dim'
                      : isPassed
                        ? 'bg-cg-green/20 text-cg-green'
                        : 'bg-cg-red/10 text-cg-red/70'
                    }`}
                >
                  {isEmpty ? (
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-cg-dim/40" />
                  ) : isPassed ? (
                    <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-3" />
                  ) : (
                    <X className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-3" />
                  )}
                </div>
                <span className={isPassed ? 'text-cg-text' : 'text-cg-dim'}>{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Crack Time Footer */}
      <div className="border-t border-dashed border-cg-line pt-3.5 sm:pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] sm:text-xs">
        <span className="text-cg-dim uppercase tracking-wider font-mono text-[10px] sm:text-xs">
          ESTIMATED CRACK TIME (BRUTE FORCE)
        </span>
        <span className="font-display font-bold text-xs sm:text-sm tracking-wide text-cg-amber sm:text-right">
          {crackTimeEstimate}
        </span>
      </div>
    </div>
  );
}
