import React from 'react';
import { GraduationCap, ArrowLeft, ArrowRight, LayoutDashboard, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  currentView: 'landing' | 'workspace';
  onNavigate: (view: 'landing' | 'workspace') => void;
  hasActiveDocument: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  hasActiveDocument,
}) => {
  const { language, toggleLanguage, t, isRTL } = useLanguage();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6 sm:gap-8">
        
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => onNavigate('landing')}
          className={`flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-1 ${
            isRTL ? 'text-right' : 'text-left'
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105 shrink-0">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <span className="text-base sm:text-lg font-bold text-slate-900 tracking-tight whitespace-nowrap block">
              {t.appName}
            </span>
            <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap hidden sm:block">
              {t.appSubtitle}
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <button
            onClick={() => onNavigate('landing')}
            className={`transition-colors whitespace-nowrap hover:text-slate-950 ${
              currentView === 'landing' ? 'text-emerald-700 font-bold' : ''
            }`}
          >
            {t.nav.home}
          </button>
          <a
            href="#features"
            onClick={(e) => {
              if (currentView !== 'landing') {
                e.preventDefault();
                onNavigate('landing');
                setTimeout(() => {
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="transition-colors whitespace-nowrap hover:text-slate-950"
          >
            {t.nav.features}
          </a>
          <a
            href="#how-it-works"
            onClick={(e) => {
              if (currentView !== 'landing') {
                e.preventDefault();
                onNavigate('landing');
                setTimeout(() => {
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="transition-colors whitespace-nowrap hover:text-slate-950"
          >
            {t.nav.howItWorks}
          </a>
          {hasActiveDocument && (
            <button
              onClick={() => onNavigate('workspace')}
              className={`transition-colors whitespace-nowrap hover:text-slate-950 flex items-center gap-1.5 ${
                currentView === 'workspace' ? 'text-emerald-700 font-bold' : ''
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>{t.nav.currentWorkspace}</span>
            </button>
          )}
        </nav>

        {/* Zone 3: Language Switcher & Primary Action CTA */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          
          {/* Language Switcher Toggle */}
          <button
            onClick={toggleLanguage}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 hover:text-emerald-800 bg-slate-100 hover:bg-slate-200/90 border border-slate-200 rounded-xl transition-all whitespace-nowrap active:scale-95"
            title={language === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="font-semibold">{language === 'ar' ? 'English' : 'العربية'}</span>
          </button>

          {/* Primary Action Button */}
          {currentView === 'landing' ? (
            <button
              onClick={() => onNavigate('workspace')}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl transition-all shadow-sm hover:shadow-md whitespace-nowrap"
            >
              <span>{t.nav.startNow}</span>
              {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
          ) : (
            <button
              onClick={() => onNavigate('landing')}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors whitespace-nowrap"
            >
              <span>{t.nav.homePage}</span>
            </button>
          )}

        </div>
      </div>
    </header>
  );
};
