import React, { useState } from 'react';
import {
  ProcessedStudyDocument,
  OrganizedNotes,
  StudySummary,
  QuestionBank
} from '../types';
import { DocumentUploader } from './DocumentUploader';
import { NotesViewer } from './NotesViewer';
import { SummaryViewer } from './SummaryViewer';
import { QuestionsBankViewer } from './QuestionsBankViewer';
import { StudyTutorChat } from './StudyTutorChat';
import { ExportPdfModal } from './ExportPdfModal';
import { SAMPLE_DOCUMENTS, SAMPLE_DOCUMENTS_EN } from '../data/sampleNotes';
import {
  FileText,
  Sparkles,
  HelpCircle,
  MessageSquare,
  Printer,
  Loader2,
  AlertCircle,
  Trash2,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface WorkspaceViewProps {
  onBackToHome: () => void;
  activeDoc: ProcessedStudyDocument | null;
  setActiveDoc: React.Dispatch<React.SetStateAction<ProcessedStudyDocument | null>>;
}

export const WorkspaceView: React.FC<WorkspaceViewProps> = ({
  onBackToHome,
  activeDoc,
  setActiveDoc,
}) => {
  const { t, isRTL, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'notes' | 'summary' | 'questions' | 'chat'>('notes');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isRegeneratingQuiz, setIsRegeneratingQuiz] = useState(false);

  // Regenerate questions with requested count without re-uploading
  const handleRegenerateQuestions = async (count: number | 'auto') => {
    if (!activeDoc || !activeDoc.extractedText) return;

    setIsRegeneratingQuiz(true);
    setErrorMessage(null);
    try {
      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: activeDoc.extractedText,
          language,
          questionCount: count,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate questions');
      }

      if (data.questions) {
        setActiveDoc({
          ...activeDoc,
          questions: data.questions,
        });
      }
    } catch (err: any) {
      console.error('Error regenerating questions:', err);
      setErrorMessage(
        err.message ||
          (language === 'ar'
            ? 'حدث خطأ أثناء إعادة توليد الأسئلة.'
            : 'Error while regenerating questions.')
      );
    } finally {
      setIsRegeneratingQuiz(false);
    }
  };

  // Load sample document based on active language
  const handleLoadSample = () => {
    const sample = language === 'en' ? SAMPLE_DOCUMENTS_EN[0] : SAMPLE_DOCUMENTS[0];
    const newDoc: ProcessedStudyDocument = {
      id: `doc-${Date.now()}`,
      fileName: sample.fileName,
      mimeType: sample.mimeType,
      extractedText: sample.rawText,
      organized: sample.organized,
      summary: sample.summary,
      questions: sample.questions,
      createdAt: new Date().toISOString(),
    };
    setActiveDoc(newDoc);
    setErrorMessage(null);
  };

  // Process uploaded file through real Gemini API backend
  const handleFileUploaded = async ({
    fileName,
    mimeType,
    fileData,
    filePreview,
  }: {
    fileName: string;
    mimeType: string;
    fileData: string;
    filePreview?: string;
  }) => {
    setIsProcessing(true);
    setErrorMessage(null);
    setProcessingStep(
      language === 'ar'
        ? 'جاري قراءة واستخراج النصوص بخط اليد والمطبوعة عبر Gemini...'
        : 'Extracting handwritten and printed text via Gemini OCR...'
    );

    try {
      // Step 1: Extract Text
      const extractRes = await fetch('/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileData, mimeType, fileName }),
      });

      const extractData = await extractRes.json();
      if (!extractRes.ok) {
        throw new Error(
          extractData.error ||
            (language === 'ar' ? 'فشل في استخراج النصوص من المستند.' : 'Failed to extract text from document.')
        );
      }

      const extractedText = extractData.extractedText;

      // Step 2: Organize notes, summary, and questions
      setProcessingStep(
        language === 'ar'
          ? 'جاري هيكلة المحتوى وتنظيم العناوين والمصطلحات...'
          : 'Structuring content into headings and definitions...'
      );
      const organizePromise = fetch('/api/organize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawText: extractedText, language }),
      }).then((r) => r.json());

      setProcessingStep(
        language === 'ar'
          ? 'جاري توليد الملخص الامتحاني وبنك الأسئلة التفاعلي...'
          : 'Generating exam summary and interactive question bank...'
      );
      const summaryPromise = fetch('/api/summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: extractedText, title: fileName, language }),
      }).then((r) => r.json());

      const questionsPromise = fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: extractedText, language }),
      }).then((r) => r.json());

      const [orgResult, sumResult, qResult] = await Promise.all([
        organizePromise,
        summaryPromise,
        questionsPromise,
      ]);

      const organizedNotes: OrganizedNotes = orgResult.data || {
        title: fileName,
        overview: language === 'ar' ? 'تم استخراج النص بنجاح.' : 'Text extracted successfully.',
        topics: [
          {
            heading: language === 'ar' ? 'محتوى المستند' : 'Document Content',
            subpoints: [extractedText],
          },
        ],
        definitions: [],
        keyTakeaways: [],
        structuredMarkdown: extractedText,
      };

      const studySummary: StudySummary = sumResult.summary || {
        coreIdea: language === 'ar' ? 'ملخص المستند' : 'Document Summary',
        mainPoints: [language === 'ar' ? 'محتوى مستخرج' : 'Extracted content'],
        essentialDefinitions: [],
        quickReviewBullets: [],
        examAlerts: [],
      };

      const questionBank: QuestionBank = qResult.questions || {
        multipleChoice: [],
        trueFalse: [],
        shortAnswer: [],
      };

      const newDoc: ProcessedStudyDocument = {
        id: `doc-${Date.now()}`,
        fileName,
        filePreview,
        mimeType,
        extractedText,
        organized: organizedNotes,
        summary: studySummary,
        questions: questionBank,
        createdAt: new Date().toISOString(),
      };

      setActiveDoc(newDoc);
      setActiveTab('notes');
    } catch (err: any) {
      console.error('Processing error:', err);
      setErrorMessage(
        err.message ||
          (language === 'ar'
            ? 'حدث خطأ أثناء معالجة المستند بالذكاء الاصطناعي. الرجاء التأكد من وضوح الملف والمحاولة مرة أخرى.'
            : 'Error processing document with AI. Please check file clarity and try again.')
      );
    } finally {
      setIsProcessing(false);
      setProcessingStep('');
    }
  };

  const handleUpdateNotes = (updated: OrganizedNotes) => {
    if (!activeDoc) return;
    setActiveDoc({
      ...activeDoc,
      organized: updated,
    });
  };

  const handleClearDoc = () => {
    setActiveDoc(null);
    setErrorMessage(null);
  };

  return (
    <div className={`py-8 bg-slate-50 min-h-screen no-print ${isRTL ? 'text-right' : 'text-left'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Workspace Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <button
                onClick={onBackToHome}
                className="text-xs font-semibold text-slate-500 hover:text-emerald-700 transition-colors flex items-center gap-1"
              >
                <span>{t.workspace.breadcrumbHome}</span>
                <span className="text-slate-300">/</span>
              </button>
              <span className="text-xs font-bold text-emerald-800">
                {t.workspace.breadcrumbWorkspace}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              {activeDoc?.organized?.title || t.workspace.mainTitle}
            </h1>
          </div>

          {activeDoc && (
            <div className="flex items-center gap-2 self-start sm:self-center">
              <button
                onClick={() => setIsExportModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-sm"
              >
                <Printer className="w-4 h-4" />
                <span>{t.workspace.exportPdf}</span>
              </button>

              <button
                onClick={handleClearDoc}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors"
                title={t.workspace.newDocument}
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">{t.workspace.newDocument}</span>
              </button>
            </div>
          )}
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-bold mb-1">{t.workspace.errorTitle}</p>
              <p className="text-rose-800 text-xs">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Processing Indicator Banner */}
        {isProcessing && (
          <div className="p-6 rounded-2xl bg-white border border-emerald-300 shadow-lg text-center space-y-4 animate-pulse">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                {t.workspace.processingDoc}
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                {processingStep}
              </p>
            </div>
            <div className="max-w-md mx-auto bg-slate-100 rounded-full h-2 overflow-hidden">
              <div className="bg-emerald-500 h-full w-2/3 rounded-full animate-pulse" />
            </div>
          </div>
        )}

        {/* Document Uploader */}
        <DocumentUploader
          onFileProcessed={handleFileUploaded}
          onLoadSample={handleLoadSample}
          isProcessing={isProcessing}
          currentFileName={activeDoc?.fileName}
          currentPreview={activeDoc?.filePreview}
          onClear={handleClearDoc}
        />

        {/* If Document is Processed, Render Tabs & Content */}
        {activeDoc && activeDoc.organized && (
          <div className="space-y-6">
            
            {/* Workspace Tabs Navigation */}
            <div className="flex items-center gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl overflow-x-auto shadow-xs">
              <button
                onClick={() => setActiveTab('notes')}
                className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap ${
                  activeTab === 'notes'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>{t.workspace.tabs.notes}</span>
              </button>

              <button
                onClick={() => setActiveTab('summary')}
                className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap ${
                  activeTab === 'summary'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>{t.workspace.tabs.summary}</span>
              </button>

              <button
                onClick={() => setActiveTab('questions')}
                className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap ${
                  activeTab === 'questions'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                <span>{t.workspace.tabs.questions}</span>
              </button>

              <button
                onClick={() => setActiveTab('chat')}
                className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap ${
                  activeTab === 'chat'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t.workspace.tabs.chat}</span>
              </button>
            </div>

            {/* Active Tab Content */}
            {activeTab === 'notes' && (
              <NotesViewer
                notes={activeDoc.organized}
                rawExtractedText={activeDoc.extractedText}
                onUpdateNotes={handleUpdateNotes}
              />
            )}

            {activeTab === 'summary' && activeDoc.summary && (
              <SummaryViewer
                summary={activeDoc.summary}
                docTitle={activeDoc.organized.title}
              />
            )}

            {activeTab === 'questions' && activeDoc.questions && (
              <QuestionsBankViewer
                questions={activeDoc.questions}
                onRegenerateQuestions={handleRegenerateQuestions}
                isRegenerating={isRegeneratingQuiz}
              />
            )}

            {activeTab === 'chat' && (
              <StudyTutorChat
                contextNotes={activeDoc.extractedText}
                lectureTitle={activeDoc.organized.title}
              />
            )}

          </div>
        )}

      </div>

      {/* Export & Print Modal */}
      {activeDoc && (
        <ExportPdfModal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
          notes={activeDoc.organized}
          summary={activeDoc.summary}
          questions={activeDoc.questions}
          rawText={activeDoc.extractedText}
          fileName={activeDoc.fileName}
        />
      )}

    </div>
  );
};
