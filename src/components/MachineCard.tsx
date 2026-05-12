import React from 'react';
import { Machine } from '../types';
import { ChevronRight, Info, Play } from 'lucide-react';
import { motion } from 'motion/react';

interface MachineCardProps {
  machine: Machine;
  onClick: () => void;
}

export const MachineCard: React.FC<MachineCardProps> = ({ machine, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="geometric-card p-6 cursor-pointer group border-border-subtle hover:border-accent-recovery transition-all"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 pr-4">
          <span className="label-caps !text-[8px] !text-accent-recovery">{machine.muscleGroup}</span>
          <h3 className="text-xl technical-heading text-bright leading-tight uppercase italic">{machine.name}</h3>
        </div>
        <div className="flex flex-col items-end gap-2">
            <div className="bg-surface text-accent-recovery p-2.5 rounded-xl border border-border-subtle group-hover:border-accent-recovery transition-all shadow-lg">
                <Info size={18} />
            </div>
            {machine.videoUrl && (
                <div className="bg-accent-recovery/10 text-accent-recovery px-2 py-1 rounded-lg flex items-center gap-1.5 border border-accent-recovery/20">
                    <Play size={10} fill="currentColor" className="animate-pulse" />
                    <span className="text-[8px] font-bold uppercase tracking-tighter">Guía HD</span>
                </div>
            )}
        </div>
      </div>
      <p className="text-sm text-dim font-medium line-clamp-2 mb-6 leading-relaxed">{machine.description}</p>
      <div className="flex items-center text-[10px] font-bold uppercase text-accent-recovery tracking-widest group-hover:gap-2 transition-all opacity-80 group-hover:opacity-100">
        Revisar Técnica <ChevronRight size={14} />
      </div>
    </motion.div>
  );
};
