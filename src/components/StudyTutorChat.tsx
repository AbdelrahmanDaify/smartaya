import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface StudyTutorChatProps {
  contextNotes: string;
  lectureTitle?: string;
}

export const StudyTutorChat: React.FC<StudyTutorChatProps> = ({ contextNotes, lectureTitle }) => {
  const { t, isRTL, language } = useLanguage();

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome-msg',
      role: 'assistant',
      content: t.chat.welcome(lectureTitle),
      timestamp: new Date().toLocaleTimeString(language === 'ar' ? 'ar-SA' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (messageText?: string) => {
    const textToSend = (messageText || input).trim();
    if (!textToSend || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString(language === 'ar' ? 'ar-SA' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          contextNotes,
          language,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Request failed');
      }

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.reply || (language === 'ar' ? 'عذراً، لم أستطع تكوين إجابة.' : 'Sorry, could not generate a reply.'),
        timestamp: new Date().toLocaleTimeString(language === 'ar' ? 'ar-SA' : 'en-US', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content: `${language === 'ar' ? 'عذراً، حدث خطأ أثناء الاتصال:' : 'Error during connection:'} ${err.message || ''}`,
          timestamp: new Date().toLocaleTimeString(language === 'ar' ? 'ar-SA' : 'en-US', {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 flex flex-col h-[650px] ${isRTL ? 'text-right' : 'text-left'}`}>
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm shrink-0">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">
              {t.chat.title}
            </h3>
            <p className="text-xs text-slate-500">
              {t.chat.subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 px-3 py-1 rounded-lg font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>{t.chat.aiBadge}</span>
        </div>
      </div>

      {/* Messages Thread */}
      <div className="flex-1 overflow-y-auto py-6 space-y-4 pr-1">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                isRTL
                  ? isUser ? 'flex-row-reverse' : 'flex-row'
                  : isUser ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                  isUser
                    ? 'bg-slate-800 text-white'
                    : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed ${
                  isUser
                    ? 'bg-slate-900 text-white rounded-tl-none'
                    : 'bg-slate-50 border border-slate-200/90 text-slate-800 rounded-tr-none'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>
                <div
                  className={`text-[10px] mt-2 font-mono ${
                    isUser
                      ? isRTL ? 'text-slate-400 text-left' : 'text-slate-400 text-right'
                      : isRTL ? 'text-slate-400 text-right' : 'text-slate-400 text-left'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-600 text-xs flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
              <span>{t.chat.thinking}</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      <div className="pt-2 pb-3 flex flex-wrap gap-2 shrink-0">
        {t.chat.samplePrompts.map((p, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSend(p)}
            disabled={isLoading}
            className={`text-[11px] font-medium text-slate-600 hover:text-emerald-800 bg-slate-100 hover:bg-emerald-50 border border-slate-200 rounded-lg px-2.5 py-1 transition-colors ${
              isRTL ? 'text-right' : 'text-left'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2 pt-2 border-t border-slate-200 shrink-0"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.chat.placeholder}
          disabled={isLoading}
          className="flex-1 px-4 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-slate-900"
        />

        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-sm"
        >
          <span>{t.chat.send}</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

    </div>
  );
};
