/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cg-bg': '#060a08',
        'cg-panel': '#0d1410',
        'cg-line': '#1c2a22',
        'cg-green': '#39ff88',
        'cg-green-dim': '#1f7a44',
        'cg-amber': '#ffb020',
        'cg-red': '#ff4d4d',
        'cg-text': '#d6e8dc',
        'cg-dim': '#5c7268',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
