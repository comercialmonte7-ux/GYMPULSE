import React, { useState } from 'react';
import { Exercise } from '../types';
import { TrendingUp, Zap, Heart, Moon, ShieldCheck, Activity, ChevronRight, Info, Watch, X } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { motion, AnimatePresence } from 'motion/react';

interface DashboardProps {
  workouts: Exercise[];
  onNavigate: (tab: 'dash' | 'routines' | 'history' | 'coach' | 'machines') => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ workouts, onNavigate }) => {
  const [showInstructions, setShowInstructions] = useState(false);
  // Mock performance data (In a real app, this would come from Apple Health/HealthKit)
  const readiness = 84;
  const recovery = 92;
  const strain = 14.5;
  const sleepText = "7h 45m";

  const chartData = [
    { name: 'Lun', recovery: 65, strain: 12 },
    { name: 'Mar', recovery: 78, strain: 15 },
    { name: 'Mié', recovery: 55, strain: 18 },
    { name: 'Jue', recovery: 85, strain: 10 },
    { name: 'Vie', recovery: 92, strain: 14 },
    { name: 'Sáb', recovery: 88, strain: 16 },
    { name: 'Dom', recovery: recovery, strain: strain },
  ];

  return (
    <div className="space-y-10 pb-20">
      {/* Header with Health Status */}
      <div className="flex justify-between items-end">
        <div>
            <h2 className="text-3xl technical-heading text-bright tracking-tight uppercase leading-none">Panel de Control</h2>
            <p className="label-caps !text-[10px] tracking-widest text-dim mt-2">Vista General de Telemetría Biométrica</p>
        </div>
        <button 
            onClick={() => setShowInstructions(true)}
            className="bg-accent-recovery/10 border border-accent-recovery/30 px-4 py-2 rounded-xl flex items-center gap-3 shadow-lg shadow-accent-recovery/10 hover:bg-accent-recovery/20 transition-all cursor-pointer group"
        >
            <div className="w-2 h-2 bg-accent-recovery rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-accent-recovery">Apple Health: Sincronizado</span>
            <Info size={12} className="text-accent-recovery opacity-50 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>

      <AnimatePresence>
        {showInstructions && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-surface max-w-md w-full rounded-[2.5rem] border border-border-subtle p-8 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6">
                <button onClick={() => setShowInstructions(false)} className="bg-white/5 p-2 rounded-full hover:bg-white/10 transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-accent-recovery/20 rounded-2xl text-accent-recovery">
                  <Watch size={32} />
                </div>
                <div>
                  <h3 className="technical-heading text-xl leading-none uppercase">Vincular Apple Watch</h3>
                  <p className="label-caps !text-[9px] text-dim mt-2 tracking-widest">Protocolo de sincronización HealthKit</p>
                </div>
              </div>

              <div className="space-y-6 mb-8">
                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-accent-recovery/10 border border-accent-recovery/30 flex items-center justify-center text-[10px] font-black text-accent-recovery shrink-0">1</div>
                  <div>
                    <p className="text-sm text-bright font-bold leading-tight">Activar Sincronización</p>
                    <p className="text-xs text-dim mt-1">Al pulsar el botón "Vincular ahora", la aplicación envía una solicitud firmada al sistema HealthKit de iOS. Si estás en la pantalla de inicio y tienes problemas para iniciar sesión, intenta abrir la app primero en Safari.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-accent-recovery/10 border border-accent-recovery/30 flex items-center justify-center text-[10px] font-black text-accent-recovery shrink-0">2</div>
                  <div>
                    <p className="text-sm text-bright font-bold leading-tight">Autorización de Apple</p>
                    <p className="text-xs text-dim mt-1">Verás una pantalla de Apple preguntando qué datos quieres compartir (HRV, Sueño, Energía). Únicamente tras este paso, GymPulse aparecerá en tu lista de Apps de Salud.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-accent-recovery/10 border border-accent-recovery/30 flex items-center justify-center text-[10px] font-black text-accent-recovery shrink-0">3</div>
                  <div>
                    <p className="text-sm text-bright font-bold leading-tight">Configuración de Firebase</p>
                    <p className="text-xs text-dim mt-1">Si aparece un error de "dominio no autorizado", debes añadir <b>{window.location.hostname}</b> en la sección de Dominios Autorizados de tu Consola de Firebase.</p>
                  </div>
                </div>
              </div>

              <div className="bg-accent-recovery/5 border border-accent-recovery/20 p-5 rounded-2xl">
                <div className="flex items-start gap-4">
                  <ShieldCheck size={20} className="text-accent-recovery shrink-0" />
                  <p className="text-[11px] text-accent-recovery font-bold leading-relaxed tracking-wide uppercase">
                    Tus datos biométricos se procesan localmente para garantizar máxima privacidad neuromuscular.
                  </p>
                </div>
              </div>
              
              <button 
                onClick={() => setShowInstructions(false)}
                className="geometric-button-primary w-full py-4 mt-8"
              >
                Entendido
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Recovery Ring Section */}
      <div className="relative flex flex-col items-center justify-center pt-8 pb-4">
        {/* Mock ring */}
        <div className="relative w-64 h-64 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
                <circle
                    cx="128"
                    cy="128"
                    r="120"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    className="text-muted/20"
                />
                <motion.circle
                    cx="128"
                    cy="128"
                    r="120"
                    stroke="currentColor"
                    strokeWidth="12"
                    strokeDasharray={2 * Math.PI * 120}
                    initial={{ strokeDashoffset: 2 * Math.PI * 120 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 120 * (1 - readiness/100) }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    fill="transparent"
                    strokeLinecap="round"
                    className="text-accent-recovery"
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="label-caps mb-1">Disposición</span>
                <span className="text-7xl technical-heading leading-none">{readiness}</span>
                <div className="flex items-center gap-1 mt-2 text-accent-recovery">
                    <ShieldCheck size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Optimizado</span>
                </div>
            </div>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        <MetricCard 
            label="Recuperación" 
            value={`${recovery}%`} 
            icon={<Heart size={18} className="text-accent-recovery" />} 
            status="Alta"
            color="text-accent-recovery"
            tooltip="Calculado en base a tu volumen de entrenamiento y descanso"
        />
        <MetricCard 
            label="Esfuerzo Diario" 
            value={strain.toString()} 
            icon={<Zap size={18} className="text-accent-strain" />} 
            status="Moderado"
            color="text-accent-strain"
            tooltip="Esfuerzo acumulado hoy"
        />
        <MetricCard 
            label="Calidad de Sueño" 
            value={sleepText} 
            icon={<Moon size={18} className="text-accent-sleep" />} 
            status="Buena"
            color="text-accent-sleep"
            tooltip="Calidad del ciclo circadiano"
        />
        <MetricCard 
            label="Bio-Disposición" 
            value="Óptima" 
            icon={<Activity size={18} className="text-white" />} 
            status="En Curso"
            color="text-white"
            tooltip="Estado neuromuscular actual"
        />
      </div>

      {/* Main Insight Chart */}
      <div className="geometric-card p-6">
        <div className="flex justify-between items-center mb-6">
            <div>
                <h3 className="technical-heading text-lg">Balance de Rendimiento</h3>
                <p className="label-caps text-dim mt-1">Monitoreo de Recuperación Neuromuscular</p>
            </div>
            <div className="flex gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-accent-recovery" />
                    <span className="text-[10px] font-bold uppercase text-dim">Recurso (Recuperación)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-accent-strain" />
                    <span className="text-[10px] font-bold uppercase text-dim">Esfuerzo (Carga)</span>
                </div>
            </div>
        </div>
        <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                    <defs>
                        <linearGradient id="colorRec" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--color-accent-recovery)" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="var(--color-accent-recovery)" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#121212', border: '1px solid #222', borderRadius: '12px' }}
                        itemStyle={{ fontSize: '10px', textTransform: 'uppercase' }}
                    />
                    <Area 
                        type="monotone" 
                        dataKey="recovery" 
                        stroke="var(--color-accent-recovery)" 
                        fillOpacity={1} 
                        fill="url(#colorRec)" 
                        strokeWidth={2}
                    />
                     <Area 
                        type="monotone" 
                        dataKey="strain" 
                        stroke="var(--color-accent-strain)" 
                        fill="transparent" 
                        strokeWidth={2}
                        strokeDasharray="4 4"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
      </div>

      {/* AI Recommendation Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={() => onNavigate('coach')}
        className="bg-accent-recovery/5 border border-accent-recovery/20 p-8 rounded-[2.5rem] relative overflow-hidden group hover:bg-accent-recovery/10 transition-all cursor-pointer border-dashed"
      >
        <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 transition-transform">
            <ShieldCheck size={80} className="text-accent-recovery" />
        </div>
        
        <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6 text-accent-recovery">
                <TrendingUp size={20} />
                <h4 className="technical-heading text-sm">Recomendaciones del Coach</h4>
            </div>
            <p className="text-2xl font-medium leading-snug max-w-xl mb-8">
                "Basado en tu balance de hoy, te recomiendo el <span className="text-accent-recovery">Protocolo de Fase 2</span>. Tu capacidad de recuperación es óptima para alta intensidad."
            </p>
            <div className="flex items-center gap-4">
                <div className="bg-bright text-black px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                    Mejora hoy <ChevronRight size={14} />
                </div>
                <span className="text-[10px] font-bold text-dim uppercase tracking-widest">Consulta a Coach Pulse →</span>
            </div>
        </div>
      </motion.div>
    </div>
  );
};

interface MetricCardProps {
    label: string;
    value: string;
    icon: React.ReactNode;
    status: string;
    color: string;
    tooltip?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, icon, status, color, tooltip }) => (
    <div className="geometric-card p-5 geometric-card-hover group">
        <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-white/5 rounded-xl group-hover:bg-accent-recovery/10 transition-colors">
                {icon}
            </div>
            <span className={`text-[9px] font-bold uppercase tracking-widest ${color}`}>{status}</span>
        </div>
        <span className="text-2xl technical-heading block mb-1">{value}</span>
        <span className="label-caps !text-dim">{label}</span>
        {tooltip && (
            <p className="text-[8px] text-muted italic mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {tooltip}
            </p>
        )}
    </div>
);
