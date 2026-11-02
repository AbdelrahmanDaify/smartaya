import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { LandingHero } from './components/LandingHero';
import { FeaturesSection } from './components/FeaturesSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { Footer } from './components/Footer';
import { WorkspaceView } from './components/WorkspaceView';
import { PrintDocumentView } from './components/PrintDocumentView';
import { ProcessedStudyDocument } from './types';
import { SAMPLE_DOCUMENTS, SAMPLE_DOCUMENTS_EN } from './data/sampleNotes';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

function MainApp() {
  const { language } = useLanguage();
  const [currentView, setCurrentView] = useState<'landing' | 'workspace'>('landing');
  const [activeDoc, setActiveDoc] = useState<ProcessedStudyDocument | null>(null);

  const handleStartNow = () => {
    setCurrentView('workspace');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTrySample = () => {
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
    setCurrentView('workspace');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        hasActiveDocument={Boolean(activeDoc)}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {currentView === 'landing' ? (
          <div>
            <LandingHero
              onStartNow={handleStartNow}
              onTrySample={handleTrySample}
            />
            <FeaturesSection />
            <HowItWorksSection onStartNow={handleStartNow} />
          </div>
        ) : (
          <WorkspaceView
            onBackToHome={() => setCurrentView('landing')}
            activeDoc={activeDoc}
            setActiveDoc={setActiveDoc}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigateHome={() => {
          setCurrentView('landing');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenWorkspace={handleStartNow}
      />

      {/* Hidden Vector Print Document (activates only during window.print()) */}
      <PrintDocumentView
        notes={activeDoc?.organized}
        summary={activeDoc?.summary}
        questions={activeDoc?.questions}
        rawText={activeDoc?.extractedText}
        fileName={activeDoc?.fileName}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}
