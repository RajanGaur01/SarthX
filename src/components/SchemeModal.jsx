import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  FileText, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  ShieldCheck, 
  MapPin,
  ListOrdered,
  Users,
  Briefcase,
  IndianRupee,
  Home,
  Check,
  Bookmark,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useBhashini } from '../context/BhashiniContext';
import { useAuth } from '../context/AuthContext';

export default function SchemeModal({ scheme, onClose, onApply }) {
  const { t, currentLang } = useLanguage();
  const { speakText, stopSpeech } = useBhashini();
  const { toggleSaveScheme, isSchemeSaved, addApplication, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [hasTracked, setHasTracked] = useState(false);
  const isSaved = scheme ? isSchemeSaved(scheme.id) : false;

  if (!scheme) return null;

  const handleSpeak = () => {
    if (isPlayingVoice) {
      if (typeof stopSpeech === 'function') stopSpeech();
      setIsPlayingVoice(false);
    } else {
      const readoutText = `${scheme.title}. ${scheme.brief || ''}. Key Benefit: ${scheme.benefit || ''}`;
      if (typeof speakText === 'function') speakText(readoutText, currentLang);
      setIsPlayingVoice(true);
    }
  };

  // Safely compute application process steps (handles string, array, or undefined)
  const processSteps = useMemo(() => {
    if (!scheme.applicationProcess) return [];
    if (Array.isArray(scheme.applicationProcess)) {
      return scheme.applicationProcess.filter(Boolean);
    }
    if (typeof scheme.applicationProcess === 'string') {
      const trimmed = scheme.applicationProcess.trim();
      if (!trimmed) return [];
      // Split numbered patterns e.g. "1. Step ... 2. Step ..."
      if (/\d+\.\s/.test(trimmed)) {
        return trimmed.split(/\d+\.\s+/).map(s => s.trim()).filter(Boolean);
      }
      // Split newlines
      if (trimmed.includes('\n')) {
        return trimmed.split('\n').map(s => s.trim()).filter(Boolean);
      }
      return [trimmed];
    }
    return [];
  }, [scheme.applicationProcess]);

  // Safely compute documents list (handles array, string, or undefined)
  const documentList = useMemo(() => {
    if (!scheme.documents) return [];
    if (Array.isArray(scheme.documents)) {
      return scheme.documents.filter(Boolean);
    }
    if (typeof scheme.documents === 'string') {
      return [scheme.documents.trim()];
    }
    return [];
  }, [scheme.documents]);

  // Safely compute criteria (checks both eligibilityCriteria and eligibility)
  const criteria = scheme.eligibilityCriteria || scheme.eligibility;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-6 overflow-y-auto">
        {/* Soft Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 320 }}
          className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden z-10 my-auto max-h-[90vh] flex flex-col"
        >
          {/* Tri-Color Top Accent Line */}
          <div className="tricolor-strip w-full shrink-0" />

          {/* Modal Header */}
          <div className="p-4 sm:p-6 border-b border-slate-200 flex items-start justify-between gap-3 sm:gap-4 bg-slate-50 shrink-0">
            <div className="space-y-1.5 min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="text-[10px] sm:text-xs font-bold px-2 sm:px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wider">
                  {t(`cat_${scheme.category}`, scheme.category)}
                </span>
                {scheme.state && (
                  <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">
                    <MapPin className="w-3 h-3 text-amber-500" />
                    {scheme.state}
                  </span>
                )}
                <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                  {t('badge_verified', 'DBT Verified')}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight pt-1 leading-snug">
                {scheme.title}
              </h2>
            </div>

            {/* Controls: Voice Readout + Close */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <button
                onClick={handleSpeak}
                className={`p-2 rounded-xl border transition-all ${
                  isPlayingVoice
                    ? 'bg-emerald-100 border-emerald-400 text-emerald-800 animate-pulse'
                    : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
                title={t('btn_listen', 'Voice Readout (TTS)')}
              >
                {isPlayingVoice ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                aria-label={t('btn_close', 'Close Modal')}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-4 sm:p-6 space-y-5 sm:space-y-6 overflow-y-auto flex-1">
            {/* Overview */}
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                {t('explore_title', 'Overview & Objective')}
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
                {scheme.brief || scheme.description || 'Government initiative offering direct benefits to eligible citizens.'}
              </p>
            </div>

            {/* Key Benefits */}
            <div>
              <h4 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                {t('key_benefit', 'Financial & Welfare Benefits')}
              </h4>
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-sm text-emerald-950 font-medium leading-relaxed">
                {scheme.benefit}
              </div>
            </div>

            {/* Eligibility Criteria */}
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                {t('eligibility_criteria', 'Eligibility Criteria')}
              </h4>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                {typeof criteria === 'string' ? (
                  <p className="text-xs text-slate-700 leading-relaxed">{criteria}</p>
                ) : typeof criteria === 'object' && criteria !== null ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {/* Age Criteria */}
                    {(criteria.minAge || criteria.maxAge || criteria.ageMin || criteria.ageMax) && (
                      <div className="flex items-center gap-2 text-slate-700 bg-white p-2 rounded-xl border border-slate-200/80">
                        <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                        <span>{t('step_age', 'Age')}: <strong className="text-slate-900">{criteria.minAge || criteria.ageMin || '0'} - {criteria.maxAge || criteria.ageMax || '60+'} yrs</strong></span>
                      </div>
                    )}
                    
                    {/* Gender */}
                    {criteria.gender && (
                      <div className="flex items-center gap-2 text-slate-700 bg-white p-2 rounded-xl border border-slate-200/80">
                        <Users className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                        <span>{t('step_gender', 'Gender')}: <strong className="text-slate-900 capitalize">{criteria.gender}</strong></span>
                      </div>
                    )}

                    {/* Max Income */}
                    {(criteria.maxIncome || criteria.incomeMax) && (
                      <div className="flex items-center gap-2 text-slate-700 bg-white p-2 rounded-xl border border-slate-200/80">
                        <IndianRupee className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{t('step_income', 'Income Limit')}: <strong className="text-slate-900">₹{Number(criteria.maxIncome || criteria.incomeMax).toLocaleString('en-IN')}/yr</strong></span>
                      </div>
                    )}

                    {/* Caste / Social Category */}
                    {criteria.caste && (
                      <div className="flex items-center gap-2 text-slate-700 bg-white p-2 rounded-xl border border-slate-200/80">
                        <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                        <span>{t('step_caste', 'Category')}: <strong className="text-slate-900 uppercase">{Array.isArray(criteria.caste) ? criteria.caste.join(', ') : criteria.caste}</strong></span>
                      </div>
                    )}

                    {/* Occupation */}
                    {criteria.occupations && (
                      <div className="flex items-center gap-2 text-slate-700 bg-white p-2 rounded-xl border border-slate-200/80 sm:col-span-2">
                        <Briefcase className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        <span>{t('step_occupation', 'Occupation')}: <strong className="text-slate-900 capitalize">{Array.isArray(criteria.occupations) ? criteria.occupations.join(', ') : criteria.occupations}</strong></span>
                      </div>
                    )}

                    {/* Rural / Urban */}
                    {criteria.ruralUrban && criteria.ruralUrban !== 'both' && (
                      <div className="flex items-center gap-2 text-slate-700 bg-white p-2 rounded-xl border border-slate-200/80">
                        <Home className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span>{t('step_location', 'Area')}: <strong className="text-slate-900 capitalize">{criteria.ruralUrban}</strong></span>
                      </div>
                    )}

                    {/* Land Required */}
                    {criteria.landRequired && (
                      <div className="flex items-center gap-2 text-slate-700 bg-white p-2 rounded-xl border border-slate-200/80">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{t('matrix_doc_land', 'Land Records')}: <strong className="text-slate-900">Required</strong></span>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-xs text-slate-600">Open to eligible Indian citizens per official departmental criteria.</p>
                )}
              </div>
            </div>

            {/* Required Documents */}
            {documentList.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-amber-600" />
                  {t('documents_required', 'Mandatory Verification Documents')} ({documentList.length})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {documentList.map((doc, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Application Process Steps */}
            {processSteps.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <ListOrdered className="w-3.5 h-3.5 text-purple-600" />
                  {t('matcher_badge', 'Step-by-Step Application Roadmap')}
                </h4>
                <div className="space-y-2">
                  {processSteps.map((step, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-start gap-3 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200"
                    >
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer with Actions */}
          <div className="p-3.5 sm:p-6 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <div className="grid grid-cols-3 sm:flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="w-full sm:w-auto justify-center px-3 sm:px-4 py-2.5 rounded-xl text-xs font-semibold bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors flex items-center cursor-pointer"
              >
                {t('btn_close', 'Close')}
              </button>

              <button
                type="button"
                onClick={() => toggleSaveScheme(scheme.id)}
                className={`w-full sm:w-auto justify-center px-3 py-2.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all cursor-pointer ${
                  isSaved
                    ? 'bg-amber-50 border-amber-300 text-amber-700'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
                title={isSaved ? 'Saved in Dashboard' : 'Save Scheme'}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-500 text-amber-500' : ''}`} />
                <span>{isSaved ? 'Saved' : 'Save'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  addApplication(scheme);
                  setHasTracked(true);
                  alert(`Added "${scheme.title}" to your Citizen Dashboard application tracker!`);
                }}
                className={`w-full sm:w-auto justify-center px-3 py-2.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all cursor-pointer ${
                  hasTracked
                    ? 'bg-blue-100 border-blue-300 text-blue-900'
                    : 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100'
                }`}
                title="Track in Dashboard"
              >
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <span>{hasTracked ? 'Tracked' : 'Track'}</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                if (onClose) onClose();
                if (typeof onApply === 'function') {
                  onApply(scheme);
                } else if (!isAuthenticated || !user) {
                  navigate(`/auth?applyScheme=${scheme.id}`);
                } else {
                  navigate(`/dashboard?applyScheme=${scheme.id}`);
                }
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-700/20 transition-all shimmer-mask cursor-pointer"
            >
              <span>{t('btn_apply_now', 'Apply Now')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
