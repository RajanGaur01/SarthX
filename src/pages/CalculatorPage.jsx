import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  IndianRupee, 
  Percent, 
  Calendar, 
  Gift, 
  ExternalLink,
  Zap
} from 'lucide-react';
import { calculateLoanEMI, SCHEME_PRESETS } from '../utils/emiCalculator';
import { useLanguage } from '../context/LanguageContext';

export default function CalculatorPage() {
  const { t } = useLanguage();

  const defaultPreset = SCHEME_PRESETS['mudra-kishore'] || {
    amount: 300000,
    rate: 9.5,
    subvention: 0.0,
    tenure: 60,
    applyUrl: 'https://www.jansamarth.in/business-activity-loans',
    note: 'Collateral-free enterprise credit between ₹50,000 and ₹5 Lakhs for MSMEs.'
  };

  const [loanAmount, setLoanAmount] = useState(defaultPreset.amount);
  const [interestRate, setInterestRate] = useState(defaultPreset.rate);
  const [subvention, setSubvention] = useState(defaultPreset.subvention);
  const [tenureMonths, setTenureMonths] = useState(defaultPreset.tenure);
  const [activePreset, setActivePreset] = useState('mudra-kishore');

  const calculation = useMemo(() => {
    return calculateLoanEMI({
      principal: loanAmount,
      baseRate: interestRate,
      subvention: subvention,
      tenureMonths: tenureMonths
    });
  }, [loanAmount, interestRate, subvention, tenureMonths]);

  const handleApplyPreset = (key) => {
    setActivePreset(key);
    const preset = SCHEME_PRESETS[key];
    if (preset) {
      setLoanAmount(preset.amount);
      setInterestRate(preset.rate);
      setSubvention(preset.subvention);
      setTenureMonths(preset.tenure);
    }
  };

  const currentPresetData = SCHEME_PRESETS[activePreset] || {};

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-white p-6 sm:p-10 border border-slate-200 shadow-sm">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
            <Calculator className="w-3.5 h-3.5 text-blue-600" />
            <span>{t('calc_badge', 'GovTech Loan & Subvention Engine')}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t('calc_title', 'Government Subsidized EMI Calculator')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            {t('calc_subtitle', 'Simulate monthly loan repayments, interest subventions, and capital savings under official government credit schemes like PM Mudra, PM SVANidhi, PMAY-U, and Kisan Credit Card.')}
          </p>
        </div>
      </div>

      {/* Scheme Presets Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-1 shrink-0">
          {t('calc_presets_title', 'Official Schemes:')}
        </span>
        {Object.entries(SCHEME_PRESETS).map(([key, preset]) => (
          <button
            key={key}
            onClick={() => handleApplyPreset(key)}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              activePreset === key
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-700/20 border border-emerald-600'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-sm'
            }`}
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Sliders */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
          
          {/* Preset Note Banner */}
          {currentPresetData.note && (
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-2.5">
              <Zap className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <p className="leading-relaxed">{currentPresetData.note}</p>
            </div>
          )}

          {/* Slider 1: Principal Amount */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t('calc_input_amount', 'Loan Principal Amount')}</span>
              </label>
              <span className="text-base font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-xl border border-slate-200">
                ₹{Number(loanAmount).toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min="10000"
              max="5000000"
              step="10000"
              value={loanAmount}
              onChange={(e) => {
                setLoanAmount(Number(e.target.value));
                setActivePreset('custom');
              }}
              className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-medium">
              <span>₹10,000</span>
              <span>₹25,00,000</span>
              <span>₹50,00,000</span>
            </div>
          </div>

          {/* Slider 2: Base Interest Rate */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Percent className="w-3.5 h-3.5 text-blue-600" />
                <span>{t('calc_input_rate', 'Base Bank Interest Rate (%)')}</span>
              </label>
              <span className="text-base font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-xl border border-slate-200">
                {interestRate}% p.a.
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="18"
              step="0.25"
              value={interestRate}
              onChange={(e) => {
                setInterestRate(Number(e.target.value));
                setActivePreset('custom');
              }}
              className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-medium">
              <span>1%</span>
              <span>8.5%</span>
              <span>18%</span>
            </div>
          </div>

          {/* Slider 3: Government Interest Subvention */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
                <Gift className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t('calc_result_subsidy', 'Govt. Interest Subvention Subsidy (%)')}</span>
              </label>
              <span className="text-base font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                {subvention}% Subvention
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="8"
              step="0.5"
              value={subvention}
              onChange={(e) => {
                setSubvention(Number(e.target.value));
                setActivePreset('custom');
              }}
              className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-medium">
              <span>0% (Standard)</span>
              <span>3% (KCC / Vidyalaxmi)</span>
              <span>7% (PM SVANidhi)</span>
            </div>
          </div>

          {/* Slider 4: Tenure in Months */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-500" />
                <span>{t('calc_input_tenure', 'Loan Repayment Tenure')}</span>
              </label>
              <span className="text-base font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-xl border border-slate-200">
                {tenureMonths} {t('calc_tenure_months', 'Months')} ({Math.round(tenureMonths / 12)} {t('calc_tenure_years', 'Yrs')})
              </span>
            </div>
            <input
              type="range"
              min="6"
              max="240"
              step="6"
              value={tenureMonths}
              onChange={(e) => {
                setTenureMonths(Number(e.target.value));
                setActivePreset('custom');
              }}
              className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-medium">
              <span>6 Months</span>
              <span>60 Months (5 Yrs)</span>
              <span>240 Months (20 Yrs)</span>
            </div>
          </div>

        </div>

        {/* Right Column: Breakdown & Results */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Monthly EMI Hero Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-300 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                {t('calc_result_emi', 'Monthly Net EMI')}
              </span>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                Effective Rate: {calculation.effectiveRate.toFixed(2)}%
              </span>
            </div>

            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display mt-2">
              ₹{calculation.emi.toLocaleString('en-IN')}{' '}
              <span className="text-xs text-slate-500 font-normal">/ month</span>
            </div>

            {/* Subvention Savings Box */}
            {calculation.subsidySavings > 0 && (
              <div className="mt-4 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                  <Gift className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{t('calc_result_subsidy', 'Subvention Interest Saved')}:</span>
                </div>
                <span className="text-sm font-extrabold text-emerald-900">
                  ₹{calculation.subsidySavings.toLocaleString('en-IN')}
                </span>
              </div>
            )}

            {/* Financial Summary Rows */}
            <div className="mt-6 pt-6 border-t border-slate-200 space-y-3 text-xs">
              <div className="flex items-center justify-between text-slate-600 font-medium">
                <span>{t('calc_principal_share', 'Principal Borrowed')}</span>
                <span className="font-bold text-slate-900">₹{loanAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600 font-medium">
                <span>{t('calc_result_interest', 'Total Interest Payable')}</span>
                <span className="font-bold text-amber-700">₹{calculation.totalInterest.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between text-slate-700 pt-2 border-t border-slate-100 font-bold">
                <span>{t('calc_result_total', 'Total Repayment (Principal + Interest)')}</span>
                <span className="text-sm font-extrabold text-emerald-700">₹{calculation.totalPayment.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Animated Amortization Split Bar */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                <span>{t('calc_principal_share', 'Principal')} ({calculation.principalPercent}%)</span>
                <span>{t('calc_interest_share', 'Interest')} ({calculation.interestPercent}%)</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden flex border border-slate-200">
                <motion.div
                  className="bg-emerald-600 h-full"
                  animate={{ width: `${calculation.principalPercent}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
                <motion.div
                  className="bg-amber-500 h-full"
                  animate={{ width: `${calculation.interestPercent}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
            </div>

          </div>

          {/* Official JanSamarth Portal Link */}
          {currentPresetData.applyUrl && (
            <div className="bg-white rounded-2xl p-5 border border-slate-200 flex items-center justify-between gap-4 shadow-sm">
              <div>
                <h4 className="text-xs font-bold text-slate-900">{t('footer_official_portals', 'Direct Application Portal')}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Apply on the official Government JanSamarth portal</p>
              </div>
              <a
                href={currentPresetData.applyUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shrink-0 shadow-md shadow-emerald-700/20 transition-colors"
              >
                <span>{t('calc_apply_cta', 'Apply Online')}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
