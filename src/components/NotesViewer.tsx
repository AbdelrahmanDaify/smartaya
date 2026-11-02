import React, { useState } from 'react';
import { OrganizedNotes } from '../types';
import {
  Edit3,
  Save,
  Copy,
  Check,
  Search,
  BookOpen,
  Sparkles,
  Layers,
  Plus,
  Trash2,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NotesViewerProps {
  notes: OrganizedNotes;
  rawExtractedText?: string;
  onUpdateNotes: (updatedNotes: OrganizedNotes) => void;
}

export const NotesViewer: React.FC<NotesViewerProps> = ({
  notes,
  rawExtractedText,
  onUpdateNotes,
}) => {
  const { t, isRTL } = useLanguage();
  const [activeSubTab, setActiveSubTab] = useState<'structured' | 'raw' | 'markdown'>('structured');
  const [isEditing, setIsEditing] = useState(false);
  const [editedNotes, setEditedNotes] = useState<OrganizedNotes>(notes);
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);

  React.useEffect(() => {
    setEditedNotes(notes);
  }, [notes]);

  const handleCopy = () => {
    const textToCopy =
      activeSubTab === 'raw'
        ? rawExtractedText || ''
        : notes.structuredMarkdown ||
          `${notes.title}\n\n${notes.overview}\n\n` +
          notes.topics.map((item) => `### ${item.heading}\n${item.subpoints.join('\n')}`).join('\n\n');

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveEdit = () => {
    onUpdateNotes(editedNotes);
    setIsEditing(false);
  };

  const handleTopicHeadingChange = (index: number, newHeading: string) => {
    const updated = [...editedNotes.topics];
    updated[index].heading = newHeading;
    setEditedNotes({ ...editedNotes, topics: updated });
  };

  const handleTopicNoteChange = (index: number, newNotes: string) => {
    const updated = [...editedNotes.topics];
    updated[index].notes = newNotes;
    setEditedNotes({ ...editedNotes, topics: updated });
  };

  const handleSubpointChange = (topicIdx: number, subIdx: number, newText: string) => {
    const updated = [...editedNotes.topics];
    updated[topicIdx].subpoints[subIdx] = newText;
    setEditedNotes({ ...editedNotes, topics: updated });
  };

  const handleAddSubpoint = (topicIdx: number) => {
    const updated = [...editedNotes.topics];
    updated[topicIdx].subpoints.push('...');
    setEditedNotes({ ...editedNotes, topics: updated });
  };

  const handleRemoveSubpoint = (topicIdx: number, subIdx: number) => {
    const updated = [...editedNotes.topics];
    updated[topicIdx].subpoints.splice(subIdx, 1);
    setEditedNotes({ ...editedNotes, topics: updated });
  };

  const filteredTopics = notes.topics.filter(
    (item) =>
      item.heading.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subpoints.some((sp) => sp.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.notes && item.notes.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className={`bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 ${isRTL ? 'text-right' : 'text-left'}`}>
      
      {/* Top Header & Actions Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-md">
              {t.notes.badge}
            </span>
            <span className="text-xs text-slate-500">
              {t.notes.stats(notes.topics.length, notes.definitions.length)}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            {isEditing ? (
              <input
                type="text"
                value={editedNotes.title}
                onChange={(e) => setEditedNotes({ ...editedNotes, title: e.target.value })}
                className="w-full px-3 py-1.5 border border-emerald-400 rounded-lg text-lg font-bold text-slate-900 bg-emerald-50/30 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            ) : (
              notes.title
            )}
          </h2>
        </div>

        {/* View Switcher and Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Sub-tabs */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setActiveSubTab('structured')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeSubTab === 'structured'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.notes.viewStructured}
            </button>
            <button
              onClick={() => setActiveSubTab('raw')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeSubTab === 'raw'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.notes.viewRaw}
            </button>
            <button
              onClick={() => setActiveSubTab('markdown')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeSubTab === 'markdown'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.notes.viewMarkdown}
            </button>
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            title={t.notes.copy}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-bold">{t.notes.copied}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>{t.notes.copy}</span>
              </>
            )}
          </button>

          {/* Edit / Save Button */}
          {activeSubTab === 'structured' && (
            isEditing ? (
              <button
                onClick={handleSaveEdit}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-sm"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{t.notes.save}</span>
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{t.notes.edit}</span>
              </button>
            )
          )}
        </div>
      </div>

      {/* Structured View */}
      {activeSubTab === 'structured' && (
        <div className="pt-6 space-y-8">
          
          {/* Overview Section */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80">
            <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">
              {t.notes.overviewTitle}
            </h4>
            {isEditing ? (
              <textarea
                value={editedNotes.overview}
                onChange={(e) => setEditedNotes({ ...editedNotes, overview: e.target.value })}
                rows={3}
                className="w-full p-2.5 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
              />
            ) : (
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                {notes.overview}
              </p>
            )}
          </div>

          {/* Search Box */}
          <div className="relative max-w-md">
            <Search className={`w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-3.5' : 'left-3.5'}`} />
            <input
              type="text"
              placeholder={t.notes.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full py-2 text-xs sm:text-sm border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-slate-800 ${
                isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'
              }`}
            />
          </div>

          {/* Topics and Headings */}
          <div className="space-y-6">
            {(isEditing ? editedNotes.topics : filteredTopics).map((topic, tIdx) => (
              <div
                key={tIdx}
                className="p-6 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all bg-white"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  {isEditing ? (
                    <input
                      type="text"
                      value={topic.heading}
                      onChange={(e) => handleTopicHeadingChange(tIdx, e.target.value)}
                      className="w-full font-bold text-slate-900 border-b border-emerald-400 pb-1 focus:outline-none text-base"
                    />
                  ) : (
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>{topic.heading}</span>
                    </h3>
                  )}
                </div>

                {/* Subpoints */}
                <ul className={`space-y-2.5 mb-4 ${isRTL ? 'pr-4 border-r-2 border-emerald-100' : 'pl-4 border-l-2 border-emerald-100'}`}>
                  {topic.subpoints.map((sp, spIdx) => (
                    <li key={spIdx} className="text-sm text-slate-700 leading-relaxed flex items-start gap-2">
                      {isEditing ? (
                        <div className="flex items-center gap-2 w-full">
                          <input
                            type="text"
                            value={sp}
                            onChange={(e) => handleSubpointChange(tIdx, spIdx, e.target.value)}
                            className="w-full px-2 py-1 text-sm border border-slate-300 rounded bg-slate-50 focus:bg-white"
                          />
                          <button
                            onClick={() => handleRemoveSubpoint(tIdx, spIdx)}
                            className="text-rose-500 hover:text-rose-700 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <span className="text-emerald-600 font-bold">•</span>
                          <span>{sp}</span>
                        </>
                      )}
                    </li>
                  ))}
                </ul>

                {isEditing && (
                  <button
                    onClick={() => handleAddSubpoint(tIdx)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 mb-4"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{t.notes.addSubpoint}</span>
                  </button>
                )}

                {/* Topic Notes or Clarification */}
                {topic.notes && (
                  <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 leading-relaxed">
                    <span className="font-bold ml-1">{t.notes.clarificationNote}</span>
                    {isEditing ? (
                      <textarea
                        value={topic.notes}
                        onChange={(e) => handleTopicNoteChange(tIdx, e.target.value)}
                        className="w-full mt-1 p-2 text-xs border border-amber-300 rounded bg-white"
                        rows={2}
                      />
                    ) : (
                      <span>{topic.notes}</span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Definitions and Terms */}
          {notes.definitions && notes.definitions.length > 0 && (
            <div className="pt-4">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-600" />
                <span>{t.notes.definitionsTitle}</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {notes.definitions.map((def, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white transition-colors"
                  >
                    <h5 className="font-bold text-emerald-800 text-sm mb-1.5">
                      {def.term}
                    </h5>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {def.definition}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Takeaways */}
          {notes.keyTakeaways && notes.keyTakeaways.length > 0 && (
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-900 to-teal-950 text-white">
              <h4 className="text-base font-bold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <span>{t.notes.takeawaysTitle}</span>
              </h4>
              <ul className={`space-y-2.5 text-xs sm:text-sm text-emerald-100 ${isRTL ? 'pr-2' : 'pl-2'}`}>
                {notes.keyTakeaways.map((kt, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                    <span className="text-emerald-400 font-bold shrink-0">✓</span>
                    <span>{kt}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      )}

      {/* Raw Extracted Text View (OCR) */}
      {activeSubTab === 'raw' && (
        <div className="pt-6 space-y-4">
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs sm:text-sm flex items-start gap-3">
            <Layers className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold mb-1">
                {t.notes.rawNoticeTitle}
              </p>
              <p className="text-blue-800/80 text-xs">
                {t.notes.rawNoticeSub}
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs sm:text-sm whitespace-pre-wrap leading-relaxed border border-slate-800 overflow-x-auto max-h-[600px] overflow-y-auto">
            {rawExtractedText || t.notes.rawPlaceholder}
          </div>
        </div>
      )}

      {/* Markdown View */}
      {activeSubTab === 'markdown' && (
        <div className="pt-6 space-y-4">
          <p className="text-xs text-slate-500">
            {t.notes.markdownSub}
          </p>
          <div className="p-6 rounded-2xl bg-slate-900 text-emerald-400 font-mono text-xs sm:text-sm whitespace-pre-wrap leading-relaxed border border-slate-800 max-h-[600px] overflow-y-auto">
            {notes.structuredMarkdown || ''}
          </div>
        </div>
      )}

    </div>
  );
};
