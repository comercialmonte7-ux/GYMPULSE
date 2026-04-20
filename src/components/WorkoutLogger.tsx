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
      <div className="geometric-card p-8">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
            <Dumbbell size={20} />
          </div>
          Nuevo Ejercicio
        </h2>
        
        <div className="space-y-6">
          <div>
            <label className="label-caps mb-2 block">Selecciona Ejercicio</label>
            <select
              value={selectedMachineId}
              onChange={(e) => setSelectedMachineId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none transition-all"
            >
              <option value="">¿Qué vas a entrenar hoy?</option>
              {MACHINES.map(m => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-4 gap-4 text-center px-4">
              <div className="label-caps">Serie</div>
              <div className="label-caps">Peso (kg)</div>
              <div className="label-caps">Reps</div>
              <div></div>
            </div>
            
            {sets.map((set, index) => (
              <motion.div
                layout
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="grid grid-cols-4 gap-4 items-center bg-white p-3 rounded-2xl border border-slate-100 shadow-sm"
              >
                <div className="font-extrabold text-center text-slate-400">#{index + 1}</div>
                <input
                  type="number"
                  value={set.weight}
                  onChange={(e) => updateSet(index, 'weight', parseFloat(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-center font-bold focus:ring-2 focus:ring-primary outline-none"
                />
                <input
                  type="number"
                  value={set.reps}
                  onChange={(e) => updateSet(index, 'reps', parseInt(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-center font-bold focus:ring-2 focus:ring-primary outline-none"
                />
                <button
                  onClick={() => removeSet(index)}
                  className="text-slate-300 hover:text-rose-500 p-2 flex justify-center transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </motion.div>
            ))}
          </div>

          <div className="flex gap-4 pt-6">
            <button
              onClick={addSet}
              className="flex-1 geometric-button-secondary flex items-center justify-center gap-2 group"
            >
              <Plus size={20} className="group-hover:rotate-90 transition-transform" /> Añadir Serie
            </button>
            <button
              onClick={handleSave}
              disabled={!selectedMachineId}
              className="flex-1 geometric-button-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:bg-slate-300 disabled:shadow-none"
            >
              <Save size={20} /> Guardar
            </button>
          </div>
        </div>
      </div>

      {recentWorkouts.length > 0 && (
        <div className="geometric-card p-8 bg-indigo-900 text-white">
          <h2 className="text-xl font-bold uppercase tracking-tight mb-6 flex items-center gap-2">
            <History size={20} className="text-indigo-400" /> Historial de Hoy
          </h2>
          <div className="space-y-4">
            {recentWorkouts.slice(0, 3).map((w, i) => (
              <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-extrabold text-lg block">{w.name}</span>
                    <span className="text-[10px] uppercase font-bold text-indigo-400">Completado</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-indigo-400">{Math.max(...w.sets.map(s => s.weight))} kg</span>
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
