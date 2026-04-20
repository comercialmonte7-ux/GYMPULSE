import React, { useState } from 'react';
import { Exercise } from '../types';
import { Calendar, Clock, ChevronRight, ChevronDown, Dumbbell, History as HistoryIcon, Search, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WorkoutHistoryProps {
  workouts: Exercise[];
}

export const WorkoutHistory: React.FC<WorkoutHistoryProps> = ({ workouts }) => {
  const [expandedDate, setExpandedDate] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Group workouts by date (YYYY-MM-DD)
  const groupedWorkouts = workouts.reduce((acc, workout) => {
    const date = new Date(workout.date).toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    if (!acc[date]) acc[date] = [];
    acc[date].push(workout);
    return acc;
  }, {} as Record<string, Exercise[]>);

  const dates = Object.keys(groupedWorkouts).sort((a, b) => {
      return new Date(groupedWorkouts[b][0].date).getTime() - new Date(groupedWorkouts[a][0].date).getTime();
  });

  const filteredDates = dates.filter(date => {
      const dateWorkouts = groupedWorkouts[date];
      return dateWorkouts.some(w => w.name.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  const formatTime = (seconds?: number) => {
    if (!seconds) return '--:--';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase italic">Mi Bitácora</h2>
        <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest leading-none">Historial completo de tus conquistas</p>
      </div>

      {/* Search & Filter */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
            <Search size={18} />
        </div>
        <input 
            type="text"
            placeholder="Buscar máquina o ejercicio..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-6 py-5 bg-white border border-slate-200 rounded-[2rem] text-sm font-black uppercase tracking-widest placeholder:text-slate-400 focus:border-indigo-100 focus:ring-0 shadow-sm transition-all"
        />
      </div>

      <div className="space-y-4">
        {filteredDates.length === 0 ? (
            <div className="bg-white border-2 border-dashed border-slate-100 rounded-[3rem] p-16 text-center space-y-4">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                    <HistoryIcon size={32} />
                </div>
                <div>
                    <h3 className="text-xl font-black text-slate-900 uppercase italic">Sin registros</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tus entrenamientos aparecerán aquí</p>
                </div>
            </div>
        ) : (
            filteredDates.map((date) => {
                const isExpanded = expandedDate === date;
                const dailyWorkouts = groupedWorkouts[date];
                const totalWeight = dailyWorkouts.reduce((acc, w) => acc + w.sets.reduce((sAcc, s) => sAcc + s.weight, 0), 0);
                const totalExercises = dailyWorkouts.length;

                return (
                    <motion.div 
                        key={date}
                        layout
                        className={`bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden transition-all ${isExpanded ? 'shadow-2xl shadow-indigo-100/50 border-indigo-100' : 'shadow-sm hover:border-slate-200'}`}
                    >
                        {/* Date Header */}
                        <button 
                            onClick={() => setExpandedDate(isExpanded ? null : date)}
                            className="w-full p-6 md:p-8 text-left flex items-center justify-between"
                        >
                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 shrink-0">
                                    <Calendar size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg md:text-xl font-black text-slate-900 uppercase tracking-tighter italic leading-none mb-2">{date}</h3>
                                    <div className="flex items-center gap-4">
                                        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{totalExercises} Ejercicios</span>
                                        <div className="w-1 h-1 bg-slate-200 rounded-full" />
                                        <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{totalWeight} kg totales</span>
                                    </div>
                                </div>
                            </div>
                            <div className={`p-2 transition-transform ${isExpanded ? 'rotate-180 text-indigo-600' : 'text-slate-300'}`}>
                                <ChevronDown size={24} />
                            </div>
                        </button>

                        {/* Exercises List */}
                        <AnimatePresence>
                            {isExpanded && (
                                <motion.div 
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="border-t border-slate-50 bg-slate-50/30"
                                >
                                    <div className="p-4 md:p-8 space-y-3">
                                        {dailyWorkouts.map((workout, idx) => (
                                            <div 
                                                key={workout.id || idx}
                                                className="bg-white border border-slate-100 p-5 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4"
                                            >
                                                <div className="flex items-center gap-5">
                                                    <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-slate-100">
                                                        <Dumbbell size={20} />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-black text-slate-900 uppercase italic leading-tight">{workout.name}</h4>
                                                        {workout.routineName && (
                                                           <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">{workout.routineName}</span>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap items-center gap-3 md:gap-6">
                                                    <div className="flex flex-col border-l border-slate-100 pl-4 md:pl-6">
                                                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Duración</span>
                                                        <div className="flex items-center gap-1.5 text-slate-900">
                                                            <Clock size={12} className="text-orange-400" />
                                                            <span className="text-sm font-black tabular-nums">{formatTime(workout.duration)}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col border-l border-slate-100 pl-4 md:pl-6">
                                                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Series</span>
                                                        <span className="text-sm font-black text-slate-900">{workout.sets.length} <span className="opacity-30">Sets</span></span>
                                                    </div>
                                                    <div className="flex flex-col border-l border-slate-100 pl-4 md:pl-6">
                                                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Mejor Peso</span>
                                                        <span className="text-sm font-black text-emerald-600">{Math.max(...workout.sets.map(s => s.weight))} <span className="text-[10px] opacity-40">kg</span></span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                );
            })
        )}
      </div>
    </div>
  );
};
