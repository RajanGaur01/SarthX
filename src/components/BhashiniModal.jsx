import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ShieldAlert, Cpu, ExternalLink } from 'lucide-react';
import { useBhashini } from '../context/BhashiniContext';
import { useLanguage } from '../context/LanguageContext';

export default function BhashiniModal() {
  const bhashini = useBhashini() || {};
  const { isModalOpen = false, setIsModalOpen = () => {}, setCredentials, getStoredCredentials, config = {} } = bhashini;
  const { t } = useLanguage();

  const stored = (typeof getStoredCredentials === 'function' ? getStoredCredentials() : null) || {
    userId: config.userID || '',
    apiKey: config.ulcaApiKey || '',
    inferenceKey: config.inferenceUrl || ''
  };

  const [userId, setUserId] = useState(stored.userId || '');
  const [apiKey, setApiKey] = useState(stored.apiKey || '');
  const [inferenceKey, setInferenceKey] = useState(stored.inferenceKey || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isModalOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    if (typeof setCredentials === 'function') {
      setCredentials(userId, apiKey, inferenceKey);
    } else if (typeof bhashini.saveConfig === 'function') {
      bhashini.saveConfig({ userID: userId, ulcaApiKey: apiKey, inferenceUrl: inferenceKey });
    }
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setIsModalOpen(false);
    }, 1200);
  };

  const handleClear = () => {
    setUserId('');
    setApiKey('');
    setInferenceKey('');
    if (typeof bhashini.resetConfig === 'function') {
      bhashini.resetConfig();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Soft Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden z-10 my-8"
        >
          {/* Tri-Color Top Accent Line */}
          <div className="tricolor-strip w-full" />

          {/* Header */}
          <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-700">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  MeitY Bhashini AI Configuration
                </h3>
                <p className="text-xs text-slate-500">
                  National Language Translation Mission API
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="p-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSave} className="p-6 space-y-4">
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                By default, SarthX seamlessly utilizes the high-fidelity <strong>Web Speech Recognition & Synthesis API</strong> across all supported Indic languages. Adding official MeitY Bhashini credentials is optional for enterprise deployment.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Bhashini User ID
              </label>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="e.g. your_bhashini_user_id"
                className="w-full bg-slate-50 focus:bg-white border border-slate-300 focus:border-teal-600 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                API Key (ULCA ApiKey)
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter ULCA API Key"
                className="w-full bg-slate-50 focus:bg-white border border-slate-300 focus:border-teal-600 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Inference Authorization Key
              </label>
              <input
                type="password"
                value={inferenceKey}
                onChange={(e) => setInferenceKey(e.target.value)}
                placeholder="Enter Inference Authorization Token"
                className="w-full bg-slate-50 focus:bg-white border border-slate-300 focus:border-teal-600 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none transition-colors"
              />
            </div>

            {savedSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-2 font-semibold"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Credentials securely saved in local browser storage!
              </motion.div>
            )}

            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleClear}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors"
              >
                Clear
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-700/20 transition-colors"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </form>

          {/* Footer Link */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 text-center">
            <a
              href="https://bhashini.gov.in/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] text-teal-700 font-medium hover:underline"
            >
              <span>Apply for MeitY Bhashini API Access</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
