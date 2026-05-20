import React, { useState, useEffect } from 'react';
import { EXERCISES } from '../exerciseData';
import { Machine, Exercise } from '../types';
import { MachineAnimation } from './MachineAnimation';
import { 
  TrendingUp, Zap, Heart, ShieldCheck, Activity, ChevronRight, Info, Watch, X, 
  Settings, User as UserIcon, Scale, Ruler, Eye, ArrowRight, Play, BookOpen, Star, HelpCircle, Dumbbell, Sparkles, Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { auth, db } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface DashboardProps {
  workouts: Exercise[];
  onNavigate: (tab: 'dash' | 'routines' | 'history' | 'coach' | 'machines') => void;
  onSaveWorkout?: (exercise: Exercise) => void;
}

interface UserMetrics {
  weight: number; // in kg
  height: number; // in cm
  age: number;
  gender: 'male' | 'female';
  activityLevel: 'sedentary' | 'moderate' | 'active' | 'athlete';
  objective: 'gain_muscle' | 'lose_fat' | 'endurance' | 'health';
}

export const Dashboard: React.FC<DashboardProps> = ({ workouts, onNavigate, onSaveWorkout }) => {
  // Muscle States
  const [selectedMuscle, setSelectedMuscle] = useState<string>('Pierna');
  const [viewMode, setViewMode] = useState<'front' | 'back'>('front');
  const [hoveredMuscle, setHoveredMuscle] = useState<string | null>(null);
  
  // Exercise detail modal
  const [activeExercise, setActiveExercise] = useState<Machine | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  
  // Quick logging state inside modal
  const [isLogging, setIsLogging] = useState(false);
  const [logReps, setLogReps] = useState<number>(10);
  const [logWeight, setLogWeight] = useState<number>(20);
  const [logSaved, setLogSaved] = useState(false);

  // Profile & Biometrics states
  const [metrics, setMetrics] = useState<UserMetrics>({
    weight: 70,
    height: 170,
    age: 28,
    gender: 'male',
    activityLevel: 'moderate',
    objective: 'gain_muscle'
  });
  const [isEditingMetrics, setIsEditingMetrics] = useState(false);
  const [tempMetrics, setTempMetrics] = useState<UserMetrics>({ ...metrics });
  const [savingMetrics, setSavingMetrics] = useState(false);

  // Load from local storage or Firestore on mount/auth state change
  useEffect(() => {
    const loadMetrics = async () => {
      // Check local storage first for immediate load
      const cached = localStorage.getItem('athly-pulse-user-metrics');
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          setMetrics(parsed);
          setTempMetrics(parsed);
        } catch (e) {
          console.error("Error parsing local metrics", e);
        }
      }

      // Check firebase if logged in
      const currentUser = auth?.currentUser;
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists() && userDoc.data().metrics) {
            const fbMetrics = userDoc.data().metrics as UserMetrics;
            setMetrics(fbMetrics);
            setTempMetrics(fbMetrics);
            localStorage.setItem('athly-pulse-user-metrics', JSON.stringify(fbMetrics));
          }
        } catch (error) {
          console.error("Error drawing metrics from Firestore:", error);
        }
      }
    };

    loadMetrics();
  }, [auth?.currentUser]);

  // Handle saving physical metrics
  const handleSaveMetrics = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingMetrics(true);
    try {
      setMetrics(tempMetrics);
      localStorage.setItem('athly-pulse-user-metrics', JSON.stringify(tempMetrics));

      const currentUser = auth?.currentUser;
      if (currentUser) {
        await setDoc(doc(db, 'users', currentUser.uid), {
          metrics: tempMetrics
        }, { merge: true });
      }
      setIsEditingMetrics(false);
    } catch (error) {
      console.error("Error updating metrics", error);
      alert("Hubo un problema al guardar tus métricas.");
    } finally {
      setSavingMetrics(false);
    }
  };

  // Telemetry Calculations
  const heightInMeters = metrics.height / 100;
  const imc = parseFloat((metrics.weight / (heightInMeters * heightInMeters)).toFixed(1));
  
  // BMI classification
  let imcClass = "Normal";
  let imcColor = "text-green-400 border-green-500/20 bg-green-500/5";
  let imcAdvice = "¡Excelente! Tu peso se encuentra en un rango óptimo.";
  
  if (imc < 18.5) {
    imcClass = "Bajo peso";
    imcColor = "text-yellow-400 border-yellow-500/20 bg-yellow-500/5";
    imcAdvice = "Te recomendamos incrementar tu consumo de calorías y proteína.";
  } else if (imc >= 25 && imc < 29.9) {
    imcClass = "Sobrepeso";
    imcColor = "text-orange-400 border-orange-500/20 bg-orange-500/5";
    imcAdvice = "Buen momento para un déficit calórico y entrenamiento de fuerza.";
  } else if (imc >= 30) {
    imcClass = "Obesidad";
    imcColor = "text-red-400 border-red-500/20 bg-red-500/5";
    imcAdvice = "Prioriza el cardio constante y la fuerza para recomposición.";
  }

  // TMB (Harris-Benedict estimation)
  let tmb = 1500;
  if (metrics.gender === 'male') {
    tmb = Math.round(88.362 + (13.397 * metrics.weight) + (4.799 * metrics.height) - (5.677 * metrics.age));
  } else {
    tmb = Math.round(447.593 + (9.247 * metrics.weight) + (3.098 * metrics.height) - (4.330 * metrics.age));
  }

  // Activity multiplier
  let multiplier = 1.2;
  if (metrics.activityLevel === 'moderate') multiplier = 1.375;
  else if (metrics.activityLevel === 'active') multiplier = 1.55;
  else if (metrics.activityLevel === 'athlete') multiplier = 1.725;

  const maintenanceCalories = Math.round(tmb * multiplier);
  
  // Custom suggestion based on objective
  let sugerenciaCalorias = maintenanceCalories;
  let labelObjetivo = "Ganar Masa Muscular";
  if (metrics.objective === 'gain_muscle') {
    sugerenciaCalorias = maintenanceCalories + 300;
    labelObjetivo = "Hipertrofia / Ganancia";
  } else if (metrics.objective === 'lose_fat') {
    sugerenciaCalorias = maintenanceCalories - 400;
    labelObjetivo = "Déficit / Quema de Grasa";
  } else if (metrics.objective === 'endurance') {
    sugerenciaCalorias = maintenanceCalories + 150;
    labelObjetivo = "Fuerza y Resistencia";
  } else {
    sugerenciaCalorias = maintenanceCalories;
    labelObjetivo = "Salud General y Tonificación";
  }

  // Water requirement: 35ml per kg of weight
  const waterRequirement = (metrics.weight * 35 / 1000).toFixed(1);

  // Filter exercises by muscle group
  const currentExercises = EXERCISES.filter(ex => {
    // String matching mapping
    const matchGroup = ex.muscleGroup.toLowerCase();
    const targetGroup = selectedMuscle.toLowerCase();
    
    // Normalize Piernas vs Pierna, Brazos vs Brazo
    if (targetGroup === 'pierna' && matchGroup === 'pierna') return true;
    if (targetGroup === 'brazos' && matchGroup === 'brazos') return true;
    if (targetGroup === 'pecho' && matchGroup === 'pecho') return true;
    if (targetGroup === 'espalda' && matchGroup === 'espalda') return true;
    if (targetGroup === 'hombros' && matchGroup === 'hombros') return true;
    if (targetGroup === 'tricep' && matchGroup === 'tricep') return true;
    if (targetGroup === 'gluteos' && matchGroup === 'gluteos') return true;
    return matchGroup === targetGroup;
  });

  const muscleStats = {
    'Pierna': EXERCISES.filter(e => e.muscleGroup.toLowerCase() === 'pierna').length,
    'Brazos': EXERCISES.filter(e => e.muscleGroup.toLowerCase() === 'brazos').length,
    'Pecho': EXERCISES.filter(e => e.muscleGroup.toLowerCase() === 'pecho').length,
    'Espalda': EXERCISES.filter(e => e.muscleGroup.toLowerCase() === 'espalda').length,
    'Hombros': EXERCISES.filter(e => e.muscleGroup.toLowerCase() === 'hombros').length,
    'Tricep': EXERCISES.filter(e => e.muscleGroup.toLowerCase() === 'tricep').length,
    'Gluteos': EXERCISES.filter(e => e.muscleGroup.toLowerCase() === 'gluteos').length,
  };

  const handleQuickLog = () => {
    if (!activeExercise) return;
    
    const newExercise: Exercise = {
      id: Math.random().toString(36).substr(2, 9),
      machineId: activeExercise.id,
      name: activeExercise.name,
      date: new Date().toISOString(),
      sets: [
        { reps: logReps, weight: logWeight, completed: true }
      ]
    };

    if (onSaveWorkout) {
      onSaveWorkout(newExercise);
    }
    
    setLogSaved(true);
    setTimeout(() => {
      setLogSaved(false);
      setIsLogging(false);
    }, 1500);
  };

  const activityLevelLabels = {
    sedentary: 'Sedentario (Poco ejercicio)',
    moderate: 'Moderado (3-4 veces x semana)',
    active: 'Activo (5-6 veces x semana)',
    athlete: 'Atleta (Diario o competición)'
  };

  const objectiveLabels = {
    gain_muscle: 'Incrementar Masa Muscular',
    lose_fat: 'Pérdida de Grasa Corporal',
    endurance: 'Rendimiento / Resistencia',
    health: 'Salud y Bienestar general'
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Dynamic Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight uppercase leading-none text-white font-display">
            AthlyPulse <span className="text-lime-400 font-mono text-sm uppercase">Elite</span>
          </h2>
          <p className="text-xs text-zinc-400 uppercase tracking-widest mt-2">
            La Experiencia de Entrenamiento más Avanzada del Mercado
          </p>
        </div>
        
        {/* Sync Device Info Bubble */}
        <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl">
          <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
          <p className="text-[10px] uppercase tracking-widest text-zinc-300 font-mono">
            Biometría y Anatomía Integrada
          </p>
        </div>
      </div>

      {/* Profile & Body Metrics Telemetry Panel */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
          <Activity size={180} className="text-lime-400" />
        </div>

        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-lime-400 text-black rounded-xl flex items-center justify-center">
              <UserIcon size={20} />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg leading-tight uppercase font-mono">
                {auth?.currentUser?.displayName || "Atleta Anónimo"}
              </h3>
              <p className="text-xs text-lime-400 tracking-widest lowercase">
                {auth?.currentUser?.email || "Sin conexión (Opcional)"}
              </p>
            </div>
          </div>
          
          <button 
            onClick={() => {
              setTempMetrics({ ...metrics });
              setIsEditingMetrics(!isEditingMetrics);
            }}
            className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg border border-zinc-800 hover:bg-zinc-900 transition-all font-mono"
          >
            <Settings size={12} className={isEditingMetrics ? "animate-spin" : ""} />
            <span>{isEditingMetrics ? "Cerrar" : "Ajustar Medidas"}</span>
          </button>
        </div>

        <AnimatePresence mode="wait">
          {!isEditingMetrics ? (
            <motion.div
              key="view-metrics"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {/* Weight Card */}
              <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-zinc-400 mb-1.5">
                  <Scale size={14} className="text-lime-400" />
                  <span className="text-[10px] uppercase tracking-wider font-mono">Peso Corriente</span>
                </div>
                <p className="text-2xl font-bold text-white font-mono">{metrics.weight} <span className="text-xs text-zinc-500 font-sans">kg</span></p>
                <p className="text-[10px] text-zinc-500 mt-1 uppercase font-mono tracking-wide">{(metrics.weight * 2.2).toFixed(1)} lbs</p>
              </div>

              {/* Height Card */}
              <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-zinc-400 mb-1.5">
                  <Ruler size={14} className="text-lime-400" />
                  <span className="text-[10px] uppercase tracking-wider font-mono">Estatura</span>
                </div>
                <p className="text-2xl font-bold text-white font-mono">{metrics.height} <span className="text-xs text-zinc-500 font-sans">cm</span></p>
                <p className="text-[10px] text-zinc-500 mt-1 uppercase font-mono tracking-wide">{(metrics.height / 30.48).toFixed(1)} pies</p>
              </div>

              {/* IMC Card */}
              <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-4 relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-zinc-400 mb-1.5">
                    <Activity size={14} className="text-lime-400" />
                    <span className="text-[10px] uppercase tracking-wider font-mono">IMC Calculado</span>
                  </div>
                  <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider ${imcColor}`}>
                    {imcClass}
                  </span>
                </div>
                <p className="text-2xl font-bold text-white font-mono">{imc}</p>
                <p className="text-[9px] text-zinc-400 mt-1 font-sans italic opacity-80 leading-tight">
                  {imcAdvice}
                </p>
              </div>

              {/* Daily Requirements */}
              <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-zinc-400 mb-1.5">
                  <Zap size={14} className="text-lime-400" />
                  <span className="text-[10px] uppercase tracking-wider font-mono">Gasto Diario Est.</span>
                </div>
                <p className="text-2xl font-bold text-white font-mono">{sugerenciaCalorias} <span className="text-xs text-zinc-500 font-sans">kcal</span></p>
                <p className="text-[9px] text-lime-400 font-bold mt-1 uppercase font-mono tracking-widest flex items-center gap-1">
                  <span>Agua: {waterRequirement} L /día</span>
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="edit-metrics"
              onSubmit={handleSaveMetrics}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4 border-t border-zinc-900 pt-5 mt-4"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-mono text-zinc-400 mb-1.5">Peso (kg)</label>
                  <input 
                    type="number" 
                    value={tempMetrics.weight} 
                    onChange={e => setTempMetrics({ ...tempMetrics, weight: Math.max(1, parseInt(e.target.value) || 0) })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white text-sm font-mono focus:border-lime-400 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-mono text-zinc-400 mb-1.5">Estatura (cm)</label>
                  <input 
                    type="number" 
                    value={tempMetrics.height} 
                    onChange={e => setTempMetrics({ ...tempMetrics, height: Math.max(1, parseInt(e.target.value) || 0) })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white text-sm font-mono focus:border-lime-400 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-mono text-zinc-400 mb-1.5">Edad (Años)</label>
                  <input 
                    type="number" 
                    value={tempMetrics.age} 
                    onChange={e => setTempMetrics({ ...tempMetrics, age: Math.max(1, parseInt(e.target.value) || 0) })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white text-sm font-mono focus:border-lime-400 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-mono text-zinc-400 mb-1.5">Género Biológico</label>
                  <select 
                    value={tempMetrics.gender} 
                    onChange={e => setTempMetrics({ ...tempMetrics, gender: e.target.value as 'male' | 'female' })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white text-sm focus:border-lime-400 focus:outline-none"
                  >
                    <option value="male">Masculino</option>
                    <option value="female">Femenino</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-mono text-zinc-400 mb-1.5">Nivel de Actividad</label>
                  <select 
                    value={tempMetrics.activityLevel} 
                    onChange={e => setTempMetrics({ ...tempMetrics, activityLevel: e.target.value as any })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white text-sm focus:border-lime-400 focus:outline-none"
                  >
                    {Object.entries(activityLevelLabels).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-mono text-zinc-400 mb-1.5">Objetivo Físico</label>
                  <select 
                    value={tempMetrics.objective} 
                    onChange={e => setTempMetrics({ ...tempMetrics, objective: e.target.value as any })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white text-sm focus:border-lime-400 focus:outline-none"
                  >
                    {Object.entries(objectiveLabels).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsEditingMetrics(false)}
                  className="px-4 py-2 bg-transparent text-zinc-400 hover:text-white text-xs uppercase tracking-widest font-mono rounded-xl border border-zinc-800 hover:bg-zinc-900 transition-all"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  disabled={savingMetrics}
                  className="px-5 py-2 bg-lime-400 hover:bg-lime-500 text-black text-xs uppercase tracking-widest font-mono font-bold rounded-xl transition-all flex items-center gap-2"
                >
                  {savingMetrics ? "Guardando..." : "Guardar Biometría"}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      {/* Main Grid: Anatomical Interactive Explorer & List summary info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Full Anatomical Interactive Vector (7 Muscles) */}
        <div className="lg:col-span-5 bg-zinc-950 border border-zinc-800 rounded-3xl p-6 flex flex-col items-center">
          <div className="w-full flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-white text-md uppercase font-mono tracking-wide">Mapa Anatómico</h3>
              <p className="text-[10px] text-zinc-400 font-sans tracking-wide">Toca un músculo para explorar ejercicios</p>
            </div>

            {/* Toggle Front vs Back */}
            <div className="flex bg-zinc-900 p-1 rounded-xl border border-zinc-800 font-mono">
              <button 
                onClick={() => setViewMode('front')}
                className={`text-[9px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-lg transition-all ${viewMode === 'front' ? 'bg-lime-400 text-black' : 'text-zinc-400 hover:text-white'}`}
              >
                Frontal
              </button>
              <button 
                onClick={() => setViewMode('back')}
                className={`text-[9px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-lg transition-all ${viewMode === 'back' ? 'bg-lime-400 text-black' : 'text-zinc-400 hover:text-white'}`}
              >
                Posterior
              </button>
            </div>
          </div>

          {/* Majestic Interactive Body Canvas Container */}
          <div className="relative w-full max-w-[280px] h-[370px] bg-zinc-900/30 rounded-2xl border border-zinc-900 flex items-center justify-center p-4 overflow-hidden">
            {/* Legend showing hover states */}
            <div className="absolute top-4 left-4 z-10 bg-zinc-950/80 backdrop-blur border border-zinc-800/60 px-2.5 py-1.5 rounded-lg text-left">
              <p className="text-[8px] uppercase tracking-widest text-zinc-400 font-mono">Visualización Activa</p>
              <p className="text-xs font-bold text-lime-400 font-mono uppercase mt-0.5 animate-pulse">
                {hoveredMuscle || selectedMuscle}
              </p>
            </div>

            {/* Simulated interactive premium graphic human vector using highly detailed glowing SVG modules */}
            <svg 
              viewBox="0 0 100 220" 
              className="w-full h-full max-h-[300px] text-zinc-700"
              style={{ filter: "drop-shadow(0 0 20px rgba(163, 230, 53, 0.05))" }}
            >
              {/* Common outline / head */}
              <circle cx="50" cy="20" r="10" className="fill-zinc-800/80 stroke-zinc-700 stroke-[0.8]" />
              <path d="M47 30 L53 30 L53 35 L47 35 Z" className="fill-zinc-800/80 stroke-zinc-700 stroke-[0.8]" />
              
              {/* Back Spine or Chest Line */}
              <line x1="50" y1="35" x2="50" y2="100" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 1" className="text-zinc-600" />

              {viewMode === 'front' ? (
                <>
                  {/* FRONT VIEW SHAPES */}

                  {/* Pecho (Chest) */}
                  <path 
                    d="M38 38 C42 37, 48 37, 50 39 C52 37, 58 37, 62 38 C63 46, 56 56, 50 56 C44 56, 37 46, 38 38 Z" 
                    onMouseEnter={() => setHoveredMuscle('Pecho')}
                    onMouseLeave={() => setHoveredMuscle(null)}
                    onClick={() => setSelectedMuscle('Pecho')}
                    className={`cursor-pointer transition-all duration-300 stroke-[1.2] ${selectedMuscle === 'Pecho' ? 'fill-lime-400/30 stroke-lime-400' : hoveredMuscle === 'Pecho' ? 'fill-lime-400/20 stroke-lime-400/60' : 'fill-zinc-800/50 stroke-zinc-700 hover:stroke-lime-400/50'}`}
                  />

                  {/* Hombros Frontales (Shoulders) */}
                  {/* Left Shoulder */}
                  <path 
                    d="M30 38 C32 35, 36 36, 38 38 C36 43, 31 46, 30 38 Z" 
                    onMouseEnter={() => setHoveredMuscle('Hombros')}
                    onMouseLeave={() => setHoveredMuscle(null)}
                    onClick={() => setSelectedMuscle('Hombros')}
                    className={`cursor-pointer transition-all duration-300 stroke-[1.2] ${selectedMuscle === 'Hombros' ? 'fill-lime-400/30 stroke-lime-400' : hoveredMuscle === 'Hombros' ? 'fill-lime-400/20 stroke-lime-400/60' : 'fill-zinc-800/50 stroke-zinc-700 hover:stroke-lime-400/50'}`}
                  />
                  {/* Right Shoulder */}
                  <path 
                    d="M70 38 C68 35, 64 36, 62 38 C64 43, 69 46, 70 38 Z" 
                    onMouseEnter={() => setHoveredMuscle('Hombros')}
                    onMouseLeave={() => setHoveredMuscle(null)}
                    onClick={() => setSelectedMuscle('Hombros')}
                    className={`cursor-pointer transition-all duration-300 stroke-[1.2] ${selectedMuscle === 'Hombros' ? 'fill-lime-400/30 stroke-lime-400' : hoveredMuscle === 'Hombros' ? 'fill-lime-400/20 stroke-lime-400/60' : 'fill-zinc-800/50 stroke-zinc-700 hover:stroke-lime-400/50'}`}
                  />

                  {/* Brazos / Bíceps (Arms) */}
                  {/* Left Bicep */}
                  <path 
                    d="M26 43 C28 43, 30 45, 29 53 C26 53, 24 50, 26 43 Z" 
                    onMouseEnter={() => setHoveredMuscle('Brazos')}
                    onMouseLeave={() => setHoveredMuscle(null)}
                    onClick={() => setSelectedMuscle('Brazos')}
                    className={`cursor-pointer transition-all duration-300 stroke-[1.2] ${selectedMuscle === 'Brazos' ? 'fill-lime-400/30 stroke-lime-400' : hoveredMuscle === 'Brazos' ? 'fill-lime-400/20 stroke-lime-400/60' : 'fill-zinc-800/50 stroke-zinc-700 hover:stroke-lime-400/50'}`}
                  />
                  {/* Right Bicep */}
                  <path 
                    d="M74 43 C72 43, 70 45, 71 53 C74 53, 76 50, 74 43 Z" 
                    onMouseEnter={() => setHoveredMuscle('Brazos')}
                    onMouseLeave={() => setHoveredMuscle(null)}
                    onClick={() => setSelectedMuscle('Brazos')}
                    className={`cursor-pointer transition-all duration-300 stroke-[1.2] ${selectedMuscle === 'Brazos' ? 'fill-lime-400/30 stroke-lime-400' : hoveredMuscle === 'Brazos' ? 'fill-lime-400/20 stroke-lime-400/60' : 'fill-zinc-800/50 stroke-zinc-700 hover:stroke-lime-400/50'}`}
                  />

                  {/* Antebrazos / Hand guides */}
                  <path d="M29 54 L27 70 L24 70 L25 54 Z" className="fill-zinc-800/40 stroke-zinc-700 stroke-[0.5]" />
                  <path d="M71 54 L73 70 L76 70 L75 54 Z" className="fill-zinc-800/40 stroke-zinc-700 stroke-[0.5]" />

                  {/* Piernas (Cuádriceps) */}
                  {/* Left Quad */}
                  <path 
                    d="M32 105 C33 92, 47 92, 47 110 L44 150 C38 150, 31 138, 32 105 Z" 
                    onMouseEnter={() => setHoveredMuscle('Pierna')}
                    onMouseLeave={() => setHoveredMuscle(null)}
                    onClick={() => setSelectedMuscle('Pierna')}
                    className={`cursor-pointer transition-all duration-300 stroke-[1.2] ${selectedMuscle === 'Pierna' ? 'fill-lime-400/30 stroke-lime-400' : hoveredMuscle === 'Pierna' ? 'fill-lime-400/20 stroke-lime-400/60' : 'fill-zinc-800/50 stroke-zinc-700 hover:stroke-lime-400/50'}`}
                  />
                  {/* Right Quad */}
                  <path 
                    d="M68 105 C67 92, 53 92, 53 110 L56 150 C62 150, 69 138, 68 105 Z" 
                    onMouseEnter={() => setHoveredMuscle('Pierna')}
                    onMouseLeave={() => setHoveredMuscle(null)}
                    onClick={() => setSelectedMuscle('Pierna')}
                    className={`cursor-pointer transition-all duration-300 stroke-[1.2] ${selectedMuscle === 'Pierna' ? 'fill-lime-400/30 stroke-lime-400' : hoveredMuscle === 'Pierna' ? 'fill-lime-400/20 stroke-lime-400/60' : 'fill-zinc-800/50 stroke-zinc-700 hover:stroke-lime-400/50'}`}
                  />

                  {/* Core / Abs center */}
                  <path d="M41 58 L59 58 L57 90 L43 90 Z" className="fill-zinc-800/20 stroke-zinc-800 stroke-[0.6]" />
                  <path d="M30 152 L34 195 L31 195 C28 170, 29 155, 30 152 Z" className="fill-zinc-800/30 stroke-zinc-700 stroke-[0.5]" />
                  <path d="M70 152 L66 195 L69 195 C72 170, 71 155, 70 152 Z" className="fill-zinc-800/30 stroke-zinc-700 stroke-[0.5]" />
                </>
              ) : (
                <>
                  {/* POSTERIOR VIEW SHAPES */}

                  {/* Espalda (Back / Latissimus) */}
                  <path 
                    d="M34 38 C42 36, 48 36, 50 40 C52 36, 58 36, 66 38 C68 50, 58 75, 50 78 C42 75, 32 50, 34 38 Z" 
                    onMouseEnter={() => setHoveredMuscle('Espalda')}
                    onMouseLeave={() => setHoveredMuscle(null)}
                    onClick={() => setSelectedMuscle('Espalda')}
                    className={`cursor-pointer transition-all duration-300 stroke-[1.2] ${selectedMuscle === 'Espalda' ? 'fill-lime-400/30 stroke-lime-400' : hoveredMuscle === 'Espalda' ? 'fill-lime-400/20 stroke-lime-400/60' : 'fill-zinc-800/50 stroke-zinc-700 hover:stroke-lime-400/50'}`}
                  />

                  {/* Tríceps Posterior */}
                  {/* Left Tricep */}
                  <path 
                    d="M25 43 C27 43, 29 45, 27 53 C24 53, 22 50, 25 43 Z" 
                    onMouseEnter={() => setHoveredMuscle('Tricep')}
                    onMouseLeave={() => setHoveredMuscle(null)}
                    onClick={() => setSelectedMuscle('Tricep')}
                    className={`cursor-pointer transition-all duration-300 stroke-[1.2] ${selectedMuscle === 'Tricep' ? 'fill-lime-400/30 stroke-lime-400' : hoveredMuscle === 'Tricep' ? 'fill-lime-400/20 stroke-lime-400/60' : 'fill-zinc-800/50 stroke-zinc-700 hover:stroke-lime-400/50'}`}
                  />
                  {/* Right Tricep */}
                  <path 
                    d="M75 43 C73 43, 71 45, 73 53 C76 53, 78 50, 75 43 Z" 
                    onMouseEnter={() => setHoveredMuscle('Tricep')}
                    onMouseLeave={() => setHoveredMuscle(null)}
                    onClick={() => setSelectedMuscle('Tricep')}
                    className={`cursor-pointer transition-all duration-300 stroke-[1.2] ${selectedMuscle === 'Tricep' ? 'fill-lime-400/30 stroke-lime-400' : hoveredMuscle === 'Tricep' ? 'fill-lime-400/20 stroke-lime-400/60' : 'fill-zinc-800/50 stroke-zinc-700 hover:stroke-lime-400/50'}`}
                  />

                  {/* Hombros Posteriores */}
                  {/* Left Shoulder (Back) */}
                  <path 
                    d="M32 37 C34 35, 36 36, 38 38 C35 43, 31 43, 32 37 Z" 
                    onMouseEnter={() => setHoveredMuscle('Hombros')}
                    onMouseLeave={() => setHoveredMuscle(null)}
                    onClick={() => setSelectedMuscle('Hombros')}
                    className={`cursor-pointer transition-all duration-300 stroke-[1.2] ${selectedMuscle === 'Hombros' ? 'fill-lime-400/30 stroke-lime-400' : hoveredMuscle === 'Hombros' ? 'fill-lime-400/20 stroke-lime-400/60' : 'fill-zinc-800/50 stroke-zinc-700 hover:stroke-lime-400/50'}`}
                  />
                  {/* Right Shoulder (Back) */}
                  <path 
                    d="M68 37 C66 35, 64 36, 62 38 C65 43, 69 43, 68 37 Z" 
                    onMouseEnter={() => setHoveredMuscle('Hombros')}
                    onMouseLeave={() => setHoveredMuscle(null)}
                    onClick={() => setSelectedMuscle('Hombros')}
                    className={`cursor-pointer transition-all duration-300 stroke-[1.2] ${selectedMuscle === 'Hombros' ? 'fill-lime-400/30 stroke-lime-400' : hoveredMuscle === 'Hombros' ? 'fill-lime-400/20 stroke-lime-400/60' : 'fill-zinc-800/50 stroke-zinc-700 hover:stroke-lime-400/50'}`}
                  />

                  {/* Glúteos (Glutes) */}
                  {/* Left Glute */}
                  <path 
                    d="M36 82 C36 78, 48 78, 48 83 C48 95, 37 95, 36 82 Z" 
                    onMouseEnter={() => setHoveredMuscle('Gluteos')}
                    onMouseLeave={() => setHoveredMuscle(null)}
                    onClick={() => setSelectedMuscle('Gluteos')}
                    className={`cursor-pointer transition-all duration-300 stroke-[1.2] ${selectedMuscle === 'Gluteos' ? 'fill-lime-400/30 stroke-lime-400' : hoveredMuscle === 'Gluteos' ? 'fill-lime-400/20 stroke-lime-400/60' : 'fill-zinc-800/50 stroke-zinc-700 hover:stroke-lime-400/50'}`}
                  />
                  {/* Right Glute */}
                  <path 
                    d="M64 82 C64 78, 52 78, 52 83 C52 95, 63 95, 64 82 Z" 
                    onMouseEnter={() => setHoveredMuscle('Gluteos')}
                    onMouseLeave={() => setHoveredMuscle(null)}
                    onClick={() => setSelectedMuscle('Gluteos')}
                    className={`cursor-pointer transition-all duration-300 stroke-[1.2] ${selectedMuscle === 'Gluteos' ? 'fill-lime-400/30 stroke-lime-400' : hoveredMuscle === 'Gluteos' ? 'fill-lime-400/20 stroke-lime-400/60' : 'fill-zinc-800/50 stroke-zinc-700 hover:stroke-lime-400/50'}`}
                  />

                  {/* Piernas Posterior (Isquiotibiales/Femorales) */}
                  <path 
                    d="M34 100 L46 100 L44 145 L32 145 Z" 
                    onMouseEnter={() => setHoveredMuscle('Pierna')}
                    onMouseLeave={() => setHoveredMuscle(null)}
                    onClick={() => setSelectedMuscle('Pierna')}
                    className={`cursor-pointer transition-all duration-300 stroke-[1.2] ${selectedMuscle === 'Pierna' ? 'fill-lime-400/30 stroke-lime-400' : hoveredMuscle === 'Pierna' ? 'fill-lime-400/20 stroke-lime-400/60' : 'fill-zinc-800/50 stroke-zinc-700 hover:stroke-lime-400/50'}`}
                  />
                  <path 
                    d="M66 100 L54 100 L56 145 L68 145 Z" 
                    onMouseEnter={() => setHoveredMuscle('Pierna')}
                    onMouseLeave={() => setHoveredMuscle(null)}
                    onClick={() => setSelectedMuscle('Pierna')}
                    className={`cursor-pointer transition-all duration-300 stroke-[1.2] ${selectedMuscle === 'Pierna' ? 'fill-lime-400/30 stroke-lime-400' : hoveredMuscle === 'Pierna' ? 'fill-lime-400/20 stroke-lime-400/60' : 'fill-zinc-800/50 stroke-zinc-700 hover:stroke-lime-400/50'}`}
                  />
                  
                  {/* Calves (Pantorrillas) */}
                  <path d="M32 147 L35 190 L32 190 Z" className="fill-zinc-800/30 stroke-zinc-700 stroke-[0.5]" />
                  <path d="M68 147 L65 190 L68 190 Z" className="fill-zinc-800/30 stroke-zinc-700 stroke-[0.5]" />
                </>
              )}
            </svg>
          </div>

          <p className="text-[10px] text-zinc-500 font-mono mt-4 text-center">
            Haz clic directamente en las zonas para alternar las secciones
          </p>
        </div>

        {/* Right Side: Bento Muscle Quick Selector with Real-time Count Badges */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <h3 className="font-bold text-white text-md uppercase font-mono tracking-wide">
              Músculos y Zonificaciones
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Accede de forma directa a la biblioteca exclusiva de <span className="text-lime-400 font-bold">10 ejercicios por zona</span>.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {(Object.keys(muscleStats) as Array<keyof typeof muscleStats>).map((muscle) => {
              const isActive = selectedMuscle === muscle;
              return (
                <button
                  key={muscle}
                  onClick={() => setSelectedMuscle(muscle)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between h-24 ${isActive ? 'bg-lime-400/10 border-lime-400 shadow-lg shadow-lime-400/5' : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/40'}`}
                >
                  <div className="flex justify-between items-start w-full">
                    <span className={`text-[10px] uppercase font-mono tracking-wider font-bold ${isActive ? 'text-lime-400' : 'text-zinc-400'}`}>
                      {muscle}
                    </span>
                    <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded-md ${isActive ? 'bg-lime-400/20 text-lime-400' : 'bg-zinc-900 text-zinc-500'}`}>
                      {muscleStats[muscle]} Ejercicios
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between w-full mt-auto">
                    <span className="text-white font-bold text-sm tracking-tight font-display capitalize">
                      {muscle === 'Pierna' ? 'Piernas completo' : muscle === 'Gluteos' ? 'Glúteos Pro' : muscle === 'Brazos' ? 'Bíceps y Antebrazo' : muscle === 'Tricep' ? 'Tríceps completo' : muscle}
                    </span>
                    <ArrowRight size={14} className={`transition-all duration-300 ${isActive ? 'text-lime-400 translate-x-1' : 'text-zinc-600'}`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Stats display box */}
          <div className="bg-gradient-to-r from-zinc-950 to-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-lime-400">
                <Dumbbell size={16} />
              </div>
              <div>
                <p className="text-[10px] text-zinc-400 uppercase font-mono tracking-widest leading-none">Total Catálogo</p>
                <p className="text-sm font-bold text-white font-mono mt-1">70 Ejercicios Profesionales Activados</p>
              </div>
            </div>
            <div className="text-right font-mono">
              <span className="text-xs text-zinc-400">Estado</span>
              <p className="text-[9px] text-lime-400 uppercase tracking-widest font-black mt-0.5">100% Listo</p>
            </div>
          </div>
        </div>
      </div>

      {/* Exercises Section Header */}
      <div className="border-t border-zinc-900 pt-10">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h3 className="text-xl font-bold uppercase tracking-tight text-white font-display">
              Prescripción: <span className="text-lime-400">{selectedMuscle}</span>
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Top 10 ejercicios élite enfocados exclusivamente en esta zona muscular
            </p>
          </div>
          <span className="text-xs font-mono text-zinc-500">
            {currentExercises.length} de 10 ejercicios cargados
          </span>
        </div>

        {/* 10 Exercises List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentExercises.map((exercise, index) => {
            const hasVideo = !!exercise.videoUrl;
            return (
              <div 
                key={exercise.id} 
                onClick={() => {
                  setActiveExercise(exercise);
                  setShowVideo(false);
                }}
                className="bg-zinc-950 hover:bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700/80 rounded-2xl p-5 transition-all cursor-pointer flex flex-col justify-between relative group"
              >
                {/* Floating Index Counter */}
                <span className="absolute top-4 right-5 text-[9px] font-mono font-bold text-zinc-600 group-hover:text-lime-400/40 transition-colors">
                  EP#{String(index + 1).padStart(2, '0')}
                </span>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[8px] font-mono uppercase bg-lime-400/10 text-lime-400 px-2 py-0.5 rounded border border-lime-400/20">
                      Progreso
                    </span>
                    <span className="text-[8px] font-mono uppercase text-zinc-500 bg-zinc-900/80 px-2 py-0.5 rounded border border-zinc-800">
                      Hipertrofia
                    </span>
                  </div>

                  <h4 className="text-white font-bold font-display text-md group-hover:text-lime-400 transition-colors leading-snug">
                    {exercise.name}
                  </h4>
                  
                  <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                    {exercise.description}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-zinc-900 pt-4 mt-5 w-full">
                  <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] font-mono">
                    <BookOpen size={12} className="text-zinc-600" />
                    <span>{exercise.instructions.length} Pasos</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-zinc-400 font-bold uppercase tracking-widest text-[9px]">
                    <span className="group-hover:text-white transition-colors">Técnica y Detalle</span>
                    <ChevronRight size={12} className="text-lime-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Workout Video and Procedural Detail Dialog/Modal */}
      <AnimatePresence>
        {activeExercise && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setActiveExercise(null);
                setIsLogging(false);
              }}
              className="absolute inset-0 bg-black"
            />

            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden max-h-[90vh] flex flex-col shadow-2xl"
            >
              {/* Image Header/Player placeholder */}
              <div className="relative w-full aspect-video bg-[#070708] border-b border-zinc-900 overflow-hidden shrink-0">
                
                {showVideo ? (
                  <iframe 
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${activeExercise.videoUrl}?autoplay=1`}
                    title="Play Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full relative">
                    <MachineAnimation machineId={activeExercise.id} videoUrl={activeExercise.videoUrl} />
                    
                    {/* Tiny Floating instructions or video switcher */}
                    {activeExercise.videoUrl && (
                      <div className="absolute bottom-4 left-4 z-20">
                        <button
                          onClick={() => setShowVideo(true)}
                          className="bg-black/90 backdrop-blur text-lime-400 hover:text-black hover:bg-lime-400 px-3 py-2 rounded-full text-[9px] font-mono font-bold uppercase transition-all flex items-center gap-1.5 border border-lime-400/30 cursor-pointer"
                        >
                          <Play size={10} fill="currentColor" />
                          <span>Ver Video Real de Ejecución</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Close Button Inside Image Area */}
                <button 
                  onClick={() => {
                    setActiveExercise(null);
                    setIsLogging(false);
                  }}
                  className="absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-black/60 backdrop-blur border border-zinc-800/80 text-zinc-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto p-6 md:p-8 space-y-6 flex-1">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="text-[9px] font-mono uppercase bg-zinc-900 border border-zinc-800 text-lime-400 px-2.5 py-1 rounded-md">
                      Grupo: {activeExercise.muscleGroup}
                    </span>
                    <h3 className="text-2xl font-bold text-white font-display mt-2.5">{activeExercise.name}</h3>
                  </div>
                  
                  <div className="text-right">
                    <span className="text-[10px] text-zinc-500 font-mono block">SERIES RECOMENDADAS</span>
                    <span className="text-md font-bold text-white font-mono mt-1 block">4 x 10-12 Reps</span>
                  </div>
                </div>

                <p className="text-zinc-300 text-sm leading-relaxed border-l-2 border-lime-400 pl-4 bg-lime-400/5 py-2.5 rounded-r-xl">
                  {activeExercise.description}
                </p>

                {/* Instructions steps list */}
                <div className="space-y-4">
                  <h4 className="text-[10px] uppercase font-mono tracking-widest text-zinc-400 font-bold border-b border-zinc-900 pb-2">
                    Procedimiento de Ejecución
                  </h4>
                  <ol className="space-y-3.5">
                    {activeExercise.instructions.map((step, idx) => (
                      <li key={idx} className="flex gap-4">
                        <span className="w-5 h-5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-lime-400 flex items-center justify-center shrink-0 font-bold mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="text-xs text-zinc-300 leading-relaxed">{step}</p>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Tips block */}
                <div className="space-y-3 bg-zinc-900/40 p-4 rounded-2xl border border-zinc-800/55">
                  <h4 className="text-[10px] uppercase font-mono tracking-widest text-lime-400 font-bold flex items-center gap-1.5">
                    <Star size={12} />
                    <span>Recomendaciones Tácticas</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-zinc-400">
                    {activeExercise.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                        <span className="text-lime-400 text-md mt-0.5 leading-none">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Inline Quick Logging Form */}
                <div className="border-t border-zinc-900 pt-6 mt-6">
                  {logSaved ? (
                    <div className="bg-lime-400/10 border border-lime-400/40 p-4 rounded-xl flex items-center justify-center gap-3 text-lime-400">
                      <Check size={18} className="animate-bounce" />
                      <span className="text-xs font-bold uppercase tracking-wider font-mono">¡Entrenamiento registrado con éxito!</span>
                    </div>
                  ) : isLogging ? (
                    <div className="bg-zinc-900/60 border border-zinc-800 p-5 rounded-2xl space-y-4">
                      <div className="flex justify-between items-center text-white mb-2">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-400 font-bold">Registrar serie de hoy</span>
                        <button onClick={() => setIsLogging(false)} className="text-xs text-zinc-500 hover:text-white font-mono">Cancelar</button>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[8px] uppercase tracking-widest font-mono text-zinc-500 mb-1">Repeticiones</label>
                          <input 
                            type="number" 
                            value={logReps}
                            onChange={(e) => setLogReps(Math.max(1, parseInt(e.target.value) || 0))}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white font-mono text-sm focus:border-lime-400 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] uppercase tracking-widest font-mono text-zinc-500 mb-1">Peso (kg)</label>
                          <input 
                            type="number" 
                            value={logWeight}
                            onChange={(e) => setLogWeight(Math.max(0, parseInt(e.target.value) || 0))}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white font-mono text-sm focus:border-lime-400 focus:outline-none"
                          />
                        </div>
                      </div>

                      <button 
                        onClick={handleQuickLog}
                        className="w-full py-2.5 bg-lime-400 hover:bg-lime-500 text-black font-bold uppercase tracking-widest text-[10px] rounded-xl transition-all font-mono"
                      >
                        Enviar Telemetría al Registro
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setIsLogging(true)}
                      className="w-full py-3 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 hover:border-zinc-700 font-bold uppercase tracking-widest text-[10px] rounded-2xl transition-all font-mono flex items-center justify-center gap-2"
                    >
                      <Dumbbell size={14} className="text-lime-400" />
                      <span>Registrar serie de este Ejercicio</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
