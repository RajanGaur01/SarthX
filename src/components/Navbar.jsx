import React, { useState, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { 
  Menu, 
  X, 
  Home, 
  Layers, 
  Calculator, 
  Globe,
  ShieldCheck, 
  User, 
  LayoutDashboard, 
  LogOut,
  AlertTriangle,
  FolderLock,
  ArrowRight
} from 'lucide-react';

import CustomDropdown from './CustomDropdown';

export default function Navbar() {
  const { currentLang, changeLanguage, supportedLanguages, t } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const pendingCount = useMemo(() => {
    if (!user) return 0;
    let count = 0;
    if (!user.state || !user.gender || !user.caste || !user.age || !user.name || !user.income) count++;
    if (!user.business?.name || !user.business?.purposeOfFunding || !user.business?.totalProjectCost) count++;
    if (!user.identity?.incomeCertificate?.verified) count++;
    if (!user.identity?.aadhaar?.verified) count++;
    if (!user.identity?.pan?.verified) count++;
    return count;
  }, [user]);

  const navItems = [
    { to: '/', label: t('nav_home', 'Home'), icon: Home },
    { to: '/schemes', label: t('nav_schemes', 'Schemes'), icon: Layers },
    { to: '/calculator', label: t('nav_calculator', 'EMI Calculator'), icon: Calculator },
  ];

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* 100% Full-Width Top Prerequisite Alert Banner (Above Navbar) */}
      {isAuthenticated && pendingCount > 0 && (
        <div className="w-full bg-gradient-to-r from-red-50 via-rose-50/95 to-red-50 border-b border-red-300/80 shadow-2xs">
          <div className="w-full px-3.5 sm:px-6 lg:px-8 py-2 sm:py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
            <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 min-w-0">
              <div className="w-6 h-6 rounded-lg bg-red-600 text-white flex items-center justify-center shrink-0 shadow-2xs mt-0.5 sm:mt-0">
                <AlertTriangle className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2.5 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
                  </span>
                  <span className="text-xs sm:text-sm font-black text-red-950 tracking-tight">
                    {t('alert_attention', 'Action Required: Incomplete Profile')}
                  </span>
                  <span className="px-1.5 py-0.5 rounded-full bg-red-600 text-white font-extrabold text-[8.5px] uppercase tracking-wider shadow-2xs shrink-0">
                    {pendingCount} {t('alert_action_req', 'PENDING')}
                  </span>
                </div>
                <span className="hidden xl:inline text-red-300">•</span>
                <p className="text-[11px] text-red-900/80 font-medium hidden md:inline truncate">
                  {t('alert_desc', 'Personal, enterprise, or identity details missing. Please complete verification.')}
                </p>
              </div>
            </div>

            <div className="shrink-0 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  if (location.pathname === '/dashboard') {
                    window.dispatchEvent(new CustomEvent('switch-dashboard-tab', { detail: 'identity_docs' }));
                  } else {
                    navigate('/dashboard?tab=identity_docs');
                  }
                }}
                className="w-full sm:w-auto justify-center px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer group"
              >
                <FolderLock className="w-3.5 h-3.5 text-red-100" />
                <span>{t('btn_verify_vault', 'Verify Details')}</span>
                <ArrowRight className="w-3.5 h-3.5 text-red-200 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tri-Color National Micro Accent */}
      <div className="tricolor-strip w-full shadow-sm" />

      {/* Main Frosted Pearl Navigation Bar */}
      <nav className="backdrop-blur-xl bg-white/90 border-b border-slate-200/90 px-4 lg:px-8 py-2.5 transition-all duration-300 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Logo with Official SarthX Emblem */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-2xl bg-white p-1 shadow-md shadow-slate-200 border border-slate-200/80 group-hover:scale-105 transition-transform duration-300 overflow-hidden">
              <img 
                src="./images/sarthx-logo.png" 
                alt="SarthX Official Emblem" 
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.src = '/images/sarthx-logo.png';
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-emerald-600 transition-colors">
                  sarth<span className="text-emerald-600">X</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  {t('brand_sub', 'GovTech 2.0')}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 hidden sm:block tracking-wider uppercase font-semibold">
                {t('footer_brand_desc_short', 'Discover • Match • Empower')}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links (Home, Schemes, EMI Calculator) */}
          <div className="hidden md:flex items-center gap-1 bg-slate-100/90 p-1.5 rounded-full border border-slate-200 shadow-inner">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`relative flex items-center gap-2 px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 z-10 ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navPill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 shadow-md shadow-emerald-700/25 -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Action Tools: Language Selector + Dynamic Auth/Dashboard Button + Settings + Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* 13-Language Selector Animated Dropdown */}
            <div className="relative flex items-center">
              <CustomDropdown
                options={supportedLanguages.map((lang) => ({
                  value: lang.code,
                  label: lang.native || lang.name,
                  sublabel: lang.name
                }))}
                value={currentLang}
                onChange={(code) => changeLanguage(code)}
                icon={Globe}
                placeholder="Language"
                className="w-[95px] xs:w-[125px] sm:w-[155px]"
                buttonClassName="py-1.5 px-2 sm:px-2.5 bg-slate-100 hover:bg-slate-200/80 border-slate-200 rounded-xl shadow-2xs"
                menuClassName="w-52 right-0 left-auto"
                searchable={false}
              />
            </div>

            {/* DYNAMIC BUTTON: Switches from "Login / Sign Up" to "Dashboard" post-login */}
            {isAuthenticated && user ? (
              <div className="flex items-center gap-1.5">
                <Link
                  to="/dashboard"
                  className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-xs ${
                    location.pathname === '/dashboard'
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-emerald-600/20'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100/80'
                  }`}
                  title="Open Citizen Dashboard"
                >
                  <LayoutDashboard className={`w-3.5 h-3.5 ${location.pathname === '/dashboard' ? 'text-white' : 'text-emerald-600'}`} />
                  <span className="font-bold">{t('nav_dashboard', 'Dashboard')}</span>
                  <span className="hidden sm:inline font-normal text-[11px] text-emerald-700 border-l border-emerald-300 pl-1.5 truncate max-w-[80px]">
                    {user.name ? user.name.split(' ')[0] : 'Citizen'}
                  </span>
                </Link>

                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="hidden sm:flex items-center justify-center p-2 rounded-xl bg-slate-100 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
                  title={t('nav_logout', 'Sign Out')}
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-xl border border-emerald-600 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm shadow-emerald-600/20 shrink-0"
              >
                <User className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">{t('nav_login_signup', 'Login / Sign Up')}</span>
                <span className="xs:hidden">{t('nav_login', 'Login')}</span>
              </Link>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex items-center justify-center p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 cursor-pointer shrink-0 min-w-[38px] min-h-[38px]"
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Animated Drawer Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden border-t border-slate-200 mt-3 pt-3"
            >
              <div className="flex flex-col gap-2 pb-2">
                {/* Mobile Citizen Account Bar */}
                <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200/80 flex items-center justify-between">
                  {isAuthenticated && user ? (
                    <div className="flex items-center justify-between w-full">
                      <Link
                        to="/dashboard"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2 text-xs font-bold text-emerald-900"
                      >
                        <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                          <User className="w-4 h-4" />
                        </div>
                        <div>
                          <span>{user.name}</span>
                          <span className="text-[10px] text-emerald-700 block font-normal">{user.citizenId || 'Verified Citizen'}</span>
                        </div>
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setMobileOpen(false);
                          navigate('/');
                        }}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg text-xs flex items-center gap-1 font-semibold cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>{t('nav_logout', 'Sign Out')}</span>
                      </button>
                    </div>
                  ) : (
                    <Link
                      to="/auth"
                      onClick={() => setMobileOpen(false)}
                      className="w-full text-center py-2 rounded-lg bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-2"
                    >
                      <User className="w-3.5 h-3.5" />
                      <span>{t('nav_login_signup', 'Login / Sign Up')}</span>
                    </Link>
                  )}
                </div>

                {/* Mobile Links */}
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.to;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-700/20'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}

                {isAuthenticated && (
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200"
                  >
                    <LayoutDashboard className="w-4 h-4 text-emerald-600" />
                    <span>{t('nav_open_dashboard', 'Open Citizen Dashboard')}</span>
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
