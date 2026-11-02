import React, { useRef, useState } from 'react';
import { UploadCloud, FileText, RefreshCw, Trash2, AlertCircle, BookOpen } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface DocumentUploaderProps {
  onFileProcessed: (data: {
    fileName: string;
    mimeType: string;
    fileData: string;
    filePreview?: string;
  }) => void;
  onLoadSample: () => void;
  isProcessing: boolean;
  currentFileName?: string;
  currentPreview?: string;
  onClear: () => void;
}

export const DocumentUploader: React.FC<DocumentUploaderProps> = ({
  onFileProcessed,
  onLoadSample,
  isProcessing,
  currentFileName,
  currentPreview,
  onClear,
}) => {
  const { t, isRTL } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const processFile = (file: File) => {
    setErrorMessage(null);

    const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrorMessage(t.uploader.errors.invalidType);
      return;
    }

    if (file.size > 30 * 1024 * 1024) {
      setErrorMessage(t.uploader.errors.tooLarge);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const isImg = file.type.startsWith('image/');
      onFileProcessed({
        fileName: file.name,
        mimeType: file.type,
        fileData: result,
        filePreview: isImg ? result : undefined,
      });
    };
    reader.onerror = () => {
      setErrorMessage(t.uploader.errors.readFailed);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className={`bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 ${isRTL ? 'text-right' : 'text-left'}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-1">
            {t.uploader.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {t.uploader.subtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={onLoadSample}
          disabled={isProcessing}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200/80 rounded-xl transition-colors whitespace-nowrap self-start sm:self-auto"
        >
          <BookOpen className="w-4 h-4 text-emerald-600" />
          <span>{t.uploader.loadSample}</span>
        </button>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* When no file is selected */}
      {!currentFileName ? (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all ${
            dragActive
              ? 'border-emerald-500 bg-emerald-50/50 scale-[0.99]'
              : 'border-slate-300 hover:border-emerald-500 hover:bg-slate-50/80'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,image/png,image/jpeg,image/jpg,image/webp"
            onChange={handleChange}
            className="hidden"
          />

          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-inner">
            <UploadCloud className="w-8 h-8" />
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
            {t.uploader.dragDropText}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-6">
            {t.uploader.dragDropSub}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
            <span className="px-2.5 py-1 bg-slate-100 rounded-md">PDF</span>
            <span className="px-2.5 py-1 bg-slate-100 rounded-md">JPG / JPEG</span>
            <span className="px-2.5 py-1 bg-slate-100 rounded-md">PNG</span>
            <span className="px-2.5 py-1 bg-slate-100 rounded-md">WEBP</span>
            <span className="text-slate-400">{t.uploader.fileLimit}</span>
          </div>
        </div>
      ) : (
        /* File is selected / loaded */
        <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/70">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {currentPreview ? (
                <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-200 shrink-0 bg-white">
                  <img
                    src={currentPreview}
                    alt={t.uploader.uploadedSuccess}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-xl bg-emerald-100/70 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0">
                  <FileText className="w-8 h-8" />
                </div>
              )}

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100/60 px-2 py-0.5 rounded">
                    {t.uploader.uploadedSuccess}
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-slate-900 break-all max-w-sm">
                  {currentFileName}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  {t.uploader.readyForAnalysis}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isProcessing}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors"
                title={t.uploader.replace}
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{t.uploader.replace}</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,image/png,image/jpeg,image/jpg,image/webp"
                onChange={handleChange}
                className="hidden"
              />

              <button
                type="button"
                onClick={onClear}
                disabled={isProcessing}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors"
                title={t.uploader.delete}
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{t.uploader.delete}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
