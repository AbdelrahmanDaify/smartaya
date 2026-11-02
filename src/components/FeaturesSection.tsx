import React from 'react';
import { ScanText, FileSpreadsheet, Sparkles, HelpCircle, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const FeaturesSection: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const icons = [ScanText, FileSpreadsheet, Sparkles, HelpCircle];

  return (
    <section id="features" className="py-20 bg-white border-y border-slate-200">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isRTL ? 'text-right' : 'text-left'}`}>
        <div className="max-w-3xl mb-16">
          <span className="text-emerald-700 font-bold text-sm tracking-wide block mb-2">
            {t.features.badge}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">
            {t.features.title}
          </h2>
          <p className="text-base text-slate-600 leading-relaxed font-normal">
            {t.features.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {t.features.items.map((item, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={idx}
                className={`p-8 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:border-emerald-300 hover:shadow-lg transition-all duration-300 group flex flex-col justify-between ${
                  isRTL ? 'text-right' : 'text-left'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-semibold text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-lg">
                      {item.badge}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-emerald-600 shadow-sm group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/60 flex items-center gap-2 text-xs font-semibold text-emerald-700">
                  <Check className="w-4 h-4" />
                  <span>{t.features.footerCheck}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
