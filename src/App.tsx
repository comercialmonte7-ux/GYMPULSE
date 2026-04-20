import React, { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { MachineCard } from './components/MachineCard';
import { WorkoutLogger } from './components/WorkoutLogger';
import { AICoach } from './components/AICoach';
import { RoutineSelector } from './components/RoutineSelector';
import { RoutineDetail } from './components/RoutineDetail';
import { MachineAnimation } from './components/MachineAnimation';
import { ActiveSession } from './components/ActiveSession';
import { MACHINES } from './constants';
import { Machine, Exercise, Routine } from './types';
import { useLocalStorage } from './lib/utils';
import { LayoutDashboard, Dumbbell, History, Bot, X, Check, BookOpen, LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { auth, googleProvider, db, handleFirestoreError } from './lib/firebase';
import { onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';
import { collection, onSnapshot, addDoc, query, orderBy, setDoc, doc, serverTimestamp } from 'firebase/firestore';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dash' | 'routines' | 'log' | 'coach' | 'machines'>('dash');
  const [workouts, setWorkouts] = useLocalStorage<Exercise[]>('gym-pulse-workouts', []);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [selectedRoutine, setSelectedRoutine] = useState<Routine | null>(null);
  const [activeSessionRoutine, setActiveSessionRoutine] = useState<Routine | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        // Create or update user profile
        try {
          await setDoc(doc(db, 'users', currentUser.uid), {
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            lastLogin: serverTimestamp()
          }, { merge: true });
        } catch (error) {
          console.error("Error updating user profile:", error);
          handleFirestoreError(error, 'write', `users/${currentUser.uid}`);
        }

        // Sync workouts
        const q = query(
          collection(db, 'users', currentUser.uid, 'workouts'),
          orderBy('date', 'desc')
        );
        
        const unsubWorkouts = onSnapshot(q, (snapshot) => {
          const cloudWorkouts = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          } as Exercise));
          
          if (cloudWorkouts.length > 0) {
            setWorkouts(cloudWorkouts);
          }
        });

        return () => unsubWorkouts();
      }
    });

    return () => unsubscribe();
  }, [setWorkouts]);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleLogout = () => signOut(auth);

  const handleSaveWorkout = async (exercise: Exercise) => {
    if (user) {
      try {
        const workoutPath = `users/${user.uid}/workouts`;
        await addDoc(collection(db, workoutPath), {
          ...exercise,
          userId: user.uid,
          createdAt: serverTimestamp()
        });
      } catch (error) {
        console.error("Error saving to Firestore:", error);
        handleFirestoreError(error, 'create', `users/${user.uid}/workouts`);
        // Fallback to local state if firestore fails (will be synced via useLocalStorage anyway)
        setWorkouts([...workouts, exercise]);
      }
    } else {
      setWorkouts([...workouts, exercise]);
    }
    setActiveTab('dash');
  };

  const tabs = [
    { id: 'dash', label: 'Inicio', icon: LayoutDashboard },
    { id: 'routines', label: 'Rutinas', icon: BookOpen },
    { id: 'log', label: 'Log', icon: History },
    { id: 'coach', label: 'Coach', icon: Bot },
  ] as const;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 p-4 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-indigo-100">G</div>
            <h1 className="text-xl font-extrabold tracking-tight uppercase">GymPulse <span className="text-indigo-600 tracking-tighter lowercase font-medium">+Partner</span></h1>
          </div>
          
          <div className="flex items-center gap-4">
            {user ? (
               <div className="flex items-center gap-3">
                 <div className="text-right hidden sm:block">
                   <p className="text-xs font-black text-slate-900 leading-none">{user.displayName}</p>
                   <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{user.email}</p>
                 </div>
                 <button onClick={handleLogout} className="group relative">
                   <img 
                      src={user.photoURL || ''} 
                      className="w-8 h-8 rounded-full border-2 border-indigo-100 group-hover:border-indigo-500 transition-colors" 
                      alt="Avatar"
                      referrerPolicy="no-referrer"
                    />
                   <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 shadow-sm border border-slate-100">
                     <LogOut size={10} className="text-slate-400" />
                   </div>
                 </button>
               </div>
            ) : (
              <button 
                onClick={handleLogin}
                className="flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full border border-indigo-100 hover:bg-indigo-600 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest"
              >
                <LogIn size={14} />
                <span>Iniciar Sesión</span>
              </button>
            )}

            <div className="flex items-center gap-3 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
              <div className="w-5 h-5 bg-pink-400 rounded-full border-2 border-white shadow-sm" />
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest hidden sm:inline">Partner Live</span>
            </div>
          </div>
        </div>
      </header>

      {loading && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[100] flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-6 pb-32">
        {activeTab === 'dash' && <Dashboard workouts={workouts} />}
        
        {activeTab === 'routines' && (
          selectedRoutine ? (
            <RoutineDetail 
              routine={selectedRoutine} 
              onBack={() => setSelectedRoutine(null)}
              onSelectMachine={(m) => setSelectedMachine(m)}
              onStartLog={() => setActiveSessionRoutine(selectedRoutine)}
            />
          ) : (
            <RoutineSelector onSelect={(r) => setSelectedRoutine(r)} />
          )
        )}

        {activeTab === 'machines' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MACHINES.map(m => (
              <MachineCard key={m.id} machine={m} onClick={() => setSelectedMachine(m)} />
            ))}
          </div>
        )}

        {activeTab === 'log' && <WorkoutLogger onSave={handleSaveWorkout} recentWorkouts={workouts} />}
        {activeTab === 'coach' && <AICoach />}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md border border-slate-200 p-1.5 flex gap-1 rounded-full shadow-2xl shadow-slate-200/50 z-50">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => {
                setActiveTab(tab.id);
                if (tab.id !== 'routines') setSelectedRoutine(null);
            }}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold uppercase text-[10px] tracking-widest transition-all ${
              activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
          >
            <tab.icon size={18} />
            <span className="hidden md:inline">{tab.label}</span>
          </button>
        ))}
      </nav>

      <AnimatePresence>
        {activeSessionRoutine && (
            <ActiveSession 
                routine={activeSessionRoutine}
                onClose={() => setActiveSessionRoutine(null)}
                onFinish={(sessionData) => {
                    if (sessionData && sessionData.length > 0) {
                        sessionData.forEach(handleSaveWorkout);
                    }
                    setActiveSessionRoutine(null);
                    setActiveTab('dash');
                }}
                onShowMachineInfo={(m) => setSelectedMachine(m)}
            />
        )}
      </AnimatePresence>

      {/* Machine Modal */}
      <AnimatePresence>
        {selectedMachine && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMachine(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              className="relative bg-white rounded-[32px] p-8 md:p-12 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] z-10 border border-white"
            >
              <button 
                onClick={() => setSelectedMachine(null)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-full transition-all"
              >
                <X size={24} />
              </button>

              <div className="mb-10">
                <span className="bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-indigo-100">
                  {selectedMachine.muscleGroup}
                </span>
                <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mt-4">{selectedMachine.name}</h2>
                <p className="text-slate-500 mt-2 font-medium mb-8">{selectedMachine.description}</p>
                
                <div className="h-64 mb-8">
                  <MachineAnimation machineId={selectedMachine.id} videoUrl={selectedMachine.videoUrl} />
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-widest border-b border-indigo-50 pb-3 mb-6">Guía de Configuración</h3>
                  <ul className="space-y-4">
                    {selectedMachine.instructions.map((step, i) => (
                      <li key={i} className="flex gap-4 items-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-slate-900 text-white rounded-xl flex items-center justify-center text-sm font-bold shadow-md">
                          {i + 1}
                        </div>
                        <p className="font-medium text-slate-700 leading-relaxed pt-1">{step}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 p-6 rounded-2xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-5">
                      <Check size={48} className="text-indigo-600" />
                   </div>
                  <h3 className="font-bold uppercase text-[10px] tracking-widest text-indigo-400 mb-4 flex items-center gap-2">
                    <Check size={14} /> Evita estos errores
                  </h3>
                  <ul className="space-y-2">
                    {selectedMachine.tips.map((tip, i) => (
                      <li key={i} className="text-sm font-bold text-indigo-900 flex gap-2">
                        <span className="text-indigo-300">•</span> {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => {
                    setSelectedMachine(null);
                    setActiveTab('log');
                  }}
                  className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-extrabold uppercase text-lg hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-[0.98] mt-4"
                >
                  Entrenar ahora
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
