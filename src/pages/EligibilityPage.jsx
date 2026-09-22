import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ClipboardCheck, 
  CheckCircle2, 
  Sparkles, 
  FileText, 
  ArrowRight, 
  Layers, 
  ShieldCheck,
  Check,
  RotateCcw
} from 'lucide-react';
import { SCHEMES_DATABASE } from '../data/schemesData';
import SchemeModal from '../components/SchemeModal';
import { useLanguage } from '../context/LanguageContext';

export default function EligibilityPage() {
  const { t } = useLanguage();
  const [selectedDocs, setSelectedDocs] = useState(['aadhaar', 'bank']);
  const [activeModalScheme, setActiveModalScheme] = useState(null);

  const availableDocs = [
    { id: 'aadhaar', label: 'Aadhaar Card', key: 'matrix_doc_aadhaar', category: 'Identity' },
    { id: 'bank', label: 'Bank Passbook / Account', key: 'matrix_doc_bank', category: 'Financial' },
    { id: 'income', label: 'Income Certificate', key: 'matrix_doc_income', category: 'Financial' },
    { id: 'caste', label: 'Caste Certificate (SC/ST/OBC)', key: 'matrix_doc_caste', category: 'Identity' },
    { id: 'residence', label: 'Domicile / Residence Proof', key: 'matrix_doc_domicile', category: 'Identity' },
    { id: 'land', label: 'Land Records / Khasra-Khatauni', key: 'matrix_doc_land', category: 'Asset' },
    { id: 'ration', label: 'Ration Card (BPL / Antyodaya)', key: 'matrix_doc_ration', category: 'Social' },
    { id: 'marksheet', label: 'Academic Marksheet / Student ID', key: 'matrix_doc_marksheet', category: 'Education' },
    { id: 'pan', label: 'PAN Card / Business Registration', key: 'matrix_doc_pan', category: 'Business' },
    { id: 'disability', label: 'Disability Certificate (UDID)', key: 'matrix_doc_disability', category: 'Medical' },
  ];

  const toggleDoc = (docId) => {
    if (selectedDocs.includes(docId)) {
      setSelectedDocs(selectedDocs.filter(d => d !== docId));
    } else {
      setSelectedDocs([...selectedDocs, docId]);
    }
  };

  const selectAll = () => {
    setSelectedDocs(availableDocs.map(d => d.id));
  };

  const clearAll = () => {
    setSelectedDocs([]);
  };

  // Compute schemes unlocked by currently selected documents
  const unlockedSchemes = useMemo(() => {
    if (selectedDocs.length === 0) return [];

    const normalize = (str) => (str || '').toLowerCase().replace(/[^a-z0-9]/g, '');

    return SCHEMES_DATABASE.map(scheme => {
      const requiredDocs = scheme.documents || [];
      if (requiredDocs.length === 0) {
        return { scheme, matchingCount: 1, totalReq: 1, ratio: 1 };
      }

      let matches = 0;
      requiredDocs.forEach(req => {
        const normReq = normalize(req);
        const isHeld = selectedDocs.some(userDocId => {
          if (userDocId === 'aadhaar' && normReq.includes('aadhaar')) return true;
          if (userDocId === 'bank' && normReq.includes('bank')) return true;
          if (userDocId === 'income' && normReq.includes('income')) return true;
          if (userDocId === 'caste' && normReq.includes('caste')) return true;
          if (userDocId === 'residence' && (normReq.includes('domicile') || normReq.includes('residence'))) return true;
          if (userDocId === 'land' && (normReq.includes('land') || normReq.includes('khasra') || normReq.includes('ror'))) return true;
          if (userDocId === 'ration' && normReq.includes('ration')) return true;
          if (userDocId === 'marksheet' && (normReq.includes('marksheet') || normReq.includes('student') || normReq.includes('degree') || normReq.includes('certificate') || normReq.includes('school'))) return true;
          if (userDocId === 'pan' && (normReq.includes('pan') || normReq.includes('business'))) return true;
          if (userDocId === 'disability' && (normReq.includes('disability') || normReq.includes('udid'))) return true;
          return normReq.includes(userDocId);
        });
        if (isHeld) matches++;
      });

      const ratio = matches / requiredDocs.length;
      return {
        scheme,
        matchingCount: matches,
        totalReq: requiredDocs.length,
        ratio
      };
    })
    .filter(item => item.ratio > 0.3)
    .sort((a, b) => b.ratio - a.ratio);
  }, [selectedDocs]);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-white p-6 sm:p-10 border border-slate-200/80 shadow-sm">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <ClipboardCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t('matrix_badge', 'Interactive Document Matrix')}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t('matrix_title', 'Document Eligibility Matrix')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            {t('matrix_subtitle', 'Select the government-issued documents and credentials you currently possess. SarthX instantly calculates which welfare programs and direct cash benefits you can unlock today.')}
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Document Checklist */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900">{t('documents_required', 'Your Available Documents')}</h2>
              <p className="text-[11px] text-slate-500">{t('matrix_subtitle_short', 'Tap to toggle your credentials')}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={selectAll}
                className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
              >
                {t('btn_select_all', 'Select All')}
              </button>
              <span className="text-slate-300">|</span>
              <button
                onClick={clearAll}
                className="text-[11px] font-semibold text-slate-500 hover:text-slate-700 transition-colors"
              >
                {t('btn_clear', 'Clear')}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {availableDocs.map((doc) => {
              const isChecked = selectedDocs.includes(doc.id);
              return (
                <button
                  key={doc.id}
                  type="button"
                  onClick={() => toggleDoc(doc.id)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all ${
                    isChecked
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-950 shadow-sm'
                      : 'bg-slate-50 border-slate-200/80 text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-lg flex items-center justify-center border transition-all ${
                      isChecked
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-slate-300 bg-white'
                    }`}>
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <div>
                      <p className="text-xs font-bold leading-tight">{t(doc.key, doc.label)}</p>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider">{doc.category}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Unlocked Schemes */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                {t('matrix_matching_count', 'Unlocked Schemes ({count})').replace('{count}', unlockedSchemes.length)}
              </h2>
            </div>
            <span className="text-xs text-slate-500">
              {t('dir_sort_popular', 'Sorted by documentation readiness')}
            </span>
          </div>

          <div className="space-y-3">
            <AnimatePresence>
              {unlockedSchemes.map(({ scheme, matchingCount, totalReq, ratio }) => {
                const isFullyUnlocked = ratio === 1;
                return (
                  <motion.div
                    key={scheme.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`p-5 rounded-2xl border transition-all ${
                      isFullyUnlocked
                        ? 'border-emerald-300 bg-emerald-50/40 shadow-sm'
                        : 'border-slate-200/80 bg-white shadow-sm hover:border-slate-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 uppercase tracking-wider">
                            {t(`cat_${scheme.category?.toLowerCase()}`, scheme.category)}
                          </span>
                          {isFullyUnlocked ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {t('badge_verified', 'Ready to Apply')}
                            </span>
                          ) : (
                            <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                              {matchingCount} / {totalReq} {t('documents_required', 'Docs Verified')}
                            </span>
                          )}
                        </div>

                        <h3 className="text-sm sm:text-base font-bold text-slate-900 hover:text-emerald-700 transition-colors">
                          {scheme.title}
                        </h3>
                        <p className="text-xs text-slate-600 line-clamp-1">
                          {scheme.benefit}
                        </p>
                      </div>

                      <button
                        onClick={() => setActiveModalScheme(scheme)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 transition-all shrink-0 self-start sm:self-center shadow-xs cursor-pointer"
                      >
                        <span>{t('btn_check_details', 'View Criteria')}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Progress indicator */}
                    <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          isFullyUnlocked ? 'bg-emerald-500' : 'bg-amber-500'
                        }`} 
                        style={{ width: `${Math.round(ratio * 100)}%` }} 
                      />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

      </div>

      {/* Scheme Modal */}
      {activeModalScheme && (
        <SchemeModal
          scheme={activeModalScheme}
          onClose={() => setActiveModalScheme(null)}
        />
      )}
    </div>
  );
}
