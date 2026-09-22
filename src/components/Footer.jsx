import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, ExternalLink, Cpu, Lock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative bg-slate-50 border-t border-slate-200 overflow-hidden text-slate-600">
      {/* Tri-color top accent */}
      <div className="tricolor-strip w-full opacity-80" />

      {/* Subtle Ashoka Chakra vector background watermark */}
      <div className="absolute -right-20 -bottom-20 w-96 h-96 pointer-events-none opacity-[0.05] text-slate-900">
        <img 
          src="./images/ashoka-chakra.svg" 
          alt="" 
          aria-hidden="true"
          className="w-full h-full animate-spin-slow"
          onError={(e) => { e.target.src = '/images/ashoka-chakra.svg'; }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand & Mission Statement with SarthX Logo */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-11 w-11 rounded-2xl bg-white p-1 shadow-md border border-slate-200 overflow-hidden">
                <img 
                  src="./images/sarthx-logo.png" 
                  alt="SarthX Logo" 
                  className="w-full h-full object-contain"
                  onError={(e) => { e.target.src = '/images/sarthx-logo.png'; }}
                />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-slate-900">
                  sarth<span className="text-emerald-600">X</span>
                </span>
                <p className="text-[10px] text-emerald-600 font-bold tracking-wider uppercase">
                  Discover • Match • Empower
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed max-w-sm">
              {t('footer_brand_desc', 'AI-Powered Government Scheme Matching for Marginalized Entrepreneurs and Citizens. Aligned with the Digital India Public Infrastructure (DPI) architecture.')}
            </p>
            
            {/* DPI Compliance Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 shadow-sm">
                <Cpu className="w-3.5 h-3.5 text-teal-600" />
                MeitY Bhashini AI
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 shadow-sm">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                100% Client-Side OCR
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                UX4G Certified Standards
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              {t('footer_quick_links', 'Discovery Engine')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/schemes" className="hover:text-emerald-600 transition-colors">
                  {t('nav_schemes', 'All Welfare Schemes')}
                </Link>
              </li>
              <li>
                <Link to="/aimatcher" className="hover:text-emerald-600 transition-colors">
                  {t('nav_aimatcher', '7-Step AI Matcher')}
                </Link>
              </li>
              <li>
                <Link to="/calculator" className="hover:text-emerald-600 transition-colors">
                  {t('nav_calculator', 'Loan & Subsidy EMI')}
                </Link>
              </li>
              <li>
                <Link to="/ocr-scanner" className="hover:text-emerald-600 transition-colors">
                  {t('nav_ocr', 'Document Scanner')}
                </Link>
              </li>
              <li>
                <Link to="/eligibility" className="hover:text-emerald-600 transition-colors">
                  {t('nav_eligibility', 'Document Matrix')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Key Welfare Sectors */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              {t('explore_title', 'Sectors Covered')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/schemes?category=agriculture" className="hover:text-emerald-600 transition-colors">
                  {t('cat_agriculture', 'Agriculture & Kisan')}
                </Link>
              </li>
              <li>
                <Link to="/schemes?category=students" className="hover:text-emerald-600 transition-colors">
                  {t('cat_students', 'Education & Students')}
                </Link>
              </li>
              <li>
                <Link to="/schemes?category=women" className="hover:text-emerald-600 transition-colors">
                  {t('cat_women', 'Women & SHGs')}
                </Link>
              </li>
              <li>
                <Link to="/schemes?category=business" className="hover:text-emerald-600 transition-colors">
                  {t('cat_business', 'MSME & Mudra Loans')}
                </Link>
              </li>
              <li>
                <Link to="/schemes?category=health" className="hover:text-emerald-600 transition-colors">
                  {t('cat_health', 'Ayushman & Health')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Official Portals */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              {t('footer_official_portals', 'National Portals')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a 
                  href="https://www.myscheme.gov.in/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-1 hover:text-emerald-600 transition-colors"
                >
                  myScheme.gov.in <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a 
                  href="https://bhashini.gov.in/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-1 hover:text-emerald-600 transition-colors"
                >
                  MeitY Bhashini <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.india.gov.in/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-1 hover:text-emerald-600 transition-colors"
                >
                  National Portal of India <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.digilocker.gov.in/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-1 hover:text-emerald-600 transition-colors"
                >
                  DigiLocker <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>
            {t('footer_copyright', `© ${new Date().getFullYear()} SarthX GovTech • Powered by Bhashini AI & MyScheme Architecture`)}
          </p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 text-slate-600 font-medium">
              Made with <Heart className="w-3 h-3 text-red-500 fill-red-500 inline" /> for Digital India
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
