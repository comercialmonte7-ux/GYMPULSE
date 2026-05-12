import React from 'react';
import { motion } from 'motion/react';

interface MachineAnimationProps {
  machineId: string;
  videoUrl?: string;
}

const TechnicalAvatar: React.FC<{ type: string; progress: any }> = ({ type, progress }) => {
  return (
    <g className="stroke-white/20 stroke-[1.5] fill-none">
      {type === 'squat' ? (
        <motion.g animate={{ y: progress.y }}>
          <path d="M50 35 L50 60" />
          <circle cx="50" cy="28" r="6" className="fill-white/10" />
          <motion.path 
            d="M50 60 L35 75" 
            animate={{ d: [ "M50 60 L35 75", "M50 60 L35 55", "M50 60 L35 75" ] }} 
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.path 
            d="M50 60 L65 75" 
            animate={{ d: [ "M50 60 L65 75", "M50 60 L65 55", "M50 60 L65 75" ] }} 
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.path 
            d="M35 75 L35 90" 
            animate={{ d: [ "M35 75 L35 90", "M35 55 L35 90", "M35 75 L35 90" ] }} 
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.path 
            d="M65 75 L65 90" 
            animate={{ d: [ "M65 75 L65 90", "M65 55 L65 90", "M65 75 L65 90" ] }} 
            transition={{ duration: 3, repeat: Infinity }}
          />
          <path d="M50 40 L30 40" />
          <path d="M50 40 L70 40" />
        </motion.g>
      ) : type === 'press' ? (
        <g>
          <path d="M40 30 L40 60" className="opacity-10" strokeWidth="4" />
          <circle cx="45" cy="25" r="5" />
          <path d="M45 30 L45 55" />
          <motion.path 
            d="M45 40 L60 40 L70 40" 
            animate={{ x: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <path d="M45 55 L60 65" />
        </g>
      ) : type === 'pull' ? (
        <g>
          <path d="M50 20 L50 80" className="opacity-5" strokeWidth="8" />
          <circle cx="40" cy="35" r="5" />
          <path d="M40 40 L40 65" />
          <motion.path 
            d="M40 45 L60 30 L75 30" 
            animate={{ d: [ "M40 45 L60 30 L75 30", "M40 45 L60 60 L75 60", "M40 45 L60 30 L75 30" ] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </g>
      ) : type === 'cardio' ? (
        <g>
          <circle cx="50" cy="30" r="6" />
          <path d="M50 36 L50 60" />
          <motion.g animate={{ rotate: [0, 360] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} style={{ originX: '50px', originY: '60px' }}>
             <path d="M50 60 L40 80" />
             <path d="M50 60 L60 80" />
          </motion.g>
          <motion.path 
            d="M50 45 L65 55" 
            animate={{ rotate: [-20, 20, -20] }} 
            transition={{ duration: 0.5, repeat: Infinity }}
            style={{ originX: '50px', originY: '45px' }}
          />
        </g>
      ) : (
        <g>
           <circle cx="50" cy="30" r="8" />
           <path d="M50 38 L50 65" />
           <path d="M50 45 L30 55 M50 45 L70 55" />
           <path d="M50 65 L40 85 M50 65 L60 85" />
        </g>
      )}
    </g>
  );
};

export const MachineAnimation: React.FC<MachineAnimationProps> = ({ machineId, videoUrl }) => {
  const [showVideo, setShowVideo] = React.useState(!!videoUrl);
  
  const id = machineId.toLowerCase();
  const isPress = id.includes('press') || id.includes('push');
  const isPull = id.includes('pull') || id.includes('row');
  const isLegs = id.includes('leg') || id.includes('squat');
  const isCardio = id.includes('treadmill') || id.includes('bike') || id.includes('bicycle');

  return (
    <div className="w-full h-full bg-surface rounded-[2.5rem] flex flex-col items-center justify-center relative overflow-hidden group border border-border-subtle">
      
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />

      {videoUrl && showVideo ? (
        <div className="absolute inset-0 w-full h-full bg-black z-20">
          <iframe 
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoUrl}?rel=0&autoplay=1&mute=1&playlist=${videoUrl}&loop=1`}
            title="Video de técnica"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 relative">
            
            {/* Technical Labels */}
            <div className="absolute top-8 left-8 space-y-1">
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-accent-recovery rounded-full" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-dim">Analysis Mode</span>
                </div>
                <div className="text-[9px] font-mono text-muted">ID_REF: {machineId.toUpperCase()}</div>
            </div>

            <div className="relative w-full max-w-[280px] h-full flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                    {/* Machine Frame / Context */}
                    {(isPress || isPull) && (
                        <g opacity="0.1">
                           <rect x="20" y="20" width="10" height="70" rx="2" fill="white" />
                           <path d="M25 20 L80 20" stroke="white" strokeDasharray="2 2" />
                        </g>
                    )}

                    {/* Jointed Model */}
                    {isLegs ? (
                        <TechnicalAvatar type="squat" progress={{ y: [0, 20, 0] }} />
                    ) : isPress ? (
                        <TechnicalAvatar type="press" progress={{ x: [0, 20, 0] }} />
                    ) : isPull ? (
                        <TechnicalAvatar type="pull" progress={{}} />
                    ) : isCardio ? (
                        <TechnicalAvatar type="cardio" progress={{}} />
                    ) : (
                        <TechnicalAvatar type="default" progress={{}} />
                    )}

                    {/* Vector Lines */}
                    <motion.g
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="stroke-accent-recovery stroke-[1] fill-none"
                    >
                        <motion.path 
                            d={isLegs ? "M50 90 L50 20" : isPress ? "M40 40 L90 40" : isPull ? "M40 45 L40 10" : "M50 50 L80 50"} 
                            strokeDasharray="4 2"
                            animate={isLegs ? { y: [0, 20, 0] } : isPress ? { x: [0, 20, 0] } : isPull ? { y: [10, -10, 10] } : { scale: [1, 1.1, 1] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />
                        <motion.circle 
                            animate={isLegs ? { cy: [20, 40, 20] } : isPress ? { cx: [90, 70, 90] } : isPull ? { cy: [10, 30, 10] } : { cx: [80, 70, 80] }}
                            cx={isLegs ? 50 : isPress ? 90 : 40} cy={isLegs ? 20 : isPress ? 40 : 10} r="2" fill="currentColor" 
                            transition={{ duration: 3, repeat: Infinity }}
                        />
                    </motion.g>

                    {/* Callouts */}
                    <g className="text-[4px] font-mono fill-accent-recovery/40 font-bold uppercase">
                        <text x="10" y="15">Max_Range</text>
                        <text x="80" y="85">Base_Align</text>
                    </g>
                </svg>

                {/* Live Data Badge Overlay */}
                <div className="absolute bottom-4 right-0 flex flex-col items-end text-right">
                    <div className="bg-bright text-black text-[8px] font-mono px-2 py-0.5 rounded-sm flex items-center gap-1.5 mb-1">
                        <span className="w-1 h-1 bg-accent-recovery rounded-full animate-pulse" />
                        TRACKING_OK
                    </div>
                    <div className="text-[10px] font-black text-bright tabular-nums uppercase tracking-tighter">
                        {isLegs ? 'Vertical_Drive' : isPress ? 'Horizontal_Extension' : isPull ? 'Lat_Contraction' : isCardio ? 'Steady_Cadence' : 'Kinetics_Active'}
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Control Overlay */}
      <div className="absolute top-6 right-6 flex gap-2 z-30">
        {videoUrl && (
            <button 
                onClick={() => setShowVideo(!showVideo)}
                className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 border ${
                    showVideo 
                    ? 'bg-bright text-black border-bright' 
                    : 'bg-surface text-bright border-border-subtle shadow-xl'
                }`}
            >
                {showVideo ? 'Technical Scheme' : 'Pro Video Guide'}
            </button>
        )}
      </div>

      <div className="absolute bottom-6 left-8 flex items-center gap-3 z-30">
        <div className="flex gap-0.5">
            {[1,2,3].map(i => <div key={i} className="w-1 h-3 bg-accent-recovery/20 rounded-full" />)}
        </div>
        <span className="text-[10px] font-black text-muted uppercase tracking-[0.2em]">
            Visual_Sync: {showVideo ? 'REAL_DATA' : 'SIMULATION'}
        </span>
      </div>
    </div>
  );
};
