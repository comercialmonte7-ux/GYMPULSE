import React, { useState } from 'react';
import { Exercise } from '../types';
import { Calendar, Clock, ChevronDown, Dumbbell, History as HistoryIcon, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WorkoutHistoryProps {
  workouts: Exercise[];
}

export const WorkoutHistory: React.FC<WorkoutHistoryProps> = ({ workouts }) => {
  const [expandedDate, setExpandedDate] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Group workouts by date
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
        <h2 className="text-3xl technical-heading text-bright tracking-tight uppercase italic underline decoration-accent-recovery decoration-4 underline-offset-8">Registros de Actividad</h2>
        <p className="label-caps !text-[10px] tracking-widest text-dim">Archivo completo de telemetría de protocolos previos</p>
      </div>

      {/* Search & Filter */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-muted group-focus-within:text-accent-recovery transition-colors">
            <Search size={18} />
        </div>
        <input 
            type="text"
            placeholder="FILTRAR POR PROTOCOLO O DESIGNACIÓN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-6 py-5 bg-surface border border-border-subtle rounded-[2rem] text-sm technical-heading uppercase placeholder:text-muted focus:border-accent-recovery outline-none transition-all"
        />
      </div>

      <div className="space-y-4">
        {filteredDates.length === 0 ? (
            <div className="bg-surface border-2 border-dashed border-border-subtle rounded-[3rem] p-16 text-center space-y-4">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto text-muted">
                    <HistoryIcon size={32} />
                </div>
                <div>
                    <h3 className="text-xl technical-heading text-bright uppercase italic">Sin Datos</h3>
                    <p className="label-caps !text-[9px] text-muted">No hay protocolos archivados que coincidan con los criterios especificados</p>
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
                        className={`bg-surface border border-border-subtle rounded-[2.5rem] overflow-hidden transition-all ${isExpanded ? 'shadow-2xl shadow-accent-recovery/10 border-accent-recovery/30' : 'hover:border-border-subtle/80'}`}
                    >
                        {/* Date Header */}
                        <button 
                            onClick={() => setExpandedDate(isExpanded ? null : date)}
                            className="w-full p-6 md:p-8 text-left flex items-center justify-between"
                        >
                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-accent-recovery shrink-0 shadow-inner">
                                    <Calendar size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg md:text-xl technical-heading text-bright uppercase italic leading-none mb-2">{date}</h3>
                                    <div className="flex items-center gap-4">
                                        <span className="label-caps !text-[9px] !text-accent-recovery">{totalExercises} Segmentos</span>
                                        <div className="w-1 h-1 bg-border-subtle rounded-full" />
                                        <span className="label-caps !text-[9px] !text-accent-strain">{totalWeight} KG de Fuerza Acumulada</span>
                                    </div>
                                </div>
                            </div>
                            <div className={`p-2 transition-transform ${isExpanded ? 'rotate-180 text-accent-recovery' : 'text-muted'}`}>
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
                                    className="border-t border-border-subtle bg-black/20"
                                >
                                    <div className="p-4 md:p-8 space-y-3">
                                        {dailyWorkouts.map((workout, idx) => (
                                            <div 
                                                key={workout.id || idx}
                                                className="bg-white/5 border border-white/5 p-5 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-white/10 transition-colors"
                                            >
                                                <div className="flex items-center gap-5">
                                                    <div className="w-12 h-12 bg-lime-400 text-black rounded-xl flex items-center justify-center shrink-0 shadow-lg group-hover:bg-lime-500 transition-colors">
                                                        <Dumbbell size={20} />
                                                    </div>
                                                    <div>
                                                        <h4 className="technical-heading text-bright uppercase italic leading-tight">{workout.name}</h4>
                                                        {workout.routineName && (
                                                           <span className="label-caps !text-[8px] tracking-widest text-accent-recovery/70">{workout.routineName}</span>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap items-center gap-3 md:gap-6 px-4">
                                                    <div className="flex flex-col border-l border-white/10 pl-4 md:pl-6">
                                                        <span className="label-caps !text-[7px] text-muted">Duración</span>
                                                        <div className="flex items-center gap-1.5 text-bright">
                                                            <Clock size={12} className="text-accent-strain" />
                                                            <span className="text-sm font-mono tabular-nums">{formatTime(workout.duration)}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col border-l border-white/10 pl-4 md:pl-6">
                                                        <span className="label-caps !text-[7px] text-muted">Series</span>
                                                        <span className="text-sm technical-heading text-bright">{workout.sets.length} <span className="opacity-30 text-[10px]">Bloques</span></span>
                                                    </div>
                                                    <div className="flex flex-col border-l border-white/10 pl-4 md:pl-6">
                                                        <span className="label-caps !text-[7px] text-muted">Carga Máxima</span>
                                                        <span className="text-sm technical-heading text-accent-recovery">{Math.max(...workout.sets.map(s => s.weight))} <span className="text-[10px] opacity-40">KG</span></span>
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
