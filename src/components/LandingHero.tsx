import React from 'react';
import { ArrowLeft, ArrowRight, Sparkles, BookOpen, CheckCircle2, PenTool } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface LandingHeroProps {
  onStartNow: () => void;
  onTrySample: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onStartNow, onTrySample }) => {
  const { t, isRTL } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-emerald-50/50 via-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Text Column */}
          <div className={`lg:col-span-7 ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200/60 text-emerald-800 text-xs font-bold mb-6">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.hero.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight lg:leading-tight tracking-tight mb-6 text-balance">
              {t.hero.headline}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl font-normal">
              {t.hero.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <button
                onClick={onStartNow}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl transition-all shadow-md hover:shadow-lg shadow-emerald-600/20 whitespace-nowrap"
              >
                <span>{t.hero.startNow}</span>
                {isRTL ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
              </button>
              
              <button
                onClick={onTrySample}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors shadow-sm whitespace-nowrap"
              >
                <BookOpen className="w-5 h-5 text-emerald-600" />
                <span>{t.hero.trySample}</span>
              </button>
            </div>

            {/* Trust points / highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-200/80 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t.hero.proofOcr}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t.hero.proofSummary}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t.hero.proofQuiz}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t.hero.proofPdf}</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-white group">
              <img
                src="/src/assets/images/hero_study_notes_1793583631327.jpg"
                alt={t.appName}
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              
              {/* Interactive preview overlay card */}
              <div className={`absolute inset-x-4 bottom-4 p-4 bg-white/95 backdrop-blur-md rounded-xl border border-slate-200/80 shadow-lg ${
                isRTL ? 'text-right' : 'text-left'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                    {t.hero.cardReady}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <PenTool className="w-3.5 h-3.5 text-slate-400" />
                    <span>{t.hero.cardTag}</span>
                  </div>
                </div>
                <p className="text-xs font-semibold text-slate-800 line-clamp-1 mb-1">
                  {t.hero.cardSampleTitle}
                </p>
                <div className="flex items-center gap-3 text-[11px] text-slate-500">
                  <span>{t.hero.cardStats}</span>
                </div>
              </div>
            </div>

            {/* Decorative background glow */}
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-emerald-300/30 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-teal-300/30 rounded-full blur-3xl -z-10" />
          </div>

        </div>
      </div>
    </section>
  );
};
