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
      className="geometric-card p-6 cursor-pointer geometric-card-hover group border-transparent hover:border-indigo-100"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="label-caps">{machine.muscleGroup}</span>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight uppercase italic">{machine.name}</h3>
        </div>
        <div className="flex flex-col items-end gap-2">
            <div className="bg-indigo-50 text-indigo-600 p-2.5 rounded-xl shadow-sm">
                <Info size={18} />
            </div>
            {machine.videoUrl && (
                <div className="bg-emerald-50 text-emerald-600 px-2 py-1 rounded-lg flex items-center gap-1.5 border border-emerald-100 animate-pulse">
                    <Play size={10} fill="currentColor" />
                    <span className="text-[8px] font-black uppercase tracking-tighter">Video Guide</span>
                </div>
            )}
        </div>
      </div>
      <p className="text-sm text-slate-500 font-medium line-clamp-2 mb-6 leading-relaxed">{machine.description}</p>
      <div className="flex items-center text-[10px] font-black uppercase text-indigo-600 tracking-widest group-hover:gap-2 transition-all">
        Ver técnica pro <ChevronRight size={14} />
      </div>
    </motion.div>
  );
};
