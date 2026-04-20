import React, { useState } from 'react';
import { Routine, Machine, Exercise, ExerciseDefinition } from '../types';
import { MACHINES } from '../constants';
import { ArrowLeft, CheckCircle2, ChevronRight, ChevronLeft, Timer, Info, Plus, ListFilter, X, Search, Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ActiveSessionProps {
  routine: Routine;
  onClose: () => void;
  onFinish: (sessionData: Exercise[]) => void;
  onShowMachineInfo: (machine: Machine) => void;
}

export const ActiveSession: React.FC<ActiveSessionProps> = ({ routine, onClose, onFinish, onShowMachineInfo }) => {
  const [exerciseList, setExerciseList] = useState<ExerciseDefinition[]>(routine.exercises);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [sessionTimer, setSessionTimer] = useState(0);
  const [exerciseTimer, setExerciseTimer] = useState(0);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isExerciseActive, setIsExerciseActive] = useState(false);
  const [isResting, setIsResting] = useState(false);
  const [restTime, setRestTime] = useState(60);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSessionPaused, setIsSessionPaused] = useState(false);
  const [sessionExercises, setSessionExercises] = useState<Exercise[]>([]);
  
  // Per-exercise performance log (sets and rests)
  const [performanceLog, setPerformanceLog] = useState<Record<number, { type: 'set' | 'rest', duration: number }[]>>({});

  const currentDef = exerciseList[currentStep];
  const machine = MACHINES.find(m => m.id === currentDef.machineId);

  // Use a per-exercise target duration state
  const [targetDurations, setTargetDurations] = useState<Record<number, number>>(
    exerciseList.reduce((acc, _, i) => ({ ...acc, [i]: 60 }), {})
  );
  
  // Per-exercise rest duration state
  const [restGoals, setRestGoals] = useState<Record<number, number>>(
    exerciseList.reduce((acc, _, i) => ({ ...acc, [i]: 60 }), {})
  );

  const currentGoal = targetDurations[currentStep] || 60;
  const currentRestGoal = restGoals[currentStep] || 60;

  const adjustGoal = (amount: number) => {
    setTargetDurations(prev => ({
      ...prev,
      [currentStep]: Math.max(10, prev[currentStep] + amount)
    }));
  };

  const adjustRestGoal = (amount: number) => {
    setRestGoals(prev => ({
      ...prev,
      [currentStep]: Math.max(10, prev[currentStep] + amount)
    }));
    // If we are resting, update the live timer proportionally or just reset
    if (isResting) setRestTime(prev => Math.max(0, prev + amount));
  };

  // Global Session Timer
  React.useEffect(() => {
    let interval: any = null;
    if (isSessionActive && !isSessionPaused) {
      interval = setInterval(() => {
        setSessionTimer(t => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSessionActive, isSessionPaused]);

  // Exercise Specific Timer
  React.useEffect(() => {
    let interval: any = null;
    if (isExerciseActive && !isResting && !isSessionPaused) {
      interval = setInterval(() => {
        setExerciseTimer(t => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isExerciseActive, isResting, isSessionPaused]);

  // Rest Timer
  React.useEffect(() => {
    let interval: any = null;
    if (isResting && restTime > 0 && !isSessionPaused) {
      interval = setInterval(() => {
        setRestTime(t => t - 1);
      }, 1000);
    } else if (restTime <= 0 && isResting) {
      setIsResting(false);
      setRestTime(currentRestGoal);
    }
    return () => clearInterval(interval);
  }, [isResting, restTime, isSessionPaused, currentRestGoal]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startExercise = () => {
    if (!isSessionActive) setIsSessionActive(true);
    setIsExerciseActive(true);
    // If we were resting, log the rest duration before starting the next set
    if (isResting) {
        const actualRestTime = currentRestGoal - restTime;
        setPerformanceLog(prev => ({
            ...prev,
            [currentStep]: [...(prev[currentStep] || []), { type: 'rest', duration: actualRestTime }]
        }));
    }
    setIsResting(false);
    setRestTime(currentRestGoal);
  };

  const handleStopSerie = () => {
    // Log the set duration
    setPerformanceLog(prev => ({
        ...prev,
        [currentStep]: [...(prev[currentStep] || []), { type: 'set', duration: exerciseTimer }]
    }));
    
    // Check if we should mark the whole exercise as completed (optional, or just keep going)
    // For now, let's just enter rest mode
    setIsExerciseActive(false);
    setExerciseTimer(0);
    setRestTime(currentRestGoal);
    setIsResting(true);
  };

  const toggleComplete = (index: number) => {
    if (completedSteps.includes(index)) {
      setCompletedSteps(completedSteps.filter(i => i !== index));
      setSessionExercises(sessionExercises.filter(ex => ex.machineId !== exerciseList[index].machineId));
    } else {
      setCompletedSteps([...completedSteps, index]);
      setIsExerciseActive(false);
      setIsResting(false);

      // Create Exercise record for history
      const machine = MACHINES.find(m => m.id === exerciseList[index].machineId);
      const newExercise: Exercise = {
        id: Math.random().toString(36).substr(2, 9),
        machineId: exerciseList[index].machineId,
        name: machine?.name || 'Ejercicio',
        date: new Date().toISOString(),
        sets: Array.from({ length: exerciseList[index].sets }).map(() => ({
          reps: parseInt(exerciseList[index].reps) || 0,
          weight: 0, // Could be enhanced later to allow input
          completed: true
        }))
      };
      setSessionExercises([...sessionExercises, newExercise]);
    }
  };

  const handleExerciseChange = (idx: number) => {
    setCurrentStep(idx);
    setExerciseTimer(0);
    setIsExerciseActive(false);
    setIsResting(false);
    setRestTime(60);
  };

  const addExercise = (m: Machine) => {
    const newDef: ExerciseDefinition = {
      machineId: m.id,
      sets: 3,
      reps: '12',
      note: 'Extra'
    };
    setExerciseList([...exerciseList, newDef]);
    setShowAddModal(false);
    handleExerciseChange(exerciseList.length);
  };

  const filteredMachines = MACHINES.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.muscleGroup.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col md:flex-row h-full overflow-hidden">
      {/* Exercise Selector / History */}
      <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-slate-100 flex flex-col bg-slate-50/50 shrink-0 max-h-[30vh] md:max-h-full">
        <div className="p-4 md:p-6 border-b border-slate-100 bg-white">
            <div className="flex justify-between items-center mb-2 md:mb-4">
                <button onClick={onClose} className="p-2 -ml-2 text-slate-400 hover:text-slate-900 transition-colors">
                    <ArrowLeft size={20} />
                </button>
                <div className="flex items-center gap-2 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100/50 text-indigo-600">
                    <Timer size={14} className="animate-pulse" />
                    <span className="text-xs font-black tabular-nums">{formatTime(sessionTimer)}</span>
                </div>
            </div>
            <h1 className="text-xs md:text-sm font-extrabold text-slate-900 uppercase truncate pr-10">{routine.name}</h1>
        </div>
        
        <div className="flex-1 overflow-x-auto md:overflow-y-auto p-2 md:p-4 flex md:flex-col gap-2 no-scrollbar">
            {exerciseList.map((ex, idx) => {
                const exMachine = MACHINES.find(m => m.id === ex.machineId);
                const isCurrent = currentStep === idx;
                const isCompleted = completedSteps.includes(idx);
                
                return (
                    <button
                        key={idx}
                        onClick={() => handleExerciseChange(idx)}
                        className={`inline-flex md:flex items-center gap-3 p-3 md:p-4 rounded-2xl transition-all border shrink-0 min-w-[200px] md:min-w-0 ${
                            isCurrent 
                            ? 'bg-white border-indigo-200 shadow-lg shadow-indigo-100/50 scale-[1.02]' 
                            : 'bg-transparent border-transparent hover:bg-slate-100'
                        }`}
                    >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 font-black text-[10px] ${
                            isCompleted 
                            ? 'bg-emerald-500 border-emerald-500 text-white' 
                            : isCurrent ? 'border-indigo-600 text-indigo-600' : 'border-slate-200 text-slate-400'
                        }`}>
                            {isCompleted ? <CheckCircle2 size={14} /> : idx + 1}
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                            <h4 className={`text-[10px] md:text-xs font-black truncate uppercase tracking-tighter ${isCurrent ? 'text-indigo-900' : 'text-slate-600'}`}>
                                {exMachine?.name}
                            </h4>
                            <p className="text-[8px] md:text-[10px] text-slate-400 font-bold uppercase">{ex.sets} SERIES × {ex.reps}</p>
                        </div>
                    </button>
                );
            })}

            <button 
                onClick={() => setShowAddModal(true)}
                className="inline-flex md:flex items-center justify-center gap-2 p-3 md:p-4 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 hover:text-indigo-600 transition-all text-[10px] font-black uppercase tracking-widest shrink-0 min-w-[150px] md:min-w-0"
            >
                <Plus size={14} /> <span className="hidden md:inline">Agregar</span>
            </button>
        </div>

        <div className="hidden md:block p-4 border-t border-slate-100 bg-white">
            <button 
                onClick={() => setIsSessionPaused(!isSessionPaused)}
                className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest mb-2 ${
                    isSessionPaused 
                    ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-100'
                    : 'bg-slate-100 border-slate-200 text-slate-600'
                }`}
            >
                {isSessionPaused ? <Play size={16} fill="white" /> : <Pause size={16} fill="currentColor" />}
                {isSessionPaused ? 'Reanudar' : 'Pausar'}
            </button>
            <button 
                onClick={() => onFinish(sessionExercises)}
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:bg-indigo-600 transition-all"
            >
                Terminar Sesión
            </button>
        </div>
      </div>

      {/* Dynamic Content Area */}
      <div className="flex-1 flex flex-col bg-white overflow-y-auto relative pb-24 md:pb-0">
        {/* Intelligent Timer Header */}
        <div className="bg-slate-900 border-b border-white/5 p-4 md:p-6 flex flex-wrap items-center justify-center gap-4 md:gap-12 sticky top-0 z-50 shadow-2xl">
            <div className="flex flex-col items-center">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Sesión Total</span>
                <div className="text-3xl md:text-5xl font-black tabular-nums text-white flex items-center gap-3">
                    <Timer size={24} className="text-indigo-400" />
                    {formatTime(sessionTimer)}
                </div>
            </div>

            <div className="h-10 w-px bg-white/10 hidden md:block" />

            <div className="flex items-center gap-4 md:gap-8">
                <div className="flex flex-col items-center">
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 ${isResting ? 'text-emerald-400' : 'text-orange-400'}`}>
                        {isResting ? 'Descanso' : 'En Actividad'}
                    </span>
                    <div className={`text-3xl md:text-5xl font-black tabular-nums flex flex-col items-center leading-tight ${isResting ? 'text-emerald-400' : 'text-orange-400'}`}>
                        {isResting ? formatTime(restTime) : formatTime(exerciseTimer)}
                        {!isResting && isExerciseActive && (
                            <div className="w-full h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
                                <motion.div 
                                    className="h-full bg-orange-400"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min(100, (exerciseTimer / currentGoal) * 100)}%` }}
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <button 
                        onClick={() => setIsSessionPaused(!isSessionPaused)}
                        className={`px-6 py-2 rounded-full font-black uppercase text-[10px] tracking-widest transition-all ${
                            isSessionPaused 
                            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                    >
                        {isSessionPaused ? 'Continuar' : 'Pausar'}
                    </button>
                    {!isResting && isExerciseActive && (
                        <button 
                            onClick={() => setIsExerciseActive(false)}
                            className="bg-white/5 text-white/40 hover:text-white px-4 py-1 rounded-full text-[8px] font-black uppercase tracking-widest transition-all"
                        >
                            Stop Ejercicio
                        </button>
                    )}
                </div>
            </div>
        </div>

        <AnimatePresence mode="wait">
            <motion.div 
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 overflow-y-auto p-4 md:p-12 flex flex-col items-center"
            >
                <div className="max-w-xl w-full space-y-6 md:space-y-10">
                    <div className="space-y-3 md:space-y-4 text-center md:text-left">
                        <div className="flex items-center justify-between">
                            <span className="label-caps !text-indigo-400">Objetivo {currentStep + 1} / {exerciseList.length}</span>
                            {machine && (
                                <button 
                                    onClick={() => onShowMachineInfo(machine)}
                                    className="bg-indigo-50 text-indigo-600 px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-[8px] md:text-[10px] font-black uppercase tracking-widest border border-indigo-100 hover:bg-indigo-600 hover:text-white transition-all flex items-center gap-2"
                                >
                                    <Info size={14} /> <span className="hidden sm:inline">Guía Pro</span>
                                </button>
                            )}
                        </div>
                        <h1 className="text-3xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase italic leading-tight">{machine?.name}</h1>
                        
                        {/* Interactive Duration Goal */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                            <div className="flex items-center gap-3 md:gap-4 bg-slate-50 p-3 md:p-4 rounded-2xl border border-slate-100">
                                <div className="flex-1 text-left">
                                    <span className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest block">Meta de Serie</span>
                                    <span className="text-lg md:text-xl font-black text-slate-900">{formatTime(currentGoal)}</span>
                                </div>
                                <div className="flex gap-1 md:gap-2">
                                    <button onClick={() => adjustGoal(-10)} className="w-8 h-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors text-[10px] font-bold">-10s</button>
                                    <button onClick={() => adjustGoal(10)} className="w-8 h-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors text-[10px] font-bold">+10s</button>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 md:gap-4 bg-emerald-50/50 p-3 md:p-4 rounded-2xl border border-emerald-100">
                                <div className="flex-1 text-left">
                                    <span className="text-[8px] md:text-[10px] font-black text-emerald-600/60 uppercase tracking-widest block">Descanso Programado</span>
                                    <span className="text-lg md:text-xl font-black text-emerald-700">{formatTime(currentRestGoal)}</span>
                                </div>
                                <div className="flex gap-1 md:gap-2">
                                    <button onClick={() => adjustRestGoal(-10)} className="w-8 h-8 bg-white border border-emerald-200 rounded-lg flex items-center justify-center text-emerald-600 hover:bg-emerald-50 transition-colors text-[10px] font-bold">-10s</button>
                                    <button onClick={() => adjustRestGoal(10)} className="w-8 h-8 bg-white border border-emerald-200 rounded-lg flex items-center justify-center text-emerald-600 hover:bg-emerald-50 transition-colors text-[10px] font-bold">+10s</button>
                                </div>
                            </div>
                        </div>

                        <p className="text-sm md:text-lg text-slate-500 font-medium leading-relaxed italic border-l-4 border-indigo-100 pl-4 md:pl-6 text-left">
                            "{currentDef.note || 'Enfócate en la técnica y el control.'}"
                        </p>
                    </div>

                    {/* Performance Log (Sets and Rests) */}
                    {(performanceLog[currentStep] || []).length > 0 && (
                        <div className="bg-slate-50/50 rounded-3xl p-6 border border-slate-100 overflow-hidden">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-[10px] font-black uppercase text-indigo-400 tracking-widest">Ritmo de esta máquina / Historial</h3>
                                <div className="h-px bg-slate-200 flex-1 ml-4" />
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {performanceLog[currentStep]?.map((event, i) => (
                                    <div 
                                        key={i} 
                                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter flex items-center gap-2 border ${
                                            event.type === 'set' 
                                            ? 'bg-indigo-50 border-indigo-100 text-indigo-600 shadow-sm shadow-indigo-100' 
                                            : 'bg-emerald-50 border-emerald-100 text-emerald-600 shadow-sm shadow-emerald-100'
                                        }`}
                                    >
                                        <div className={`w-1.5 h-1.5 rounded-full ${event.type === 'set' ? 'bg-indigo-400' : 'bg-emerald-400'}`} />
                                        <span className="opacity-40">#{i+1}</span>
                                        {event.type === 'set' ? `SERIE ${performanceLog[currentStep].filter((e, idx) => e.type === 'set' && idx <= i).length}` : 'DESC.'}
                                        <span className="opacity-50">•</span>
                                        <span className="font-black">{formatTime(event.duration)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {!isExerciseActive && !completedSteps.includes(currentStep) ? (
                        <div className="bg-indigo-50 p-6 md:p-12 rounded-[2.5rem] md:rounded-[4rem] text-center space-y-4 md:space-y-6 border border-indigo-100 cursor-pointer hover:bg-indigo-100 transition-all group scale-[1.02]" onClick={startExercise}>
                            <div className="w-16 h-16 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-xl text-indigo-600 group-hover:scale-110 transition-transform">
                                <Play size={32} md:size={48} fill="currentColor" />
                            </div>
                            <div>
                                <h3 className="text-xl md:text-2xl font-black text-indigo-900 uppercase tracking-tighter italic">¿Listo para la serie?</h3>
                                <p className="text-indigo-600/60 font-bold uppercase text-[8px] md:text-[10px] tracking-widest">Presiona para cronometrar tu esfuerzo</p>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-4 md:gap-6 relative">
                            {isSessionPaused && (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="absolute inset-0 z-10 bg-white/60 backdrop-blur-sm rounded-[2rem] md:rounded-[3rem] flex items-center justify-center flex-col gap-2 md:gap-4 border-2 border-dashed border-indigo-200"
                                >
                                    <Pause size={32} md:size={48} className="text-indigo-600 animate-pulse" />
                                    <span className="text-[10px] md:text-sm font-black uppercase text-indigo-900 tracking-widest">Entrenamiento Pausado</span>
                                    <button 
                                        onClick={() => setIsSessionPaused(false)}
                                        className="bg-indigo-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl font-black uppercase text-[10px] tracking-widest"
                                    >
                                        Reanudar
                                    </button>
                                </motion.div>
                            )}
                            <div className="bg-slate-50 p-4 md:p-8 rounded-[2rem] md:rounded-[3rem] border border-slate-100 relative group overflow-hidden">
                                <div className="absolute top-0 right-0 w-16 h-16 md:w-24 md:h-24 bg-indigo-500/5 rounded-full -translate-y-8 md:-translate-y-12 translate-x-8 md:translate-x-12" />
                                <span className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Series Meta</span>
                                <span className="text-4xl md:text-6xl font-black text-slate-900 tabular-nums">{currentDef.sets}</span>
                            </div>
                            <div className="bg-indigo-600 p-4 md:p-8 rounded-[2rem] md:rounded-[3rem] text-white relative group overflow-hidden shadow-2xl shadow-indigo-100">
                                <div className="absolute top-0 right-0 w-16 h-16 md:w-24 md:h-24 bg-white/10 rounded-full -translate-y-8 md:-translate-y-12 translate-x-8 md:translate-x-12" />
                                <span className="text-[8px] md:text-[10px] font-black text-indigo-200 uppercase tracking-widest block mb-1">Reps Meta</span>
                                <span className="text-4xl md:text-6xl font-black tabular-nums">{currentDef.reps}</span>
                            </div>
                        </div>
                    )}

                    {isExerciseActive && (
                        <div className="space-y-4 md:space-y-6">
                            <h3 className="text-[8px] md:text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] flex items-center gap-4">
                                Instrucciones Clave <div className="h-px bg-slate-100 flex-1" />
                            </h3>
                            <div className="grid gap-3 md:gap-4">
                                {machine?.instructions.slice(0, 3).map((inst, i) => (
                                    <div key={i} className="flex gap-4 md:gap-6 items-center bg-white p-4 md:p-6 rounded-[2rem] border border-slate-100 hover:border-indigo-100 transition-colors group">
                                        <div className="w-8 h-8 md:w-10 md:h-10 bg-slate-100 text-slate-400 rounded-xl flex items-center justify-center font-black text-[10px] md:text-xs shrink-0 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                            0{i+1}
                                        </div>
                                        <span className="text-sm md:text-base font-bold text-slate-700 text-left">{inst}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {(isExerciseActive || isResting || completedSteps.includes(currentStep)) && (
                        <div className="pt-6 md:pt-10 flex flex-col gap-4">
                            {!completedSteps.includes(currentStep) && (
                                <button 
                                    onClick={isResting ? startExercise : handleStopSerie}
                                    className={`w-full py-6 md:py-10 rounded-[2.5rem] md:rounded-[3.5rem] font-black uppercase text-base md:text-xl tracking-widest transition-all shadow-2xl flex flex-col items-center justify-center gap-1 ${
                                        isResting
                                        ? 'bg-emerald-500 text-white shadow-emerald-200 border-b-8 border-emerald-700 active:translate-y-2'
                                        : 'bg-indigo-600 text-white shadow-indigo-200 border-b-8 border-indigo-800 hover:scale-[1.02] active:translate-y-2 active:border-b-0'
                                    }`}
                                >
                                    <span className="flex items-center gap-4">
                                        {isResting ? (
                                            <>
                                                EMPEZAR SIGUIENTE SERIE
                                                <Play size={20} md:size={28} fill="currentColor" />
                                            </>
                                        ) : (
                                            <>
                                                STOP SERIE
                                                <X size={20} md:size={28} />
                                            </>
                                        )}
                                    </span>
                                    <span className="text-[8px] md:text-[10px] opacity-60 font-bold">
                                        {isResting ? 'EL DESCANSO SE DETENDRÁ AUTOMÁTICAMENTE' : 'LA DURACIÓN SE GUARDARÁ EN EL HISTORIAL'}
                                    </span>
                                </button>
                            )}

                            <button 
                                onClick={() => toggleComplete(currentStep)}
                                className={`w-full py-4 md:py-6 rounded-[2rem] md:rounded-3xl font-black uppercase text-[10px] md:text-xs tracking-[0.3em] transition-all flex items-center justify-center gap-2 ${
                                    completedSteps.includes(currentStep)
                                    ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                                    : 'bg-slate-100 text-slate-400 hover:bg-slate-900 hover:text-white transition-colors'
                                }`}
                            >
                                {completedSteps.includes(currentStep) ? (
                                    <>
                                        <CheckCircle2 size={16} />
                                        EJERCICIO COMPLETADO (SIGUIENTE)
                                    </>
                                ) : 'MARCAR TODO EL EJERCICIO COMO TERMINADO'}
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>

        {/* Mobile Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-slate-100 flex gap-2 md:hidden z-[160]">
            <button 
                onClick={() => setIsSessionPaused(!isSessionPaused)}
                className={`flex-1 p-4 rounded-2xl border-2 transition-all flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest ${
                    isSessionPaused 
                    ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-100'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
            >
                {isSessionPaused ? <Play size={14} fill="white" /> : <Pause size={14} fill="currentColor" />}
                {isSessionPaused ? 'Reanudar' : 'Pausar'}
            </button>
            <button 
                onClick={() => onFinish(sessionExercises)}
                className="flex-[1.5] bg-slate-900 text-white p-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl"
            >
                Terminar Sesión
            </button>
        </div>

        {/* Rest Timer Overlay */}
        <AnimatePresence>
            {isResting && (
                <motion.div 
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 100 }}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[150] w-[calc(100%-3rem)] max-w-lg"
                >
                    <div className="bg-indigo-900 text-white p-8 rounded-[3rem] shadow-2xl shadow-indigo-200 flex items-center justify-between border-4 border-indigo-500/30">
                        <div className="space-y-1">
                            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Descanso Inteligente</span>
                            <h4 className="text-xl font-black uppercase italic">¡Toma aire!</h4>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="text-right">
                                <span className="text-5xl font-black tabular-nums">{restTime}s</span>
                            </div>
                            <button 
                                onClick={() => setIsResting(false)}
                                className="w-14 h-14 bg-white text-indigo-900 rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all"
                            >
                                <Play size={24} fill="currentColor" className="ml-1" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Floating Navigation Controls for Steps */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl p-2 rounded-full hidden md:flex">
             <button 
                disabled={currentStep === 0}
                onClick={() => setCurrentStep(currentStep - 1)}
                className="p-3 text-slate-400 hover:text-slate-900 disabled:opacity-20 hover:bg-slate-100 rounded-full transition-all"
             >
                <ChevronLeft size={24} />
             </button>
             <div className="flex gap-1 px-4">
                {exerciseList.map((_, i) => (
                    <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentStep ? 'w-6 bg-indigo-600' : 'bg-slate-200'}`} />
                ))}
             </div>
             <button 
                disabled={currentStep === exerciseList.length - 1}
                onClick={() => setCurrentStep(currentStep + 1)}
                className="p-3 text-slate-400 hover:text-slate-900 disabled:opacity-20 hover:bg-slate-100 rounded-full transition-all"
             >
                <ChevronRight size={24} />
             </button>
        </div>
      </div>

      {/* Add Exercise Modal */}
      <AnimatePresence>
        {showAddModal && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[200] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4"
            >
                <motion.div 
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
                >
                    <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0">
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Biblioteca de Ejercicios</h2>
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Elige un equipo o cardio para agregar</p>
                        </div>
                        <button onClick={() => setShowAddModal(false)} className="p-2 text-slate-400 hover:text-slate-900 transition-all hover:bg-slate-50 rounded-full">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="p-6">
                        <div className="relative">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input 
                                type="text"
                                placeholder="BUSCAR MÁQUINA O GRUPO MUSCULAR..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-14 pr-6 py-6 bg-slate-50 border-transparent rounded-[2rem] text-sm font-black uppercase tracking-widest placeholder:text-slate-400 focus:bg-white focus:border-indigo-100 focus:ring-0 transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 pt-0 space-y-3">
                        {filteredMachines.map((m) => (
                            <button
                                key={m.id}
                                onClick={() => addExercise(m)}
                                className="w-full text-left p-6 rounded-3xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/50 hover:shadow-xl hover:shadow-indigo-100/30 transition-all flex items-center justify-between group"
                            >
                                <div className="flex items-center gap-6">
                                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:bg-white border border-transparent group-hover:border-indigo-100 transition-all">
                                        <ListFilter size={24} />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block">{m.muscleGroup}</span>
                                        <h4 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic">{m.name}</h4>
                                    </div>
                                </div>
                                <Plus size={24} className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                            </button>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
