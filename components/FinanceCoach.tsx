
import React, { useState, useRef, useEffect } from 'react';
import { financeAI } from '../services/gemini';
import { ChatMessage } from '../types';

const FinanceCoach: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      
      const response = await financeAI.getChatResponse(history, input);
      if (response) {
        setMessages(prev => [...prev, { role: 'model', text: response }]);
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: 'Desculpe, tive um problema ao processar sua pergunta. Tente novamente mais tarde.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 rounded-2xl shadow-2xl flex flex-col h-[500px] overflow-hidden border border-slate-800">
      <div className="p-4 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
            🤖
          </div>
          <div>
            <h3 className="text-white font-bold text-sm">Coach Financeiro IA</h3>
            <span className="text-[10px] text-green-400 flex items-center">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1 animate-pulse"></span> Online
            </span>
          </div>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto p-4 space-y-4 scroll-smooth" ref={scrollRef}>
        {messages.length === 0 && (
          <div className="text-center py-8">
            <p className="text-slate-500 text-sm">Como posso te ajudar hoje?</p>
            <div className="mt-4 grid grid-cols-1 gap-2">
              <button 
                onClick={() => setInput("O que são juros compostos?")}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 px-3 rounded-lg transition"
              >
                O que são juros compostos?
              </button>
              <button 
                onClick={() => setInput("Como economizar R$ 1000 por mês?")}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 px-3 rounded-lg transition"
              >
                Como economizar R$ 1000 por mês?
              </button>
              <button 
                onClick={() => setInput("Ideias de renda extra para 2024")}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 px-3 rounded-lg transition"
              >
                Ideias de renda extra para 2024
              </button>
            </div>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-xl text-sm ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-slate-800 text-slate-200 rounded-tl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 p-3 rounded-xl rounded-tl-none">
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-slate-800 border-t border-slate-700">
        <div className="flex space-x-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Pergunte qualquer coisa sobre dinheiro..."
            className="flex-grow bg-slate-900 text-slate-200 text-sm rounded-lg px-4 py-2 border border-slate-700 focus:ring-1 focus:ring-blue-500 outline-none"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition disabled:opacity-50"
          >
            ✈️
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinanceCoach;
