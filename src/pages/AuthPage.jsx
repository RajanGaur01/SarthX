import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  Phone, 
  User, 
  Sparkles, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Fingerprint, 
  Check, 
  KeyRound, 
  RefreshCw, 
  Building2,
  AlertCircle,
  HelpCircle,
  IndianRupee
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { SCHEMES_DATABASE } from '../data/schemesData';

export default function AuthPage() {
  const { 
    user, 
    signupWithFirebase, 
    loginWithFirebase, 
    loginWithGoogle, 
    resetPassword
  } = useAuth();
  
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const applySchemeId = searchParams.get('applyScheme');
  const targetScheme = SCHEMES_DATABASE.find(s => s.id === applySchemeId);
  const redirectPath = searchParams.get('redirect') || (applySchemeId ? `/dashboard?applyScheme=${applySchemeId}` : '/dashboard');

  useEffect(() => {
    if (user) {
      navigate(redirectPath);
    }
  }, [user, navigate, redirectPath]);

  // Auth Modes: 'signin' | 'signup'
  const [authMode, setAuthMode] = useState('signin');
  const [loading, setLoading] = useState(false);

  // Sign In Form States
  const [loginEmailOrPhone, setLoginEmailOrPhone] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Sign Up Form States
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  // Reset Password State
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  // Alerts
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  // Translate Firebase error codes into human-readable text
  const parseFirebaseError = (errorMsg) => {
    if (!errorMsg) return 'Authentication failed. Please try again.';
    if (errorMsg.includes('auth/email-already-in-use')) {
      return 'An account with this email address already exists. Please sign in instead.';
    }
    if (errorMsg.includes('auth/invalid-email')) {
      return 'Please enter a valid email address.';
    }
    if (errorMsg.includes('auth/user-not-found') || errorMsg.includes('auth/wrong-password') || errorMsg.includes('auth/invalid-credential')) {
      return 'Invalid email or password. Please verify your credentials.';
    }
    if (errorMsg.includes('auth/weak-password')) {
      return 'Password is too weak. Please use at least 6 characters.';
    }
    if (errorMsg.includes('auth/popup-closed-by-user')) {
      return 'Google sign-in popup was closed before completing.';
    }
    if (errorMsg.includes('auth/popup-blocked')) {
      return 'Google sign-in popup was blocked by browser. Please allow popups.';
    }
    if (errorMsg.includes('auth/network-request-failed')) {
      return 'Network connection error. Please check your internet.';
    }
    if (errorMsg.includes('auth/configuration-not-found')) {
      return 'Authentication service is temporarily unavailable. Please try again.';
    }
    return errorMsg;
  };

  // 1. Handle Sign In
  const handleFirebaseLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');

    if (!loginEmailOrPhone.trim()) {
      setAuthError('Please enter your email address or mobile number.');
      return;
    }
    if (!loginPassword) {
      setAuthError('Please enter your password.');
      return;
    }

    setLoading(true);
    const res = await loginWithFirebase(loginEmailOrPhone, loginPassword);
    setLoading(false);

    if (res.success) {
      setAuthSuccess('Authentication successful! Welcome back to SarthX.');
      setTimeout(() => navigate(redirectPath), 500);
    } else {
      setAuthError(parseFirebaseError(res.error));
    }
  };

  // 2. Handle Sign Up
  const handleFirebaseSignup = async (e) => {
    if (e) e.preventDefault();
    setAuthError('');
    setAuthSuccess('');

    if (!signupForm.name.trim()) {
      setAuthError('Please enter your full legal name as per Govt ID.');
      return;
    }
    if (!signupForm.email.trim() || !signupForm.email.includes('@')) {
      setAuthError('Please enter a valid email address.');
      return;
    }
    const cleanPhone = signupForm.mobile.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setAuthError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (signupForm.password.length < 6) {
      setAuthError('Password must be at least 6 characters long.');
      return;
    }
    if (signupForm.password !== signupForm.confirmPassword) {
      setAuthError('Passwords do not match. Please re-enter.');
      return;
    }
    if (!signupForm.acceptTerms) {
      setAuthError('Please accept the Terms of Service & Privacy Policy.');
      return;
    }

    setLoading(true);
    const res = await signupWithFirebase({
      name: signupForm.name.trim(),
      email: signupForm.email.trim(),
      password: signupForm.password,
      mobile: cleanPhone
    });
    setLoading(false);

    if (res.success) {
      setAuthSuccess('Citizen account created successfully! Opening Dashboard...');
      setTimeout(() => navigate(redirectPath), 600);
    } else {
      setAuthError(parseFirebaseError(res.error));
    }
  };

  // 3. Handle 1-Click Google Sign In
  const handleGoogleSignIn = async () => {
    setAuthError('');
    setAuthSuccess('');
    setLoading(true);

    const res = await loginWithGoogle();
    setLoading(false);

    if (res.success) {
      setAuthSuccess('Google authentication successful! Opening Dashboard...');
      setTimeout(() => navigate(redirectPath), 500);
    } else {
      setAuthError(parseFirebaseError(res.error));
    }
  };

  // 4. Handle Password Reset
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (!forgotEmail.trim() || !forgotEmail.includes('@')) {
      setAuthError('Please enter a valid email address to receive reset instructions.');
      return;
    }
    setLoading(true);
    const res = await resetPassword(forgotEmail.trim());
    setLoading(false);

    if (res.success) {
      setAuthSuccess(`Password reset email sent to ${forgotEmail}! Please check your inbox.`);
      setShowForgotModal(false);
    } else {
      setAuthError(parseFirebaseError(res.error));
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] py-6 sm:py-10 px-3.5 sm:px-6 lg:px-8 max-w-7xl mx-auto flex items-center justify-center">
      
      <div className="w-full max-w-5xl bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Column: Official GovTech Assurance Branding (Desktop & Tablets >= lg) */}
        <div className="hidden lg:flex lg:col-span-5 relative p-8 sm:p-10 text-white flex-col justify-between overflow-hidden shadow-2xl">
          {/* Background Image with Cinematic Depth */}
          <img 
            src="/images/auth-bg.jpg" 
            alt="SarthX GovTech Digital Infrastructure" 
            className="absolute inset-0 w-full h-full object-cover object-center scale-105"
          />

          {/* Multi-layered Glassmorphic Scrim & Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/85 to-slate-950/95 backdrop-blur-[1.5px]" />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/40 via-transparent to-slate-950/60" />
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-300 text-xs font-semibold shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Official Citizen Security • SarthX</span>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight text-white drop-shadow-md">
                Real, Secure Citizen <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-200">Registration & Access</span>.
              </h1>
              <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed drop-shadow-xs">
                Access verified government welfare schemes, direct DBT benefits, and credit subsidies with simple, end-to-end encrypted citizen security. Zero mandatory document barriers at signup.
              </p>
            </div>

            {/* GovTech Feature Highlights - Frosted Glass Cards */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 backdrop-blur-md transition-all duration-200 shadow-sm">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shrink-0 mt-0.5 text-emerald-300 shadow-xs">
                  <Lock className="w-4 h-4 text-emerald-300" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white tracking-wide">Enterprise-Grade Security</h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed mt-0.5">Industry-standard encrypted authentication protecting your citizen records.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 backdrop-blur-md transition-all duration-200 shadow-sm">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shrink-0 mt-0.5 text-emerald-300 shadow-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-300" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white tracking-wide">No Sensitive Document Lockout</h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed mt-0.5">Never asked for Aadhaar or PAN during initial registration.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 backdrop-blur-md transition-all duration-200 shadow-sm">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shrink-0 mt-0.5 text-emerald-300 shadow-xs">
                  <Sparkles className="w-4 h-4 text-emerald-300" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white tracking-wide">One-Tap Google Sign-In</h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed mt-0.5">Instant sign-in with your official Google account.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-5 mt-6 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>National Citizen Welfare Portal</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-semibold text-[10px]">
              DPDP Act Compliant
            </span>
          </div>
        </div>

        {/* Right Column: Dynamic Auth Form Container */}
        <div className="lg:col-span-7 p-5 sm:p-8 lg:p-10 flex flex-col justify-center">
          
          {/* Compact Mobile Brand Header (< lg) */}
          <div className="lg:hidden mb-6 text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>GovTech Unified Citizen Access</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              sarth<span className="text-emerald-600">X</span> Citizen Portal
            </h2>
            <p className="text-xs text-slate-500">
              Direct access to 52+ verified Government welfare & DBT schemes.
            </p>
          </div>
          
          {/* Target Scheme Application Gate Notice */}
          {targetScheme && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs flex items-start gap-3 shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-200/70 text-emerald-800">
                    Scheme Application Gate
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm mt-1 truncate">
                  {targetScheme.title}
                </h3>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Direct Benefit: <strong className="text-emerald-700">{targetScheme.benefit}</strong>. Please sign in or register below to initiate your verified e-KYC and application process.
                </p>
              </div>
            </div>
          )}

          {/* Top Auth Mode Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200 mb-6">
            <button
              type="button"
              onClick={() => { setAuthMode('signin'); setAuthError(''); setAuthSuccess(''); }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                authMode === 'signin'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sign In
            </button>

            <button
              type="button"
              onClick={() => { setAuthMode('signup'); setAuthError(''); setAuthSuccess(''); }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                authMode === 'signup'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Feedback Messages */}
          {authError && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{authError}</span>
            </div>
          )}
          {authSuccess && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{authSuccess}</span>
            </div>
          )}

          {/* TAB 1: SIGN IN */}
          {authMode === 'signin' && (
            <form onSubmit={handleFirebaseLogin} className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-lg font-bold text-slate-900">
                  Sign In to Your Account
                </h2>
                <p className="text-xs text-slate-500">
                  Enter your registered email address or mobile number and password.
                </p>
              </div>

                  {/* 1-Click Google Sign In Button */}
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    className="w-full py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center justify-center gap-2.5 shadow-2xs transition-all cursor-pointer"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span>Continue with Google</span>
                  </button>

                  <div className="relative flex items-center justify-center my-3">
                    <div className="border-t border-slate-200 w-full" />
                    <span className="bg-white px-3 text-[10px] uppercase font-bold text-slate-400 absolute">
                      or sign in with credentials
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address or Mobile Number
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={loginEmailOrPhone}
                        onChange={(e) => setLoginEmailOrPhone(e.target.value)}
                        placeholder="e.g. rakesh@sarthx.in or 9829011223"
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold text-slate-700">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowForgotModal(true)}
                        className="text-[11px] font-semibold text-emerald-600 hover:underline cursor-pointer"
                      >
                        Forgot password?
                      </button>
                    </div>

                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showLoginPassword ? 'text' : 'password'}
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer disabled:bg-slate-300"
                  >
                    {loading ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <span>Sign In</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-slate-500 pt-2">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setAuthMode('signup')}
                      className="font-bold text-emerald-700 hover:underline cursor-pointer"
                    >
                      Create account
                    </button>
                  </p>
                </form>
              )}

              {/* ======================================================== */}
              {/* TAB 2: CITIZEN REGISTRATION / SIGN UP                    */}
              {/* ======================================================== */}
              {authMode === 'signup' && (
                <form onSubmit={handleFirebaseSignup} className="space-y-3.5">
                  <div className="space-y-1">
                    <h2 className="text-lg font-bold text-slate-900">
                      Create Citizen Account
                    </h2>
                    <p className="text-xs text-slate-500">
                      Set up your secure citizen login credentials to access welfare schemes and subsidies.
                    </p>
                  </div>

                  <div className="space-y-3 pt-1">
                    {/* 1-Click Google Sign In Button */}
                    <button
                      type="button"
                      onClick={handleGoogleSignIn}
                      disabled={loading}
                      className="w-full py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center justify-center gap-2.5 shadow-2xs transition-all cursor-pointer"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                      </svg>
                      <span>Sign Up with Google</span>
                    </button>

                    <div className="relative flex items-center justify-center my-2">
                      <div className="border-t border-slate-200 w-full" />
                      <span className="bg-white px-3 text-[10px] uppercase font-bold text-slate-400 absolute">
                        or enter credentials
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Full Legal Name (as per Govt ID) <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={signupForm.name}
                          onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                          placeholder="e.g. Ramesh Kumar Sharma"
                          className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="email"
                            required
                            value={signupForm.email}
                            onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                            placeholder="ramesh@gmail.com"
                            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Mobile Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="tel"
                            maxLength={10}
                            required
                            value={signupForm.mobile}
                            onChange={(e) => setSignupForm({ ...signupForm, mobile: e.target.value })}
                            placeholder="9876543210"
                            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Password (Min 6 chars) <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type={showSignupPassword ? 'text' : 'password'}
                            required
                            value={signupForm.password}
                            onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                            placeholder="••••••••"
                            className="w-full pl-9 pr-9 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                          />
                          <button
                            type="button"
                            onClick={() => setShowSignupPassword(!showSignupPassword)}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                          >
                            {showSignupPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Confirm Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type={showSignupPassword ? 'text' : 'password'}
                            required
                            value={signupForm.confirmPassword}
                            onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                            placeholder="••••••••"
                            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                          />
                        </div>
                      </div>
                    </div>

                    <label className="flex items-start gap-2 cursor-pointer pt-1">
                      <input
                        type="checkbox"
                        checked={signupForm.acceptTerms}
                        onChange={(e) => setSignupForm({ ...signupForm, acceptTerms: e.target.checked })}
                        className="mt-0.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                      />
                      <span className="text-[11px] text-slate-600 leading-tight">
                        I agree to the <span className="text-emerald-700 font-semibold">Terms of Service</span> and consent to digital welfare processing under the <span className="text-emerald-700 font-semibold">DPDP Act 2023</span>.
                      </span>
                    </label>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer disabled:bg-slate-300 mt-2"
                    >
                      {loading ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <span>Create Citizen Account</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-center text-xs text-slate-500 pt-1">
                    Already registered?{' '}
                    <button
                      type="button"
                      onClick={() => setAuthMode('signin')}
                      className="font-bold text-emerald-700 hover:underline cursor-pointer"
                    >
                      Sign in here
                    </button>
                  </p>
                </form>
              )}

        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900">Reset Password</h3>
            <p className="text-xs text-slate-500">
              Enter the email address associated with your account, and we will send you a secure password reset link.
            </p>

            <form onSubmit={handlePasswordReset} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 cursor-pointer disabled:bg-slate-300"
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
