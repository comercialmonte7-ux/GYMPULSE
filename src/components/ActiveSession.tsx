import React, { useState } from 'react';
import { Routine, Machine, Exercise, ExerciseDefinition } from '../types';
import { MACHINES } from '../constants';
import { MachineAnimation } from './MachineAnimation';
import { ArrowLeft, ShieldCheck, ChevronRight, ChevronLeft, Timer, Info, Plus, ListFilter, X, Search, Play, Pause } from 'lucide-react';
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
  const [showChrono, setShowChrono] = useState(false);
  
  const [performanceLog, setPerformanceLog] = useState<Record<number, { type: 'set' | 'rest', duration: number }[]>>({});

  const currentDef = exerciseList[currentStep];
  const machine = MACHINES.find(m => m.id === currentDef.machineId);

  const [targetDurations, setTargetDurations] = useState<Record<number, number>>(
    exerciseList.reduce((acc, _, i) => ({ ...acc, [i]: 60 }), {})
  );
  
  const [restGoals, setRestGoals] = useState<Record<number, number>>(
    exerciseList.reduce((acc, _, i) => ({ ...acc, [i]: 60 }), {})
  );

  const currentGoal = targetDurations[currentStep] || 60;
  const currentRestGoal = restGoals[currentStep] || 60;

  const adjustGoal = (amount: number) => {
    setTargetDurations(prev => ({ ...prev, [currentStep]: Math.max(10, prev[currentStep] + amount) }));
  };

  const adjustRestGoal = (amount: number) => {
    setRestGoals(prev => ({ ...prev, [currentStep]: Math.max(10, prev[currentStep] + amount) }));
    if (isResting) setRestTime(prev => Math.max(0, prev + amount));
  };

  React.useEffect(() => {
    let interval: any = null;
    if (isSessionActive && !isSessionPaused) {
      interval = setInterval(() => setSessionTimer(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isSessionActive, isSessionPaused]);

  React.useEffect(() => {
    let interval: any = null;
    if (isExerciseActive && !isResting && !isSessionPaused) {
      interval = setInterval(() => setExerciseTimer(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isExerciseActive, isResting, isSessionPaused]);

  React.useEffect(() => {
    let interval: any = null;
    if (isResting && restTime > 0 && !isSessionPaused) {
      interval = setInterval(() => setRestTime(t => t - 1), 1000);
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
    setPerformanceLog(prev => ({
        ...prev,
        [currentStep]: [...(prev[currentStep] || []), { type: 'set', duration: exerciseTimer }]
    }));
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
      const machine = MACHINES.find(m => m.id === exerciseList[index].machineId);
      const newExercise: Exercise = {
        id: Math.random().toString(36).substr(2, 9),
        machineId: exerciseList[index].machineId,
        name: machine?.name || 'Ejercicio',
        date: new Date().toISOString(),
        duration: exerciseTimer || 45,
        routineName: routine.name,
        sets: Array.from({ length: exerciseList[index].sets }).map(() => ({
          reps: parseInt(exerciseList[index].reps) || 12,
          weight: 0,
          completed: true
        }))
      };
      setSessionExercises([...sessionExercises, newExercise]);
    }
  };

  const handleInstantComplete = (index: number) => {
    if (!isSessionActive) setIsSessionActive(true);
    if (!completedSteps.includes(index)) {
      setCompletedSteps([...completedSteps, index]);
      const exMachine = MACHINES.find(m => m.id === exerciseList[index].machineId);
      const newExercise: Exercise = {
        id: Math.random().toString(36).substr(2, 9),
        machineId: exerciseList[index].machineId,
        name: exMachine?.name || 'Ejercicio',
        date: new Date().toISOString(),
        duration: 45,
        routineName: routine.name,
        sets: Array.from({ length: exerciseList[index].sets }).map(() => ({
          reps: parseInt(exerciseList[index].reps) || 12,
          weight: 0,
          completed: true
        }))
      };
      setSessionExercises(prev => {
        const filtered = prev.filter(ex => ex.machineId !== exerciseList[index].machineId);
        return [...filtered, newExercise];
      });
    }

    if (index < exerciseList.length - 1) {
      setTimeout(() => {
        setCurrentStep(index + 1);
        setIsExerciseActive(false);
        setIsResting(false);
        setExerciseTimer(0);
      }, 300);
    }
  };

  const handleExerciseChange = (idx: number) => {
    setCurrentStep(idx);
    setExerciseTimer(0);
    setIsExerciseActive(false);
    setIsResting(false);
  };

  const addExercise = (m: Machine) => {
    const newDef: ExerciseDefinition = { machineId: m.id, sets: 3, reps: '12', note: 'Extra' };
    setExerciseList([...exerciseList, newDef]);
    setShowAddModal(false);
    handleExerciseChange(exerciseList.length);
  };

  const filteredMachines = MACHINES.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.muscleGroup.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[100] bg-main flex flex-col md:flex-row h-full overflow-hidden">
      {/* Exercise Selector / Sidebar */}
      <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-border-subtle flex flex-col bg-surface shrink-0 max-h-[30vh] md:max-h-full">
        <div className="p-4 md:p-6 border-b border-border-subtle bg-surface/50 backdrop-blur-md">
            <div className="flex justify-between items-center mb-4">
                <button onClick={onClose} className="p-2 -ml-2 text-muted hover:text-bright transition-colors">
                    <ArrowLeft size={20} />
                </button>
                <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/10 text-accent-recovery">
                    <Timer size={14} className="animate-pulse" />
                    <span className="text-[10px] font-mono tabular-nums">{formatTime(sessionTimer)}</span>
                </div>
            </div>
            <h1 className="technical-heading text-sm truncate pr-10">{routine.name}</h1>
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
                            ? 'bg-white/5 border-accent-recovery/50 shadow-lg shadow-accent-recovery/10' 
                            : 'bg-transparent border-transparent hover:bg-white/5'
                        }`}
                    >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 font-mono text-[10px] ${
                            isCompleted 
                            ? 'bg-accent-recovery border-accent-recovery text-black' 
                            : isCurrent ? 'border-accent-recovery text-accent-recovery' : 'border-border-subtle text-muted'
                        }`}>
                            {isCompleted ? <ShieldCheck size={14} /> : String(idx + 1).padStart(2, '0')}
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                            <h4 className={`text-[10px] technical-heading truncate ${isCurrent ? 'text-bright' : 'text-muted'}`}>
                                {exMachine?.name}
                            </h4>
                            <p className="label-caps !text-[8px] mt-0.5">{ex.sets} SETS × {ex.reps}</p>
                        </div>
                    </button>
                );
            })}

            <button 
                onClick={() => setShowAddModal(true)}
                className="inline-flex md:flex items-center justify-center gap-2 p-3 md:p-4 rounded-2xl border-2 border-dashed border-border-subtle text-muted hover:text-bright transition-all label-caps shrink-0 min-w-[150px] md:min-w-0"
            >
                <Plus size={14} /> <span className="hidden md:inline">Inyectar Bloque</span>
            </button>
        </div>

        <div className="hidden md:block p-4 border-t border-border-subtle bg-main">
            <button 
                onClick={() => setIsSessionPaused(!isSessionPaused)}
                className={`w-full p-4 rounded-2xl border transition-all flex items-center justify-center gap-2 label-caps mb-2 ${
                    isSessionPaused 
                    ? 'bg-accent-recovery border-accent-recovery text-black shadow-lg shadow-accent-recovery/20'
                    : 'bg-surface border-border-subtle text-muted hover:text-bright'
                }`}
            >
                {isSessionPaused ? <Play size={16} fill="black" /> : <Pause size={16} fill="white" />}
                {isSessionPaused ? 'Reanudar' : 'Pausar'}
            </button>
            <button 
                onClick={() => onFinish(sessionExercises)}
                className="geometric-button-primary w-full"
            >
                Finalizar Sesión
            </button>
        </div>
      </div>      {/* Dynamic Content Area */}
      <div className="flex-1 flex flex-col bg-main overflow-y-auto relative pb-24 md:pb-0">
        
        {/* Sleek, Adaptive Header of ActiveSession */}
        <div className="bg-surface/80 backdrop-blur-xl border-b border-zinc-800/80 p-4 md:p-6 sticky top-0 z-50 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-6 bg-lime-400 rounded-full animate-pulse" />
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 font-bold block">
                {showChrono ? 'ENTRENAMIENTO CRONOMETRADO' : 'MODO DE ENTRENAMIENTO TRANQUILO'}
              </span>
              <span className="text-xs md:text-sm text-bright font-medium truncate max-w-[180px] md:max-w-xs block">
                {routine.name}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Show/Hide Timers Toggle Button */}
            <button
              onClick={() => setShowChrono(!showChrono)}
              className={`px-3 py-1.5 rounded-full text-[9px] font-mono font-bold uppercase transition-all flex items-center gap-1.5 border ${
                showChrono 
                  ? 'bg-lime-400/10 border-lime-400/40 text-lime-400' 
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              <Timer size={12} className={showChrono ? 'animate-spin' : ''} />
              <span>{showChrono ? 'Cronómetros: ON' : 'Cronómetros: OFF'}</span>
            </button>
            
            {showChrono && (
              <div className="hidden sm:flex items-center gap-2 bg-zinc-950 px-3 py-1.5 rounded-full border border-zinc-800 text-lime-400 text-[10px] font-mono">
                <span>{formatTime(sessionTimer)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Big Interactive Timers Panel (Only shown if showChrono is active) */}
        {showChrono && (
          <div className="bg-surface/40 border-b border-zinc-800/80 p-6 flex flex-wrap items-center justify-center gap-8 md:gap-16">
              <div className="flex flex-col items-center">
                  <span className="label-caps !text-[9px] mb-2 text-zinc-500">Duración Total de la Sesión</span>
                  <div className="text-3xl md:text-4xl technical-heading tabular-nums text-bright flex items-center gap-3">
                      <Timer size={24} className="text-lime-400 animate-pulse" />
                      {formatTime(sessionTimer)}
                  </div>
              </div>

              <div className="h-10 w-px bg-zinc-800 hidden md:block" />

              <div className="flex items-center gap-8">
                  <div className="flex flex-col items-center">
                      <span className={`label-caps !text-[9px] mb-2 ${isResting ? 'text-lime-400' : 'text-orange-400'}`}>
                          {isResting ? 'Periodo de Descanso' : 'Intervalo de Trabajo'}
                      </span>
                      <div className={`text-4xl md:text-5xl technical-heading tabular-nums flex flex-col items-center leading-tight ${isResting ? 'text-lime-400' : 'text-orange-400'}`}>
                          {isResting ? formatTime(restTime) : formatTime(exerciseTimer)}
                          {!isResting && isExerciseActive && (
                              <div className="w-40 h-1 bg-white/10 rounded-full mt-2.5 overflow-hidden">
                                  <motion.div 
                                      className="h-full bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.5)]"
                                      initial={{ width: 0 }}
                                      animate={{ width: `${Math.min(100, (exerciseTimer / currentGoal) * 100)}%` }}
                                  />
                              </div>
                          )}
                      </div>
                  </div>
              </div>
          </div>
        )}

        <AnimatePresence mode="wait">
            <motion.div 
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex-1 overflow-y-auto p-6 md:p-12 flex flex-col items-center"
            >
                <div className="max-w-2xl w-full space-y-10">
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <span className="label-caps !text-lime-400">
                              Bloque {String(currentStep + 1).padStart(2, '0')} <span className="text-zinc-600">/</span> {String(exerciseList.length).padStart(2, '0')}
                            </span>
                            {machine && (
                                <button 
                                    onClick={() => onShowMachineInfo(machine)}
                                    className="bg-zinc-900 text-lime-400 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-zinc-800 hover:border-lime-400/30 hover:bg-lime-400/5 transition-all flex items-center gap-2"
                                >
                                    <Info size={14} /> <span>Guía Técnica</span>
                                </button>
                            )}
                        </div>
                        
                        <h1 className="text-3xl md:text-5xl technical-heading uppercase tracking-tighter leading-none text-white">
                          {machine?.name}
                        </h1>
                        
                        {machine && (
                            <div className="w-full aspect-video md:aspect-[21/10] rounded-[2rem] overflow-hidden border border-zinc-800/80 bg-[#070708]">
                                <MachineAnimation machineId={machine.id} videoUrl={machine.videoUrl} />
                            </div>
                        )}

                        {/* Standard Goal Target (Always visible, instantly tells what to do!) */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-[#0c0c0e] p-6 rounded-2xl border border-zinc-800/80">
                                <span className="label-caps !text-[9px] mb-1 block text-zinc-500">Miras de carga</span>
                                <span className="text-3xl technical-heading text-bright tabular-nums">{currentDef.sets} <span className="text-xs font-mono text-zinc-500">SERIES</span></span>
                            </div>
                            <div className="bg-[#0c0c0e] p-6 rounded-2xl border border-zinc-800/80">
                                <span className="label-caps !text-[9px] mb-1 block text-zinc-500">Esfuerzo</span>
                                <span className="text-3xl technical-heading text-lime-400 tabular-nums">{currentDef.reps} <span className="text-xs font-mono text-zinc-500">REPS</span></span>
                            </div>
                        </div>

                        <p className="text-md text-zinc-400 font-sans leading-relaxed italic border-l-2 border-lime-400/30 pl-4">
                            "{currentDef.note || 'Ejecuta el movimiento con control biomecanico óptimo.'}"
                        </p>
                    </div>

                    {/* Interactive Log Area */}
                    <div className="bg-[#0c0c0e] rounded-2xl p-6 border border-zinc-800/55 space-y-6">
                      <div className="space-y-1">
                        <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-white">
                          ¿Cómo deseas registrar este bloque?
                        </h3>
                        <p className="text-xs text-zinc-400">
                          Consigue mayor concentración neuromuscular interactuando menos con el teléfono.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Instant One-Tap Logger (No timer stress) */}
                        <motion.button
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleInstantComplete(currentStep)}
                          className="bg-lime-400 hover:bg-lime-500 text-black px-6 py-5 rounded-xl font-bold flex flex-col items-center justify-center gap-2 text-center transition-all group cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <ShieldCheck size={18} />
                            <span className="text-xs uppercase tracking-widest font-black">Hecho con 1 Toque</span>
                          </div>
                          <span className="text-[9px] text-zinc-900/70 font-mono tracking-tight leading-none">
                            Marca como listo y pasa al siguiente
                          </span>
                        </motion.button>

                        {/* Chronometer Log Toggle */}
                        <motion.button
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setShowChrono(true);
                            startExercise();
                          }}
                          className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-700 px-6 py-5 rounded-xl font-bold flex flex-col items-center justify-center gap-2 text-center transition-all cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <Timer size={18} className="text-lime-400" />
                            <span className="text-xs uppercase tracking-widest font-bold">Usar Cronómetro</span>
                          </div>
                          <span className="text-[9px] text-zinc-500 font-mono tracking-tight leading-none">
                            Iniciar serie interactiva tiempo a tiempo
                          </span>
                        </motion.button>
                      </div>

                      {completedSteps.includes(currentStep) && (
                        <div className="bg-lime-400/10 border border-lime-400/30 p-4 rounded-xl flex items-center justify-center gap-3 text-lime-400 animate-fade-in">
                          <ShieldCheck size={18} className="text-lime-400 animate-pulse" />
                          <span className="text-[10px] font-bold uppercase tracking-widest font-mono">
                            ¡Marcado como Completado!
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Performance Timeline (Only visible if they use chronometer and logs get saved) */}
                    {(performanceLog[currentStep] || []).length > 0 && (
                        <div className="bg-zinc-950 rounded-2xl p-6 border border-zinc-900">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="label-caps !text-lime-400">Rendimiento Histórico Activo</h3>
                                <div className="h-px bg-zinc-900 flex-1 ml-4" />
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {performanceLog[currentStep]?.map((event, i) => (
                                    <div 
                                        key={i} 
                                        className={`px-3 py-1.5 rounded-xl text-[9px] font-mono font-bold uppercase flex items-center gap-2 border ${
                                            event.type === 'set' 
                                            ? 'bg-orange-400/10 border-orange-400/20 text-orange-400' 
                                            : 'bg-lime-400/10 border-lime-400/20 text-lime-400'
                                        }`}
                                    >
                                        <div className={`w-1.5 h-1.5 rounded-full ${event.type === 'set' ? 'bg-orange-400' : 'bg-lime-400'}`} />
                                        <span>#{i+1}</span>
                                        {event.type === 'set' ? `SERIE ${performanceLog[currentStep].filter((e, idx) => e.type === 'set' && idx <= i).length}` : 'DESC.'}
                                        <span className="opacity-20">|</span>
                                        <span className="font-bold">{formatTime(event.duration)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Traditional control triggers */}
                    {showChrono && (isExerciseActive || isResting) && (
                        <div className="pt-6 flex flex-col gap-3">
                            <button 
                                onClick={isResting ? startExercise : handleStopSerie}
                                className={`w-full py-6 rounded-2xl transition-all flex flex-col items-center justify-center gap-1 group ${
                                    isResting
                                    ? 'bg-lime-400 text-black hover:bg-lime-500'
                                    : 'bg-orange-500 text-white shadow-lg shadow-orange-500/10 hover:scale-[1.01]'
                                }`}
                            >
                                <span className="flex items-center gap-3 technical-heading text-md">
                                    {isResting ? 'Iniciar Siguiente Intervalo' : 'Finalizar Intervalo de Trabajo'}
                                    {isResting ? <Play size={18} fill="black" /> : <Pause size={18} fill="white" />}
                                </span>
                                <span className="text-[8px] font-mono uppercase tracking-wider text-black/60 group-hover:text-black transition-all">
                                    {isResting ? 'Fase de recuperación activa' : 'Guardar intervalo de esfuerzo del músculo'}
                                </span>
                            </button>

                            <button 
                                onClick={() => toggleComplete(currentStep)}
                                className={`w-full py-4 rounded-xl transition-all flex items-center justify-center gap-2 label-caps text-[9px] ${
                                    completedSteps.includes(currentStep)
                                    ? 'bg-lime-400/15 text-lime-400 border border-lime-400/20'
                                    : 'bg-zinc-900 text-zinc-500 border border-zinc-800 hover:text-white hover:border-zinc-700'
                                }`}
                            >
                                {completedSteps.includes(currentStep) ? '✓ Ejercicio Archivados' : 'Archivar Ejercicio Completo como Concluido'}
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>

        {/* Mobile Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-surface/90 backdrop-blur-xl border-t border-border-subtle flex gap-4 md:hidden z-[160]">
            <button 
                onClick={() => setIsSessionPaused(!isSessionPaused)}
                className={`flex-1 p-4 rounded-2xl border transition-all flex items-center justify-center gap-2 label-caps ${
                    isSessionPaused 
                    ? 'bg-accent-recovery text-black border-accent-recovery'
                    : 'bg-surface border-border-subtle text-muted'
                }`}
            >
                {isSessionPaused ? <Play size={16} fill="black" /> : <Pause size={16} fill="white" />}
                {isSessionPaused ? 'Reanudar' : 'Pausar'}
            </button>
            <button 
                onClick={() => onFinish(sessionExercises)}
                className="flex-[1.5] geometric-button-primary"
            >
                Finalizar Sesión
            </button>
        </div>

        {/* Rest Overlay */}
        <AnimatePresence>
            {isResting && (
                <motion.div 
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 100 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[150] w-[calc(100%-4rem)] max-w-xl"
                >
                    <div className="bg-surface p-10 rounded-[3.5rem] shadow-2xl border border-accent-recovery/30 flex items-center justify-between">
                        <div className="space-y-1">
                            <span className="label-caps !text-accent-recovery opacity-60">Recuperación del Sistema</span>
                            <h4 className="text-2xl technical-heading uppercase italic">Oxigenar</h4>
                        </div>
                        <div className="flex items-center gap-8">
                            <div className="text-right">
                                <span className="text-6xl technical-heading tabular-nums text-accent-recovery">{restTime}s</span>
                            </div>
                            <button 
                                onClick={() => setIsResting(false)}
                                className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all"
                            >
                                <Play size={28} fill="black" className="ml-1" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Floating Controls */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 items-center gap-6 bg-surface/50 backdrop-blur-xl border border-white/5 shadow-2xl p-3 rounded-full hidden md:flex">
             <button 
                disabled={currentStep === 0}
                onClick={() => setCurrentStep(currentStep - 1)}
                className="p-3 text-muted hover:text-bright disabled:opacity-10 hover:bg-white/5 rounded-full transition-all"
             >
                <ChevronLeft size={28} />
             </button>
             <div className="flex gap-2 px-4">
                {exerciseList.map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full transition-all ${i === currentStep ? 'w-8 bg-accent-recovery' : 'bg-white/10'}`} />
                ))}
             </div>
             <button 
                disabled={currentStep === exerciseList.length - 1}
                onClick={() => setCurrentStep(currentStep + 1)}
                className="p-3 text-muted hover:text-bright disabled:opacity-10 hover:bg-white/5 rounded-full transition-all"
             >
                <ChevronRight size={28} />
             </button>
        </div>
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {showAddModal && (
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-[200] bg-main/80 backdrop-blur-md flex items-center justify-center p-4"
            >
                <motion.div 
                    initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                    className="bg-surface w-full max-w-2xl rounded-[3rem] border border-border-subtle shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
                >
                    <div className="p-10 border-b border-border-subtle flex justify-between items-center bg-surface sticky top-0">
                        <div>
                            <h2 className="text-3xl technical-heading uppercase leading-none">Biblioteca de Bloques</h2>
                            <p className="label-caps !text-[9px] mt-2">Inyectar protocolo de equipamiento adicional</p>
                        </div>
                        <button onClick={() => setShowAddModal(false)} className="p-3 text-dim hover:text-bright hover:bg-white/5 rounded-full transition-all">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="p-8">
                        <div className="relative">
                            <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-muted" size={20} />
                            <input 
                                type="text"
                                placeholder="BUSCAR EQUIPAMIENTO O GRUPO MUSCULAR..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-20 pr-8 py-8 bg-main border-border-subtle rounded-[2rem] text-sm technical-heading uppercase placeholder:text-muted focus:border-accent-recovery transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 pt-0 space-y-4">
                        {filteredMachines.map((m) => (
                            <button
                                key={m.id}
                                onClick={() => addExercise(m)}
                                className="w-full text-left p-8 rounded-3xl border border-border-subtle hover:border-accent-recovery/50 hover:bg-white/5 transition-all flex items-center justify-between group"
                            >
                                <div className="flex items-center gap-8">
                                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-accent-recovery group-hover:bg-accent-recovery group-hover:text-black transition-all">
                                        <ListFilter size={24} />
                                    </div>
                                    <div>
                                        <span className="label-caps !text-[9px] !text-accent-recovery mb-1 block">{m.muscleGroup}</span>
                                        <h4 className="text-2xl technical-heading uppercase italic tracking-tight">{m.name}</h4>
                                    </div>
                                </div>
                                <Plus size={24} className="text-muted group-hover:text-accent-recovery transition-all" />
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
