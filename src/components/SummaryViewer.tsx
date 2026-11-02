import React, { useState } from 'react';
import { StudySummary } from '../types';
import { Sparkles, BookOpen, AlertTriangle, Copy, Check, Bookmark, ListChecks } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface SummaryViewerProps {
  summary: StudySummary;
  docTitle?: string;
}

export const SummaryViewer: React.FC<SummaryViewerProps> = ({ summary, docTitle }) => {
  const { t, isRTL } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopySummary = () => {
    const text = `${t.summary.title}: ${docTitle || ''}\n\n` +
      `${t.summary.coreIdeaTitle}:\n${summary.coreIdea}\n\n` +
      `${t.summary.mainPointsTitle}:\n${summary.mainPoints.map((p) => `• ${p}`).join('\n')}\n\n` +
      `${t.summary.definitionsTitle}:\n${summary.essentialDefinitions.map((d) => `• ${d.term}: ${d.definition}`).join('\n')}\n\n` +
      `${t.summary.quickReviewTitle}:\n${summary.quickReviewBullets.map((b) => `• ${b}`).join('\n')}\n\n` +
      `${t.summary.examAlertsTitle}:\n${summary.examAlerts.map((a) => `• ${a}`).join('\n')}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-8 ${isRTL ? 'text-right' : 'text-left'}`}>
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-teal-800 bg-teal-100/70 px-2.5 py-0.5 rounded-md">
              {t.summary.badge}
            </span>
            <span className="text-xs text-slate-500">
              {t.summary.subtitle}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            {t.summary.title}
          </h2>
        </div>

        <button
          onClick={handleCopySummary}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors self-start sm:self-auto"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700 font-bold">{t.summary.copiedBtn}</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>{t.summary.copyBtn}</span>
            </>
          )}
        </button>
      </div>

      {/* Core Idea Highlight Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 border border-emerald-200/80">
        <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>{t.summary.coreIdeaTitle}</span>
        </div>
        <p className="text-base sm:text-lg text-slate-900 font-semibold leading-relaxed">
          {summary.coreIdea}
        </p>
      </div>

      {/* Main Points */}
      <div>
        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <ListChecks className="w-5 h-5 text-emerald-600" />
          <span>{t.summary.mainPointsTitle}</span>
        </h3>
        <div className="space-y-3">
          {summary.mainPoints.map((point, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-slate-300 transition-all flex items-start gap-3"
            >
              <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                {idx + 1}
              </div>
              <p className="text-sm text-slate-800 leading-relaxed font-medium">
                {point}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Essential Definitions */}
      {summary.essentialDefinitions && summary.essentialDefinitions.length > 0 && (
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-teal-600" />
            <span>{t.summary.definitionsTitle}</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {summary.essentialDefinitions.map((def, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Bookmark className="w-4 h-4 text-teal-600" />
                  <h4 className="font-bold text-slate-900 text-sm">
                    {def.term}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {def.definition}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Review Bullets */}
      {summary.quickReviewBullets && summary.quickReviewBullets.length > 0 && (
        <div className="p-6 rounded-2xl bg-slate-900 text-slate-100">
          <h3 className="text-sm sm:text-base font-bold text-emerald-400 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            <span>{t.summary.quickReviewTitle}</span>
          </h3>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
            {summary.quickReviewBullets.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                <span className="text-emerald-400 font-bold shrink-0">•</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Exam Alerts */}
      {summary.examAlerts && summary.examAlerts.length > 0 && (
        <div className="p-5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
          <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider mb-2 text-amber-800">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>{t.summary.examAlertsTitle}</span>
          </div>
          <ul className={`space-y-2 text-xs sm:text-sm text-amber-950 font-medium ${isRTL ? 'pr-1' : 'pl-1'}`}>
            {summary.examAlerts.map((alert, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">⚠️</span>
                <span>{alert}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
};
