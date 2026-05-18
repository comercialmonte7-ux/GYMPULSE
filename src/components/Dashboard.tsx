import React, { useState } from 'react';
import { Exercise } from '../types';
import { TrendingUp, Zap, Heart, Moon, ShieldCheck, Activity, ChevronRight, Info, Watch, X } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import firebaseConfig from '../../firebase-applet-config.json';

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
      </div>
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

      {/* Servicios & Sincronización - Directo y Transparente */}
      <div className="space-y-6 pt-10 border-t border-border-subtle">
        <div className="bg-accent-recovery/5 border border-accent-recovery/20 rounded-[2.5rem] p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-accent-recovery/20 flex items-center justify-center text-accent-recovery">
              <Watch size={20} />
            </div>
            <div>
              <h3 className="text-xl technical-heading leading-none uppercase">Vincular con Apple Health</h3>
              <p className="label-caps !text-[9px] text-accent-recovery mt-2 tracking-widest">Protocolo de sincronización manual</p>
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-accent-recovery/10 border border-accent-recovery/30 flex items-center justify-center text-[10px] font-black text-accent-recovery shrink-0">1</div>
                <p className="text-xs text-dim leading-relaxed">
                  Abre la app de <span className="text-bright font-bold">Salud</span> de tu iPhone. No es necesario descargar nada extra.
                </p>
              </div>
              
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-accent-recovery/10 border border-accent-recovery/30 flex items-center justify-center text-[10px] font-black text-accent-recovery shrink-0">2</div>
                <p className="text-xs text-dim leading-relaxed">
                  Busca la sección de <span className="text-bright font-bold">"Fuentes"</span> o <span className="text-bright font-bold">"Datos"</span> dento de la app de Salud.
                </p>
              </div>
              
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-accent-recovery/10 border border-accent-recovery/30 flex items-center justify-center text-[10px] font-black text-accent-recovery shrink-0">3</div>
                <p className="text-xs text-dim leading-relaxed">
                  Revisa si <span className="text-bright font-bold font-mono uppercase">GymPulse</span> aparece ahí y activa los permisos de lectura.
                </p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
              <div className="flex items-start gap-4">
                <Info size={16} className="text-accent-recovery shrink-0" />
                <div>
                  <p className="text-[10px] font-bold text-bright uppercase tracking-wide mb-2 italic">Dato Importante:</p>
                  <p className="text-[11px] text-dim leading-relaxed italic opacity-80">
                    "Al ser una aplicación web avanzada (PWA), la conexión es directa. Una vez otorgues el permiso en tu iPhone desde el menú Fuentes, los datos aparecerán automáticamente aquí."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de Soporte Técnico y Dominios */}
        <div className="bg-surface/30 border border-border-subtle rounded-[2.5rem] p-8">
          <div className="flex items-center gap-4 mb-4">
            <ShieldCheck size={20} className="text-dim/50" />
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-dim">Mantenimiento de Seguridad</h4>
          </div>
          
          <p className="text-xs text-dim/60 mb-6 max-w-lg">
            Si experimentas el error de "dominio no autorizado" al iniciar sesión desde la pantalla de inicio, asegúrate de que el siguiente dominio esté configurado en tu consola.
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            <button 
              onClick={() => {
                navigator.clipboard.writeText(window.location.hostname);
                alert("Dominio copiado al portapapeles: " + window.location.hostname);
              }}
              className="flex-1 min-w-[200px] flex items-center justify-between gap-4 bg-white/5 border border-white/10 px-5 py-3 rounded-xl hover:bg-white/10 transition-all group"
            >
              <div className="flex flex-col items-start">
                <span className="text-[8px] font-black text-dim uppercase tracking-widest mb-1">Tu Dominio Actual</span>
                <span className="text-xs text-bright font-mono">{window.location.hostname}</span>
              </div>
              <div className="p-2 rounded-lg bg-white/5 group-hover:bg-accent-recovery/20 transition-colors">
                <X size={12} className="rotate-45 text-accent-recovery" />
              </div>
            </button>

            <a 
              href={`https://console.firebase.google.com/project/${firebaseConfig.projectId}/authentication/settings`} 
              target="_blank" 
              rel="noreferrer"
              className="flex-1 min-w-[200px] flex items-center justify-center gap-2 bg-accent-recovery/20 text-accent-recovery border border-accent-recovery/30 px-5 py-3 rounded-xl hover:bg-accent-recovery/30 transition-all font-black uppercase tracking-widest text-[9px]"
            >
              Abrir Consola de Firebase
            </a>
          </div>

          {/* Botón de Emergencia para Sesión */}
          <div className="border-t border-white/5 pt-8">
            <div className="flex items-center gap-2 mb-4">
              <Zap size={14} className="text-accent-strain" />
              <h5 className="text-[9px] font-black uppercase tracking-widest text-dim">Herramientas de Diagnóstico</h5>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button 
                onClick={() => {
                  localStorage.clear();
                  sessionStorage.clear();
                  window.location.reload();
                }}
                className="text-[9px] font-bold uppercase tracking-widest bg-red-500/10 text-red-400 border border-red-500/20 px-4 py-3 rounded-xl hover:bg-red-500/20 transition-all text-left"
              >
                Limpiar datos locales y Reintentar
                <span className="block text-[8px] opacity-60 normal-case font-medium mt-1">Borra el flag de sesión si se queda bloqueado.</span>
              </button>
              
              <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-xl">
                 <span className="text-[9px] font-bold uppercase tracking-widest text-dim block mb-2">Estado de Persistencia</span>
                 <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${localStorage.getItem('gym-pulse-session-active') === 'true' ? 'bg-green-500' : 'bg-red-500'}`} />
                    <span className="text-[10px] text-bright font-mono">FLAG_SESION: {localStorage.getItem('gym-pulse-session-active') || 'NULL'}</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
