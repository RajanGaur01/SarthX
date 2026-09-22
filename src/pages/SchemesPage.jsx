import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  MapPin, 
  ArrowUpDown, 
  Sparkles, 
  Layers, 
  X, 
  ChevronDown,
  Tractor,
  GraduationCap,
  UserCheck,
  Briefcase,
  HeartPulse,
  Home as HomeIcon,
  ShieldAlert,
  Mic,
  MicOff,
  RefreshCw,
  Bot
} from 'lucide-react';
import { SCHEMES_DATABASE } from '../data/schemesData';
import SchemeCard from '../components/SchemeCard';
import SchemeModal from '../components/SchemeModal';
import { useLanguage } from '../context/LanguageContext';
import { useBhashini } from '../context/BhashiniContext';
import { sarthxSmartSearch } from '../services/sarthxAiService';
import CustomDropdown from '../components/CustomDropdown';

export default function SchemesPage() {
  const { t } = useLanguage();
  const { startVoice, stopVoice, isListening, clearVoiceError } = useBhashini();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedState, setSelectedState] = useState(searchParams.get('state') || 'all');
  const [sortBy, setSortBy] = useState('popular');
  const [activeModalScheme, setActiveModalScheme] = useState(null);
  const [isSchemesListening, setIsSchemesListening] = useState(false);
  const [aiSearching, setAiSearching] = useState(false);
  const [aiInsight, setAiInsight] = useState(null);

  const lastProcessedSearchRef = useRef('');

  const handleAiSearch = useCallback(async (e, explicitQuery) => {
    if (e && e.preventDefault) e.preventDefault();
    const query = typeof explicitQuery === 'string' ? explicitQuery : searchQuery;
    if (!query || !query.trim()) return;

    const trimmed = query.trim();
    lastProcessedSearchRef.current = trimmed;
    setAiSearching(true);
    try {
      const res = await sarthxSmartSearch(trimmed, SCHEMES_DATABASE);
      if (res) {
        setAiInsight(res);
        if (res.suggestedCategory && res.suggestedCategory !== 'all') {
          setSelectedCategory(res.suggestedCategory);
        }
      }
    } catch (err) {
      console.warn('SarthX AI search notice:', err);
    } finally {
      setAiSearching(false);
    }
  }, [searchQuery]);

  const handleMicToggle = () => {
    if (isSchemesListening && isListening) {
      stopVoice();
      setIsSchemesListening(false);
    } else {
      stopVoice();
      setIsSchemesListening(true);
      clearVoiceError();
      startVoice({
        onStart: () => {
          setIsSchemesListening(true);
        },
        onResult: (res) => {
          const text = res.interimText || res.finalText;
          if (text) {
            setSearchQuery(text);
            searchParams.set('search', text);
            setSearchParams(searchParams);
          }
          if (res.isFinal && res.finalText && res.finalText.trim()) {
            setIsSchemesListening(false);
          }
        },
        onError: () => {
          setIsSchemesListening(false);
        },
        onEnd: () => {
          setIsSchemesListening(false);
        }
      });
    }
  };

  // Sync state with URL params & automatically trigger SarthX AI on navigation / redirect
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
    const q = searchParams.get('search');
    if (q) setSearchQuery(q);
    const st = searchParams.get('state');
    if (st) setSelectedState(st);

    // Auto-trigger SarthX AI search without requiring manual button press
    if (q && q.trim() && q.trim() !== lastProcessedSearchRef.current) {
      lastProcessedSearchRef.current = q.trim();
      handleAiSearch(null, q.trim());
    }
  }, [searchParams, handleAiSearch]);

  const categories = [
    { id: 'all', label: t('cat_all', 'All Schemes'), icon: Layers },
    { id: 'agriculture', label: t('cat_agriculture', 'Agriculture & Kisan'), icon: Tractor },
    { id: 'students', label: t('cat_students', 'Education & Students'), icon: GraduationCap },
    { id: 'women', label: t('cat_women', 'Women & SHGs'), icon: UserCheck },
    { id: 'business', label: t('cat_business', 'MSME & Loans'), icon: Briefcase },
    { id: 'health', label: t('cat_health', 'Healthcare & Wellness'), icon: HeartPulse },
    { id: 'housing', label: t('cat_housing', 'Housing & Shelter'), icon: HomeIcon },
    { id: 'social', label: t('cat_social', 'Social & Pensions'), icon: ShieldAlert },
  ];

  const indianStates = [
    'Uttar Pradesh',
    'Maharashtra',
    'Madhya Pradesh',
    'Bihar',
    'Tamil Nadu',
    'Karnataka',
    'Gujarat',
    'West Bengal',
    'Delhi',
    'Rajasthan'
  ];

  // Filtering Logic
  const filteredSchemes = useMemo(() => {
    return SCHEMES_DATABASE.filter((scheme) => {
      // If SarthX AI matched specific IDs for a complex natural query, ensure matching
      if (aiInsight && aiInsight.matchedSchemeIds?.length > 0) {
        const isMatchedByAi = aiInsight.matchedSchemeIds.some(
          id => scheme.id.toLowerCase() === id.toLowerCase() || scheme.title.toLowerCase().includes(id.toLowerCase())
        );
        if (isMatchedByAi) return true;
      }

      // Category filter
      if (selectedCategory !== 'all' && scheme.category !== selectedCategory) {
        return false;
      }
      // State filter
      if (selectedState !== 'all') {
        if (scheme.state && scheme.state !== selectedState) return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = scheme.title.toLowerCase().includes(q);
        const matchesBrief = scheme.brief.toLowerCase().includes(q);
        const matchesTags = scheme.tags && scheme.tags.some(t => t.toLowerCase().includes(q));
        const matchesState = scheme.state && scheme.state.toLowerCase().includes(q);
        if (!matchesTitle && !matchesBrief && !matchesTags && !matchesState) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (aiInsight && aiInsight.matchedSchemeIds?.length > 0) {
        const aAi = aiInsight.matchedSchemeIds.includes(a.id);
        const bAi = aiInsight.matchedSchemeIds.includes(b.id);
        if (aAi && !bAi) return -1;
        if (!aAi && bAi) return 1;
      }
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return 0;
    });
  }, [selectedCategory, selectedState, searchQuery, sortBy, aiInsight]);

  const handleCategorySelect = (id) => {
    setSelectedCategory(id);
    if (id === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', id);
    }
    setSearchParams(searchParams);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedState('all');
    setAiInsight(null);
    lastProcessedSearchRef.current = '';
    setSearchParams({});
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-white p-6 sm:p-10 border border-slate-200 shadow-sm">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>52+ {t('nav_schemes', 'Central & State Initiatives')}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t('dir_title', 'Comprehensive Welfare Directory')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            {t('dir_subtitle', 'Search, filter, and apply directly to 50+ central and state schemes with real-time verified links.')}
          </p>
        </div>
      </div>

      {/* Filter Control Center */}
      <div className="space-y-4">
        {/* Search Bar + State Select + Sort Controls */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Main Search with Instant Inline Mic and SarthX AI Button */}
          <form 
            onSubmit={handleAiSearch}
            className="md:col-span-6 relative flex items-center"
          >
            <Search className="w-4 h-4 text-emerald-600 absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (!e.target.value.trim()) {
                  if (aiInsight) setAiInsight(null);
                  lastProcessedSearchRef.current = '';
                }
              }}
              placeholder={
                isSchemesListening
                  ? t('hero_listening', 'Listening... Speak now in your language')
                  : t('schemes_search_placeholder', 'Search schemes or ask SarthX AI (e.g. farmer crop loan, girl scholarship)...')
              }
              className="w-full bg-white border border-slate-300 focus:border-emerald-600 rounded-2xl pl-11 pr-36 py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-colors shadow-sm"
            />
            <div className="absolute right-2 flex items-center gap-1">
              {/* SarthX Smart AI Match Button */}
              <button
                type="button"
                onClick={handleAiSearch}
                disabled={aiSearching || !searchQuery.trim()}
                className="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-[11px] font-bold flex items-center gap-1 shadow-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0"
                title={t('btn_sarthx_ai_title', 'Search with SarthX AI')}
              >
                {aiSearching ? (
                  <>
                    <RefreshCw className="w-3 h-3 animate-spin" />
                    <span className="hidden sm:inline">Searching...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span className="hidden sm:inline">{t('btn_sarthx_ai', 'SarthX AI')}</span>
                  </>
                )}
              </button>

              {isSchemesListening && (
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              )}
              <button
                type="button"
                onClick={handleMicToggle}
                className={`p-2 rounded-xl border transition-all ${
                  isSchemesListening
                    ? 'bg-red-500 border-red-600 text-white shadow-md animate-pulse'
                    : 'border-slate-200 bg-slate-100 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50'
                }`}
                title={t('hero_mic_tooltip', 'Voice Search (Bhashini AI)')}
              >
                {isSchemesListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
              </button>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setAiInsight(null);
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </form>

          {/* State Filter Dropdown with Custom Animation & Search */}
          <div className="md:col-span-3">
            <CustomDropdown
              options={[
                { value: 'all', label: t('dir_level_all', 'All States & Central') },
                ...indianStates.map((st) => ({ value: st, label: st }))
              ]}
              value={selectedState}
              onChange={(val) => setSelectedState(val)}
              icon={MapPin}
              placeholder={t('dir_level_all', 'All States & Central')}
              searchable={true}
              searchPlaceholder="Search State / UT..."
              buttonClassName="bg-white border-slate-300 rounded-2xl py-3 text-xs sm:text-sm text-slate-800 shadow-sm"
              menuClassName="w-full"
            />
          </div>

          {/* Sort By Dropdown with Custom Animation */}
          <div className="md:col-span-3">
            <CustomDropdown
              options={[
                { value: 'popular', label: t('dir_sort_popular', 'Sort: Most Relevant') },
                { value: 'title', label: t('dir_sort_az', 'Sort: Alphabetical (A-Z)') }
              ]}
              value={sortBy}
              onChange={(val) => setSortBy(val)}
              icon={ArrowUpDown}
              placeholder={t('dir_sort_popular', 'Sort: Most Relevant')}
              searchable={false}
              buttonClassName="bg-white border-slate-300 rounded-2xl py-3 text-xs sm:text-sm text-slate-800 shadow-sm"
              menuClassName="w-full"
            />
          </div>
        </div>

        {/* SarthX AI Active Searching State Banner */}
        {aiSearching && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100/70 border border-emerald-300/80 text-xs flex items-center gap-3 shadow-xs"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-emerald-950">SarthX AI Smart Match in Progress...</span>
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
              </div>
              <p className="text-slate-600 text-xs mt-0.5">
                Evaluating 52+ central and state welfare databases for "{searchQuery}"...
              </p>
            </div>
          </motion.div>
        )}

        {/* SarthX AI Smart Search Insight */}
        {aiInsight && !aiSearching && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100/60 border border-emerald-300 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
          >
            <div className="flex items-start sm:items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Sparkles className="w-4 h-4 text-amber-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-emerald-900">{t('sarthx_match_analysis', 'SarthX AI Match Analysis')}</span>
                  {aiInsight.suggestedCategory && (
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-emerald-200 text-emerald-900">
                      Category: {aiInsight.suggestedCategory}
                    </span>
                  )}
                </div>
                <p className="text-slate-700 text-xs mt-0.5">
                  {aiInsight.briefReason}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setAiInsight(null)}
              className="self-end sm:self-auto px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs cursor-pointer shrink-0 shadow-2xs"
            >
              Clear AI Filter
            </button>
          </motion.div>
        )}

        {/* Category Pills with Framer Motion LayoutId */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  isSelected
                    ? 'text-white'
                    : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200 shadow-sm'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 shadow-md shadow-emerald-700/25 -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header: Count & Reset Action */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            {t('nav_schemes', 'Available Schemes')}
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
            {filteredSchemes.length}
          </span>
        </div>

        {(selectedCategory !== 'all' || selectedState !== 'all' || searchQuery) && (
          <button
            onClick={handleResetFilters}
            className="text-xs text-slate-500 hover:text-emerald-700 flex items-center gap-1 transition-colors font-medium"
          >
            <X className="w-3.5 h-3.5" />
            <span>{t('btn_clear', 'Clear Filters')}</span>
          </button>
        )}
      </div>

      {/* Scheme Cards Grid */}
      {filteredSchemes.length > 0 ? (
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredSchemes.map((scheme) => (
              <SchemeCard
                key={scheme.id}
                scheme={scheme}
                onOpenDetails={(s) => setActiveModalScheme(s)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="text-center py-16 px-4 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4 max-w-md mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto text-slate-500">
            <Filter className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">{t('no_schemes_found', 'No Schemes Found')}</h3>
          <p className="text-xs text-slate-500">
            {t('no_schemes_desc', 'No welfare programs match your current search and filter combination. Try clearing your filters or searching a broader term.')}
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-sm"
          >
            {t('btn_clear', 'Reset All Filters')}
          </button>
        </div>
      )}

      {/* Scheme Modal Dialog */}
      {activeModalScheme && (
        <SchemeModal
          scheme={activeModalScheme}
          onClose={() => setActiveModalScheme(null)}
        />
      )}
    </div>
  );
}
