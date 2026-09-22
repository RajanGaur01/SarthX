import React, { useEffect, Component } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { BhashiniProvider } from './context/BhashiniContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingChatbot from './components/FloatingChatbot';

import HomePage from './pages/HomePage';
import SchemesPage from './pages/SchemesPage';
import MatcherPage from './pages/MatcherPage';
import CalculatorPage from './pages/CalculatorPage';
import OcrScannerPage from './pages/OcrScannerPage';
import EligibilityPage from './pages/EligibilityPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';

// Robust Error Boundary
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('SarthX UI Caught Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md p-8 rounded-3xl bg-white border border-red-300 shadow-xl space-y-4">
            <h2 className="text-xl font-bold text-red-600">Portal Display Notice</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              A temporary rendering issue occurred. Click reload to refresh the portal.
            </p>
            <p className="text-[10px] text-slate-500 font-mono bg-slate-100 p-2 rounded-xl text-left overflow-auto">
              {String(this.state.error?.message || this.state.error)}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
            >
              Refresh SarthX Portal
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function ScrollToTop() {
  const { pathname } = useLocation();
  const { currentLang, triggerDOMTranslation } = useLanguage();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (currentLang && currentLang !== 'en' && triggerDOMTranslation) {
      const t1 = setTimeout(() => triggerDOMTranslation(currentLang), 150);
      const t2 = setTimeout(() => triggerDOMTranslation(currentLang), 600);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [pathname, currentLang, triggerDOMTranslation]);

  return null;
}

export default function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <BhashiniProvider>
          <AuthProvider>
            <HashRouter>
              <ScrollToTop />
              <div className="min-h-screen w-full overflow-x-hidden flex flex-col justify-between bg-[#f8fafc] text-slate-800 selection:bg-emerald-500 selection:text-white">
                <Navbar />
                
                <main className="flex-1 w-full overflow-x-hidden">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/schemes" element={<SchemesPage />} />
                    <Route path="/aimatcher" element={<MatcherPage />} />
                    <Route path="/calculator" element={<CalculatorPage />} />
                    <Route path="/ocr-scanner" element={<OcrScannerPage />} />
                    <Route path="/eligibility" element={<EligibilityPage />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="*" element={<HomePage />} />
                  </Routes>
                </main>

                <FloatingChatbot />
                <Footer />
              </div>
            </HashRouter>
          </AuthProvider>
        </BhashiniProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}
