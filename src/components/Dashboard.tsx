import React from 'react';
import { Exercise } from '../types';
import { TrendingUp, Calendar, Zap, Heart } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  workouts: Exercise[];
}

export const Dashboard: React.FC<DashboardProps> = ({ workouts }) => {
  const chartData = workouts.slice(-10).map(w => ({
    name: new Date(w.date).toLocaleDateString(),
    weight: Math.max(...w.sets.map(s => s.weight), 0)
  }));

  const totalSets = workouts.reduce((acc, w) => acc + w.sets.length, 0);
  const streak = workouts.length > 0 ? 5 : 0; // Simulated

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex justify-between items-end">
        <div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Tu Progreso</h2>
            <p className="text-slate-500 font-medium">Llevas un buen ritmo esta semana, ¡sigue así!</p>
        </div>
        <div className="bg-indigo-600 text-white p-3 rounded-2xl flex items-center gap-3 shadow-lg shadow-indigo-100">
            <Zap size={20} fill="white" />
            <span className="font-black text-xl leading-none">{streak}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Entrenamientos', value: workouts.length, icon: Calendar, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Series Totales', value: totalSets, icon: Zap, color: 'text-pink-500', bg: 'bg-pink-50' },
          { label: 'Minutos Activo', value: workouts.length * 75, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Con Partner', value: '100%', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-slate-100 p-6 rounded-[2rem] group hover:border-indigo-200 transition-all hover:shadow-xl hover:shadow-indigo-50/50">
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 shadow-sm`}>
              <stat.icon size={22} />
            </div>
            <div>
              <span className="block text-3xl font-black text-slate-900 tracking-tighter mb-1">{stat.value}</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-slate-100 p-8 rounded-[2.5rem] h-[400px] shadow-sm hover:shadow-xl transition-all hover:border-indigo-100">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h3 className="text-lg font-black text-slate-900 leading-none mb-1">Carga Máxima</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Progreso de peso (kg)</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-indigo-600 rounded-full" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Últimos 10 entrenos</span>
                </div>
            </div>
            <div className="h-full pb-16">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                    <defs>
                        <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                    <XAxis dataKey="name" hide />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} />
                    <Tooltip 
                        contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)', padding: '16px' }}
                    />
                    <Line 
                        type="monotone" 
                        dataKey="weight" 
                        stroke="#4f46e5" 
                        strokeWidth={5} 
                        dot={{ r: 6, fill: '#4f46e5', strokeWidth: 3, stroke: '#fff' }} 
                        activeDot={{ r: 8, strokeWidth: 0 }}
                    />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>

        <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
            
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-indigo-500 rounded-lg">
                        <TrendingUp size={20} />
                    </div>
                    <h3 className="text-xs font-black text-indigo-300 uppercase tracking-widest leading-none">Insight Semanal</h3>
                </div>
                <p className="text-xl md:text-2xl font-extrabold leading-tight text-white italic mb-6">
                    "Estás entrenando de forma inteligente. Tu constancia con el pectoral ha subido un 15% este mes."
                </p>
            </div>

            <div className="relative z-10 pt-8 border-t border-white/10">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-pink-500 rounded-2xl flex items-center justify-center shrink-0">
                        <Heart size={24} fill="white" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-white leading-none mb-1">Entrenando Juntos</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Siguiente meta: 10k kg totales</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
