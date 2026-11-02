import React from 'react';
import { OrganizedNotes, StudySummary, QuestionBank } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface PrintDocumentViewProps {
  notes?: OrganizedNotes;
  summary?: StudySummary;
  questions?: QuestionBank;
  rawText?: string;
  fileName?: string;
}

export const PrintDocumentView: React.FC<PrintDocumentViewProps> = ({
  notes,
  summary,
  questions,
  rawText,
  fileName,
}) => {
  const { t, isRTL, language } = useLanguage();

  return (
    <div className={`hidden print:block print:w-full print:p-0 font-sans text-slate-900 ${isRTL ? 'text-right' : 'text-left'}`}>
      
      {/* Cover / Academic Header */}
      <div className="border-b-2 border-slate-900 pb-6 mb-8">
        <div className="flex justify-between items-start text-xs text-slate-500 mb-2">
          <span>{t.print.brandHeader}</span>
          <span>{t.print.dateLabel} {new Date().toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}</span>
        </div>
        <h1 className="text-2xl font-black text-slate-950 mb-2">
          {notes?.title || (language === 'ar' ? 'مذكرة دراسية شاملة' : 'Complete Study Notes')}
        </h1>
        {fileName && (
          <p className="text-xs text-slate-600 font-medium">
            {t.print.sourceDoc} {fileName}
          </p>
        )}
      </div>

      {/* 1. Organized Notes Section */}
      {notes && (
        <section className="mb-8">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-300 pb-2 mb-4">
            {t.print.sectionNotes}
          </h2>

          <div className="mb-6 bg-slate-50 p-4 rounded border border-slate-200">
            <h3 className="text-xs font-bold text-slate-700 uppercase mb-1">
              {t.print.lectureIntro}
            </h3>
            <p className="text-sm leading-relaxed text-slate-800">
              {notes.overview}
            </p>
          </div>

          <div className="space-y-6">
            {notes.topics.map((item, idx) => (
              <div key={idx} className="pb-4 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {item.heading}
                </h3>
                <ul className={`list-disc list-inside space-y-1.5 text-sm text-slate-700 ${isRTL ? 'pr-2' : 'pl-2'}`}>
                  {item.subpoints.map((sp, sIdx) => (
                    <li key={sIdx} className="leading-relaxed">
                      {sp}
                    </li>
                  ))}
                </ul>
                {item.notes && (
                  <p className="text-xs italic text-slate-600 mt-2 bg-slate-50 p-2 rounded">
                    <strong>{t.notes.clarificationNote}</strong> {item.notes}
                  </p>
                )}
              </div>
            ))}
          </div>

          {notes.definitions && notes.definitions.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-bold text-slate-900 mb-3">
                {t.print.keyDefinitions}
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                {notes.definitions.map((def, dIdx) => (
                  <div key={dIdx} className="p-2.5 border border-slate-200 rounded">
                    <strong className="text-slate-900 block mb-1">{def.term}</strong>
                    <span className="text-slate-700">{def.definition}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Page break before summary */}
      <div className="page-break" />

      {/* 2. Summary Section */}
      {summary && (
        <section className="mb-8 pt-4">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-300 pb-2 mb-4">
            {t.print.sectionSummary}
          </h2>

          <div className="mb-4 p-4 bg-slate-50 border border-slate-200 rounded">
            <h3 className="text-xs font-bold text-slate-800 uppercase mb-1">
              {t.print.coreIdea}
            </h3>
            <p className="text-sm font-semibold text-slate-900 leading-relaxed">
              {summary.coreIdea}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-bold text-slate-900 mb-2">
              {t.print.mainPoints}
            </h3>
            <ul className={`list-decimal list-inside space-y-1 text-sm text-slate-700 ${isRTL ? 'pr-2' : 'pl-2'}`}>
              {summary.mainPoints.map((mp, idx) => (
                <li key={idx}>{mp}</li>
              ))}
            </ul>
          </div>

          {summary.quickReviewBullets.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-bold text-slate-900 mb-2">
                {t.print.quickReview}
              </h3>
              <ul className={`list-disc list-inside space-y-1 text-xs text-slate-700 ${isRTL ? 'pr-2' : 'pl-2'}`}>
                {summary.quickReviewBullets.map((qb, idx) => (
                  <li key={idx}>{qb}</li>
                ))}
              </ul>
            </div>
          )}

          {summary.examAlerts.length > 0 && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded text-xs text-amber-950">
              <strong className="block mb-1 text-amber-900">{t.print.examAlerts}</strong>
              <ul className={`list-disc list-inside space-y-1 ${isRTL ? 'pr-2' : 'pl-2'}`}>
                {summary.examAlerts.map((ea, idx) => (
                  <li key={idx}>{ea}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {/* Page break before questions */}
      <div className="page-break" />

      {/* 3. Questions & Answers Section */}
      {questions && (
        <section className="mb-8 pt-4">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-300 pb-2 mb-4">
            {t.print.sectionQuestions}
          </h2>

          {/* MCQs */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-slate-900 mb-3">
              {t.print.mcqTitle}
            </h3>
            <div className="space-y-4 text-xs">
              {questions.multipleChoice.map((q, idx) => (
                <div key={idx} className="p-3 border border-slate-200 rounded">
                  <p className="font-bold text-slate-900 mb-2">
                    {idx + 1}. {q.question}
                  </p>
                  <div className={`grid grid-cols-2 gap-1.5 mb-2 ${isRTL ? 'pr-3' : 'pl-3'}`}>
                    {q.options.map((opt, oIdx) => (
                      <div
                        key={oIdx}
                        className={`${
                          oIdx === q.correctIndex
                            ? 'font-bold text-emerald-800'
                            : 'text-slate-600'
                        }`}
                      >
                        ({oIdx + 1}) {opt} {oIdx === q.correctIndex ? '✓' : ''}
                      </div>
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-500 bg-slate-50 p-1.5 rounded">
                    <strong>{language === 'ar' ? 'التفسير:' : 'Explanation:'}</strong> {q.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* True / False */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-slate-900 mb-3">
              {t.print.tfTitle}
            </h3>
            <div className="space-y-2 text-xs">
              {questions.trueFalse.map((q, idx) => (
                <div key={idx} className="p-2.5 border border-slate-200 rounded">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-slate-900">
                      {idx + 1}. {q.statement}
                    </span>
                    <span
                      className={`font-black px-2 py-0.5 rounded text-[10px] ${
                        q.isTrue
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {q.isTrue ? t.questions.trueBtn : t.questions.falseBtn}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    <strong>{language === 'ar' ? 'التعليل:' : 'Explanation:'}</strong> {q.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Short Answer */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-3">
              {t.print.shortTitle}
            </h3>
            <div className="space-y-3 text-xs">
              {questions.shortAnswer.map((q, idx) => (
                <div key={idx} className="p-3 border border-slate-200 rounded">
                  <p className="font-bold text-slate-900 mb-1.5">
                    {language === 'ar' ? `س${idx + 1}:` : `Q${idx + 1}:`} {q.question}
                  </p>
                  <p className="text-slate-700 leading-relaxed mb-2 bg-slate-50 p-2 rounded">
                    <strong>{t.print.modelAnswer}</strong> {q.modelAnswer}
                  </p>
                  {q.keyCriteria.length > 0 && (
                    <p className="text-[11px] text-slate-500">
                      <strong>{t.print.criteria}</strong> {q.keyCriteria.join(' · ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer in print */}
      <div className="text-center text-[10px] text-slate-400 pt-6 border-t border-slate-300 mt-8">
        {t.print.footerText}
      </div>

    </div>
  );
};
