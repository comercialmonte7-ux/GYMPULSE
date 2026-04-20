import React, { useState } from 'react';
import { getGymAdvice } from '../lib/gemini';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AICoach: React.FC = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: '¡Hola! Soy tu Coach GymPulse. Estoy aquí para ayudarte a ti y a tu novia a conquistar el gimnasio. ¿En qué puedo ayudarte hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    const context = messages.slice(-5).map(m => `${m.role === 'user' ? 'Usuario' : 'Entrenador'}: ${m.content}`).join('\n') + `\nUsuario: ${userMessage}`;
    const response = await getGymAdvice(context);

    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] max-h-[600px] geometric-card shadow-lg bg-white overflow-hidden">
      <div className="bg-primary text-white p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
            <Bot size={24} />
          </div>
          <h2 className="font-extrabold text-lg tracking-tight uppercase">Coach AI</h2>
        </div>
        <div className="text-[10px] font-bold uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">En Vivo</div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
        <AnimatePresence initial={false}>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] p-4 rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-slate-900 text-white rounded-tr-none shadow-md' 
                  : 'bg-white text-slate-900 rounded-tl-none border border-slate-200 shadow-sm'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`p-1 rounded-full ${msg.role === 'user' ? 'bg-slate-700' : 'bg-indigo-50 text-indigo-600'}`}>
                    {msg.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${msg.role === 'user' ? 'text-slate-400' : 'text-indigo-400'}`}>
                    {msg.role === 'user' ? 'Tú' : 'Coach Pulse'}
                  </span>
                </div>
                <p className="text-sm font-medium leading-relaxed">{msg.content}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-4 shadow-sm animate-pulse">
              <Loader2 className="animate-spin text-indigo-600" size={18} />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-slate-100 flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="¿Cómo uso la prensa de piernas?..."
          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          className="bg-primary text-white p-3 rounded-xl hover:bg-primary-hover shadow-md shadow-indigo-100 transition-all disabled:opacity-50"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};
