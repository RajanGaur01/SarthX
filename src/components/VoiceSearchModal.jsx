import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, 
  MicOff, 
  X, 
  Search, 
  Sparkles, 
  Volume2, 
  AlertCircle,
  ArrowRight,
  Radio,
  Tractor,
  CreditCard,
  Home,
  GraduationCap,
  HeartPulse,
  UserCheck,
  Coins,
  Sun
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useBhashini } from '../context/BhashiniContext';
import { useLanguage } from '../context/LanguageContext';

export default function VoiceSearchModal({ isOpen, onClose, onQuerySelect }) {
  const { 
    startVoice, 
    stopVoice, 
    isListening, 
    voiceStatus, 
    voiceError, 
    clearVoiceError, 
    interimVoiceText,
    speakText 
  } = useBhashini();
  const { currentLanguageMeta } = useLanguage();
  const navigate = useNavigate();

  const [transcript, setTranscript] = useState('');
  const [permissionNotice, setPermissionNotice] = useState(null);

  const sampleQueries = [
    { title: 'PM Kisan Samman Nidhi', subtitle: '₹6,000 yearly income support for farmers', query: 'PM Kisan Samman Nidhi', icon: Tractor },
    { title: 'Mudra Loan Scheme', subtitle: 'Collateral-free business loan up to ₹10 Lakhs', query: 'Mudra Loan', icon: CreditCard },
    { title: 'PM Awas Yojana (Pucca House)', subtitle: 'Subsidy for rural & urban pucca homes', query: 'PM Awas Yojana', icon: Home },
    { title: 'Post-Matric Scholarship', subtitle: 'Higher education financial support for students', query: 'Post Matric Scholarship', icon: GraduationCap },
    { title: 'Ayushman Bharat Card', subtitle: '₹5 Lakh free cashless medical treatment', query: 'Ayushman Bharat', icon: HeartPulse },
    { title: 'Lakhpati Didi & Mahila Samman', subtitle: 'Self-help group enterprise support for women', query: 'Lakhpati Didi', icon: UserCheck },
    { title: 'Kisan Credit Card (KCC)', subtitle: 'Subsidized crop loans & agricultural credit', query: 'Kisan Credit Card', icon: Coins },
    { title: 'PM Surya Ghar Muft Bijli', subtitle: 'Free rooftop solar electricity subsidy', query: 'PM Surya Ghar', icon: Sun }
  ];

  // Auto-start listening when modal opens
  useEffect(() => {
    if (isOpen) {
      setTranscript('');
      setPermissionNotice(null);
      clearVoiceError();

      const initiate = async () => {
        try {
          await startVoice({
            onResult: (res) => {
              const text = res.finalText || res.interimText;
              setTranscript(text);
              if (res.isFinal && res.finalText && res.finalText.trim()) {
                setTimeout(() => {
                  handleSelectQuery(res.finalText.trim());
                }, 900);
              }
            },
            onError: (err) => {
              setPermissionNotice(typeof err === 'string' ? err : 'Microphone unavailable');
            }
          });
        } catch (e) {
          setPermissionNotice(e.message || 'Unable to access microphone');
        }
      };

      initiate();
    } else {
      stopVoice();
      setTranscript('');
      setPermissionNotice(null);
    }

    return () => {
      stopVoice();
    };
  }, [isOpen]);

  const handleToggleMic = () => {
    if (isListening) {
      stopVoice();
    } else {
      setPermissionNotice(null);
      startVoice({
        onResult: (res) => {
          const text = res.finalText || res.interimText;
          setTranscript(text);
          if (res.isFinal && res.finalText && res.finalText.trim()) {
            setTimeout(() => {
              handleSelectQuery(res.finalText.trim());
            }, 900);
          }
        },
        onError: (err) => {
          setPermissionNotice(typeof err === 'string' ? err : 'Microphone unavailable');
        }
      });
    }
  };

  const handleSelectQuery = (queryText) => {
    stopVoice();
    if (typeof speakText === 'function') {
      try {
        speakText(`Searching for ${queryText}`);
      } catch (e) {}
    }
    if (onQuerySelect) {
      onQuerySelect(queryText);
    } else {
      navigate(`/schemes?search=${encodeURIComponent(queryText.trim())}&ai=1`);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden z-10 my-8"
        >
          {/* Tri-color top strip */}
          <div className="tricolor-strip w-full" />

          {/* Modal Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-200">
                <Sparkles className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Bhashini AI Voice Assistant
                </h3>
                <p className="text-xs text-slate-500">
                  Speak in Hindi, English, or any of 13 Indian languages
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-400 hover:text-slate-700 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Central Animated Mic Orb */}
          <div className="p-8 text-center space-y-5 bg-gradient-to-b from-slate-50/50 to-white">
            <div className="relative inline-flex items-center justify-center">
              {/* Pulsing rings */}
              {isListening && (
                <>
                  <motion.div
                    className="absolute w-28 h-28 rounded-full bg-emerald-500/20"
                    animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                  />
                  <motion.div
                    className="absolute w-24 h-24 rounded-full bg-emerald-500/30"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.8, 0.2, 0.8] }}
                    transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut', delay: 0.2 }}
                  />
                </>
              )}

              {/* Big Mic Button */}
              <button
                onClick={handleToggleMic}
                className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-xl ${
                  isListening
                    ? 'bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-emerald-500/40 ring-4 ring-emerald-200 animate-pulse'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-200 shadow-slate-200'
                }`}
              >
                {isListening ? (
                  <Mic className="w-8 h-8 animate-bounce" />
                ) : (
                  <MicOff className="w-8 h-8 text-slate-400" />
                )}
              </button>
            </div>

            {/* Voice Status Text */}
            <div className="space-y-1.5 min-h-[52px]">
              <p className="text-base font-bold text-slate-900">
                {isListening ? (
                  <span className="inline-flex items-center gap-2 text-emerald-700">
                    <Radio className="w-4 h-4 text-emerald-600 animate-ping" />
                    Listening... Speak now
                  </span>
                ) : permissionNotice || voiceError ? (
                  <span className="text-amber-700">Microphone Notice</span>
                ) : (
                  'Click microphone to start speaking'
                )}
              </p>

              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {transcript ? (
                  <span className="text-slate-800 font-semibold italic bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    "{transcript}"
                  </span>
                ) : permissionNotice || voiceError ? (
                  <span className="text-amber-800">
                    {permissionNotice || voiceError}
                  </span>
                ) : (
                  <span>e.g., "Kisan loan", "Kanya Sumangala", "UP scholarship", "PMAY house"</span>
                )}
              </p>
            </div>
          </div>

          {/* Instant One-Click Voice Prompt Chips */}
          <div className="p-6 border-t border-slate-100 bg-slate-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Popular Voice Queries (Tap to search):
              </span>
              <span className="text-[11px] font-semibold text-emerald-700">
                One-Click Instant Match
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
              {sampleQueries.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => handleSelectQuery(item.query)}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/40 text-left transition-all group shadow-2xs cursor-pointer"
                  >
                    <div className="p-2 rounded-xl bg-slate-100 text-emerald-700 group-hover:bg-emerald-100 transition-colors shrink-0">
                      <ItemIcon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-800 transition-colors truncate">
                        {item.title}
                      </p>
                      <p className="text-[10px] text-slate-500 truncate">
                        {item.subtitle}
                      </p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-emerald-600 transition-colors shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
            <span>Powered by Bhashini AI • Digital India</span>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
