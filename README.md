# 🇮🇳 SarthX 2.0 - Next-Gen Citizen Welfare & MyScheme Discovery Portal

[![React 18](https://img.shields.io/badge/React-18.3-61dafb.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646cff.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![Languages](https://img.shields.io/badge/Languages-13%20Indian%20Languages-orange.svg)](#-13-language-localization)
[![Bhashini AI](https://img.shields.io/badge/AI-Bhashini%20Voice%20Sahayak-green.svg)](#-bhashini-ai-voice-sahayak)
[![OCR](https://img.shields.io/badge/OCR-Tesseract.js%20WASM-purple.svg)](#-client-side-ocr-document-scanner)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**SarthX 2.0** is an enterprise-grade citizen welfare discovery platform built with **React**, **Tailwind CSS**, and **Vite**, inspired by [myScheme.gov.in](https://www.myscheme.gov.in) and Digital India. It bridges the digital divide for millions of rural and urban Indian citizens by leveraging voice recognition in vernacular languages, private on-device OCR for identity documents, subsidized loan calculations, and real-time eligibility matching.

---

## 🌟 Key Features

### 1. 🌐 13-Language Native Localization
- Instant reactive client-side translation across 13 scheduled Indian languages:
  - **English**, **हिंदी (Hindi)**, **বাংলা (Bengali)**, **मराठी (Marathi)**, **తెలుగు (Telugu)**, **தமிழ் (Tamil)**, **ગુજરાતી (Gujarati)**, **اردو (Urdu)**, **ಕನ್ನಡ (Kannada)**, **മലയാളം (Malayalam)**, **ਪੰਜਾਬੀ (Punjabi)**, **ଓଡ଼ିଆ (Odia)**, **অসমীয়া (Assamese)**.
- Full RTL support for Urdu (`dir="rtl"`).
- Persisted selection across sessions using `localStorage`.

### 2. 🗣️ Bhashini AI Voice Sahayak & Natural Language Search
- Voice-first conversational search powered by Digital India's **Bhashini API** pipeline architecture with native Web Speech API fallback.
- Advanced natural query parser with regex word boundaries understanding citizen demographics and needs without false positives (e.g. *"I am a small farmer needing loan subsidy"* or *"मैं एक छात्रा हूँ मुझे स्कॉलरशिप चाहिए"*).

### 3. 📑 52+ Verified Central & State Welfare Schemes
- Filter by category: Agriculture, Education, Banking & Loans, Health, Women & Children, Housing, Social Welfare, Skills & Employment, Business & MSME.
- Filter by jurisdiction: All-India Central schemes or State-specific (Uttar Pradesh, Maharashtra, Madhya Pradesh, Bihar, Tamil Nadu, Karnataka, Gujarat, West Bengal, Delhi, Rajasthan).
- **Dual Action**: In-depth official criteria modal with regional voice readout (TTS) + Direct 1-Click Apply link to official portals (`pmkisan.gov.in`, `jansamarth.in`, `pmaymis.gov.in`, `scholarships.gov.in`, etc.).

### 4. 🎯 7-Step AI Eligibility Matcher
- Multi-parameter eligibility engine evaluating age, gender, caste category, employment status, annual income, state, and land ownership.
- Generates a quantified compatibility score and categorized recommendations (**100% Eligible** vs. **Potentially Eligible**) with victory confetti animations.

### 5. 🧮 Government Loan & Subsidy EMI Calculator
- Interactive amortization calculator specialized for public welfare loan programs:
  - **PM Mudra Yojana** (Shishu, Kishore)
  - **PM SVANidhi** (Street Vendors with 7% government interest subvention)
  - **PM Awas Yojana (PMAY-U 2.0)** Home Loan (4% interest subvention)
  - **PM Kisan Credit Card (KCC)** (effective 4% interest rate upon timely repayment)
  - **PM Vidyalaxmi** (Education Loan with 3% interest subvention)
  - **Stand-Up India** (SC/ST & Women Entrepreneurs)
  - **Custom Loan Calculator**
- Dynamic visual split bar showing Principal vs. Government Interest Subsidy vs. Net Interest Payable, with direct redirection to the JanSamarth National Credit Portal.

### 6. 📸 Client-Side OCR Document Scanner
- 100% private, on-device document text extraction using **Tesseract.js v5 (WebAssembly)**.
- Zero server transmission: Aadhaar cards, PAN cards, income certificates, and marksheet images are parsed directly inside the user's browser.
- Automatically detects Name, Age/DOB, Gender, State, and Income brackets and allows 1-click export directly into the 7-Step AI Eligibility Matcher.

### 7. 📋 Smart Document Checklist Matrix
- Interactive cross-reference guide showing required documents (Aadhaar, Ration Card, Income Certificate, Land Records 7/12, Marksheets, UDID Disability Card) and matching schemes unlocked by each document.

---

## 🏗️ Architecture & Tech Stack

```
sarthX/
├── legacy-vanilla/       # Backup archive of original vanilla HTML/CSS/JS files
├── public/
│   └── favicon.svg       # SarthX Emblem Favicon
├── src/
│   ├── components/
│   │   ├── Navbar.jsx        # Dual-pill floating navigation with 13-language dropdown
│   │   ├── Footer.jsx        # GovTech footer with DPI links
│   │   ├── BhashiniModal.jsx # Unified Bhashini API configuration modal
│   │   ├── SchemeCard.jsx    # Reusable scheme card with Direct Apply & Details modal
│   │   └── SchemeModal.jsx   # In-depth criteria modal with regional voice readout (TTS)
│   ├── context/
│   │   ├── LanguageContext.jsx # 13-language i18n state and switcher
│   │   └── BhashiniContext.jsx # Voice recognition and API settings state
│   ├── data/
│   │   ├── schemesData.js    # 52+ Central and State welfare schemes
│   │   └── translations.js   # 13 languages dictionary
│   ├── pages/
│   │   ├── HomePage.jsx      # Hero section, Bhashini AI Sahayak, Sector categories
│   │   ├── SchemesPage.jsx   # Filterable schemes catalog (search, state, level, sector)
│   │   ├── MatcherPage.jsx   # 7-Step AI eligibility wizard with OCR prefill
│   │   ├── CalculatorPage.jsx# Welfare loan & subsidy EMI calculator
│   │   ├── OcrScannerPage.jsx# Client-side Tesseract.js document scanner
│   │   └── EligibilityPage.jsx # Document checklist matrix
│   ├── utils/
│   │   ├── bhashiniService.js# Bhashini ASR/TTS & NLP query parser
│   │   └── emiCalculator.js  # Amortization math & interest subvention savings
│   ├── App.jsx               # React Router routes and provider wrapping
│   ├── main.jsx              # Application entry point
│   └── index.css             # Tailwind directives and custom GovTech glassmorphism styles
├── index.html            # Vite HTML entry point
├── package.json          # Dependencies & build scripts
├── tailwind.config.js    # GovTech design system theme extension
└── vite.config.js        # Vite bundler configuration
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### 1. Installation
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000` (or the URL printed in the terminal).

### 3. Production Build
```bash
npm run build
```
The optimized production bundle is generated in the `dist/` directory.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 🌐 Deploy on GitHub Pages

The application is configured with `HashRouter` for zero-configuration deployment on static hosting platforms including GitHub Pages, Vercel, Netlify, or Cloudflare Pages.

1. Run `npm run build`.
2. Deploy the `dist/` directory directly to GitHub Pages:
   ```bash
   npx gh-pages -d dist
   ```

---

## 🔒 Privacy & Security

- **No Server Tracking**: All personal inputs, profile wizard data, and uploaded identity documents stay entirely in client browser memory.
- **On-Device OCR**: Images are parsed using WebAssembly client workers. No photos or document scans are transmitted to external servers.

---

## 🤝 Disclaimer

**SarthX** is an independent GovTech initiative built for public convenience, social security discovery, and digital inclusion. Official scheme applications and subsidies are processed through respective government portals (`.gov.in` / JanSamarth).
