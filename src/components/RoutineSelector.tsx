import React from 'react';
import { Routine } from '../types';
import { ROUTINES } from '../constants';
import { motion } from 'motion/react';
import { Target, Users, Zap, ArrowRight, Activity, TrendingUp } from 'lucide-react';

interface RoutineSelectorProps {
  onSelect: (routine: Routine) => void;
}

export const RoutineSelector: React.FC<RoutineSelectorProps> = ({ onSelect }) => {
  const running = ROUTINES.filter(r => r.type === 'running');
  const power = ROUTINES.filter(r => r.id === 'full-body-power' || r.id === 'advanced-athlete-adapt');
  const isolated = ROUTINES.filter(r => r.id.startsWith('foc-'));
  const adaptacion = ROUTINES.filter(r => r.type === 'adaptacion' && !power.some(p => p.id === r.id));
  const localizado = ROUTINES.filter(r => r.type === 'localizado' && !power.some(p => p.id === r.id) && !isolated.some(i => i.id === r.id));

  return (
    <div className="space-y-12">
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-orange-600 text-white rounded-2xl shadow-lg shadow-orange-100">
            <Zap size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Enfoque Muscular</h2>
            <p className="text-sm text-slate-500 font-medium">Sesiones dedicadas a grupos específicos</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {isolated.map(routine => (
            <RoutineCard key={routine.id} routine={routine} onSelect={() => onSelect(routine)} />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-100">
            <TrendingUp size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Plan Running 10K</h2>
            <p className="text-sm text-slate-500 font-medium">Progresión de 4 semanas para consolidar distancia</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {running.map(routine => (
            <RoutineCard key={routine.id} routine={routine} onSelect={() => onSelect(routine)} />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-emerald-600 text-white rounded-2xl shadow-lg shadow-emerald-100">
            <Activity size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Fuerza y Rendimiento</h2>
            <p className="text-sm text-slate-500 font-medium">Cuerpo completo para deportistas avanzados</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {power.map(routine => (
            <RoutineCard key={routine.id} routine={routine} onSelect={() => onSelect(routine)} />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-indigo-600 text-white rounded-lg">
            <Zap size={20} />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Fase 1: Adaptación</h2>
            <p className="text-sm text-slate-500 font-medium">Recomendado para el primer mes</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {adaptacion.map(routine => (
            <RoutineCard key={routine.id} routine={routine} onSelect={() => onSelect(routine)} />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-pink-500 text-white rounded-lg">
            <Target size={20} />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Fase 2: Objetivos Localizados</h2>
            <p className="text-sm text-slate-500 font-medium">Entrenamientos específicos por músculo</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {localizado.map(routine => (
            <RoutineCard key={routine.id} routine={routine} onSelect={() => onSelect(routine)} />
          ))}
        </div>
      </section>
    </div>
  );
};

interface RoutineCardProps {
  routine: Routine;
  onSelect: () => void;
}

const RoutineCard: React.FC<RoutineCardProps> = ({ routine, onSelect }) => {
  const targetLabel = routine.target === 'general' ? 'Para Ambos' : routine.target === 'hombre' ? 'Él' : 'Ella';
  const targetColor = routine.target === 'general' ? 'bg-slate-900' : routine.target === 'hombre' ? 'bg-indigo-600' : 'bg-pink-500';

  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className="geometric-card p-6 cursor-pointer group"
    >
      <div className="flex justify-between items-start mb-4">
        <span className={`${targetColor} text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5`}>
          <Users size={12} /> {targetLabel}
        </span>
        <span className="label-caps">{routine.exercises.length} Ejercicios</span>
      </div>
      <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-2 group-hover:text-indigo-600 transition-colors uppercase">
        {routine.name}
      </h3>
      <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">
        {routine.description}
      </p>
      <div className="flex items-center text-xs font-bold uppercase text-indigo-600 group-hover:gap-2 transition-all">
        Comenzar Rutina <ArrowRight size={14} />
      </div>
    </motion.div>
  );
};
