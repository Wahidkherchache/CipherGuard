/**
 * List of extremely common weak passwords to flag.
 */
const COMMON_PASSWORDS = [
  '123456',
  'password',
  '123456789',
  'qwerty',
  '12345678',
  '111111',
  '1234567',
  'sunshine',
  'qwertyuiop',
  'princess',
  'admin',
  'welcome',
  'iloveyou',
  'dragon',
  'master',
  'monkey',
  'password1',
  'letmein',
  'football',
  'abc123',
  '123123',
  '000000',
  'shadow',
  'superman',
];

/**
 * Heuristic check for repeated character sequences or common keyboard patterns.
 * e.g. "aaa", "1234", "abcd", "qwerty"
 */
function hasRepeatedPatterns(password) {
  if (!password || password.length < 3) return false;

  const lower = password.toLowerCase();

  // Check 3+ consecutive identical characters (e.g., "aaa", "111")
  if (/(.)\1\1/.test(lower)) return true;

  // Check sequential numbers or letters of length 4+ (e.g. "1234", "abcd", "dcba", "4321")
  for (let i = 0; i < lower.length - 3; i++) {
    const char1 = lower.charCodeAt(i);
    const char2 = lower.charCodeAt(i + 1);
    const char3 = lower.charCodeAt(i + 2);
    const char4 = lower.charCodeAt(i + 3);

    // Ascending sequence
    if (char2 === char1 + 1 && char3 === char2 + 1 && char4 === char3 + 1) {
      return true;
    }
    // Descending sequence
    if (char2 === char1 - 1 && char3 === char2 - 1 && char4 === char3 - 1) {
      return true;
    }
  }

  // Common keyboard patterns
  const keyboardPatterns = ['qwerty', 'asdfgh', 'zxcvbn', '12345', '54321'];
  for (const pattern of keyboardPatterns) {
    if (lower.includes(pattern)) return true;
  }

  return false;
}

/**
 * Format crack time in seconds to human readable text
 */
function formatCrackTime(seconds) {
  if (!seconds || seconds <= 0) return '—';
  if (seconds < 0.001) return 'INSTANT';
  if (seconds < 1) return '< 1 SECOND';
  if (seconds < 60) return `${Math.floor(seconds)} SECONDS`;
  
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} MINUTE${minutes > 1 ? 'S' : ''}`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} HOUR${hours > 1 ? 'S' : ''}`;

  const days = Math.floor(hours / 24);
  if (days < 365) return `${days} DAY${days > 1 ? 'S' : ''}`;

  const years = seconds / (365.25 * 86400);
  if (years < 1000) return `${Math.floor(years)} YEAR${Math.floor(years) > 1 ? 'S' : ''}`;
  if (years < 1e6) return `${(years / 1e3).toFixed(1)} THOUSAND YEARS`;
  if (years < 1e9) return `${(years / 1e6).toFixed(1)} MILLION YEARS`;
  if (years < 1e12) return `${(years / 1e9).toFixed(1)} BILLION YEARS`;
  return `${(years / 1e12).toFixed(1)} TRILLION YEARS`;
}

/**
 * Evaluates password strength and returns score, verdict, checklist items, and crack time.
 */
export function analyzePassword(password) {
  if (!password) {
    return {
      isEmpty: true,
      score: 0,
      verdict: null,
      verdictText: '—',
      verdictColor: 'text-cg-dim',
      barColor: 'bg-cg-line',
      checklist: [
        { id: 'len8', label: '8+ characters', passed: false },
        { id: 'len12', label: '12+ characters', passed: false },
        { id: 'len16', label: '16+ characters', passed: false },
        { id: 'lowercase', label: 'Lowercase letter (a-z)', passed: false },
        { id: 'uppercase', label: 'Uppercase letter (A-Z)', passed: false },
        { id: 'number', label: 'Number (0-9)', passed: false },
        { id: 'symbol', label: 'Special symbol (!@#...)', passed: false },
        { id: 'not_common', label: 'Not a common password', passed: false },
        { id: 'no_repeat', label: 'No repeated patterns', passed: false },
      ],
      crackTimeEstimate: '—',
    };
  }

  const length = password.length;
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^a-zA-Z0-9]/.test(password);
  const isCommon = COMMON_PASSWORDS.includes(password.toLowerCase().trim());
  const hasRepeats = hasRepeatedPatterns(password);

  const checklist = [
    { id: 'len8', label: '8+ characters', passed: length >= 8 },
    { id: 'len12', label: '12+ characters', passed: length >= 12 },
    { id: 'len16', label: '16+ characters', passed: length >= 16 },
    { id: 'lowercase', label: 'Lowercase letter (a-z)', passed: hasLower },
    { id: 'uppercase', label: 'Uppercase letter (A-Z)', passed: hasUpper },
    { id: 'number', label: 'Number (0-9)', passed: hasNumber },
    { id: 'symbol', label: 'Special symbol (!@#...)', passed: hasSymbol },
    { id: 'not_common', label: 'Not a common password', passed: !isCommon },
    { id: 'no_repeat', label: 'No repeated patterns', passed: !hasRepeats },
  ];

  // Character set pool size calculation for brute-force estimation
  let poolSize = 0;
  if (hasLower) poolSize += 26;
  if (hasUpper) poolSize += 26;
  if (hasNumber) poolSize += 10;
  if (hasSymbol) poolSize += 33;
  if (poolSize === 0) poolSize = 10; // fallback

  // Guesses needed = (poolSize ^ length) / 2
  // Assumed offline attack rate: 10 billion (1e10) guesses/sec
  const totalCombinations = Math.pow(poolSize, length);
  const secondsToCrack = (totalCombinations / 2) / 1e10;
  const crackTimeEstimate = formatCrackTime(secondsToCrack);

  // Score calculation (0 to 5)
  let rawScore = 0;

  if (length >= 8) rawScore += 1;
  if (length >= 12) rawScore += 1;
  if (length >= 16) rawScore += 1;

  let charClassCount = 0;
  if (hasLower) charClassCount++;
  if (hasUpper) charClassCount++;
  if (hasNumber) charClassCount++;
  if (hasSymbol) charClassCount++;

  if (charClassCount >= 2) rawScore += 0.5;
  if (charClassCount >= 3) rawScore += 0.5;
  if (charClassCount === 4) rawScore += 1;

  if (hasRepeats) rawScore -= 1;
  if (isCommon) rawScore = 0; // Immediate failure for common passwords

  // Clamp score between 0 and 5
  const score = Math.max(0, Math.min(5, Math.floor(rawScore)));

  // Map score to verdict labels & colors
  let verdictText = 'WEAK';
  let verdictColor = 'text-cg-red';
  let barColor = 'bg-cg-red shadow-glow-red';

  if (score <= 1) {
    verdictText = 'WEAK';
    verdictColor = 'text-cg-red';
    barColor = 'bg-cg-red shadow-glow-red';
  } else if (score === 2 || score === 3) {
    verdictText = 'FAIR';
    verdictColor = 'text-cg-amber';
    barColor = 'bg-cg-amber shadow-glow-amber';
  } else if (score === 4) {
    verdictText = 'GOOD';
    verdictColor = 'text-cg-green';
    barColor = 'bg-cg-green shadow-glow-green';
  } else if (score === 5) {
    verdictText = 'STRONG';
    verdictColor = 'text-cg-green';
    barColor = 'bg-cg-green shadow-glow-green';
  }

  return {
    isEmpty: false,
    score,
    verdictText,
    verdictColor,
    barColor,
    checklist,
    crackTimeEstimate,
  };
}
