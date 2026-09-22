import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Mic, 
  MicOff, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Calculator, 
  ScanLine, 
  GraduationCap, 
  Tractor, 
  UserCheck, 
  Landmark, 
  HeartPulse, 
  Home as HomeIcon, 
  Briefcase, 
  ShieldAlert, 
  TrendingUp, 
  Layers,
  Award,
  Users,
  Compass,
  Zap,
  Check
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useBhashini } from '../context/BhashiniContext';
import { useAuth } from '../context/AuthContext';
import { SCHEMES_DATABASE } from '../data/schemesData';
import SchemeCard from '../components/SchemeCard';
import SchemeModal from '../components/SchemeModal';
import VoiceVisualizer from '../components/VoiceVisualizer';

export default function HomePage() {
  const { t, currentLang } = useLanguage();
  const { user, isAuthenticated, measurements } = useAuth();
  const { 
    startVoice, 
    stopVoice, 
    isListening, 
    parseQuery, 
    voiceStatus, 
    voiceError, 
    clearVoiceError, 
    interimVoiceText 
  } = useBhashini();
  const navigate = useNavigate();

  const [heroSearch, setHeroSearch] = useState('');
  const [listeningTarget, setListeningTarget] = useState(null); // 'hero' | null
  const [micNotice, setMicNotice] = useState(null);
  const [activeModalScheme, setActiveModalScheme] = useState(null);

  const sectorVisualCards = [
    {
      id: 'agriculture',
      title: t('cat_agriculture', 'Agriculture & Kisan'),
      desc: t('cat_agriculture_desc', 'PM-KISAN, Solar pumps, crop insurance, and soil welfare'),
      image: './images/sector-agriculture.jpg',
      count: 9,
      icon: Tractor,
      badgeColor: 'from-emerald-600 to-teal-700'
    },
    {
      id: 'students',
      title: t('cat_students', 'Education & Scholarships'),
      desc: t('cat_students_desc', 'Central sector scholarships, research fellowships, and laptop aid'),
      image: './images/sector-education.jpg',
      count: 10,
      icon: GraduationCap,
      badgeColor: 'from-blue-600 to-indigo-700'
    },
    {
      id: 'women',
      title: t('cat_women', 'Women Empowerment'),
      desc: t('cat_women_desc', 'Lakhpati Didi, Ladli Behna, Matru Vandana, and SHG credit'),
      image: './images/sector-women.jpg',
      count: 9,
      icon: UserCheck,
      badgeColor: 'from-rose-600 to-pink-700'
    },
    {
      id: 'business',
      title: t('cat_business', 'MSME & Entrepreneurship'),
      desc: t('cat_business_desc', 'PMEGP, Mudra loans, Stand-Up India, and capital subsidies'),
      image: './images/sector-business.jpg',
      count: 7,
      icon: Briefcase,
      badgeColor: 'from-amber-600 to-orange-700'
    },
    {
      id: 'health',
      title: t('cat_health', 'Healthcare & Wellness'),
      desc: t('cat_health_desc', 'Ayushman Bharat PM-JAY, free medical cover up to ₹5 Lakh'),
      image: './images/sector-healthcare.jpg',
      count: 6,
      icon: HeartPulse,
      badgeColor: 'from-red-600 to-rose-700'
    },
    {
      id: 'housing',
      title: t('cat_housing', 'Housing & Shelter'),
      desc: t('cat_housing_desc', 'PM Awas Yojana (PMAY-G & PMAY-U) pucca house subsidies'),
      image: './images/sector-housing.jpg',
      count: 5,
      icon: HomeIcon,
      badgeColor: 'from-teal-600 to-cyan-700'
    }
  ];

  const handleHeroSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (heroSearch.trim()) {
      navigate(`/schemes?search=${encodeURIComponent(heroSearch.trim())}&ai=1`);
    }
  };

  const handleHeroMicToggle = () => {
    setMicNotice(null);
    if (listeningTarget === 'hero' && isListening) {
      stopVoice();
      setListeningTarget(null);
    } else {
      stopVoice();
      setListeningTarget('hero');
      clearVoiceError();
      startVoice({
        onStart: () => {
          setListeningTarget('hero');
          setMicNotice(null);
        },
        onResult: (res) => {
          const text = res.interimText || res.finalText;
          if (text) setHeroSearch(text);
          if (res.isFinal && res.finalText && res.finalText.trim()) {
            setListeningTarget(null);
          }
        },
        onError: (err) => {
          setListeningTarget(null);
          setMicNotice(typeof err === 'string' ? err : 'Microphone unavailable');
        },
        onEnd: () => {
          setListeningTarget(null);
        }
      });
    }
  };

  // =========================================================================
  // ESSENTIAL CITIZEN VIEW: Rendered ONLY when citizen is Logged In
  // (Removes marketing clutter and focuses strictly on essential tools & matched schemes)
  // =========================================================================
  if (isAuthenticated && user) {
    const recommendedSchemes = SCHEMES_DATABASE.slice(0, 4);

    return (
      <div className="relative min-h-screen">
        {/* SVG Turbulence & Displacement Filter for Realistic Flag Wave */}
        <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
          <defs>
            <filter id="flag-wave-filter-auth" x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence type="fractalNoise" baseFrequency="0.015 0.025" numOctaves="3" result="noise" seed="3">
                <animate 
                  attributeName="baseFrequency" 
                  dur="9s" 
                  values="0.012 0.02; 0.02 0.035; 0.015 0.025; 0.012 0.02" 
                  repeatCount="indefinite" 
                />
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="16" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>
        {/* HERO SECTION: Vivid Background with Essential Citizen Hub */}
        <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[50vh] flex items-center">
          {/* Background Panoramic Flag Layer with Animated Wave */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
            <motion.img 
              src="./images/hero-bg.jpg" 
              alt="Indian National Flag" 
              animate={{
                scale: [1.02, 1.05, 1.03, 1.02],
                x: [0, -6, 4, 0],
                y: [0, -3, 2, 0]
              }}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              style={{ filter: 'url(#flag-wave-filter-auth)' }}
              className="w-full h-full object-cover object-center scale-105 will-change-transform"
              onError={(e) => { e.target.src = '/images/hero-bg.jpg'; }}
            />
            {/* Dynamic Silk Fabric Wave Sheen */}
            <div className="absolute inset-0 flag-sheen-wave opacity-30" />

            {/* Revolving Ashoka Chakra */}
            <div className="absolute top-1/2 -right-16 -translate-y-1/2 w-80 h-80 sm:w-96 sm:h-96 pointer-events-none opacity-[0.06] text-blue-900 select-none">
              <img 
                src="./images/ashoka-chakra.svg" 
                alt="" 
                aria-hidden="true"
                className="w-full h-full animate-spin-slow"
                onError={(e) => { e.target.src = '/images/ashoka-chakra.svg'; }}
              />
            </div>

            {/* Scrim for Readability */}
            <div className="absolute inset-0 bg-white/65 sm:bg-white/60 backdrop-blur-[0.5px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-[#f8fafc]" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto w-full">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-10 border border-slate-200/90 shadow-xl max-w-4xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 mb-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Active Citizen Session</span>
                  </div>
                  <h1 className="text-xl sm:text-4xl font-extrabold text-slate-900">
                    Welcome back, {user.name}!
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 font-mono">
                    Citizen ID: <strong className="text-emerald-700">{user.citizenId || 'Verified Citizen'}</strong>
                  </p>
                </div>

                <div className="flex flex-col sm:items-end gap-2 w-full sm:w-auto">
                  <div className="text-xs text-slate-500 font-semibold">
                    Profile Readiness: <strong className="text-emerald-700">{measurements?.completeness || 85}%</strong>
                  </div>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
                  >
                    <span>Open Citizen Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* SarthX AI Scheme Search Command Bar for Citizen */}
              <div className="pt-6">
                <form 
                  onSubmit={handleHeroSearchSubmit}
                  className={`relative flex items-center bg-slate-50 hover:bg-white rounded-2xl p-1.5 sm:p-2 border transition-all duration-300 ${
                    isListening && listeningTarget === 'hero'
                      ? 'border-emerald-500 ring-4 ring-emerald-500/20 shadow-2xl shadow-emerald-500/20'
                      : 'border-slate-200 shadow-xs focus-within:border-emerald-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-500/20'
                  }`}
                >
                  <div className="pl-2.5 sm:pl-3 text-slate-400 shrink-0">
                    <Search className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${isListening && listeningTarget === 'hero' ? 'text-emerald-600' : 'text-slate-400'}`} />
                  </div>
                  
                  <input
                    type="text"
                    value={heroSearch}
                    onChange={(e) => setHeroSearch(e.target.value)}
                    placeholder={
                      listeningTarget === 'hero' && isListening
                        ? t('hero_listening', 'Listening... Speak in your language')
                        : t('hero_search_placeholder', 'Search schemes with SarthX AI (e.g. Kisan, Mudra, Scholarship, Awas)...')
                    }
                    className="min-w-0 flex-1 bg-transparent px-2.5 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none"
                  />

                  <div className="flex items-center gap-1.5 sm:gap-2 pr-0.5 sm:pr-1 shrink-0">
                    {isListening && listeningTarget === 'hero' && (
                      <VoiceVisualizer isListening={true} height={20} barCount={5} />
                    )}

                    <div className="relative flex items-center justify-center">
                      <button
                        type="button"
                        onClick={handleHeroMicToggle}
                        className={`p-2 sm:p-2.5 rounded-xl border transition-all cursor-pointer ${
                          isListening && listeningTarget === 'hero'
                            ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg'
                            : 'bg-white hover:bg-emerald-50 border-slate-200 text-slate-600 hover:text-emerald-700'
                        }`}
                        title={t('hero_mic_tooltip', 'Click to speak in your language')}
                      >
                        {isListening && listeningTarget === 'hero' ? <MicOff className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Mic className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                      </button>
                    </div>

                    <button
                      type="submit"
                      className="inline-flex items-center gap-1 sm:gap-1.5 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-700/20 transition-all shrink-0 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>{t('btn_search', 'Search')}</span>
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </form>
              </div>

              {/* 3 Essential Tools Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <button
                  onClick={() => navigate('/schemes')}
                  className="p-4 rounded-2xl bg-slate-50 hover:bg-emerald-50/60 border border-slate-200 hover:border-emerald-300 text-left transition-all group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700">Browse 52+ Schemes</h3>
                  <p className="text-[11px] text-slate-500 mt-1">Direct state & central welfare benefits filterable by criteria.</p>
                </button>

                <button
                  onClick={() => navigate('/calculator')}
                  className="p-4 rounded-2xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200 hover:border-blue-300 text-left transition-all group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700">EMI & Loan Calculator</h3>
                  <p className="text-[11px] text-slate-500 mt-1">Calculate interest subventions, subsidies and monthly EMIs.</p>
                </button>

                <button
                  onClick={() => navigate('/dashboard')}
                  className="p-4 rounded-2xl bg-slate-50 hover:bg-amber-50/60 border border-slate-200 hover:border-amber-300 text-left transition-all group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-700">Citizen Dashboard</h3>
                  <p className="text-[11px] text-slate-500 mt-1">Manage documents, verify Aadhaar/PAN and track applications.</p>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ESSENTIAL SECTION 2: Top Recommended Schemes for Citizen */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Personalized Matches
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                Top Schemes Recommended for Your Profile
              </h2>
            </div>
            <button
              onClick={() => navigate('/schemes')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
            >
              <span>View All 52+ Schemes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedSchemes.map((scheme) => (
              <SchemeCard
                key={scheme.id}
                scheme={scheme}
                onSelectScheme={(s) => setActiveModalScheme(s)}
              />
            ))}
          </div>
        </section>

        {/* Details Modal */}
        {activeModalScheme && (
          <SchemeModal
            scheme={activeModalScheme}
            onClose={() => setActiveModalScheme(null)}
          />
        )}
      </div>
    );
  }

  // =========================================================================
  // PUBLIC VISITOR VIEW (When Not Logged In)
  // =========================================================================
  return (
    <div className="relative min-h-screen">
      {/* ------------------------------------------------------------- */}
      {/* SVG Turbulence & Displacement Filter for Realistic Flag Wave */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="flag-wave-filter" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.015 0.025" numOctaves="3" result="noise" seed="3">
              <animate 
                attributeName="baseFrequency" 
                dur="9s" 
                values="0.012 0.02; 0.02 0.035; 0.015 0.025; 0.012 0.02" 
                repeatCount="indefinite" 
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="16" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* HERO SECTION: Simple, Minimal & Spacious                      */}
      {/* ------------------------------------------------------------- */}
      <section className="relative min-h-[78vh] flex items-center justify-center overflow-hidden pt-12 pb-16 px-4 sm:px-6 lg:px-8 text-center">
        {/* Background Panoramic Flag Layer with Animated Wave & Ambient Lighting */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
          {/* Animated Flag Image Layer */}
          <motion.img 
            src="./images/hero-bg.jpg" 
            alt="Indian National Flag" 
            animate={{
              scale: [1.02, 1.05, 1.03, 1.02],
              x: [0, -6, 4, 0],
              y: [0, -3, 2, 0]
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            style={{ filter: 'url(#flag-wave-filter)' }}
            className="w-full h-full object-cover object-center scale-105 will-change-transform"
            onError={(e) => { e.target.src = '/images/hero-bg.jpg'; }}
          />

          {/* Dynamic Silk Fabric Wave Sheen */}
          <div className="absolute inset-0 flag-sheen-wave opacity-35" />

          {/* Slowly Revolving Ashoka Chakra Watermark */}
          <div className="absolute top-1/2 -right-16 -translate-y-1/2 w-80 h-80 sm:w-96 sm:h-96 pointer-events-none opacity-[0.07] text-blue-900 select-none">
            <img 
              src="./images/ashoka-chakra.svg" 
              alt="" 
              aria-hidden="true"
              className="w-full h-full animate-spin-slow"
              onError={(e) => { e.target.src = '/images/ashoka-chakra.svg'; }}
            />
          </div>

          {/* Subtle Tricolor Ambient Glows */}
          <div className="absolute -top-10 left-1/4 w-96 h-48 bg-orange-500/10 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute -bottom-10 right-1/4 w-96 h-48 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />

          {/* Balanced Translucent Scrim for Text Readability */}
          <div className="absolute inset-0 bg-white/65 sm:bg-white/60 backdrop-blur-[0.5px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-[#f8fafc]" />
        </div>

        {/* Minimal Centered Hero Content */}
        <div className="relative z-10 max-w-3xl mx-auto w-full space-y-6">
          
          {/* Official Badge Pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 shadow-2xs"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-700">
              {t('hero_badge', 'Official Welfare Scheme Portal')}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-emerald-700 font-semibold">
              52+ Schemes
            </span>
          </motion.div>

          {/* Refined Headline with Dual-Tone Gradient */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-4xl lg:text-[2.75rem] font-black text-slate-900 tracking-tight leading-[1.2] max-w-3xl mx-auto"
          >
            {currentLang === 'en' || !currentLang ? (
              <>
                <span>Empowering Every Citizen with </span>
                <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent block sm:inline mt-1 sm:mt-0">
                  Direct Government Benefits
                </span>
              </>
            ) : (
              <span className="bg-gradient-to-r from-slate-900 via-emerald-800 to-slate-900 bg-clip-text text-transparent">
                {t('hero_title', 'Empowering Every Citizen with Direct Government Benefits')}
              </span>
            )}
          </motion.h1>

          {/* Minimal 1-Line Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed"
          >
            {t('hero_subtitle', 'Discover welfare programs, subsidies, and credit support across India in your regional language.')}
          </motion.p>

          {/* Focused, Clean Search Command Bar with Dynamic Audio Waves */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="pt-2 max-w-2xl mx-auto"
          >
            <form 
              onSubmit={handleHeroSearchSubmit}
              className={`relative flex items-center bg-white rounded-2xl p-1.5 sm:p-2 border transition-all duration-300 ${
                isListening && listeningTarget === 'hero'
                  ? 'border-emerald-500 ring-4 ring-emerald-500/20 shadow-2xl shadow-emerald-500/20'
                  : 'border-slate-200 shadow-xl shadow-slate-200/50 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20'
              }`}
            >
              <div className="pl-2.5 sm:pl-3 text-slate-400 shrink-0">
                <Search className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${isListening && listeningTarget === 'hero' ? 'text-emerald-600' : 'text-slate-400'}`} />
              </div>
              
              <input
                type="text"
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                placeholder={
                  listeningTarget === 'hero' && isListening
                    ? t('hero_listening', 'Listening... Speak in your language')
                    : t('hero_search_placeholder', 'Search schemes with SarthX AI (e.g. Kisan, Mudra, Scholarship, Awas)...')
                }
                className="min-w-0 flex-1 bg-transparent px-2.5 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none"
              />

              {/* Inline Audio Wave Equalizer inside Search Bar */}
              <div className="flex items-center gap-1.5 sm:gap-2 pr-0.5 sm:pr-1 shrink-0">
                {isListening && listeningTarget === 'hero' && (
                  <VoiceVisualizer isListening={true} height={20} barCount={5} />
                )}

                {/* Regional Mic Button with Active Radar Pulse Animation */}
                <div className="relative flex items-center justify-center">
                  {isListening && listeningTarget === 'hero' && (
                    <>
                      <span className="absolute -inset-1 rounded-xl bg-emerald-500/50 animate-ping pointer-events-none" />
                      <span className="absolute -inset-2.5 rounded-2xl bg-emerald-500/25 animate-pulse pointer-events-none" />
                    </>
                  )}
                  <button
                    type="button"
                    onClick={handleHeroMicToggle}
                    className={`relative z-10 p-2 sm:p-2.5 rounded-xl border transition-all cursor-pointer ${
                      isListening && listeningTarget === 'hero'
                        ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-600/40 scale-105 animate-bounce'
                        : 'bg-slate-100 hover:bg-emerald-50 border-slate-200 text-slate-600 hover:text-emerald-700'
                    }`}
                    title={
                      isListening && listeningTarget === 'hero'
                        ? 'Microphone active • Click to stop listening'
                        : t('hero_mic_tooltip', 'Click to speak in your language')
                    }
                  >
                    {isListening && listeningTarget === 'hero' ? <MicOff className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Mic className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                  </button>
                </div>

                {/* Search Button */}
                <button
                  type="submit"
                  className="inline-flex items-center gap-1 sm:gap-1.5 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-700/20 transition-all shrink-0 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>{t('btn_search', 'Search')}</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </form>

            {/* SarthX AI Powered Search Badge */}
            <div className="flex items-center justify-center gap-1.5 pt-2 text-[11px] text-slate-500 font-medium">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              <span>Smart Semantic Scheme Search powered by <strong className="text-slate-700">SarthX AI</strong></span>
            </div>

            {/* Active Listening Animated Live Banner */}
            <AnimatePresence>
              {isListening && listeningTarget === 'hero' && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.95 }}
                  className="mt-3 inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-slate-900/95 backdrop-blur-md text-white shadow-xl shadow-slate-900/20 border border-slate-700 text-xs"
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
                  </span>
                  <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <span>Listening</span>
                    <span className="inline-flex items-center gap-0.5">
                      <span className="w-1 h-3 bg-emerald-400 rounded-full animate-pulse" />
                      <span className="w-1 h-4 bg-emerald-300 rounded-full animate-pulse delay-75" />
                      <span className="w-1 h-2 bg-emerald-400 rounded-full animate-pulse delay-150" />
                    </span>
                  </span>
                  <span className="text-slate-300 text-[11px] truncate max-w-[280px]">
                    {heroSearch ? `"${heroSearch}"` : 'Speak now in Hindi, English, or your regional language...'}
                  </span>
                  <button
                    type="button"
                    onClick={handleHeroMicToggle}
                    className="ml-1 px-2 py-0.5 rounded-lg bg-red-600/80 hover:bg-red-600 text-[10px] font-bold text-white transition-colors cursor-pointer"
                  >
                    Stop
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Instant Mic Notice */}
            {micNotice && (
              <div className="mt-2 p-2 px-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center justify-between">
                <span>{micNotice}</span>
                <button onClick={() => setMicNotice(null)} className="font-bold underline ml-2 cursor-pointer">Dismiss</button>
              </div>
            )}

            {/* Clean Quick Suggestion Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-3.5 text-xs text-slate-500">
              <span className="font-semibold text-slate-400">Try:</span>
              {['PM-KISAN', 'Mudra Loan', 'Scholarship', 'Ayushman Card', 'Housing'].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => navigate(`/schemes?search=${encodeURIComponent(tag)}&ai=1`)}
                  className="px-3 py-1 rounded-full bg-white/90 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-600 hover:text-emerald-700 transition-colors font-medium shadow-2xs cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Minimal Key Highlights Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="pt-4 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-slate-600 text-xs sm:text-sm font-medium"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span><strong className="font-bold text-slate-900">52+</strong> Verified Schemes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-teal-500" />
              <span><strong className="font-bold text-slate-900">13</strong> Indian Languages</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span><strong className="font-bold text-slate-900">100%</strong> Direct Benefit Transfer</span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTORS GRID: Authentic Photographic Cards for Citizen Domains */}
      {/* ------------------------------------------------------------- */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Compass className="w-4 h-4" />
              <span>{t('explore_title', 'Explore by Citizen Category')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t('explore_subtitle', 'Tailored Programs for Every Segment of Society')}
            </h2>
          </div>
          <Link
            to="/schemes"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            <span>{t('view_all_schemes', 'View All 50+ Schemes')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Sector Visual Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectorVisualCards.map((sector, index) => {
            const Icon = sector.icon;
            return (
              <motion.div
                key={sector.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                onClick={() => navigate(`/schemes?category=${sector.id}`)}
                className="group relative rounded-3xl overflow-hidden bg-white border border-slate-200/90 hover:border-emerald-500/50 cursor-pointer shadow-sm hover:shadow-xl transition-all"
              >
                {/* Background Image */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden">
                  <img 
                    src={sector.image} 
                    alt={sector.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      if (e.target.src.startsWith('./')) {
                        e.target.src = '/' + sector.image.replace('./', '');
                      }
                    }}
                  />
                  {/* Subtle Gradient Fade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Top Badge: Scheme Count */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur-md border border-slate-200 text-emerald-800 shadow-sm">
                      {sector.count} {t('nav_schemes', 'Schemes')}
                    </span>
                  </div>

                  {/* Icon Indicator */}
                  <div className="absolute bottom-3 left-5 p-2.5 rounded-xl bg-emerald-600 text-white shadow-lg border border-white/40">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 pt-3 bg-white">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {sector.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed line-clamp-2">
                    {sector.desc}
                  </p>
                  
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700 group-hover:text-emerald-600 transition-colors">
                    <span>{t('btn_check_details', 'Browse Initiatives')}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3 CORE PILLARS: Matcher, Loan Calculator, Document OCR        */}
      {/* ------------------------------------------------------------- */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            {t('hero_badge', 'Intelligent Citizen Utilities')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1.5">
            {t('explore_title', 'Three Powerful Discovery Engines')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Pillar 1: AI Matcher */}
          <div className="bg-white p-7 rounded-3xl border border-slate-200 hover:border-emerald-500/50 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{t('nav_aimatcher', '7-Step AI Matcher')}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t('matcher_subtitle', 'Step-by-step questionnaire analyzing state, income, caste, landholding, and occupation with instant compatibility scoring.')}
              </p>
            </div>
            <Link
              to="/aimatcher"
              className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-emerald-600 group-hover:text-emerald-700"
            >
              <span>{t('btn_next', 'Launch Matcher')}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Pillar 2: Loan & Subsidy Calculator */}
          <div className="bg-white p-7 rounded-3xl border border-slate-200 hover:border-emerald-500/50 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                <Calculator className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{t('nav_calculator', 'Loan & Subsidy EMI')}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t('calc_subtitle', 'Amortization schedules and government interest subventions for PM Mudra, PM SVANidhi, PMAY, and KCC loans.')}
              </p>
            </div>
            <Link
              to="/calculator"
              className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-blue-600 group-hover:text-blue-700"
            >
              <span>{t('btn_check_details', 'Calculate Loan')}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Pillar 3: On-Device OCR Scanner */}
          <div className="bg-white p-7 rounded-3xl border border-slate-200 hover:border-emerald-500/50 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
                <ScanLine className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{t('nav_ocr', 'Document OCR Scanner')}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t('ocr_subtitle', 'Scan your Aadhaar, income, or caste certificates 100% locally in your browser. Auto-fills your eligibility form with zero cloud storage.')}
              </p>
            </div>
            <Link
              to="/ocr-scanner"
              className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-amber-600 group-hover:text-amber-700"
            >
              <span>{t('ocr_browse_btn', 'Scan Documents')}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </section>

      {/* Details Modal */}
      {activeModalScheme && (
        <SchemeModal
          scheme={activeModalScheme}
          onClose={() => setActiveModalScheme(null)}
        />
      )}
    </div>
  );
}
