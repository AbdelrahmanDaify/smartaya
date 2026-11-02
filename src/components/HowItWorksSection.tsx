import React from 'react';
import { Upload, Cpu, Award, ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HowItWorksProps {
  onStartNow: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksProps> = ({ onStartNow }) => {
  const { t, isRTL } = useLanguage();

  const stepIcons = [Upload, Cpu, Award];

  return (
    <section id="how-it-works" className="py-20 bg-slate-50">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isRTL ? 'text-right' : 'text-left'}`}>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-emerald-700 font-bold text-sm tracking-wide block mb-2">
            {t.howItWorks.tag}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">
            {t.howItWorks.title}
          </h2>
          <p className="text-base text-slate-600">
            {t.howItWorks.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {t.howItWorks.steps.map((item, idx) => {
            const Icon = stepIcons[idx % stepIcons.length];
            return (
              <div
                key={idx}
                className={`relative bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between ${
                  isRTL ? 'text-right' : 'text-left'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-emerald-100 font-mono">
                      {item.step}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-emerald-600">
                  {t.howItWorks.stepNote}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner CTA */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-emerald-800 to-teal-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2">
              {t.howItWorks.ctaBannerTitle}
            </h3>
            <p className="text-emerald-100 text-sm">
              {t.howItWorks.ctaBannerDesc}
            </p>
          </div>
          <button
            onClick={onStartNow}
            className="px-6 py-3.5 bg-white text-emerald-900 hover:bg-emerald-50 font-bold rounded-xl transition-all shadow-md shrink-0 flex items-center gap-2"
          >
            <span>{t.howItWorks.ctaBannerBtn}</span>
            {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </section>
  );
};
