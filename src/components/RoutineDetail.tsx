import React from 'react';
import { Routine, Machine } from '../types';
import { MACHINES } from '../constants';
import { ArrowLeft, Play, Info, CheckCircle2, Clock, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface RoutineDetailProps {
  routine: Routine;
  onBack: () => void;
  onSelectMachine: (machine: Machine) => void;
  onStartLog: () => void;
}

export const RoutineDetail: React.FC<RoutineDetailProps> = ({ routine, onBack, onSelectMachine, onStartLog }) => {
  const estimatedTime = "70-90 min";

  return (
    <div className="space-y-8 pb-20">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 font-bold uppercase text-[10px] tracking-widest hover:text-slate-900 transition-colors"
      >
        <ArrowLeft size={16} /> Volver a Rutinas
      </button>

      <div className="bg-slate-900 text-white p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden shadow-2xl shadow-indigo-100">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/10 rounded-full -ml-16 -mb-16 blur-2xl" />
        
        <div className="relative z-10">
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10 flex items-center gap-2">
              <Clock size={12} className="text-indigo-400" /> {estimatedTime}
            </span>
            <span className="bg-indigo-500/20 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-indigo-500/20 flex items-center gap-2">
              <Zap size={12} className="text-indigo-400" /> {routine.exercises.length} Ejercicios
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 uppercase italic leading-none">{routine.name}</h1>
          <p className="text-slate-400 font-medium leading-relaxed max-w-xl text-lg">
            {routine.description}
          </p>
          <div className="flex gap-4 mt-10">
              <button 
                onClick={onStartLog}
                className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-extrabold uppercase text-sm hover:bg-slate-100 transition-all flex items-center gap-3 shadow-lg"
              >
                <div className="w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center shrink-0">
                  <Play size={12} fill="white" />
                </div>
                Iniciar Sesión
              </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="label-caps px-2">Lista de Ejercicios</h3>
        <div className="space-y-3">
          {routine.exercises.map((ex, idx) => {
            const machine = MACHINES.find(m => m.id === ex.machineId);
            if (!machine) return null;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="geometric-card p-4 flex items-center justify-between group hover:border-indigo-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-50 flex items-center justify-center rounded-xl font-black text-slate-300 text-xl">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 leading-tight flex items-center gap-2">
                        {machine.name}
                        <button 
                            onClick={(e) => { e.stopPropagation(); onSelectMachine(machine); }}
                            className="text-indigo-400 hover:text-indigo-600 p-1"
                        >
                            <Info size={14} />
                        </button>
                    </h4>
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">{machine.muscleGroup}</p>
                    {ex.note && (
                      <p className="text-[10px] font-bold text-indigo-500 italic mt-1 max-w-[200px] md:max-w-xs">{ex.note}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-4 items-center">
                    <div className="text-right">
                        <span className="block text-lg font-black text-indigo-600 leading-none">{ex.sets}x{ex.reps}</span>
                        <span className="text-[10px] font-bold text-slate-300 uppercase">Series x Reps</span>
                    </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-2xl">
          <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-xl text-indigo-600 shadow-sm">
                  <CheckCircle2 size={24} />
              </div>
              <div>
                  <h4 className="font-bold text-indigo-900 mb-1">Entrenamiento Consciente</h4>
                  <p className="text-sm text-indigo-700/70 font-medium">
                      Si es tu primera vez en una máquina, pincha el icono de información (<Info size={12} className="inline"/>) para ver exactamente cómo se ajusta y cómo sentarte. ¡La técnica es lo más importante!
                  </p>
              </div>
          </div>
      </div>
    </div>
  );
};
