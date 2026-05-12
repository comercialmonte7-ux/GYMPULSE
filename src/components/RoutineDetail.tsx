import React from 'react';
import { Routine, Machine } from '../types';
import { MACHINES } from '../constants';
import { ArrowLeft, Play, Info, Clock, Zap, ShieldCheck } from 'lucide-react';
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
        className="flex items-center gap-2 text-dim font-bold uppercase text-[10px] tracking-widest hover:text-white transition-colors"
      >
        <ArrowLeft size={16} /> Página Anterior
      </button>

      <div className="bg-surface p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden border border-border-subtle">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-recovery/5 rounded-full -mr-32 -mt-32 blur-3xl" />
        
        <div className="relative z-10">
          <div className="flex flex-wrap gap-3 mb-8">
            <span className="bg-white/5 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border border-white/10 flex items-center gap-2">
              <Clock size={12} className="text-accent-recovery" /> {estimatedTime}
            </span>
            <span className="bg-white/5 px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border border-white/10 flex items-center gap-2">
              <Zap size={12} className="text-accent-strain" /> {routine.exercises.length} Segmentos
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl technical-heading mb-6 tracking-tighter uppercase leading-none">{routine.name}</h1>
          <p className="text-dim font-medium leading-relaxed max-w-xl text-lg">
            {routine.description}
          </p>
          <div className="flex gap-4 mt-12">
              <button 
                onClick={onStartLog}
                className="geometric-button-primary flex items-center gap-3"
              >
                <Play size={14} fill="black" />
                Iniciar Sesión
              </button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="label-caps px-2">Bloques de Entrenamiento</h3>
        <div className="space-y-4">
          {routine.exercises.map((ex, idx) => {
            const machine = MACHINES.find(m => m.id === ex.machineId);
            if (!machine) return null;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => onSelectMachine(machine)}
                className="geometric-card p-5 flex items-center justify-between group geometric-card-hover cursor-pointer"
              >
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-2xl font-mono text-muted text-xl group-hover:bg-accent-recovery/10 group-hover:text-accent-recovery transition-colors">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h4 className="technical-heading text-lg leading-tight flex items-center gap-2">
                        {machine.name}
                        <div className="text-muted group-hover:text-accent-recovery transition-colors">
                            <Info size={14} />
                        </div>
                    </h4>
                    <p className="label-caps !text-[9px] mt-1">{machine.muscleGroup}</p>
                    {ex.note && (
                      <p className="text-[10px] font-bold text-accent-recovery italic mt-2 opacity-80">{ex.note}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-4 items-center">
                    <div className="text-right">
                        <span className="block text-2xl font-mono text-white leading-none tracking-tighter">{ex.sets}<span className="text-muted mx-1">/</span>{ex.reps}</span>
                        <span className="label-caps !text-[8px]">Series / Reps</span>
                    </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="bg-accent-recovery/5 border border-accent-recovery/20 p-8 rounded-3xl">
          <div className="flex items-start gap-4">
              <div className="p-3 bg-white text-black rounded-2xl shadow-sm h-fit">
                  <ShieldCheck size={24} />
              </div>
              <div className="pt-1">
                  <h4 className="technical-heading text-lg mb-2">Aseguramiento Técnico</h4>
                  <p className="text-sm text-dim font-medium leading-relaxed">
                      El rendimiento atlético crece con la precisión técnica. Antes de iniciar un bloque, revisa el protocolo de configuración para asegurar la optimización neuromuscular.
                  </p>
              </div>
          </div>
      </div>
    </div>
  );
};
