import React from 'react';
import { GraduationCap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onNavigateHome?: () => void;
  onOpenWorkspace?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateHome, onOpenWorkspace }) => {
  const { t, isRTL } = useLanguage();

  return (
    <footer className={`bg-slate-900 text-slate-300 py-12 border-t border-slate-800 ${isRTL ? 'text-right' : 'text-left'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-white shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                {t.appName}
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed mb-4">
              {t.footer.description}
            </p>
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <span>{t.footer.dedicated}</span>
            </div>
          </div>

          <div>
            <h4 className="text-white text-sm font-bold mb-4">{t.footer.quickLinks}</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <button onClick={onNavigateHome} className="hover:text-white transition-colors">
                  {t.nav.home}
                </button>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  {t.nav.features}
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  {t.nav.howItWorks}
                </a>
              </li>
              <li>
                <button onClick={onOpenWorkspace} className="hover:text-white transition-colors">
                  {t.nav.workspace}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-bold mb-4">{t.footer.supportedFormats}</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>{t.footer.pdfDocs}</li>
              <li>{t.footer.imageNotes}</li>
              <li>{t.footer.webFormats}</li>
              <li>{t.footer.exportFormats}</li>
            </ul>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>{t.footer.rights}</p>
          <p>{t.footer.aiBadge}</p>
        </div>
      </div>
    </footer>
  );
};
