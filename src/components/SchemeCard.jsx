import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  ExternalLink, 
  Sparkles, 
  MapPin, 
  Layers,
  Bookmark
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export default function SchemeCard({ scheme, onOpenDetails }) {
  const { t } = useLanguage();
  const { toggleSaveScheme, isSchemeSaved, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const isSaved = isSchemeSaved(scheme.id);

  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'agriculture': return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'students': return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'women': return 'text-rose-700 bg-rose-50 border-rose-200';
      case 'business': return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'health': return 'text-red-700 bg-red-50 border-red-200';
      case 'housing': return 'text-teal-700 bg-teal-50 border-teal-200';
      case 'senior': return 'text-purple-700 bg-purple-50 border-purple-200';
      default: return 'text-slate-700 bg-slate-100 border-slate-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative flex flex-col justify-between bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 hover:border-emerald-500/50 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      {/* Ambient Top Glow on Hover */}
      <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-emerald-500/0 to-transparent group-hover:via-emerald-500 transition-all duration-500" />
      
      <div>
        {/* Top Badges: Category + State/Central + DBT */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wider ${getCategoryColor(scheme.category)}`}>
            <Layers className="w-3 h-3" />
            {t(`cat_${scheme.category}`, scheme.category)}
          </span>
          
          <div className="flex items-center gap-1.5">
            {scheme.state && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-700">
                <MapPin className="w-3 h-3 text-amber-500" />
                {scheme.state}
              </span>
            )}
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
              DBT
            </span>
          </div>
        </div>

        {/* Scheme Title */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 mb-2">
          {scheme.title}
        </h3>

        {/* Scheme Brief */}
        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
          {scheme.brief}
        </p>

        {/* Key Benefit Highlight Box */}
        <div className="bg-emerald-50/60 border border-emerald-200/70 group-hover:border-emerald-300 rounded-xl p-3 mb-4 transition-colors">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 mb-1">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>{t('key_benefit', 'Primary Benefit')}</span>
          </div>
          <p className="text-xs text-emerald-950 font-medium line-clamp-2">
            {scheme.benefit}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {scheme.tags && scheme.tags.slice(0, 3).map((tag, idx) => (
            <span 
              key={idx} 
              className="text-[10px] text-slate-600 px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleSaveScheme(scheme.id);
          }}
          className={`p-2 rounded-xl border text-xs transition-all cursor-pointer shrink-0 ${
            isSaved
              ? 'bg-amber-50 border-amber-300 text-amber-600'
              : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-100'
          }`}
          title={isSaved ? 'Saved in Dashboard' : 'Bookmark Scheme'}
        >
          <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-500 text-amber-500' : ''}`} />
        </button>

        <button
          onClick={() => onOpenDetails(scheme)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200 hover:border-emerald-200 transition-all cursor-pointer"
        >
          <span>{t('btn_check_details', 'View Criteria')}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (!isAuthenticated || !user) {
              navigate(`/auth?applyScheme=${scheme.id}`);
            } else {
              navigate(`/dashboard?applyScheme=${scheme.id}`);
            }
          }}
          className="inline-flex items-center justify-center gap-1 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-700/20 transition-all shrink-0 cursor-pointer"
          title={t('btn_apply_now', 'Apply Now')}
        >
          <span>{t('btn_apply_now', 'Apply Now')}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}
