import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Cpu, User, Sparkles, AlertCircle, Loader2 } from '@shared/icons';
import adminApiClient from '../../../utils/apiClient';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AiChatPanel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', content: 'Hi! I\'m your AI assistant. Tell me what you want to do — like "Create a new exam category called SSC" or "Show me all exams."' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    const msg = input.trim();
    if (!msg || loading) return;
    setInput('');
    setError('');
    setMessages((prev) => [...prev, { role: 'user', content: msg }]);
    setLoading(true);
    try {
      const { data } = await adminApiClient.post('/ai/chat', {
        message: msg,
        history: messages.map((m) => ({ role: m.role, content: m.content })),
      });
      setMessages((prev) => [...prev, { role: 'assistant', content: data.data.reply }]);
    } catch (err: any) {
      const errMsg = err?.response?.data?.message || err.message || 'Failed to get response';
      setError(errMsg);
      setMessages((prev) => [...prev, { role: 'assistant', content: `❌ ${errMsg}` }]);
    }
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)]">
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-tb-gray-200 dark:border-gray-700 shadow-2xl overflow-hidden flex flex-col max-h-[600px]">
        <div className="flex items-center justify-between px-4 py-3 border-b border-tb-gray-100 dark:border-gray-700 bg-gradient-to-r from-tb-blue to-blue-600">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-white" />
            <span className="text-sm font-bold text-white">AI Assistant</span>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[300px] max-h-[400px]">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-2 ${m.role === 'user' ? 'justify-end' : ''}`}>
              {m.role === 'assistant' && (
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-tb-blue to-blue-600 flex items-center justify-center text-white shrink-0 mt-0.5">
                  <Cpu className="w-3.5 h-3.5" />
                </div>
              )}
              <div className={`rounded-xl px-3.5 py-2.5 text-sm max-w-[80%] ${
                m.role === 'user'
                  ? 'bg-tb-blue text-white rounded-tr-sm'
                  : 'bg-tb-gray-50 dark:bg-gray-700/50 text-tb-gray-700 dark:text-gray-200 rounded-tl-sm'
              }`}>
                {m.content}
              </div>
              {m.role === 'user' && (
                <div className="w-7 h-7 rounded-full bg-tb-gray-200 dark:bg-gray-600 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5 text-tb-gray-500" />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-tb-blue to-blue-600 flex items-center justify-center text-white shrink-0">
                <Cpu className="w-3.5 h-3.5" />
              </div>
              <div className="rounded-xl px-3.5 py-2.5 bg-tb-gray-50 dark:bg-gray-700/50">
                <Loader2 className="w-4 h-4 animate-spin text-tb-blue" />
              </div>
            </div>
          )}
          {error && (
            <div className="flex items-center gap-2 text-xs text-red-500 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {error}
            </div>
          )}
          <div ref={bottomRef} />
        </div>
        <div className="border-t border-tb-gray-100 dark:border-gray-700 p-3">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type a command..."
              className="flex-1 text-sm px-3 py-2 rounded-xl border border-tb-gray-200 dark:border-gray-700 bg-tb-gray-50 dark:bg-gray-700/50 text-tb-navy dark:text-white placeholder-tb-gray-400 focus:outline-none focus:ring-2 focus:ring-tb-blue/30 focus:border-tb-blue transition-all"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="p-2 rounded-xl bg-tb-blue text-white hover:bg-tb-blue-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[10px] text-tb-gray-400 mt-1.5 px-1">Try: "Create SSC category" or "Show all exams"</p>
        </div>
      </div>
    </div>
  );
};

export default AiChatPanel;
