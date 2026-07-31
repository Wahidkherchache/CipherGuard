/**
 * Secure password generator using crypto.getRandomValues
 */

const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

const AMBIGUOUS = /[l1IO0]/g;

/**
 * Returns a cryptographically secure random integer in range [0, max - 1]
 */
function getRandomInt(max) {
  const randomBuffer = new Uint32Array(1);
  window.crypto.getRandomValues(randomBuffer);
  return randomBuffer[0] % max;
}

/**
 * Fisher-Yates shuffle array using crypto.getRandomValues
 */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = getRandomInt(i + 1);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Generates a random password based on specified options.
 */
export function generatePassword(options = {}) {
  const {
    length = 16,
    includeUppercase = true,
    includeNumbers = true,
    includeSymbols = true,
    excludeAmbiguous = false,
  } = options;

  let lowercaseSet = LOWERCASE;
  let uppercaseSet = UPPERCASE;
  let numbersSet = NUMBERS;
  let symbolsSet = SYMBOLS;

  if (excludeAmbiguous) {
    lowercaseSet = lowercaseSet.replace(AMBIGUOUS, '');
    uppercaseSet = uppercaseSet.replace(AMBIGUOUS, '');
    numbersSet = numbersSet.replace(AMBIGUOUS, '');
    symbolsSet = symbolsSet.replace(AMBIGUOUS, '');
  }

  // Always include lowercase as base pool to prevent empty pool
  let characterPool = lowercaseSet;
  const mandatoryChars = [];

  // Pick at least 1 lowercase
  mandatoryChars.push(lowercaseSet[getRandomInt(lowercaseSet.length)]);

  if (includeUppercase && uppercaseSet.length > 0) {
    characterPool += uppercaseSet;
    mandatoryChars.push(uppercaseSet[getRandomInt(uppercaseSet.length)]);
  }

  if (includeNumbers && numbersSet.length > 0) {
    characterPool += numbersSet;
    mandatoryChars.push(numbersSet[getRandomInt(numbersSet.length)]);
  }

  if (includeSymbols && symbolsSet.length > 0) {
    characterPool += symbolsSet;
    mandatoryChars.push(symbolsSet[getRandomInt(symbolsSet.length)]);
  }

  if (characterPool.length === 0) {
    characterPool = LOWERCASE;
  }

  const resultChars = [...mandatoryChars];

  // Fill remaining length from character pool
  const remainingCount = Math.max(0, length - resultChars.length);
  for (let i = 0; i < remainingCount; i++) {
    const randomIndex = getRandomInt(characterPool.length);
    resultChars.push(characterPool[randomIndex]);
  }

  // Shuffle to randomize mandatory character positions
  const shuffled = shuffleArray(resultChars);
  return shuffled.slice(0, length).join('');
}
