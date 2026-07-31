# 🛡️ CipherGuard

A local-first, terminal-styled password security tool — check how strong your password really is, or generate a cryptographically secure one. Nothing ever leaves your browser.

![Status](https://img.shields.io/badge/status-live-39ff88?style=flat-square)
![React](https://img.shields.io/badge/React-Vite-0d1410?style=flat-square&logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=flat-square&logo=tailwindcss)
![License](https://img.shields.io/badge/license-MIT-white?style=flat-square)

🔗 **Live Demo:** [wahidkherchache.github.io/CipherGuard](https://wahidkherchache.github.io/CipherGuard/)

---

## ✨ Features

### `> analyze_password` — Checker
- Real-time strength scoring across 9 security criteria (length tiers, character variety, common-password detection, repeated-pattern detection)
- Visual strength meter with WEAK / FAIR / GOOD / STRONG verdict
- Estimated brute-force crack time, calculated from character-pool size and password length

### `> generate_password` — Generator
- Adjustable length (8–32 characters)
- Toggle uppercase, numbers, symbols, and ambiguous-character exclusion (`l`, `1`, `I`, `O`, `0`)
- One-click copy to clipboard
- Powered by `crypto.getRandomValues()` — a cryptographically secure random source, not `Math.random()`

## 🔒 Privacy by Design

Every password you type or generate is processed **entirely client-side**. No network requests, no logging, no analytics tied to password input — the "LOCAL ONLY — NO NETWORK" badge in the header isn't just a design element, it reflects how the app actually works.

## 🎨 Design

A dark terminal/console aesthetic — phosphor green accents on near-black, a subtle grid-dot background, and prompt-style labels (`$ analyze_password`) that echo a real security console rather than a typical form-based UI.

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| Routing | React Router (`react-router-dom`) |
| Styling | Tailwind CSS |
| Security | Web Crypto API (`crypto.getRandomValues`) |
| Deployment | GitHub Pages |


## 📐 How the Scoring Works

- **Strength score:** each password is checked against 8 criteria (length thresholds, character-class variety, absence of repeated patterns, common-password list); the score maps to a WEAK–STRONG verdict.
- **Crack-time estimate:** computed as `poolSize ^ length` possible combinations, divided by an assumed brute-force guess rate — a rough, illustrative order-of-magnitude figure, not a cryptographic guarantee.

## 👤 Author

**Abdelouahid Kherchache**
GitHub: [@Wahidkherchache](https://github.com/Wahidkherchache)

Built while studying cybersecurity fundamentals through the Cisco Networking Academy's Junior Cybersecurity Analyst path.

## 📄 License

This project is licensed under the MIT License.

---

<p align="center">🟢 Your passwords never leave this page.</p>
