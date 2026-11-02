import React, { useState } from 'react';
import { OrganizedNotes, StudySummary, QuestionBank } from '../types';
import { Printer, Download, FileText, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ExportPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  notes?: OrganizedNotes;
  summary?: StudySummary;
  questions?: QuestionBank;
  rawText?: string;
  fileName?: string;
}

export const ExportPdfModal: React.FC<ExportPdfModalProps> = ({
  isOpen,
  onClose,
  notes,
  summary,
  questions,
  rawText,
  fileName,
}) => {
  const { t, isRTL, language } = useLanguage();
  const [includeNotes, setIncludeNotes] = useState(true);
  const [includeSummary, setIncludeSummary] = useState(true);
  const [includeQuestions, setIncludeQuestions] = useState(true);
  const [includeRawText, setIncludeRawText] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadMarkdown = () => {
    let mdContent = `# ${notes?.title || (language === 'ar' ? 'مذكرة دراسية' : 'Study Notes')}\n\n`;
    mdContent += `*${t.print.sourceDoc}* ${fileName || 'lecture_notes'}\n`;
    mdContent += `*${t.print.dateLabel}* ${new Date().toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}\n\n---\n\n`;

    if (includeNotes && notes) {
      mdContent += `## ${t.print.sectionNotes}\n\n`;
      mdContent += `### ${t.print.lectureIntro}\n${notes.overview}\n\n`;
      notes.topics.forEach((topic) => {
        mdContent += `### ${topic.heading}\n`;
        topic.subpoints.forEach((sp) => {
          mdContent += `- ${sp}\n`;
        });
        if (topic.notes) mdContent += `*${t.notes.clarificationNote}* ${topic.notes}\n`;
        mdContent += `\n`;
      });

      if (notes.definitions.length > 0) {
        mdContent += `### ${t.print.keyDefinitions}\n`;
        notes.definitions.forEach((d) => {
          mdContent += `- **${d.term}:** ${d.definition}\n`;
        });
        mdContent += `\n`;
      }
    }

    if (includeSummary && summary) {
      mdContent += `## ${t.print.sectionSummary}\n\n`;
      mdContent += `**${t.print.coreIdea}**\n${summary.coreIdea}\n\n`;
      mdContent += `### ${t.print.mainPoints}\n`;
      summary.mainPoints.forEach((p) => {
        mdContent += `- ${p}\n`;
      });
      mdContent += `\n### ${t.print.quickReview}\n`;
      summary.quickReviewBullets.forEach((b) => {
        mdContent += `- ${b}\n`;
      });
      mdContent += `\n`;
    }

    if (includeQuestions && questions) {
      mdContent += `## ${t.print.sectionQuestions}\n\n`;
      mdContent += `### ${t.print.mcqTitle}\n`;
      questions.multipleChoice.forEach((q, idx) => {
        mdContent += `${idx + 1}. ${q.question}\n`;
        q.options.forEach((opt, oIdx) => {
          mdContent += `   [${oIdx === q.correctIndex ? 'x' : ' '}] ${opt}\n`;
        });
        mdContent += `   *${language === 'ar' ? 'التفسير:' : 'Explanation:'}* ${q.explanation}\n\n`;
      });

      mdContent += `### ${t.print.tfTitle}\n`;
      questions.trueFalse.forEach((q, idx) => {
        mdContent += `${idx + 1}. ${q.statement} -> **(${q.isTrue ? t.questions.trueBtn : t.questions.falseBtn})**\n`;
        mdContent += `   *${language === 'ar' ? 'التعليل:' : 'Explanation:'}* ${q.explanation}\n\n`;
      });

      mdContent += `### ${t.print.shortTitle}\n`;
      questions.shortAnswer.forEach((q, idx) => {
        mdContent += `${idx + 1}. **${language === 'ar' ? 'السؤال:' : 'Question:'}** ${q.question}\n`;
        mdContent += `   **${t.print.modelAnswer}** ${q.modelAnswer}\n\n`;
      });
    }

    if (includeRawText && rawText) {
      mdContent += `## ${t.exportModal.includeRawTitle}\n\n\`\`\`\n${rawText}\n\`\`\`\n`;
    }

    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${notes?.title ? notes.title.replace(/\s+/g, '_') : 'study_notes'}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadText = () => {
    let txt = `=== ${notes?.title || t.appName} ===\n\n`;

    if (includeNotes && notes) {
      txt += `[ ${t.print.sectionNotes} ]\n${notes.overview}\n\n`;
      notes.topics.forEach((topic) => {
        txt += `* ${topic.heading}\n`;
        topic.subpoints.forEach((sp) => (txt += `  - ${sp}\n`));
        txt += `\n`;
      });
    }

    if (includeSummary && summary) {
      txt += `\n[ ${t.print.sectionSummary} ]\n${t.print.coreIdea} ${summary.coreIdea}\n\n`;
      summary.mainPoints.forEach((p) => (txt += `- ${p}\n`));
    }

    if (includeQuestions && questions) {
      txt += `\n[ ${t.print.sectionQuestions} ]\n`;
      questions.multipleChoice.forEach((q, i) => {
        txt += `Q${i + 1}: ${q.question}\n`;
        txt += `${language === 'ar' ? 'الإجابة:' : 'Answer:'} ${q.options[q.correctIndex]}\n${q.explanation}\n\n`;
      });
    }

    const blob = new Blob([txt], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${notes?.title ? notes.title.replace(/\s+/g, '_') : 'study_notes'}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs no-print">
      <div className={`bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 animate-in fade-in zoom-in-95 duration-200 ${
        isRTL ? 'text-right' : 'text-left'
      }`}>
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                {t.exportModal.title}
              </h3>
              <p className="text-xs text-slate-500">
                {t.exportModal.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options */}
        <div className="py-5 space-y-3">
          <p className="text-xs font-bold text-slate-700 mb-2">
            {t.exportModal.selectLabel}
          </p>

          <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={includeNotes}
              onChange={(e) => setIncludeNotes(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
            />
            <div className="flex-1">
              <span className="text-sm font-bold text-slate-900 block">
                {t.exportModal.includeNotesTitle}
              </span>
              <span className="text-xs text-slate-500">
                {t.exportModal.includeNotesSub}
              </span>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={includeSummary}
              onChange={(e) => setIncludeSummary(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
            />
            <div className="flex-1">
              <span className="text-sm font-bold text-slate-900 block">
                {t.exportModal.includeSummaryTitle}
              </span>
              <span className="text-xs text-slate-500">
                {t.exportModal.includeSummarySub}
              </span>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={includeQuestions}
              onChange={(e) => setIncludeQuestions(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
            />
            <div className="flex-1">
              <span className="text-sm font-bold text-slate-900 block">
                {t.exportModal.includeQuestionsTitle}
              </span>
              <span className="text-xs text-slate-500">
                {t.exportModal.includeQuestionsSub}
              </span>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={includeRawText}
              onChange={(e) => setIncludeRawText(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
            />
            <div className="flex-1">
              <span className="text-sm font-bold text-slate-900 block">
                {t.exportModal.includeRawTitle}
              </span>
              <span className="text-xs text-slate-500">
                {t.exportModal.includeRawSub}
              </span>
            </div>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-200 space-y-2.5">
          <button
            onClick={handlePrint}
            className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>{t.exportModal.printPdfBtn}</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleDownloadMarkdown}
              className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.exportModal.downloadMd}</span>
            </button>

            <button
              onClick={handleDownloadText}
              className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{t.exportModal.downloadTxt}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
