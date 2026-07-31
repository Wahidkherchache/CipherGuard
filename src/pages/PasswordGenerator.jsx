import { useState, useEffect, useCallback } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';
import { generatePassword } from '../utils/passwordGenerator';

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);

  const [generatedPassword, setGeneratedPassword] = useState('');
  const [copied, setCopied] = useState(false);

  // Re-generate password when settings change
  const handleGenerate = useCallback(() => {
    const newPassword = generatePassword({
      length,
      includeUppercase,
      includeNumbers,
      includeSymbols,
      excludeAmbiguous,
    });
    setGeneratedPassword(newPassword);
    setCopied(false);
  }, [length, includeUppercase, includeNumbers, includeSymbols, excludeAmbiguous]);

  // Initial generation on mount and whenever options change
  useEffect(() => {
    handleGenerate();
  }, [handleGenerate]);

  // Clipboard copy action
  async function handleCopy() {
    if (!generatedPassword) return;
    try {
      await navigator.clipboard.writeText(generatedPassword);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Failed to copy password: ', err);
    }
  }

  return (
    <div className="space-y-6">
      {/* Terminal Prompt Label */}
      <div className="flex items-center justify-between">
        <label className="text-xs uppercase tracking-widest font-mono flex items-center gap-1.5">
          <span className="text-cg-green font-bold">$</span>
          <span className="text-cg-dim">generate_password</span>
        </label>
        <span className="text-xs text-cg-dim font-mono">
          Pool: <span className="text-cg-text font-bold">{length} chars</span>
        </span>
      </div>

      {/* Terminal Output Line */}
      <div className="bg-cg-bg border border-cg-green-dim rounded-lg p-3.5 flex items-center justify-between gap-3 min-h-[56px]">
        <div className="font-mono text-cg-green text-base sm:text-lg tracking-wider break-all select-all font-semibold">
          {generatedPassword}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className={`flex-shrink-0 text-xs border rounded px-3 py-1.5 font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all ${copied
              ? 'border-cg-green bg-cg-green/10 text-cg-green font-bold'
              : 'border-cg-line text-cg-dim hover:text-cg-green hover:border-cg-green bg-cg-panel/50'
            }`}
          title="Copy password to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-cg-green" />
              <span>COPIED!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>COPY</span>
            </>
          )}
        </button>
      </div>

      {/* Options List */}
      <div className="space-y-5 bg-cg-bg/60 border border-cg-line/80 rounded-lg p-4 sm:p-5">
        {/* Length Slider Option */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-cg-text uppercase tracking-wider">Length — <span className="text-cg-green font-bold text-sm">{length}</span></span>
            <span className="text-cg-dim">8 to 32</span>
          </div>
          <input
            type="range"
            min={8}
            max={32}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full h-2 bg-cg-line rounded-lg appearance-none cursor-pointer accent-cg-green focus:outline-none"
          />
        </div>

        <div className="border-t border-cg-line/50 pt-4 space-y-3.5">
          {/* Option: Uppercase */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-cg-text">Include Uppercase (A-Z)</span>
            <button
              type="button"
              role="switch"
              aria-checked={includeUppercase}
              onClick={() => setIncludeUppercase(!includeUppercase)}
              className={`w-11 h-6 rounded-full p-0.5 transition-colors focus:outline-none ${includeUppercase ? 'bg-cg-green-dim' : 'bg-cg-line'
                }`}
            >
              <div
                className={`w-5 h-5 rounded-full transition-transform ${includeUppercase
                    ? 'translate-x-5 bg-cg-green shadow-[0_0_6px_rgba(57,255,136,0.5)]'
                    : 'translate-x-0 bg-cg-dim'
                  }`}
              />
            </button>
          </div>

          {/* Option: Numbers */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-cg-text">Include Numbers (0-9)</span>
            <button
              type="button"
              role="switch"
              aria-checked={includeNumbers}
              onClick={() => setIncludeNumbers(!includeNumbers)}
              className={`w-11 h-6 rounded-full p-0.5 transition-colors focus:outline-none ${includeNumbers ? 'bg-cg-green-dim' : 'bg-cg-line'
                }`}
            >
              <div
                className={`w-5 h-5 rounded-full transition-transform ${includeNumbers
                    ? 'translate-x-5 bg-cg-green shadow-[0_0_6px_rgba(57,255,136,0.5)]'
                    : 'translate-x-0 bg-cg-dim'
                  }`}
              />
            </button>
          </div>

          {/* Option: Symbols */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-cg-text">Include Symbols (!@#$)</span>
            <button
              type="button"
              role="switch"
              aria-checked={includeSymbols}
              onClick={() => setIncludeSymbols(!includeSymbols)}
              className={`w-11 h-6 rounded-full p-0.5 transition-colors focus:outline-none ${includeSymbols ? 'bg-cg-green-dim' : 'bg-cg-line'
                }`}
            >
              <div
                className={`w-5 h-5 rounded-full transition-transform ${includeSymbols
                    ? 'translate-x-5 bg-cg-green shadow-[0_0_6px_rgba(57,255,136,0.5)]'
                    : 'translate-x-0 bg-cg-dim'
                  }`}
              />
            </button>
          </div>

          {/* Option: Exclude Ambiguous */}
          <div className="flex items-center justify-between pt-1 border-t border-cg-line/30">
            <div className="flex flex-col">
              <span className="text-xs font-mono text-cg-text">Exclude Ambiguous Characters</span>
              <span className="text-[10px] text-cg-dim font-mono">(l, 1, I, O, 0)</span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={excludeAmbiguous}
              onClick={() => setExcludeAmbiguous(!excludeAmbiguous)}
              className={`w-11 h-6 rounded-full p-0.5 transition-colors focus:outline-none ${excludeAmbiguous ? 'bg-cg-green-dim' : 'bg-cg-line'
                }`}
            >
              <div
                className={`w-5 h-5 rounded-full transition-transform ${excludeAmbiguous
                    ? 'translate-x-5 bg-cg-green shadow-[0_0_6px_rgba(57,255,136,0.5)]'
                    : 'translate-x-0 bg-cg-dim'
                  }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Regenerate Button */}
      <button
        type="button"
        onClick={handleGenerate}
        className="w-full bg-cg-green text-cg-bg font-display font-bold uppercase tracking-wide rounded-lg py-3.5 hover:bg-cg-green/90 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-[0_0_12px_rgba(57,255,136,0.3)] cursor-pointer"
      >
        <RefreshCw className="w-4 h-4" />
        <span>REGENERATE</span>
      </button>
    </div>
  );
}
