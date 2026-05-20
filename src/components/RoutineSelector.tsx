import React from 'react';
import { Routine } from '../types';
import { ROUTINES } from '../constants';
import { motion } from 'motion/react';
import { Target, Users, Zap, ArrowRight, Activity, TrendingUp, ShieldCheck } from 'lucide-react';

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
      <Section 
        title="Enfoque Muscular" 
        subtitle="Sesiones dedicadas a grupos específicos" 
        icon={<Zap size={22} className="text-lime-400" />} 
        color="bg-[#0c0c0e] border border-zinc-800/80 text-lime-400 shadow-md shadow-lime-400/5" 
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {isolated.map(routine => (
            <RoutineCard key={routine.id} routine={routine} onSelect={() => onSelect(routine)} />
          ))}
        </div>
      </Section>

      <Section 
        title="Plan Running 10K" 
        subtitle="Progresión de 4 semanas para consolidar distancia" 
        icon={<TrendingUp size={22} className="text-lime-400" />} 
        color="bg-[#0c0c0e] border border-zinc-800/80 text-lime-400 shadow-md shadow-lime-400/5" 
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {running.map(routine => (
            <RoutineCard key={routine.id} routine={routine} onSelect={() => onSelect(routine)} />
          ))}
        </div>
      </Section>

      <Section 
        title="Fuerza y Rendimiento" 
        subtitle="Cuerpo completo para deportistas avanzados" 
        icon={<Activity size={22} className="text-lime-400" />} 
        color="bg-[#0c0c0e] border border-zinc-800/80 text-lime-400 shadow-md shadow-lime-400/5" 
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {power.map(routine => (
            <RoutineCard key={routine.id} routine={routine} onSelect={() => onSelect(routine)} />
          ))}
        </div>
      </Section>

      <Section 
        title="Fase 1: Adaptación" 
        subtitle="Recomendado para el primer mes" 
        icon={<ShieldCheck size={22} className="text-lime-400" />} 
        color="bg-[#0c0c0e] border border-zinc-800/80 text-lime-400 shadow-md shadow-lime-400/5" 
      >
        <div className="grid grid-cols-1 gap-4">
          {adaptacion.map(routine => (
            <RoutineCard key={routine.id} routine={routine} onSelect={() => onSelect(routine)} />
          ))}
        </div>
      </Section>
    </div>
  );
};

interface SectionProps {
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    color: string;
    children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, subtitle, icon, color, children }) => (
    <section>
        <div className="flex items-center gap-3 mb-8">
          <div className={`p-3 ${color} rounded-2xl shadow-lg`}>
            {icon}
          </div>
          <div>
            <h2 className="text-2xl technical-heading">{title}</h2>
            <p className="label-caps tracking-[0.1em] text-dim mt-1">{subtitle}</p>
          </div>
        </div>
        {children}
    </section>
);

interface RoutineCardProps {
  routine: Routine;
  onSelect: () => void;
}

const RoutineCard: React.FC<RoutineCardProps> = ({ routine, onSelect }) => {
  const targetLabel = routine.target === 'general' ? 'Unisex' : routine.target === 'hombre' ? 'Hombres' : 'Mujeres';
  const targetColor = routine.target === 'general' 
    ? 'bg-zinc-900/80 text-zinc-300 border border-zinc-800' 
    : routine.target === 'hombre' 
      ? 'bg-lime-400/10 text-lime-400 border border-lime-400/30' 
      : 'bg-lime-500/15 text-lime-300 border border-lime-500/20';

  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className="geometric-card p-6 cursor-pointer group geometric-card-hover"
    >
      <div className="flex justify-between items-start mb-6">
        <span className={`${targetColor} px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest flex items-center gap-1.5`}>
          <Users size={12} /> {targetLabel}
        </span>
        <span className="label-caps !text-[9px]">{routine.exercises.length} Bloques de Entrenamiento</span>
      </div>
      <h3 className="text-xl technical-heading mb-2 group-hover:text-accent-recovery transition-colors">
        {routine.name}
      </h3>
      <p className="text-sm text-dim font-medium leading-relaxed mb-6 line-clamp-2">
        {routine.description}
      </p>
      <div className="flex items-center text-[10px] font-bold uppercase tracking-[0.15em] text-accent-recovery opacity-80 group-hover:opacity-100 group-hover:gap-3 transition-all">
        Iniciar Protocolo <ArrowRight size={14} />
      </div>
    </motion.div>
  );
};
