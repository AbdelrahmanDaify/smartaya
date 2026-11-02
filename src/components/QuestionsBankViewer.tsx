import React, { useState } from 'react';
import { QuestionBank } from '../types';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  Eye,
  Award,
  Sparkles,
  RefreshCw,
  AlertCircle,
  Sliders,
  Loader2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface QuestionsBankViewerProps {
  questions: QuestionBank;
  onRegenerateQuestions?: (count: number | 'auto') => Promise<void> | void;
  isRegenerating?: boolean;
}

export const QuestionsBankViewer: React.FC<QuestionsBankViewerProps> = ({
  questions,
  onRegenerateQuestions,
  isRegenerating = false,
}) => {
  const { t, isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState<'mcq' | 'tf' | 'short'>('mcq');

  // Selected target question count
  const [selectedCount, setSelectedCount] = useState<number | 'auto'>(
    questions.requestedCount || 'auto'
  );

  const [selectedMCQ, setSelectedMCQ] = useState<Record<string, number>>({});
  const [selectedTF, setSelectedTF] = useState<Record<string, boolean>>({});
  const [revealedShort, setRevealedShort] = useState<Record<string, boolean>>({});

  const handleResetQuiz = () => {
    setSelectedMCQ({});
    setSelectedTF({});
    setRevealedShort({});
  };

  const handleApplyRegenerate = () => {
    if (onRegenerateQuestions && !isRegenerating) {
      handleResetQuiz();
      onRegenerateQuestions(selectedCount);
    }
  };

  const mcqCorrectCount = questions.multipleChoice.reduce((acc, q) => {
    return selectedMCQ[q.id] === q.correctIndex ? acc + 1 : acc;
  }, 0);

  const tfCorrectCount = questions.trueFalse.reduce((acc, q) => {
    return selectedTF[q.id] === q.isTrue ? acc + 1 : acc;
  }, 0);

  const totalCorrect = mcqCorrectCount + tfCorrectCount;
  const totalGradable = questions.multipleChoice.length + questions.trueFalse.length;
  const totalAllQuestions =
    questions.multipleChoice.length +
    questions.trueFalse.length +
    questions.shortAnswer.length;

  const countOptions: Array<{ value: number | 'auto'; label: string }> = [
    { value: 'auto', label: t.questions.autoOption },
    { value: 5, label: '5' },
    { value: 10, label: '10' },
    { value: 15, label: '15' },
    { value: 20, label: '20' },
    { value: 25, label: '25' },
    { value: 30, label: '30' },
  ];

  return (
    <div className={`bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>
      
      {/* Top Header & Score Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-md">
              {t.questions.badge}
            </span>
            <span className="text-xs text-slate-500">
              {t.questions.stats(
                questions.multipleChoice.length,
                questions.trueFalse.length,
                questions.shortAnswer.length
              )}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            {t.questions.title}
          </h2>
        </div>

        {/* Live Score Counter & Reset */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-center">
            <div className="text-[11px] text-slate-500 font-semibold">{t.questions.currentScore}</div>
            <div className="text-base font-extrabold text-emerald-700 tabular-nums">
              {totalCorrect} / {totalGradable}
            </div>
          </div>

          <button
            onClick={handleResetQuiz}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            title={t.questions.resetQuiz}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.questions.resetQuiz}</span>
          </button>
        </div>
      </div>

      {/* Configurable Question Count Control Bar */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
            <Sliders className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{t.questions.countLabel}</span>
          </div>

          {/* Selector buttons / pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {countOptions.map((opt) => {
              const isSelected = selectedCount === opt.value;
              return (
                <button
                  key={opt.value.toString()}
                  type="button"
                  onClick={() => setSelectedCount(opt.value)}
                  disabled={isRegenerating}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-xs font-bold'
                      : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Regenerate Action Button */}
        {onRegenerateQuestions && (
          <button
            type="button"
            onClick={handleApplyRegenerate}
            disabled={isRegenerating}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-emerald-900 bg-emerald-100 hover:bg-emerald-200/80 active:bg-emerald-300 border border-emerald-300 rounded-xl transition-all shadow-xs disabled:opacity-60 whitespace-nowrap self-start lg:self-center"
          >
            {isRegenerating ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-700" />
                <span>{t.questions.generating}</span>
              </>
            ) : (
              <>
                <RefreshCw className="w-3.5 h-3.5 text-emerald-700" />
                <span>{t.questions.regenerateBtn}</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Notice if requested count could not be reached without duplicate/fabricated questions */}
      {questions.noteIfNotReached && (
        <div className="p-4 rounded-xl bg-amber-50/90 border border-amber-200/80 text-amber-950 text-xs sm:text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1 leading-relaxed">
            <span className="font-bold block mb-1">
              {t.questions.coverageNotice}
            </span>
            <p className="text-amber-900 text-xs sm:text-sm">
              {questions.noteIfNotReached}
            </p>
            <p className="text-[11px] text-amber-800/80 mt-1">
              {isRTL
                ? `تم توليد ${totalAllQuestions} سؤالاً موثقاً من صلب المحاضرة حرصاً على الأمانة العلمية وتفادي تكرار الأفكار أو اختلاق معلومات وهمية.`
                : `Generated ${totalAllQuestions} verified questions strictly based on the lecture material to preserve factual integrity and avoid duplicate or fabricated concepts.`}
            </p>
          </div>
        </div>
      )}

      {/* Tabs for Question Types */}
      <div className="flex items-center p-1 bg-slate-100 rounded-xl max-w-lg">
        <button
          onClick={() => setActiveTab('mcq')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            activeTab === 'mcq'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {t.questions.tabMcq(questions.multipleChoice.length)}
        </button>
        <button
          onClick={() => setActiveTab('tf')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            activeTab === 'tf'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {t.questions.tabTf(questions.trueFalse.length)}
        </button>
        <button
          onClick={() => setActiveTab('short')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            activeTab === 'short'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {t.questions.tabShort(questions.shortAnswer.length)}
        </button>
      </div>

      {/* 1. Multiple Choice Questions */}
      {activeTab === 'mcq' && (
        <div className="space-y-6">
          {questions.multipleChoice.map((q, qIdx) => {
            const hasAnswered = selectedMCQ[q.id] !== undefined;
            const chosenOption = selectedMCQ[q.id];
            const isCorrect = chosenOption === q.correctIndex;

            return (
              <div
                key={q.id || qIdx}
                className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 transition-all"
              >
                <div className="flex items-start gap-3 mb-4">
                  <span className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {qIdx + 1}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {q.question}
                  </h3>
                </div>

                {/* Options List */}
                <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 ${isRTL ? 'pr-10' : 'pl-10'}`}>
                  {q.options.map((opt, optIdx) => {
                    const isSelected = chosenOption === optIdx;
                    const isRightOption = optIdx === q.correctIndex;

                    let btnClass = 'border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-800';

                    if (hasAnswered) {
                      if (isRightOption) {
                        btnClass = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-500/30';
                      } else if (isSelected && !isRightOption) {
                        btnClass = 'border-rose-400 bg-rose-50 text-rose-900 font-semibold';
                      } else {
                        btnClass = 'border-slate-200 bg-slate-50/50 text-slate-400 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => setSelectedMCQ({ ...selectedMCQ, [q.id]: optIdx })}
                        className={`p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${
                          isRTL ? 'text-right' : 'text-left'
                        } ${btnClass}`}
                      >
                        <span className="flex-1 leading-relaxed">{opt}</span>
                        {hasAnswered && isRightOption && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                        {hasAnswered && isSelected && !isRightOption && (
                          <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation feedback */}
                {hasAnswered && (
                  <div
                    className={`mt-4 p-4 rounded-xl text-xs sm:text-sm leading-relaxed ${
                      isCorrect
                        ? 'bg-emerald-50/80 border border-emerald-200 text-emerald-950'
                        : 'bg-rose-50/80 border border-rose-200 text-rose-950'
                    }`}
                  >
                    <div className="font-bold flex items-center gap-1.5 mb-1">
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>{t.questions.correctAlert}</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-rose-600" />
                          <span>{t.questions.incorrectAlert(q.options[q.correctIndex])}</span>
                        </>
                      )}
                    </div>
                    <p className="text-slate-700 mt-1">{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* 2. True / False Questions */}
      {activeTab === 'tf' && (
        <div className="space-y-6">
          {questions.trueFalse.map((q, qIdx) => {
            const hasAnswered = selectedTF[q.id] !== undefined;
            const chosenValue = selectedTF[q.id];
            const isCorrect = chosenValue === q.isTrue;

            return (
              <div
                key={q.id || qIdx}
                className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 transition-all"
              >
                <div className="flex items-start gap-3 mb-4">
                  <span className="w-7 h-7 rounded-xl bg-teal-100 text-teal-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {qIdx + 1}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {q.statement}
                  </h3>
                </div>

                {/* True / False Buttons */}
                <div className={`flex items-center gap-4 mb-4 ${isRTL ? 'pr-10' : 'pl-10'}`}>
                  <button
                    type="button"
                    onClick={() => setSelectedTF({ ...selectedTF, [q.id]: true })}
                    className={`px-6 py-2.5 rounded-xl border text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                      hasAnswered
                        ? q.isTrue
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-500/20'
                          : chosenValue === true
                          ? 'border-rose-400 bg-rose-50 text-rose-800'
                          : 'border-slate-200 text-slate-400'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800'
                    }`}
                  >
                    <span>{t.questions.trueBtn}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedTF({ ...selectedTF, [q.id]: false })}
                    className={`px-6 py-2.5 rounded-xl border text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                      hasAnswered
                        ? !q.isTrue
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-500/20'
                          : chosenValue === false
                          ? 'border-rose-400 bg-rose-50 text-rose-800'
                          : 'border-slate-200 text-slate-400'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800'
                    }`}
                  >
                    <span>{t.questions.falseBtn}</span>
                  </button>
                </div>

                {/* Explanation */}
                {hasAnswered && (
                  <div
                    className={`p-4 rounded-xl text-xs sm:text-sm leading-relaxed ${
                      isCorrect
                        ? 'bg-emerald-50/80 border border-emerald-200 text-emerald-950'
                        : 'bg-rose-50/80 border border-rose-200 text-rose-950'
                    }`}
                  >
                    <div className="font-bold flex items-center gap-1.5 mb-1">
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>
                            {t.questions.correctTfAlert(q.isTrue ? t.questions.trueBtn : t.questions.falseBtn)}
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-rose-600" />
                          <span>
                            {t.questions.incorrectTfAlert(q.isTrue ? t.questions.trueBtn : t.questions.falseBtn)}
                          </span>
                        </>
                      )}
                    </div>
                    <p className="text-slate-700 mt-1">{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* 3. Short Answer Questions */}
      {activeTab === 'short' && (
        <div className="space-y-6">
          {questions.shortAnswer.map((q, qIdx) => {
            const isRevealed = Boolean(revealedShort[q.id]);

            return (
              <div
                key={q.id || qIdx}
                className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 transition-all"
              >
                <div className="flex items-start gap-3 mb-4">
                  <span className="w-7 h-7 rounded-xl bg-purple-100 text-purple-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {qIdx + 1}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug mb-3">
                      {q.question}
                    </h3>

                    <button
                      type="button"
                      onClick={() =>
                        setRevealedShort({ ...revealedShort, [q.id]: !isRevealed })
                      }
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{isRevealed ? t.questions.hideAnswer : t.questions.showAnswer}</span>
                    </button>
                  </div>
                </div>

                {isRevealed && (
                  <div className="mt-4 p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-emerald-600" />
                        <span>{t.questions.modelAnswerTitle}</span>
                      </h4>
                      <p className={`text-sm text-slate-700 leading-relaxed font-normal ${isRTL ? 'pr-5' : 'pl-5'}`}>
                        {q.modelAnswer}
                      </p>
                    </div>

                    {q.keyCriteria && q.keyCriteria.length > 0 && (
                      <div className="pt-3 border-t border-slate-200/80">
                        <h5 className="text-xs font-bold text-slate-600 mb-2">
                          {t.questions.criteriaTitle}
                        </h5>
                        <ul className={`space-y-1.5 text-xs text-slate-600 ${isRTL ? 'pr-4' : 'pl-4'}`}>
                          {q.keyCriteria.map((crit, cIdx) => (
                            <li key={cIdx} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              <span>{crit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
