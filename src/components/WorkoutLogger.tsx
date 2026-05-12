import React, { useState } from 'react';
import { Exercise, Set } from '../types';
import { MACHINES } from '../constants';
import { Plus, Trash2, Save, Dumbbell, History } from 'lucide-react';
import { motion } from 'motion/react';

interface WorkoutLoggerProps {
  onSave: (exercise: Exercise) => void;
  recentWorkouts: Exercise[];
}

export const WorkoutLogger: React.FC<WorkoutLoggerProps> = ({ onSave, recentWorkouts }) => {
  const [selectedMachineId, setSelectedMachineId] = useState('');
  const [sets, setSets] = useState<Set[]>([{ reps: 10, weight: 0, completed: false }]);

  const addSet = () => {
    setSets([...sets, { ...sets[sets.length - 1], completed: false }]);
  };

  const removeSet = (index: number) => {
    setSets(sets.filter((_, i) => i !== index));
  };

  const updateSet = (index: number, field: keyof Set, value: any) => {
    const newSets = [...sets];
    newSets[index] = { ...newSets[index], [field]: value };
    setSets(newSets);
  };

  const handleSave = () => {
    if (!selectedMachineId) return;
    const machine = MACHINES.find(m => m.id === selectedMachineId);
    if (!machine) return;

    onSave({
      id: Math.random().toString(36).substr(2, 9),
      machineId: selectedMachineId,
      name: machine.name,
      sets: [...sets],
      date: new Date().toISOString()
    });

    setSets([{ reps: 10, weight: 0, completed: false }]);
    setSelectedMachineId('');
  };

  return (
    <div className="space-y-6">
      <div className="geometric-card p-8 bg-surface border border-border-subtle">
        <h2 className="text-2xl technical-heading text-bright mb-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-accent-recovery rounded-xl flex items-center justify-center text-black">
            <Dumbbell size={20} />
          </div>
          Entrada Manual
        </h2>
        
        <div className="space-y-6">
          <div>
            <label className="label-caps mb-2 block">Designación de Protocolo</label>
            <select
              value={selectedMachineId}
              onChange={(e) => setSelectedMachineId(e.target.value)}
              className="w-full bg-main border border-border-subtle rounded-xl p-4 font-bold text-lg text-bright focus:outline-none focus:border-accent-recovery appearance-none transition-all"
            >
              <option value="">Seleccionar Equipo...</option>
              {MACHINES.map(m => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-4 gap-4 text-center px-4">
              <div className="label-caps !text-[9px]">Series</div>
              <div className="label-caps !text-[9px]">Carga (kg)</div>
              <div className="label-caps !text-[9px]">Reps</div>
              <div></div>
            </div>
            
            {sets.map((set, index) => (
              <motion.div
                layout
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="grid grid-cols-4 gap-4 items-center bg-white/5 p-3 rounded-2xl border border-white/5"
              >
                <div className="font-mono text-[10px] text-center text-muted">#{index + 1}</div>
                <input
                  type="number"
                  value={set.weight}
                  onChange={(e) => updateSet(index, 'weight', parseFloat(e.target.value))}
                  className="w-full bg-main border border-border-subtle rounded-lg p-2 text-center font-bold text-bright focus:border-accent-recovery outline-none"
                />
                <input
                  type="number"
                  value={set.reps}
                  onChange={(e) => updateSet(index, 'reps', parseInt(e.target.value))}
                  className="w-full bg-main border border-border-subtle rounded-lg p-2 text-center font-bold text-bright focus:border-accent-recovery outline-none"
                />
                <button
                  onClick={() => removeSet(index)}
                  className="text-muted hover:text-accent-strain p-2 flex justify-center transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </motion.div>
            ))}
          </div>

          <div className="flex gap-4 pt-6">
            <button
              onClick={addSet}
              className="flex-1 p-4 rounded-2xl border border-border-subtle text-muted hover:text-bright hover:bg-white/5 transition-all flex items-center justify-center gap-2 label-caps"
            >
              <Plus size={20} /> Añadir Serie
            </button>
            <button
              onClick={handleSave}
              disabled={!selectedMachineId}
              className="geometric-button-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-30 disabled:grayscale"
            >
              <Save size={20} /> Registrar
            </button>
          </div>
        </div>
      </div>

      {recentWorkouts.length > 0 && (
        <div className="geometric-card p-8 bg-accent-recovery/10 border border-accent-recovery/20 text-bright">
          <h2 className="label-caps !text-accent-recovery mb-6 flex items-center gap-2">
            <History size={20} /> Archivo Reciente
          </h2>
          <div className="space-y-4">
            {recentWorkouts.slice(0, 3).map((w, i) => (
              <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/10">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="technical-heading block text-lg">{w.name}</span>
                    <span className="label-caps !text-[8px] text-accent-recovery">Archivado</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-mono text-accent-recovery tabular-nums">{Math.max(...w.sets.map(s => s.weight))} <span className="text-[10px]">KG</span></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
