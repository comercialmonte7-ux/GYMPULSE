import React, { useState } from 'react';
import { getGymAdvice } from '../lib/gemini';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AICoach: React.FC = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: 'INICIALIZANDO... Coach de IA de AthlyPulse en línea. Enlace con HealthKit establecido. Actualmente estoy monitoreando tus niveles de Recuperación y Esfuerzo desde tu Apple Watch. ¿Cómo puedo optimizar tu protocolo hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
        const context = messages.slice(-5).map(m => `${m.role === 'user' ? 'Athlete' : 'Coach'}: ${m.content}`).join('\n') + `\nAthlete: ${userMessage}`;
        const response = await getGymAdvice(context);
        setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
        setMessages(prev => [...prev, { role: 'assistant', content: "ERROR: ENLACE NEURONAL INTERRUMPIDO. REINTENTAR PROTOCOLO." }]);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] max-h-[700px] geometric-card bg-surface overflow-hidden border border-border-subtle shadow-2xl">
      <div className="bg-bright text-black p-6 flex items-center justify-between border-b border-border-subtle">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center shadow-lg">
            <Bot size={24} className="text-accent-recovery" />
          </div>
          <div>
            <h2 className="technical-heading text-lg leading-none uppercase italic">Coach de IA de Pulse</h2>
            <div className="flex items-center gap-1.5 mt-1">
                <span className="w-1.5 h-1.5 bg-accent-recovery rounded-full animate-pulse" />
                <span className="label-caps !text-[7px] !text-black/60">Enlace Biométrico Activo</span>
            </div>
          </div>
        </div>
        <div className="p-3 bg-black/5 rounded-full">
            <Sparkles size={18} />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-main/30 no-scrollbar">
        <AnimatePresence initial={false}>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] p-5 rounded-[2rem] border ${
                msg.role === 'user' 
                  ? 'bg-accent-recovery text-black rounded-tr-sm border-accent-recovery shadow-lg shadow-accent-recovery/20' 
                  : 'bg-surface text-bright rounded-tl-sm border-border-subtle shadow-xl'
              }`}>
                <div className="flex items-center gap-2 mb-3">
                  <div className={`p-1 rounded-lg border ${msg.role === 'user' ? 'bg-black/10 border-black/20' : 'bg-white/5 border-white/10'}`}>
                    {msg.role === 'user' ? <User size={10} /> : <Bot size={10} className="text-accent-recovery" />}
                  </div>
                  <span className={`label-caps !text-[8px] ${msg.role === 'user' ? 'text-black/60' : 'text-accent-recovery'}`}>
                    {msg.role === 'user' ? 'ATLETA' : 'Coach Pulse'}
                  </span>
                </div>
                <p className="text-sm font-medium leading-relaxed font-sans">{msg.content}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-surface border border-border-subtle rounded-[2rem] rounded-tl-sm p-5 shadow-sm">
                <div className="flex gap-1.5 items-center">
                    <div className="w-1.5 h-1.5 bg-accent-recovery rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                    <div className="w-1.5 h-1.5 bg-accent-recovery rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-1.5 h-1.5 bg-accent-recovery rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    <span className="label-caps !text-[8px] ml-2 text-muted">Calculando Estrategia</span>
                </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-surface border-t border-border-subtle shadow-[0_-10px_30px_rgba(0,0,0,0.2)]">
          <div className="relative flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Consultar detalles del protocolo..."
              className="flex-1 bg-main border border-border-subtle rounded-2xl px-6 py-5 text-sm technical-heading uppercase placeholder:text-muted focus:border-accent-recovery outline-none text-bright transition-all"
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="bg-bright text-black p-5 rounded-2xl hover:bg-white shadow-xl shadow-white/5 transition-all disabled:opacity-30 disabled:grayscale"
            >
              <Send size={24} />
            </button>
          </div>
      </div>
    </div>
  );
};
