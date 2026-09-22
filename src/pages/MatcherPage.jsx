import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  Trophy, 
  Accessibility,
  Users
} from 'lucide-react';
import { SCHEMES_DATABASE } from '../data/schemesData';
import SchemeCard from '../components/SchemeCard';
import SchemeModal from '../components/SchemeModal';
import { useLanguage } from '../context/LanguageContext';

export default function MatcherPage() {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [matchedResults, setMatchedResults] = useState(null);
  const [activeModalScheme, setActiveModalScheme] = useState(null);

  // Form State across 7 Steps
  const [formData, setFormData] = useState({
    gender: '',
    age: '',
    caste: '',
    state: '',
    occupation: '',
    income: '',
    disability: 'no',
    minority: 'no'
  });

  // Check if routed from OCR prefill
  useEffect(() => {
    if (location.state && location.state.ocrPrefill) {
      const { ocrPrefill } = location.state;
      setFormData(prev => ({
        ...prev,
        gender: ocrPrefill.gender || prev.gender,
        age: ocrPrefill.age ? String(ocrPrefill.age) : prev.age,
        state: ocrPrefill.state || prev.state,
        income: ocrPrefill.income ? String(ocrPrefill.income) : prev.income
      }));
    }
  }, [location.state]);

  const totalSteps = 7;

  const handleSelectOption = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setDirection(1);
      setCurrentStep(prev => prev + 1);
    } else {
      calculateMatches();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep(prev => prev - 1);
    }
  };

  const resetWizard = () => {
    setFormData({
      gender: '',
      age: '',
      caste: '',
      state: '',
      occupation: '',
      income: '',
      disability: 'no',
      minority: 'no'
    });
    setCurrentStep(1);
    setMatchedResults(null);
  };

  const calculateMatches = () => {
    const ageNum = parseInt(formData.age, 10) || 28;
    const incomeNum = parseInt(formData.income, 10) || 150000;
    const userGender = formData.gender.toLowerCase();
    const userCaste = formData.caste.toLowerCase();
    const userState = formData.state;
    const userOcc = formData.occupation.toLowerCase();

    const scored = SCHEMES_DATABASE.map((scheme) => {
      let score = 0;
      let maxScore = 0;
      const reasons = [];

      const crit = scheme.eligibilityCriteria || scheme.eligibility || {};

      // 1. Gender Match
      maxScore += 25;
      if (crit.gender) {
        const reqGen = crit.gender.toLowerCase();
        if (reqGen === 'all' || reqGen === userGender) {
          score += 25;
          reasons.push('Gender criteria verified');
        }
      } else {
        score += 25;
        reasons.push('Open to all genders');
      }

      // 2. Age Match
      maxScore += 20;
      const minAge = crit.minAge || crit.ageMin || 0;
      const maxAge = crit.maxAge || crit.ageMax || 100;
      if (ageNum >= minAge && ageNum <= maxAge) {
        score += 20;
        reasons.push(`Age within eligible range (${minAge}-${maxAge} yrs)`);
      }

      // 3. Income Match
      maxScore += 25;
      const maxInc = crit.maxIncome || crit.incomeMax;
      if (maxInc) {
        if (incomeNum <= maxInc) {
          score += 25;
          reasons.push(`Income within threshold (≤ ₹${Number(maxInc).toLocaleString('en-IN')})`);
        }
      } else {
        score += 25;
        reasons.push('No income cap required');
      }

      // 4. State Match
      maxScore += 20;
      if (scheme.state) {
        if (userState && (scheme.state === userState || userState === 'Other')) {
          score += 20;
          reasons.push(`State aligned with ${scheme.state}`);
        }
      } else {
        score += 20;
        reasons.push('Central welfare program (All India)');
      }

      // 5. Occupation & Caste Boosts
      maxScore += 10;
      const occList = Array.isArray(crit.occupations) ? crit.occupations : (crit.occupations ? [crit.occupations] : []);
      const casteList = Array.isArray(crit.caste) ? crit.caste : (crit.caste ? [crit.caste] : []);
      
      const occMatch = occList.some(o => o.toLowerCase().includes(userOcc) || userOcc.includes(o.toLowerCase()));
      const casteMatch = casteList.some(c => c.toLowerCase() === userCaste || c.toLowerCase() === 'all');

      if (occMatch) {
        score += 10;
        reasons.push(`Occupation aligned (${userOcc})`);
      } else if (scheme.category === 'agriculture' && userOcc === 'farmer') {
        score += 10;
        reasons.push('Direct farmer occupation match');
      } else if (scheme.category === 'students' && userOcc === 'student') {
        score += 10;
        reasons.push('Direct student education match');
      } else if (scheme.category === 'business' && (userOcc === 'business' || userOcc === 'artisan')) {
        score += 10;
        reasons.push('MSME enterprise match');
      } else if (casteMatch) {
        score += 8;
        reasons.push(`Social category priority (${userCaste.toUpperCase()})`);
      } else {
        score += 5;
      }

      const matchPercent = Math.min(100, Math.round((score / maxScore) * 100));

      return {
        scheme,
        matchPercent,
        reasons
      };
    });

    const finalMatches = scored
      .filter(s => s.matchPercent >= 50)
      .sort((a, b) => b.matchPercent - a.matchPercent);

    setMatchedResults(finalMatches);

    if (finalMatches.length > 0 && finalMatches[0].matchPercent >= 80) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0
    })
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>{t('matcher_badge', '7-Step AI Eligibility Engine')}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {t('matcher_title', 'Find Every Scheme You Qualify For')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          {t('matcher_subtitle', 'Answer a few quick questions or import your profile from the OCR Scanner to discover 100% matched benefits.')}
        </p>
      </div>

      {!matchedResults ? (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl p-6 sm:p-10">
          
          {/* Progress Bar & Step Tracker */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-2">
              <span className="text-emerald-700 uppercase tracking-wider">
                Step {currentStep} of {totalSteps}
              </span>
              <span>{Math.round((currentStep / totalSteps) * 100)}% Completed</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              />
            </div>
          </div>

          {/* Wizard Step Content with Directional Slide */}
          <div className="min-h-[320px] flex flex-col justify-between">
            <AnimatePresence mode="wait" custom={direction}>
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                      {t('step_gender', 'What is your gender?')}
                    </h2>
                    <p className="text-xs text-slate-500">
                      Many schemes offer targeted cash incentives for women and girl children.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { value: 'female', label: t('opt_female', 'Female'), sub: 'Eligible for Lakhpati Didi & PMMVY' },
                      { value: 'male', label: t('opt_male', 'Male'), sub: 'Eligible for Kisan & Mudra loans' },
                      { value: 'transgender', label: t('opt_transgender', 'Transgender / Other'), sub: 'Special social security covers' }
                    ].map((item) => (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => handleSelectOption('gender', item.value)}
                        className={`p-4 rounded-2xl border text-left transition-all ${
                          formData.gender === item.value
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-md ring-1 ring-emerald-500'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        <p className="text-sm font-bold">{item.label}</p>
                        <p className="text-[11px] text-slate-500 mt-1">{item.sub}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                      {t('step_age', 'What is your age?')}
                    </h2>
                    <p className="text-xs text-slate-500">
                      Age determines student scholarships, youth entrepreneurship, or senior citizen pensions.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { value: '16', label: 'Under 18', sub: 'School & Youth Aid' },
                      { value: '22', label: '18 - 25 yrs', sub: 'Higher Education & Skills' },
                      { value: '35', label: '26 - 55 yrs', sub: 'Livelihood & Business Loans' },
                      { value: '62', label: '56+ yrs', sub: 'Senior Citizen Pensions' }
                    ].map((item) => (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => handleSelectOption('age', item.value)}
                        className={`p-4 rounded-2xl border text-left transition-all ${
                          formData.age === item.value
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-md ring-1 ring-emerald-500'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        <p className="text-sm font-bold">{item.label}</p>
                        <p className="text-[11px] text-slate-500 mt-1">{item.sub}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                      {t('step_caste', 'Which social category do you belong to?')}
                    </h2>
                    <p className="text-xs text-slate-500">
                      Enables verification for affirmative action and targeted welfare subventions.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { value: 'general', label: t('opt_gen', 'General / EWS') },
                      { value: 'obc', label: t('opt_obc', 'OBC (Non-Creamy)') },
                      { value: 'sc', label: t('opt_sc', 'Scheduled Caste (SC)') },
                      { value: 'st', label: t('opt_st', 'Scheduled Tribe (ST)') }
                    ].map((item) => (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => handleSelectOption('caste', item.value)}
                        className={`p-4 rounded-2xl border text-left transition-all ${
                          formData.caste === item.value
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-md ring-1 ring-emerald-500'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        <p className="text-sm font-bold">{item.label}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                      {t('step_location', 'Which state are you a permanent resident of?')}
                    </h2>
                    <p className="text-xs text-slate-500">
                      Unlocks specific state welfare schemes alongside Central Government schemes.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      'Uttar Pradesh',
                      'Maharashtra',
                      'Madhya Pradesh',
                      'Bihar',
                      'Tamil Nadu',
                      'Karnataka',
                      'Gujarat',
                      'Other States'
                    ].map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => handleSelectOption('state', st)}
                        className={`p-3.5 rounded-2xl border text-left transition-all ${
                          formData.state === st
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-md ring-1 ring-emerald-500'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        <p className="text-xs font-bold">{st}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {currentStep === 5 && (
                <motion.div
                  key="step5"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                      {t('step_occupation', 'What is your primary occupation?')}
                    </h2>
                    <p className="text-xs text-slate-500">
                      Matches sector-specific credit facilities, equipment subsidies, and stipends.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { value: 'farmer', label: t('opt_farmer', 'Farmer / Cultivator') },
                      { value: 'student', label: t('opt_student', 'Student / Scholar') },
                      { value: 'business', label: t('opt_business', 'MSME / Shopkeeper') },
                      { value: 'artisan', label: t('opt_worker', 'Artisan / PM Vishwakarma') },
                      { value: 'laborer', label: t('opt_worker', 'Daily Wage Laborer') },
                      { value: 'unemployed', label: t('opt_unemployed', 'Homemaker / Job Seeker') }
                    ].map((occ) => (
                      <button
                        key={occ.value}
                        type="button"
                        onClick={() => handleSelectOption('occupation', occ.value)}
                        className={`p-4 rounded-2xl border text-left transition-all ${
                          formData.occupation === occ.value
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-md ring-1 ring-emerald-500'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        <p className="text-sm font-bold">{occ.label}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {currentStep === 6 && (
                <motion.div
                  key="step6"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                      {t('step_income', 'What is your approximate annual household income?')}
                    </h2>
                    <p className="text-xs text-slate-500">
                      Evaluated against BPL, EWS, and non-creamy layer criteria.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { value: '80000', label: 'Below ₹1 Lakh', sub: 'BPL / Antyodaya Category' },
                      { value: '200000', label: '₹1 Lakh - ₹2.5 Lakh', sub: 'EWS & Priority Household' },
                      { value: '600000', label: 'Above ₹2.5 Lakh', sub: 'Middle Income / Business' }
                    ].map((inc) => (
                      <button
                        key={inc.value}
                        type="button"
                        onClick={() => handleSelectOption('income', inc.value)}
                        className={`p-4 rounded-2xl border text-left transition-all ${
                          formData.income === inc.value
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-md ring-1 ring-emerald-500'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        <p className="text-sm font-bold">{inc.label}</p>
                        <p className="text-[11px] text-slate-500 mt-1">{inc.sub}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {currentStep === 7 && (
                <motion.div
                  key="step7"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                      {t('step_special', 'Special Inclusion Factors')}
                    </h2>
                    <p className="text-xs text-slate-500">
                      Do any of these specialized welfare categories apply to you?
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center gap-2">
                        <Accessibility className="w-4 h-4 text-purple-600" />
                        <h4 className="text-xs font-bold text-slate-900">Person with Disability (Divyangjan)?</h4>
                      </div>
                      <div className="flex gap-2">
                        {['yes', 'no'].map((val) => (
                          <button
                            key={val}
                            type="button"
                            onClick={() => handleSelectOption('disability', val)}
                            className={`flex-1 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                              formData.disability === val
                                ? 'bg-emerald-600 text-white shadow-sm'
                                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {val}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-600" />
                        <h4 className="text-xs font-bold text-slate-900">{t('opt_minority', 'Notified Religious Minority?')}</h4>
                      </div>
                      <div className="flex gap-2">
                        {['yes', 'no'].map((val) => (
                          <button
                            key={val}
                            type="button"
                            onClick={() => handleSelectOption('minority', val)}
                            className={`flex-1 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                              formData.minority === val
                                ? 'bg-emerald-600 text-white shadow-sm'
                                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {val}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="pt-8 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  currentStep === 1
                    ? 'opacity-30 cursor-not-allowed text-slate-400'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{t('btn_back', 'Back')}</span>
              </button>

              <button
                type="button"
                onClick={nextStep}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-700/20 transition-all shimmer-mask"
              >
                <span>{currentStep === totalSteps ? t('btn_submit', 'Reveal Matched Schemes') : t('btn_next', 'Next Step')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      ) : (
        /* Matched Results Section */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          {/* Summary Box */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-300 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-emerald-100 text-emerald-800 border border-emerald-300 shrink-0">
                <Trophy className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  {t('matcher_result_title', 'AI Compatibility Scorecard')}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  {t('matcher_100_title', 'You are eligible for')} {matchedResults.length} {t('nav_schemes', 'Welfare Schemes')}!
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Based on your demographic profile, state, and income criteria.
                </p>
              </div>
            </div>

            <button
              onClick={resetWizard}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 transition-all shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t('btn_start_over', 'Modify Answers')}</span>
            </button>
          </div>

          {/* Scheme Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchedResults.map(({ scheme, matchPercent, reasons }) => (
              <div key={scheme.id} className="relative flex flex-col">
                {/* Match Percentage Pill */}
                <div className="absolute -top-3 right-4 z-20">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-md border border-emerald-500">
                    {matchPercent}% Match
                  </span>
                </div>

                <SchemeCard
                  scheme={scheme}
                  onOpenDetails={(s) => setActiveModalScheme(s)}
                />
              </div>
            ))}
          </div>
        </motion.div>
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
